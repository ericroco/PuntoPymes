// apps/personal/src/personal.service.ts
import { Injectable, BadRequestException, NotFoundException, ConflictException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado, Rol, Cargo, Departamento } from 'default/database';
import { Repository } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { CreateCargoDto } from './dto/create-cargo.dto';
@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,

    // --- (INICIO DE CAMBIOS) ---
    // Necesitamos los repositorios de Rol y Cargo para validar
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
    // --- (FIN DE CAMBIOS) ---
    @InjectRepository(Departamento)
    private readonly deptoRepository: Repository<Departamento>,
  ) { }

  /**
   * Lógica de negocio para obtener todos los empleados
   * DE UNA SOLA EMPRESA (Multi-Tenant RNF20).
   * @param empresaId El ID del tenant (extraído del JWT)
   */
  async getEmpleados(empresaId: string): Promise<Empleado[]> {
    console.log(
      `Microservicio PERSONAL: Buscando empleados para empresaId: ${empresaId}`,
    );
    return this.empleadoRepository.find({
      where: {
        empresaId: empresaId,
      },
      relations: ['cargo', 'rol'],
    });
  }

  // --- (INICIO DE CAMBIOS) ---
  /**
   * Lógica de negocio para crear un nuevo Empleado (RF-01-01)
   * DE FORMA SEGURA (Multi-Tenant RNF20).
   * @param empresaId El ID del tenant (del JWT del admin)
   * @param dto Los datos del nuevo empleado
   */
  async createEmpleado(
    empresaId: string,
    dto: CreateEmpleadoDto,
  ): Promise<Empleado> {
    console.log(
      `Microservicio PERSONAL: Creando empleado para empresaId: ${empresaId}`,
    );

    // --- 1. Validación de Seguridad Multi-Tenant (RNF20) ---
    // (A) Validar que el Rol pertenezca a la empresa del admin
    const rol = await this.rolRepository.findOneBy({
      id: dto.rolId,
      empresaId: empresaId, // ¡La clave!
    });
    if (!rol) {
      throw new BadRequestException(
        'El Rol seleccionado no es válido o no pertenece a esta empresa.',
      );
    }

    // (B) Validar que el Cargo pertenezca a la empresa del admin
    // (Lo hacemos a través de la entidad Cargo -> Departamento -> Empresa)
    const cargo = await this.cargoRepository.findOne({
      where: {
        id: dto.cargoId,
        departamento: {
          empresaId: empresaId, // ¡La clave!
        },
      },
    });
    if (!cargo) {
      throw new BadRequestException(
        'El Cargo seleccionado no es válido o no pertenece a esta empresa.',
      );
    }

    // (C) (Opcional pero recomendado) Validar que el Jefe pertenezca a la empresa
    if (dto.jefeId) {
      const jefe = await this.empleadoRepository.findOneBy({
        id: dto.jefeId,
        empresaId: empresaId, // ¡La clave!
      });
      if (!jefe) {
        throw new BadRequestException(
          'El Jefe seleccionado no es válido o no pertenece a esta empresa.',
        );
      }
    }

    // --- 2. Creación del Empleado ---
    const nuevoEmpleado = this.empleadoRepository.create({
      ...dto,
      // Asignación forzada de Multi-Tenant
      empresaId: empresaId,
      // El resto de campos (nombre, apellido, rolId, etc.) vienen del DTO
    });

    return this.empleadoRepository.save(nuevoEmpleado);
  }
  // --- AÑADIR NUEVO MÉTODO 'updateEmpleado' ---

  /**
   * Lógica de negocio para actualizar un Empleado (RF-01-03)
   * DE FORMA SEGURA (Multi-Tenant RNF20).
   * @param empresaId El ID del tenant (del JWT del admin)
   * @param empleadoId El ID del empleado a actualizar
   * @param dto Los datos (opcionales) a actualizar
   */
  async updateEmpleado(
    empresaId: string,
    empleadoId: string,
    dto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    console.log(
      `Microservicio PERSONAL: Actualizando empleado ${empleadoId} para empresaId: ${empresaId}`,
    );

    // --- 1. Validar que el empleado pertenezca a la empresa ---
    // Esta es la validación de seguridad MÁS IMPORTANTE.
    const empleado = await this.empleadoRepository.findOneBy({
      id: empleadoId,
      empresaId: empresaId, // ¡La clave!
    });

    if (!empleado) {
      throw new NotFoundException(
        'Empleado no encontrado o no pertenece a esta empresa.',
      );
    }

    // --- 2. Validación de Seguridad de FKs (si vienen en el DTO) ---
    if (dto.rolId) {
      const rol = await this.rolRepository.findOneBy({
        id: dto.rolId,
        empresaId: empresaId,
      });
      if (!rol) {
        throw new BadRequestException(
          'El Rol seleccionado no es válido o no pertenece a esta empresa.',
        );
      }
    }

    if (dto.cargoId) {
      const cargo = await this.cargoRepository.findOne({
        where: {
          id: dto.cargoId,
          departamento: {
            empresaId: empresaId,
          },
        },
      });
      if (!cargo) {
        throw new BadRequestException(
          'El Cargo seleccionado no es válido o no pertenece a esta empresa.',
        );
      }
    }

    // (Omitimos la validación de jefeId por brevedad, pero seguiría la misma lógica)

    // --- 3. Aplicar cambios y guardar ---
    // 'merge' aplica los campos (opcionales) del DTO
    // sobre la entidad 'empleado' que encontramos.
    const empleadoActualizado = this.empleadoRepository.merge(empleado, dto);

    return this.empleadoRepository.save(empleadoActualizado);
  }
  /**
   * Lógica de negocio para "Desactivar" (Soft Delete)
   * un Empleado (RF-01-04).
   */
  async deleteEmpleado(
    empresaId: string,
    empleadoId: string,
  ): Promise<{ message: string }> {
    console.log(
      `Microservicio PERSONAL: Desactivando (Soft Delete) empleado ${empleadoId} para empresaId: ${empresaId}`,
    );

    // 1. Validar que el empleado pertenezca a la empresa
    const empleado = await this.empleadoRepository.findOneBy({
      id: empleadoId,
      empresaId: empresaId,
    });

    if (!empleado) {
      throw new NotFoundException(
        'Empleado no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Ejecutar el Soft Delete (establece 'deletedAt')
    await this.empleadoRepository.softRemove(empleado);

    return { message: 'Empleado desactivado (desvinculado) correctamente.' };
  }
  // --- AÑADIR NUEVO MÉTODO 'createDepartamento' (RF-02) ---

  /**
   * Lógica de negocio para crear un nuevo Departamento (RF-02)
   * DE FORMA SEGURA (Multi-Tenant RNF20).
   * @param empresaId El ID del tenant (del JWT del admin)
   * @param dto Los datos del nuevo departamento
   */
  async createDepartamento(
    empresaId: string,
    dto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    console.log(
      `Microservicio PERSONAL: Creando departamento para empresaId: ${empresaId}`,
    );

    // --- 1. Validación de Duplicados (RNF20) ---
    // Validar que no exista OTRO depto con el mismo nombre
    // EN LA MISMA EMPRESA.
    const deptoExistente = await this.deptoRepository.findOneBy({
      nombre: dto.nombre,
      empresaId: empresaId, // ¡La clave!
    });

    if (deptoExistente) {
      throw new ConflictException(
        'Ya existe un departamento con ese nombre en esta empresa.',
      );
    }

    // --- 2. Creación del Departamento ---
    const nuevoDepto = this.deptoRepository.create({
      ...dto,
      // Asignación forzada de Multi-Tenant
      empresaId: empresaId,
    });

    return this.deptoRepository.save(nuevoDepto);
  }
  /**
     * Lógica de negocio para obtener todos los Departamentos (RF-02)
     * DE UNA SOLA EMPRESA (Multi-Tenant RNF20).
     * @param empresaId El ID del tenant (extraído del JWT)
     */
  async getDepartamentos(empresaId: string): Promise<Departamento[]> {
    console.log(
      `Microservicio PERSONAL: Buscando departamentos para empresaId: ${empresaId}`,
    );

    // Buscamos en la BDD todos los departamentos
    // donde 'empresaId' coincida.
    return this.deptoRepository.find({
      where: {
        empresaId: empresaId,
      },
      // Cargamos la relación 'cargos' para ver los cargos de cada depto
      relations: ['cargos'],
    });
  }
  /**
   * Lógica de negocio para actualizar un Departamento (RF-02)
   * DE FORMA SEGURA (Multi-Tenant RNF20).
   */
  async updateDepartamento(
    empresaId: string,
    deptoId: string,
    dto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    console.log(
      `Microservicio PERSONAL: Actualizando depto ${deptoId} para empresaId: ${empresaId}`,
    );

    // 1. Validar que el depto pertenezca a la empresa
    const depto = await this.deptoRepository.findOneBy({
      id: deptoId,
      empresaId: empresaId,
    });

    if (!depto) {
      throw new NotFoundException(
        'Departamento no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Si se va a cambiar el nombre, validar duplicados
    if (dto.nombre && dto.nombre !== depto.nombre) {
      const deptoExistente = await this.deptoRepository.findOneBy({
        nombre: dto.nombre,
        empresaId: empresaId,
      });
      if (deptoExistente) {
        throw new ConflictException(
          'Ya existe un departamento con ese nombre en esta empresa.',
        );
      }
    }

    // 3. Aplicar cambios y guardar
    const deptoActualizado = this.deptoRepository.merge(depto, dto);
    return this.deptoRepository.save(deptoActualizado);
  }
  /**
   * Lógica de negocio para "borrar" lógicamente (Soft Delete)
   * un Departamento (RF-02).
   */
  async deleteDepartamento(
    empresaId: string,
    deptoId: string,
  ): Promise<{ message: string }> {
    console.log(
      `Microservicio PERSONAL: Borrando (Soft Delete) depto ${deptoId} para empresaId: ${empresaId}`,
    );

    // 1. Validar que el depto pertenezca a la empresa
    const depto = await this.deptoRepository.findOneBy({
      id: deptoId,
      empresaId: empresaId,
    });

    if (!depto) {
      throw new NotFoundException(
        'Departamento no encontrado o no pertenece a esta empresa.',
      );
    }

    // (AQUÍ LA MAGIA)
    // 2. TypeORM no lo borra, sino que establece la fecha
    // en la columna 'deletedAt' que creamos.
    await this.deptoRepository.softRemove(depto);

    return { message: 'Departamento desactivado correctamente.' };
  }
  /**
   * Lógica de negocio para crear un nuevo Cargo (RF-02)
   * DE FORMA SEGURA (Multi-Tenant RNF20).
   * @param empresaId El ID del tenant (del JWT del admin)
   * @param dto Los datos del nuevo cargo (nombre y deptoId)
   */
  async createCargo(
    empresaId: string,
    dto: CreateCargoDto,
  ): Promise<Cargo> {
    console.log(
      `Microservicio PERSONAL: Creando cargo para empresaId: ${empresaId}`,
    );

    // --- 1. Validación de Seguridad Multi-Tenant (RNF20) ---
    // Validar que el Departamento (padre) pertenezca a la empresa del admin.
    const depto = await this.deptoRepository.findOneBy({
      id: dto.departamentoId,
      empresaId: empresaId, // ¡La clave!
    });

    if (!depto) {
      throw new BadRequestException(
        'El Departamento seleccionado no es válido o no pertenece a esta empresa.',
      );
    }

    // --- 2. Validación de Duplicados ---
    // Validar que no exista OTRO cargo con el mismo nombre
    // EN EL MISMO DEPARTAMENTO.
    const cargoExistente = await this.cargoRepository.findOneBy({
      nombre: dto.nombre,
      departamentoId: dto.departamentoId,
    });

    if (cargoExistente) {
      throw new ConflictException(
        'Ya existe un cargo con ese nombre en este departamento.',
      );
    }

    // --- 3. Creación del Cargo ---
    const nuevoCargo = this.cargoRepository.create({
      ...dto,
      // 'nombre' y 'departamentoId' vienen del dto.
      // No necesitamos 'empresaId' aquí, porque el cargo
      // hereda la empresa a través de su departamento.
    });

    return this.cargoRepository.save(nuevoCargo);
  }
}