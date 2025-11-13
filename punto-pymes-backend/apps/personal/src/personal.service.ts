// apps/personal/src/personal.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// Tu import ya incluye 'Contrato', lo cual es perfecto.
import { Empleado, Rol, Cargo, Departamento, Contrato } from 'default/database';
import { Repository, Not } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,

    // --- (INICIO DE CAMBIOS) ---
    // 1. Inyectar el repositorio de Contrato
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
    // --- (FIN DE CAMBIOS) ---

    @InjectRepository(Departamento)
    private readonly deptoRepository: Repository<Departamento>,
  ) { }

  /**
   * Lógica de negocio para obtener todos los empleados
   * (Tu método existente - sin cambios)
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

  /**
   * Lógica de negocio para crear un nuevo Empleado (RF-01-01)
   * (Tu método existente - sin cambios)
   */
  async createEmpleado(
    empresaId: string,
    dto: CreateEmpleadoDto,
  ): Promise<Empleado> {
    console.log(
      `Microservicio PERSONAL: Creando empleado para empresaId: ${empresaId}`,
    );

    // --- 1. Validación de Seguridad Multi-Tenant (RNF20) ---
    const rol = await this.rolRepository.findOneBy({
      id: dto.rolId,
      empresaId: empresaId,
    });
    if (!rol) {
      throw new BadRequestException(
        'El Rol seleccionado no es válido o no pertenece a esta empresa.',
      );
    }

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

    if (dto.jefeId) {
      const jefe = await this.empleadoRepository.findOneBy({
        id: dto.jefeId,
        empresaId: empresaId,
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
      empresaId: empresaId,
    });

    return this.empleadoRepository.save(nuevoEmpleado);
  }

  /**
   * Lógica de negocio para actualizar un Empleado (RF-01-03)
   * (Tu método existente - sin cambios)
   */
  async updateEmpleado(
    empresaId: string,
    empleadoId: string,
    dto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    console.log(
      `Microservicio PERSONAL: Actualizando empleado ${empleadoId} para empresaId: ${empresaId}`,
    );

    const empleado = await this.empleadoRepository.findOneBy({
      id: empleadoId,
      empresaId: empresaId,
    });

    if (!empleado) {
      throw new NotFoundException(
        'Empleado no encontrado o no pertenece a esta empresa.',
      );
    }

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

    const empleadoActualizado = this.empleadoRepository.merge(empleado, dto);

    return this.empleadoRepository.save(empleadoActualizado);
  }

  // --- (INICIO DE CAMBIOS) ---
  /**
   * Lógica de negocio para "Desvincular" un Empleado (RF-01-04).
   * Esto busca el contrato 'Activo' y lo pasa a 'Inactivo'.
   */
  async deleteEmpleado(
    empresaId: string,
    empleadoId: string,
  ): Promise<{ message: string }> {
    console.log(
      `Microservicio PERSONAL: Desvinculando empleado ${empleadoId} (finalizando contrato) para empresaId: ${empresaId}`,
    );

    // 1. Buscar el CONTRATO ACTIVO del empleado.
    //    Esto valida implícitamente que el empleadoId y empresaId son correctos
    //    y cumple con tu regla de negocio (solo 1 activo).
    const contratoActivo = await this.contratoRepository.findOne({
      where: {
        empleado: { id: empleadoId, empresaId: empresaId },
        estado: 'Activo', // La regla de negocio clave
      },
    });

    if (!contratoActivo) {
      throw new NotFoundException(
        'No se encontró un contrato activo para este empleado.',
      );
    }

    // 2. Actualizar el estado del Contrato a 'Inactivo'
    contratoActivo.estado = 'Inactivo';
    // (Opcional: si tienes un campo fechaFin, establécelo aquí)
    // contratoActivo.fechaFin = new Date();
    await this.contratoRepository.save(contratoActivo);

    // 3. (Recomendado) Actualizar el estado de la propia entidad Empleado
    //    (basado en tu 'empleado.entity.ts')
    const empleado = await this.empleadoRepository.findOneBy({
      id: empleadoId,
      empresaId: empresaId,
    });

    if (empleado) {
      // Cambia el estado del empleado de 'Activo' a 'Inactivo'
      empleado.estado = 'Inactivo';
      await this.empleadoRepository.save(empleado);
    }

    return {
      message: 'Empleado desvinculado (contrato finalizado) correctamente.',
    };
  }
  // --- (FIN DE CAMBIOS) ---

  /**
   * Lógica de negocio para crear un nuevo Departamento (RF-02)
   * (Tu método existente - sin cambios)
   */
  async createDepartamento(
    empresaId: string,
    dto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    console.log(
      `Microservicio PERSONAL: Creando departamento para empresaId: ${empresaId}`,
    );

    const deptoExistente = await this.deptoRepository.findOneBy({
      nombre: dto.nombre,
      empresaId: empresaId,
    });

    if (deptoExistente) {
      throw new ConflictException(
        'Ya existe un departamento con ese nombre en esta empresa.',
      );
    }

    const nuevoDepto = this.deptoRepository.create({
      ...dto,
      empresaId: empresaId,
    });

    return this.deptoRepository.save(nuevoDepto);
  }

  /**
     * Lógica de negocio para obtener todos los Departamentos (RF-02)
     * (Tu método existente - sin cambios)
     */
  async getDepartamentos(empresaId: string): Promise<Departamento[]> {
    console.log(
      `Microservicio PERSONAL: Buscando departamentos para empresaId: ${empresaId}`,
    );
    return this.deptoRepository.find({
      where: {
        empresaId: empresaId,
      },
      relations: ['cargos'],
    });
  }

  /**
   * Lógica de negocio para actualizar un Departamento (RF-02)
   * (Tu método existente - sin cambios)
   */
  async updateDepartamento(
    empresaId: string,
    deptoId: string,
    dto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    console.log(
      `Microservicio PERSONAL: Actualizando depto ${deptoId} para empresaId: ${empresaId}`,
    );

    const depto = await this.deptoRepository.findOneBy({
      id: deptoId,
      empresaId: empresaId,
    });

    if (!depto) {
      throw new NotFoundException(
        'Departamento no encontrado o no pertenece a esta empresa.',
      );
    }

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

    const deptoActualizado = this.deptoRepository.merge(depto, dto);
    return this.deptoRepository.save(deptoActualizado);
  }

  /**
   * Lógica de negocio para "borrar" lógicamente (Soft Delete)
   * un Departamento (RF-02).
   * (Tu método existente - sin cambios)
  m*/
  async deleteDepartamento(
    empresaId: string,
    deptoId: string,
  ): Promise<{ message: string }> {
    console.log(
      `Microservicio PERSONAL: Borrando (Soft Delete) depto ${deptoId} para empresaId: ${empresaId}`,
    );

    const depto = await this.deptoRepository.findOneBy({
      id: deptoId,
      empresaId: empresaId,
    });

    if (!depto) {
      throw new NotFoundException(
        'Departamento no encontrado o no pertenece a esta empresa.',
      );
    }

    await this.deptoRepository.softRemove(depto);

    return { message: 'Departamento desactivado correctamente.' };
  }

  /**
    * Lógica de negocio para crear un nuevo Cargo (RF-02)
    * (Tu método existente - sin cambios)
    */
  async createCargo(
    empresaId: string,
    dto: CreateCargoDto,
  ): Promise<Cargo> {
    // ... (Tu lógica de createCargo existente) ...
    console.log(
      `Microservicio PERSONAL: Creando cargo para empresaId: ${empresaId}`,
    );

    const depto = await this.deptoRepository.findOneBy({
      id: dto.departamentoId,
      empresaId: empresaId,
    });

    if (!depto) {
      throw new BadRequestException(
        'El Departamento seleccionado no es válido o no pertenece a esta empresa.',
      );
    }

    const cargoExistente = await this.cargoRepository.findOneBy({
      nombre: dto.nombre,
      departamentoId: dto.departamentoId,
    });

    if (cargoExistente) {
      throw new ConflictException(
        'Ya existe un cargo con ese nombre en este departamento.',
      );
    }

    const nuevoCargo = this.cargoRepository.create({
      ...dto,
    });

    return this.cargoRepository.save(nuevoCargo);
  }

  /**
   * Lógica de negocio para OBTENER TODOS los Cargos (RF-02)
   * de una empresa (Multi-Tenant).
   */
  async getCargos(empresaId: string): Promise<Cargo[]> {
    console.log(
      `Microservicio PERSONAL: Buscando cargos para empresaId: ${empresaId}`,
    );

    // Buscamos cargos a través de la relación Cargo -> Departamento -> Empresa
    return this.cargoRepository.find({
      where: {
        departamento: {
          empresaId: empresaId,
        },
      },
      relations: ['departamento'], // Incluimos info del depto al que pertenecen
      withDeleted: false, // ¡Importante! No mostrar los borrados lógicamente
    });
  }

  /**
   * Lógica de negocio para ACTUALIZAR un Cargo (RF-02)
   * de forma segura (Multi-Tenant).
   */
  async updateCargo(
    empresaId: string,
    cargoId: string,
    dto: UpdateCargoDto,
  ): Promise<Cargo> {
    console.log(
      `Microservicio PERSONAL: Actualizando cargo ${cargoId} para empresaId: ${empresaId}`,
    );

    // 1. Validar que el cargo pertenezca a la empresa
    const cargo = await this.cargoRepository.findOne({
      where: { id: cargoId },
      relations: ['departamento'], // Cargar el depto para validar el empresaId
    });

    if (!cargo || cargo.departamento.empresaId !== empresaId) {
      throw new NotFoundException(
        'Cargo no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Validar si se cambia el departamento (dto.departamentoId)
    if (dto.departamentoId && dto.departamentoId !== cargo.departamentoId) {
      const nuevoDepto = await this.deptoRepository.findOneBy({
        id: dto.departamentoId,
        empresaId: empresaId, // Validar que el nuevo depto sea de la misma empresa
      });
      if (!nuevoDepto) {
        throw new BadRequestException(
          'El nuevo departamento seleccionado no es válido o no pertenece a esta empresa.',
        );
      }
    }

    // 3. Validar duplicados (si se cambia nombre o depto)
    if (dto.nombre || dto.departamentoId) {
      const nombreValidar = dto.nombre || cargo.nombre;
      const deptoIdValidar = dto.departamentoId || cargo.departamentoId;

      const cargoExistente = await this.cargoRepository.findOne({
        where: {
          nombre: nombreValidar,
          departamentoId: deptoIdValidar,
          id: Not(cargoId), // Excluir el cargo actual de la búsqueda
        },
      });

      if (cargoExistente) {
        throw new ConflictException(
          'Ya existe un cargo con ese nombre en el departamento seleccionado.',
        );
      }
    }

    // 4. Aplicar cambios y guardar
    const cargoActualizado = this.cargoRepository.merge(cargo, dto);
    return this.cargoRepository.save(cargoActualizado);
  }

  /**
   * Lógica de negocio para "borrar" lógicamente (Soft Delete)
   * un Cargo (RF-02).
   */
  async deleteCargo(
    empresaId: string,
    cargoId: string,
  ): Promise<{ message: string }> {
    console.log(
      `Microservicio PERSONAL: Borrando (Soft Delete) cargo ${cargoId} para empresaId: ${empresaId}`,
    );

    // 1. Validar que el cargo pertenezca a la empresa
    const cargo = await this.cargoRepository.findOne({
      where: { id: cargoId },
      relations: ['departamento'],
    });

    if (!cargo || cargo.departamento.empresaId !== empresaId) {
      throw new NotFoundException(
        'Cargo no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. (AQUÍ LA MAGIA)
    // Ejecutar el Soft Delete (establece 'deletedAt')
    // Esto funciona porque tu BaseEntity tiene @DeleteDateColumn
    await this.cargoRepository.softRemove(cargo);

    return { message: 'Cargo desactivado correctamente.' };
  }
  /**
   * Lógica de negocio para CREAR un Rol (RF-29)
   * de forma segura (Multi-Tenant RNF20).
   */
  async createRol(
    empresaId: string,
    dto: CreateRolDto,
  ): Promise<Rol> {
    console.log(
      `Microservicio PERSONAL: Creando Rol para empresaId: ${empresaId}`,
    );

    // 1. Validación de Duplicados (Multi-Tenant)
    // El nombre del rol debe ser único POR EMPRESA.
    const rolExistente = await this.rolRepository.findOneBy({
      nombre: dto.nombre,
      empresaId: empresaId,
    });

    if (rolExistente) {
      throw new ConflictException(
        'Ya existe un rol con ese nombre en esta empresa.',
      );
    }

    // 2. Creación del Rol
    const nuevoRol = this.rolRepository.create({
      ...dto,
      empresaId: empresaId,
      permisos: dto.permisos || {}, // ¡Forzamos el Multi-tenancy!
    });

    return this.rolRepository.save(nuevoRol);
  }

  /**
   * Lógica de negocio para OBTENER TODOS los Roles (RF-29)
   * de una empresa (Multi-Tenant RNF20).
   */
  async getRoles(empresaId: string): Promise<Rol[]> {
    console.log(
      `Microservicio PERSONAL: Buscando Roles para empresaId: ${empresaId}`,
    );
    return this.rolRepository.find({
      where: {
        empresaId: empresaId,
      },
      withDeleted: false, // No mostrar los borrados lógicamente
    });
  }

  /**
   * Lógica de negocio para ACTUALIZAR un Rol (RF-29)
   * de forma segura (Multi-Tenant RNF20).
   */
  async updateRol(
    empresaId: string,
    rolId: string,
    dto: UpdateRolDto,
  ): Promise<Rol> {
    console.log(
      `Microservicio PERSONAL: Actualizando Rol ${rolId} para empresaId: ${empresaId}`,
    );

    // 1. Validar que el rol pertenezca a la empresa
    const rol = await this.rolRepository.findOneBy({
      id: rolId,
      empresaId: empresaId,
    });

    if (!rol) {
      throw new NotFoundException(
        'Rol no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Si se cambia el nombre, validar duplicados
    if (dto.nombre && dto.nombre !== rol.nombre) {
      const rolExistente = await this.rolRepository.findOneBy({
        nombre: dto.nombre,
        empresaId: empresaId,
        id: Not(rolId), // Excluir el rol actual de la búsqueda
      });
      if (rolExistente) {
        throw new ConflictException(
          'Ya existe un rol con ese nombre en esta empresa.',
        );
      }
    }

    // 3. Aplicar cambios y guardar
    const rolActualizado = this.rolRepository.merge(rol, dto);
    return this.rolRepository.save(rolActualizado);
  }

  /**
   * Lógica de negocio para "borrar" lógicamente (Soft Delete)
   * un Rol (RF-29).
   */
  async deleteRol(
    empresaId: string,
    rolId: string,
  ): Promise<{ message: string }> {
    console.log(
      `Microservicio PERSONAL: Borrando (Soft Delete) Rol ${rolId} para empresaId: ${empresaId}`,
    );

    // 1. Validar que el rol pertenezca a la empresa
    const rol = await this.rolRepository.findOneBy({
      id: rolId,
      empresaId: empresaId,
    });

    if (!rol) {
      throw new NotFoundException(
        'Rol no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. ¡LÓGICA DE NEGOCIO "ULTRA COMPLETA"!
    // No podemos borrar un rol si está asignado a empleados activos.
    // La entidad 'Rol' usa 'RESTRICT', pero para soft-delete, validamos manualmente.
    const empleadosConRol = await this.empleadoRepository.count({
      where: {
        rolId: rolId,
        empresaId: empresaId,
        // Opcional: podrías verificar solo empleados 'Activos'
        // estado: 'Activo' 
      },
    });

    if (empleadosConRol > 0) {
      throw new ConflictException(
        `No se puede eliminar el rol. Está asignado a ${empleadosConRol} empleado(s).`,
      );
    }

    // 3. Ejecutar el Soft Delete
    await this.rolRepository.softRemove(rol);

    return { message: 'Rol desactivado correctamente.' };
  }
}