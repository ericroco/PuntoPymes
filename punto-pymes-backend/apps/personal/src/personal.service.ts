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
import { Repository, Not } from 'typeorm';
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
import { GoogleGenerativeAI } from '@google/generative-ai';
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
  ) {
    // 3. Usar getOrThrow (Lanza error si no existe, y TypeScript sabe que es string)
    const apiKey = this.configService.getOrThrow<string>('GEMINI_API_KEY');

    this.genAI = new GoogleGenerativeAI(apiKey);
  }

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
  ): Promise<Empleado> {
    console.log(
      `Microservicio PERSONAL: Creando empleado para empresaId: ${empresaId}`,
    );

    // --- 1. Validación de Seguridad Multi-Tenant ---
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

    // --- 2. Creación y Guardado del Empleado ---
    const nuevoEmpleado = this.empleadoRepository.create({
      ...dto,
      empresaId: empresaId,
    });

    const empleadoGuardado = await this.empleadoRepository.save(nuevoEmpleado);

    // --- 3. Lógica Automática: Crear Usuario y Enviar Correo ---
    // Usamos un try-catch para que, si falla el correo, no falle la creación del empleado.
    if (dto.emailPersonal) {
      try {
        console.log('🔄 Solicitando creación de usuario automático...');

        // A. Pedir al servicio de AUTH que genere credenciales
        const credenciales = await firstValueFrom(
          this.authClient.send(
            { cmd: 'create_user_auto' },
            {
              empleadoId: empleadoGuardado.id,
              email: dto.emailPersonal,
              nombre: dto.nombre,
              empresaId: empresaId,
            }
          )
        );

        // B. Enviar las credenciales por correo
        await this.mailerService.sendMail({
          to: dto.emailPersonal,
          subject: 'Bienvenido a PuntoPyMES - Tus Credenciales de Acceso',
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h1 style="color: #3f51b5;">¡Bienvenido/a ${dto.nombre}!</h1>
              <p>Has sido registrado exitosamente en la plataforma de Recursos Humanos de tu empresa.</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><b>Usuario:</b> ${credenciales.email}</p>
                <p style="margin: 5px 0;"><b>Contraseña Temporal:</b> ${credenciales.password}</p>
              </div>
              <p>Por favor, ingresa al sistema y cambia tu contraseña lo antes posible.</p>
              <p>
                <a href="http://localhost:4200/auth/login" style="background-color: #3f51b5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ir al Sistema</a>
              </p>
            </div>
          `,
        });

        console.log(`📧 Credenciales enviadas a ${dto.emailPersonal}`);

      } catch (error) {
        console.error('❌ Error en flujo automático (Usuario/Correo):', error);
        // No lanzamos error para no hacer rollback del empleado, 
        // pero el admin deberá crear el usuario manualmente si esto falla.
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
  // ==========================================
  //        1. GESTIÓN DE VACANTES
  // ==========================================

  async createVacante(empresaId: string, dto: CreateVacanteDto): Promise<Vacante> {
    // Validar departamento si se envía
    if (dto.departamentoId) {
      const dep = await this.deptoRepository.findOneBy({ id: dto.departamentoId, empresaId });
      if (!dep) throw new BadRequestException('Departamento no válido.');
    }

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
}