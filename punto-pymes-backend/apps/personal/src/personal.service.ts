// apps/personal/src/personal.service.ts
import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// Tu import ya incluye 'Contrato', lo cual es perfecto.
import {
  Empleado, Rol, Cargo, Departamento, Contrato, Candidato,
  Vacante, EstadoCandidato, EstadoVacante, DocumentoEmpleado
} from 'default/database';
import { Repository, Not, DataSource } from 'typeorm';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { CreateCandidatoDto } from './dto/create-candidato.dto';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { UpdateCandidatoAIDto } from './dto/update-candidato-ai.dto';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Sucursal } from 'default/database';
import * as fs from 'fs';
import { join } from 'path';
import axios from 'axios';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PersonalService {
  private genAI: GoogleGenerativeAI;
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
    private configService: ConfigService,
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
    @InjectRepository(Departamento)
    private readonly deptoRepository: Repository<Departamento>,
    @InjectRepository(Vacante)
    private readonly vacanteRepository: Repository<Vacante>,
    @InjectRepository(Candidato)
    private readonly candidatoRepository: Repository<Candidato>,
    @InjectRepository(DocumentoEmpleado)
    private readonly documentoRepository: Repository<DocumentoEmpleado>,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy, // Inyectar Cliente Auth
    private readonly mailerService: MailerService,
    @InjectRepository(Sucursal)
    private readonly sucursalRepository: Repository<Sucursal>,

    private dataSource: DataSource,
  ) {
    // 3. Usar getOrThrow (Lanza error si no existe, y TypeScript sabe que es string)
    const apiKey = this.configService.getOrThrow<string>('GEMINI_API_KEY');

    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Lógica de negocio para obtener todos los empleados
   * (Tu método existente - sin cambios)
   */
  async getEmpleados(empresaId: string, filtroSucursalId?: string): Promise<Empleado[]> {
    console.log(`Microservicio PERSONAL: Buscando empleados...`);

    const where: any = { empresaId };

    if (filtroSucursalId) {
      where.sucursalId = filtroSucursalId;
    }

    return this.empleadoRepository.find({
      where: { empresaId: empresaId, estado: 'Activo' },
      // 👇 AGREGAMOS 'cargo.departamento' AQUÍ
      relations: ['cargo', 'cargo.departamento', 'rol', 'sucursal', 'contratos'],
    });
  }
  async getEmpleado(empresaId: string, empleadoId: string): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOne({
      where: { id: empleadoId, empresaId },
      // Cargamos cargo, rol y el departamento del cargo para mostrarlo en el perfil
      relations: ['cargo', 'rol', 'cargo.departamento'],
    });

    if (!empleado) {
      throw new NotFoundException('Empleado no encontrado.');
    }
    return empleado;
  }
  /**
   * Lógica de negocio para crear un nuevo Empleado (RF-01-01)
   * Crea el registro, genera usuario automático y envía credenciales.
   */
  async createEmpleado(
    empresaId: string,
    dto: CreateEmpleadoDto,
    usuarioCreador?: { sucursalId?: string }
  ): Promise<Empleado> {
    console.log(`Microservicio PERSONAL: Procesando empleado... ID: ${dto.nroIdentificacion} - Email: ${dto.emailPersonal}`);

    // =================================================================
    // PASO 0: Validaciones de Relaciones (Sucursal, Rol, Cargo)
    // =================================================================
    let sucursalDestino = dto.sucursalId;
    if (usuarioCreador && usuarioCreador.sucursalId) {
      sucursalDestino = usuarioCreador.sucursalId;
    }

    // Validar Sucursal
    if (sucursalDestino) {
      const sucursal = await this.sucursalRepository.findOneBy({ id: sucursalDestino, empresaId });
      if (!sucursal) throw new BadRequestException('La sucursal seleccionada no es válida o no pertenece a la empresa.');
    }

    // Validar Rol
    const rol = await this.rolRepository.findOneBy({ id: dto.rolId, empresaId });
    if (!rol) throw new BadRequestException('El rol seleccionado no es válido.');

    // Validar Cargo
    const cargo = await this.cargoRepository.findOne({
      where: { id: dto.cargoId, departamento: { empresaId } },
    });
    if (!cargo) throw new BadRequestException('El cargo seleccionado no es válido.');


    // =================================================================
    // PASO 1: Verificación de Existencia y Unicidad (Cédula y Email)
    // =================================================================

    // A. Buscar por Identificación (Cédula/Pasaporte)
    const existentePorId = await this.empleadoRepository.findOne({
      where: { nroIdentificacion: dto.nroIdentificacion, empresaId },
    });

    if (existentePorId && existentePorId.estado === 'Activo') {
      throw new ConflictException(`Ya existe un empleado activo con la identificación ${dto.nroIdentificacion} (${existentePorId.nombre} ${existentePorId.apellido}).`);
    }

    // B. Buscar por Email
    const existentePorEmail = await this.empleadoRepository.findOne({
      where: { emailPersonal: dto.emailPersonal, empresaId },
    });

    if (existentePorEmail && existentePorEmail.estado === 'Activo') {
      throw new ConflictException(`Ya existe un empleado activo con el correo ${dto.emailPersonal}.`);
    }

    // C. Determinar si es Reactivación o Creación
    // Si encontramos un registro inactivo (ya sea por ID o Email), lo reactivamos.
    // Damos prioridad al match por ID.
    const empleadoAReactivar = existentePorId || existentePorEmail;
    let empleadoGuardado: Empleado;

    if (empleadoAReactivar) {
      console.log(`♻️ Reactivando ex-empleado inactivo: ${empleadoAReactivar.nombre} ${empleadoAReactivar.apellido}`);

      // Merge: Actualizamos los datos viejos con los nuevos del DTO
      this.empleadoRepository.merge(empleadoAReactivar, {
        ...dto, // Sobrescribe nombre, telefono, dirección, etc.
        sucursalId: sucursalDestino,
        estado: 'Activo',
        // Aseguramos que la identificación se actualice si el match fue por email
        nroIdentificacion: dto.nroIdentificacion,
        tipoIdentificacion: dto.tipoIdentificacion
      });

      empleadoGuardado = await this.empleadoRepository.save(empleadoAReactivar);

    } else {
      console.log(`✨ Creando nuevo empleado totalmente nuevo...`);

      const nuevoEmpleado = this.empleadoRepository.create({
        ...dto,
        empresaId,
        sucursalId: sucursalDestino,
        estado: 'Activo'
      });

      empleadoGuardado = await this.empleadoRepository.save(nuevoEmpleado);
    }


    // =================================================================
    // PASO 2: Creación del Contrato
    // =================================================================
    if (dto.salario !== undefined) {
      // Opcional: Podrías invalidar contratos anteriores si es reactivación
      if (empleadoAReactivar) {
        await this.contratoRepository.update({ empleado: { id: empleadoGuardado.id }, estado: 'Vigente' }, { estado: 'Inactivo' });
      }

      const nuevoContrato = this.contratoRepository.create({
        empleado: empleadoGuardado, // Relación directa
        tipo: dto.tipoContrato || 'Indefinido',
        salario: dto.salario,
        moneda: 'USD',
        fechaInicio: dto.fechaInicio ? new Date(dto.fechaInicio) : new Date(),
        fechaFin: dto.fechaFin ? new Date(dto.fechaFin) : undefined,
        estado: 'Vigente'
      });

      await this.contratoRepository.save(nuevoContrato);
      console.log(`✅ Contrato generado: $${dto.salario}`);
    }


    // =================================================================
    // PASO 3: Lógica Automática (Auth/Mail)
    // =================================================================
    if (dto.emailPersonal) {
      try {
        const resultadoAuth = await firstValueFrom(
          this.authClient.send(
            { cmd: 'create_user_auto' },
            {
              empleadoId: empleadoGuardado.id,
              email: dto.emailPersonal,
              nombre: dto.nombre,
              empresaId,
            }
          )
        );

        // Enviamos correo dependiendo si es usuario nuevo o existente
        if (resultadoAuth.isNew) {
          await this.mailerService.sendMail({
            to: dto.emailPersonal,
            subject: 'Bienvenido a PuntoPyMES - Tus Credenciales',
            html: `
              <div style="font-family: Arial; color: #333;">
                <h1 style="color: #3f51b5;">¡Bienvenido ${dto.nombre}!</h1>
                <p>Se ha creado tu cuenta profesional en PuntoPyMES.</p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #3f51b5;">
                    <p><b>Usuario:</b> ${resultadoAuth.email}</p>
                    <p><b>Contraseña Temporal:</b> ${resultadoAuth.password}</p>
                </div>
                <p>Por favor ingresa y cambia tu contraseña.</p>
                <br>
                <a href="http://localhost:4200/auth/login" style="background-color: #3f51b5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Ingresar al Sistema</a>
              </div>
            `
          });
        } else {
          // Caso Reactivación: Ya tenía usuario, solo le avisamos
          await this.mailerService.sendMail({
            to: dto.emailPersonal,
            subject: 'PuntoPyMES - Cuenta Reactivada',
            html: `
              <div style="font-family: Arial; color: #333;">
                <h1 style="color: #3f51b5;">¡Hola de nuevo ${dto.nombre}!</h1>
                <p>Tu perfil de empleado ha sido reactivado exitosamente.</p>
                <p>Puedes seguir usando tus credenciales anteriores para acceder.</p>
                <br>
                <a href="http://localhost:4200/auth/login" style="background-color: #3f51b5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Ir al Dashboard</a>
              </div>
            `
          });
        }
      } catch (error) {
        // No bloqueamos la creación del empleado si falla el correo, solo logueamos
        console.error('⚠️ Error al crear usuario Auth o enviar correo:', error.message);
      }
    }

    return empleadoGuardado;
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

  /**
     * Lógica de negocio para "Despedir/Desvincular" un Empleado.
     * Cierra el contrato vigente (si existe) y marca al empleado como Inactivo.
     */
  async deleteEmpleado(
    empresaId: string,
    empleadoId: string,
  ): Promise<{ message: string }> {
    console.log(`Microservicio PERSONAL: Procesando desvinculación del empleado ${empleadoId}`);

    // 1. Buscar al empleado primero (para asegurar que existe y es de la empresa)
    const empleado = await this.empleadoRepository.findOne({
      where: { id: empleadoId, empresaId },
    });

    if (!empleado) {
      throw new NotFoundException('Empleado no encontrado o no pertenece a esta empresa.');
    }

    // 2. Buscar si tiene un contrato VIGENTE (Nota: usamos 'Vigente', no 'Activo')
    const contratoVigente = await this.contratoRepository.findOne({
      where: {
        empleadoId: empleadoId,
        estado: 'Vigente'
      }
    });

    // 3. Si tiene contrato, lo finalizamos
    if (contratoVigente) {
      contratoVigente.estado = 'Finalizado'; // O 'Inactivo' si prefieres
      contratoVigente.fechaFin = new Date(); // Cerramos con fecha de hoy
      await this.contratoRepository.save(contratoVigente);
      console.log(`✅ Contrato finalizado para ${empleado.nombre} ${empleado.apellido}`);
    } else {
      console.log(`⚠️ El empleado ${empleado.nombre} no tenía contrato vigente, solo se desactivará su perfil.`);
    }

    // 4. Cambiar estado del empleado a INACTIVO
    // Esto mantiene el registro pero lo "apaga" en el sistema
    empleado.estado = 'Inactivo';
    await this.empleadoRepository.save(empleado);

    return { message: 'Empleado desvinculado correctamente.' };
  }

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
  /**
     * CREAR ROL (Actualizado con lógica de Default)
     */
  async createRol(empresaId: string, dto: CreateRolDto): Promise<Rol> {
    console.log(`Microservicio PERSONAL: Creando Rol para empresaId: ${empresaId}`);

    // Usamos transacción para asegurar que si algo falla, no se desconfiguren los defaults
    return this.dataSource.transaction(async (manager) => {

      // A. Validación de Duplicados (Tu lógica original)
      const rolExistente = await manager.findOne(Rol, {
        where: { nombre: dto.nombre, empresaId: empresaId },
      });

      if (rolExistente) {
        throw new ConflictException('Ya existe un rol con ese nombre en esta empresa.');
      }

      // B. 👇 LÓGICA NUEVA: El Único Default
      // Si el usuario dijo que este rol es el "Por Defecto"...
      if (dto.esDefecto) {
        // ...buscamos todos los roles de esta empresa y les quitamos el "esDefecto"
        await manager.update(Rol, { empresaId }, { esDefecto: false });
      }

      // C. Creación (Tu lógica original + transacción)
      const nuevoRol = manager.create(Rol, {
        ...dto,
        empresaId: empresaId,
        permisos: dto.permisos || {},
      });

      return manager.save(nuevoRol);
    });
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
     * ACTUALIZAR ROL (Actualizado con lógica de Default)
     */
  async updateRol(empresaId: string, rolId: string, dto: UpdateRolDto): Promise<Rol> {
    console.log(`Microservicio PERSONAL: Actualizando Rol ${rolId}`);

    return this.dataSource.transaction(async (manager) => {
      // 1. Validar existencia
      const rol = await manager.findOne(Rol, {
        where: { id: rolId, empresaId },
      });

      if (!rol) throw new NotFoundException('Rol no encontrado.');

      // 2. Validar duplicados de nombre (Tu lógica original)
      if (dto.nombre && dto.nombre !== rol.nombre) {
        const duplicado = await manager.findOne(Rol, {
          where: { nombre: dto.nombre, empresaId, id: Not(rolId) },
        });
        if (duplicado) throw new ConflictException('Ya existe un rol con ese nombre.');
      }

      // 3. 👇 LÓGICA NUEVA: El Único Default
      // Si estamos actualizando y ahora decimos que ESTE es el defecto...
      if (dto.esDefecto === true) {
        // ...apagamos el defecto a todos los demás primero
        await manager.update(Rol, { empresaId }, { esDefecto: false });
      }

      // 4. Guardar cambios
      const rolActualizado = manager.merge(Rol, rol, dto);
      return manager.save(rolActualizado);
    });
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
  // ==========================================
  //        1. GESTIÓN DE VACANTES
  // ==========================================

  async createVacante(empresaId: string, dto: CreateVacanteDto): Promise<Vacante> {
    // 1. Validar Departamento (Requerido para crear el Cargo)
    if (dto.departamentoId) {
      const dep = await this.deptoRepository.findOneBy({ id: dto.departamentoId, empresaId });
      if (!dep) throw new BadRequestException('Departamento no válido.');

      // --- AUTOMATIZACIÓN: CREAR CARGO SI NO EXISTE ---
      // Verificamos si ya existe un cargo con este nombre en el departamento
      const cargoExistente = await this.cargoRepository.findOne({
        where: {
          nombre: dto.titulo, // Usamos el título de la vacante como nombre del cargo
          departamentoId: dto.departamentoId
        }
      });

      if (!cargoExistente) {
        console.log(`ℹ️ Creando cargo automático: ${dto.titulo}`);

        const nuevoCargo = this.cargoRepository.create({
          nombre: dto.titulo,
          departamentoId: dto.departamentoId,
          // Aprovechamos los rangos salariales de la vacante
          salarioMin: dto.salarioMin || 0,
          salarioMax: dto.salarioMax || 0
        });

        await this.cargoRepository.save(nuevoCargo);
      } else {
        console.log(`ℹ️ El cargo '${dto.titulo}' ya existía. Se usará el existente.`);
      }
      // ------------------------------------------------
    }

    // 2. Crear la Vacante (Lógica estándar)
    const vacante = this.vacanteRepository.create({
      ...dto,
      empresaId,
      estado: dto.estado || EstadoVacante.BORRADOR,
    });

    return this.vacanteRepository.save(vacante);
  }

  async getVacantes(empresaId: string, soloPublicas: boolean = false): Promise<Vacante[]> {
    const where: any = { empresaId };
    if (soloPublicas) {
      where.estado = EstadoVacante.PUBLICA;
    }
    return this.vacanteRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async updateVacante(empresaId: string, vacanteId: string, dto: UpdateVacanteDto): Promise<Vacante> {
    const vacante = await this.vacanteRepository.findOneBy({ id: vacanteId, empresaId });
    if (!vacante) throw new NotFoundException('Vacante no encontrada.');

    this.vacanteRepository.merge(vacante, dto);
    return this.vacanteRepository.save(vacante);
  }

  // ==========================================
  //   2. REGISTRO DE CANDIDATO + ANÁLISIS IA
  // ==========================================

  async registrarCandidato(dto: CreateCandidatoDto): Promise<Candidato> {
    // 1. Buscar la vacante para tener el contexto (título, requisitos)
    const vacante = await this.vacanteRepository.findOneBy({ id: dto.vacanteId });
    if (!vacante) throw new NotFoundException('La vacante no existe.');

    // 2. Verificar si ya aplicó a esta vacante
    const existente = await this.candidatoRepository.findOne({
      where: { email: dto.email, vacanteId: dto.vacanteId }
    });
    if (existente) throw new BadRequestException('Ya has postulado a esta vacante.');

    // 3. Crear el candidato inicialmente (Estado NUEVO)
    const candidato = this.candidatoRepository.create({
      ...dto,
      estado: EstadoCandidato.ANALIZANDO_IA, // Estado temporal mientras piensa la IA
    });
    await this.candidatoRepository.save(candidato);

    // 4. EJECUTAR ANÁLISIS DE IA (Asíncrono)
    // No usamos 'await' aquí para no hacer esperar al usuario.
    // La IA trabaja en segundo plano y actualiza cuando termina.
    this.analizarCVConIA(candidato, vacante).catch(err => {
      console.error(`Error en análisis IA para candidato ${candidato.id}:`, err);
      // Si falla, lo pasamos a NUEVO sin score para no dejarlo trabado
      this.candidatoRepository.update(candidato.id, { estado: EstadoCandidato.NUEVO });
    });

    return candidato;
  }
  // ==========================================
  //        🧠 CEREBRO DE LA IA (GEMINI)
  // ==========================================

  private async analizarCVConIA(candidato: Candidato, vacante: Vacante) {
    try {
      console.log(`🤖 Iniciando análisis IA para: ${candidato.nombre}`);

      let pdfBuffer: Buffer;

      // --- 1. OBTENER EL ARCHIVO (Lógica Híbrida) ---
      if (candidato.cvUrl.includes('localhost')) {
        const urlParts = candidato.cvUrl.split('/uploads/');

        if (!urlParts[1]) {
          throw new Error('Formato de URL local no reconocido');
        }

        const filePath = join(process.cwd(), 'uploads', urlParts[1]);

        console.log(`📂 Leyendo archivo local desde: ${filePath}`);

        if (!fs.existsSync(filePath)) {
          throw new Error(`El archivo no existe en la ruta física: ${filePath}`);
        }

        pdfBuffer = fs.readFileSync(filePath);

      } else {
        console.log(`🌐 Descargando archivo remoto: ${candidato.cvUrl}`);
        const response = await axios.get(candidato.cvUrl, { responseType: 'arraybuffer' });
        pdfBuffer = Buffer.from(response.data);
      }

      // --- 2. ENVIAR PDF DIRECTAMENTE A GEMINI (¡Magia!) ---
      console.log('🧠 Enviando PDF directamente a Gemini...');

      const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });


      // Convertimos el buffer a base64
      const pdfBase64 = pdfBuffer.toString('base64');

      const prompt = `
      Actúa como un Reclutador Técnico Experto.
      Analiza el siguiente Currículum Vitae (PDF adjunto) frente a la Vacante proporcionada.
      
      VACANTE:
      - Título: ${vacante.titulo}
      - Descripción: ${vacante.descripcion}
      - Requisitos: ${vacante.requisitos}

      INSTRUCCIONES:
      1. Lee TODO el contenido del CV (incluso si está en formato imagen).
      2. Evalúa la coincidencia de habilidades técnicas y blandas.
      3. Tu respuesta DEBE ser estrictamente un objeto JSON válido (sin markdown, sin bloques de código).
      4. El contenido del JSON debe estar SIEMPRE EN ESPAÑOL.

      FORMATO JSON ESPERADO:
      {
        "aiScore": (número entero 0-100),
        "aiAnalysis": (resumen de texto justificando el puntaje, máximo 300 caracteres)
      }
    `;

      // Enviamos el PDF junto con el prompt
      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: pdfBase64,
            mimeType: 'application/pdf'
          }
        }
      ]);

      const responseText = result.response.text();

      console.log('✅ Gemini procesó el PDF correctamente');

      // --- 3. LIMPIAR Y PARSEAR ---
      const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const analisis = JSON.parse(jsonString);

      // --- 4. ACTUALIZAR BD ---
      await this.candidatoRepository.update(candidato.id, {
        aiScore: analisis.aiScore,
        aiAnalysis: analisis.aiAnalysis,
        estado: EstadoCandidato.NUEVO,
      });

      console.log(`✅ Análisis IA completado con éxito. Score: ${analisis.aiScore}`);

    } catch (error) {
      console.error('❌ Error procesando IA:', error);
      console.error('📋 Stack trace:', error.stack);

      try {
        await this.candidatoRepository.update(candidato.id, {
          estado: EstadoCandidato.REVISION,
          aiAnalysis: `Error en análisis automático: ${error.message}`
        });
      } catch (updateError) {
        console.error('❌ Error al actualizar estado de candidato:', updateError);
      }
    }
  }
  // ==========================================
  //        3. GESTIÓN DE CANDIDATOS
  // ==========================================

  /**
   * Obtener lista de candidatos para una vacante específica.
   * Ordenados por:
   * 1. Score de IA (Mayor a menor)
   * 2. Fecha de postulación (Más recientes)
   */
  async getCandidatos(empresaId: string, vacanteId: string): Promise<Candidato[]> {
    // 1. Validar que la vacante exista y pertenezca a la empresa (Seguridad Multi-tenant)
    const vacante = await this.vacanteRepository.findOneBy({ id: vacanteId, empresaId });

    if (!vacante) {
      throw new NotFoundException('Vacante no encontrada o no tienes acceso.');
    }

    // 2. Buscar candidatos
    return this.candidatoRepository.find({
      where: { vacanteId },
      // ¡Aquí está el truco! Los ordenamos por el puntaje de la IA
      order: {
        aiScore: 'DESC',        // Los de mejor puntaje primero
        fechaPostulacion: 'DESC' // Desempate por fecha
      },
    });
  }
  // ==========================================
  //        REINTENTAR IA (Manual)
  // ==========================================

  async reanalizarCandidato(candidatoId: string): Promise<Candidato> {
    // 1. Buscar candidato con su vacante
    const candidato = await this.candidatoRepository.findOne({
      where: { id: candidatoId },
      relations: ['vacante'], // ¡Importante! Necesitamos los datos de la vacante para el prompt
    });

    if (!candidato) {
      throw new NotFoundException('Candidato no encontrado.');
    }

    // 2. Resetear estado para feedback visual
    candidato.estado = EstadoCandidato.ANALIZANDO_IA;
    candidato.aiScore = null;
    candidato.aiAnalysis = null;
    await this.candidatoRepository.save(candidato);

    // 3. Lanzar proceso (Sin await para no bloquear)
    this.analizarCVConIA(candidato, candidato.vacante).catch(err => {
      console.error('Error en reanálisis:', err);
      this.candidatoRepository.update(candidato.id, {
        estado: EstadoCandidato.REVISION,
        aiAnalysis: 'Error al reintentar análisis.'
      });
    });

    return candidato;
  }
  async getDocumentosEmpleado(empresaId: string, empleadoId: string) {
    const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
    if (!empleado) throw new NotFoundException('Empleado no encontrado');

    // Array donde acumularemos todos los docs
    const documentos: {
      id?: string;
      name: string;
      type: string;
      origin: string;
      date: Date;
      url: string;
      canDelete: boolean
    }[] = [];

    // 1. BUSCAR EL CV (Si existe desde Reclutamiento)
    const candidato = await this.candidatoRepository.findOneBy({ email: empleado.emailPersonal });
    if (candidato && candidato.cvUrl) {
      documentos.push({
        name: 'Currículum Vitae (CV)',
        type: 'Reclutamiento',
        origin: 'Empleado', // El candidato lo subió
        date: candidato.fechaPostulacion,
        url: candidato.cvUrl,
        canDelete: false // CV original no se borra
      });
    }

    // 2. BUSCAR DOCUMENTOS MANUALES (¡ESTO ES LO QUE FALTABA!)
    // Consultamos la tabla 'documentos_empleados' que acabamos de crear
    const docsSubidos = await this.documentoRepository.find({
      where: { empleadoId },
      order: { fechaSubida: 'DESC' }
    });

    // Los agregamos a la lista unificada
    docsSubidos.forEach(doc => {
      documentos.push({
        id: doc.id, // <--- ¡AQUÍ ESTÁ LA CLAVE!
        name: doc.nombre,
        type: doc.tipo,
        origin: 'Empresa',
        date: doc.fechaSubida,
        url: doc.url,
        canDelete: true
      });
    });

    return documentos;
  }
  // ==========================================
  //        GESTIÓN DOCUMENTAL
  // ==========================================

  /**
   * Guarda la referencia de un documento subido en la BD.
   */
  async uploadDocumentoEmpleado(
    empresaId: string,
    empleadoId: string,
    dto: { nombre: string; tipo: string; url: string },
  ): Promise<DocumentoEmpleado> {
    console.log(`Microservicio PERSONAL: Guardando documento para empleado ${empleadoId}`);

    // 1. Validar que el empleado pertenezca a la empresa (Seguridad)
    const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });

    if (!empleado) {
      throw new NotFoundException('Empleado no encontrado o no pertenece a tu empresa.');
    }

    // 2. Crear el registro del documento
    const nuevoDocumento = this.documentoRepository.create({
      empleadoId,
      nombre: dto.nombre,
      tipo: dto.tipo,
      url: dto.url,
      fechaSubida: new Date(),
    });

    return this.documentoRepository.save(nuevoDocumento);
  }
  async updateFotoPerfil(empresaId: string, empleadoId: string, fileUrl: string) {
    const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
    if (!empleado) throw new NotFoundException('Empleado no encontrado');

    empleado.fotoUrl = fileUrl;
    return this.empleadoRepository.save(empleado);
  }
  async deleteDocumento(empresaId: string, documentoId: string): Promise<{ message: string }> {
    // 1. Buscar el documento y validar que sea de un empleado de la empresa
    const documento = await this.documentoRepository.findOne({
      where: { id: documentoId },
      relations: ['empleado']
    });

    if (!documento || documento.empleado.empresaId !== empresaId) {
      throw new NotFoundException('Documento no encontrado o no tienes permiso.');
    }

    // 2. Borrar de la BD
    await this.documentoRepository.remove(documento);

    // (Opcional: Aquí podrías devolver la URL para que el Gateway borre el archivo físico)

    return { message: 'Documento eliminado correctamente.' };
  }
  async fixEmployeePermissions(empresaId: string) {
    // 1. Buscar el rol de "Empleado" o "Rol de Prueba"
    // (Ajusta el nombre si tu rol se llama diferente, ej: 'Standard', 'User')
    const roles = await this.rolRepository.find({ where: { empresaId } });

    // Buscamos cualquier rol que NO sea Administrador para darle permisos básicos
    const rolesEmpleado = roles.filter(r => r.nombre !== 'Administrador');

    for (const rol of rolesEmpleado) {
      // 2. Agregar permisos de Desempeño
      const permisosActuales = rol.permisos || {};

      const nuevosPermisos = {
        ...permisosActuales,
        // Permisos para ver y gestionar sus propias metas
        'desempeno.objetivos.read': true,
        'desempeno.objetivos.create': true,
        'desempeno.objetivos.update': true,
        // Permisos para ver ciclos
        'desempeno.ciclos.read': true,
        // Permisos para marcar asistencia
        'asistencia.registro': true,
        'asistencia.reportes': true // Ver su propio historial
      };

      rol.permisos = nuevosPermisos;
      await this.rolRepository.save(rol);
      console.log(`✅ Permisos actualizados para el rol: ${rol.nombre}`);
    }

    return { message: 'Permisos de empleados corregidos.' };
  }
  async createSucursal(empresaId: string, dto: CreateSucursalDto): Promise<Sucursal> {
    const sucursal = this.sucursalRepository.create({
      ...dto,
      empresaId,
      activa: true
    });
    return this.sucursalRepository.save(sucursal);
  }

  async getSucursales(empresaId: string): Promise<Sucursal[]> {
    return this.sucursalRepository.find({
      where: { empresaId },
      order: { nombre: 'ASC' }
    });
  }

  async updateSucursal(empresaId: string, sucursalId: string, dto: UpdateSucursalDto): Promise<Sucursal> {
    const sucursal = await this.sucursalRepository.findOneBy({ id: sucursalId, empresaId });
    if (!sucursal) throw new NotFoundException('Sucursal no encontrada.');

    this.sucursalRepository.merge(sucursal, dto);
    return this.sucursalRepository.save(sucursal);
  }

  async deleteSucursal(empresaId: string, sucursalId: string): Promise<{ message: string }> {
    const sucursal = await this.sucursalRepository.findOneBy({ id: sucursalId, empresaId });
    if (!sucursal) throw new NotFoundException('Sucursal no encontrada.');

    const empleados = await this.empleadoRepository.count({ where: { sucursalId } });
    if (empleados > 0) throw new ConflictException('No se puede borrar, tiene empleados asignados.');

    await this.sucursalRepository.remove(sucursal);
    return { message: 'Sucursal eliminada correctamente.' };
  }

  async getPublicVacancy(vacanteId: string): Promise<Vacante> {
    const vacante = await this.vacanteRepository.findOne({
      where: {
        id: vacanteId,
        estado: EstadoVacante.PUBLICA // <--- REGLA DE ORO: Solo si es pública
      },
      relations: ['departamento'] // Cargar depto si quieres mostrarlo
    });

    if (!vacante) {
      throw new NotFoundException('Esta vacante no está disponible o no existe.');
    }

    return vacante;
  }
}