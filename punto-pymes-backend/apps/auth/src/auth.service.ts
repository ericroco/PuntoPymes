// apps/auth/src/auth.service.ts
import { ConflictException, Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  Usuario,
  Empresa,
  Rol,
  Empleado,
  Departamento,
  Cargo, Contrato,
  Sucursal,
} from 'default/database';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PERMISSIONS } from '../../../libs/common/src/constants/permissions';


@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    // 1. Inyectamos los 6 Repositorios que necesitamos
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Departamento) // <-- AÑADIDO
    private readonly deptoRepository: Repository<Departamento>,
    @InjectRepository(Cargo) // <-- AÑADIDO
    private readonly cargoRepository: Repository<Cargo>,
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,

    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Lógica de Registro de un nuevo Tenant (SaaS)
   * @param registerDto Los datos del formulario de registro
   */
  /**
     * REGISTRO MAESTRO: Crea Usuario + Empresa + Roles + Empleado + Contrato
     */
  async register(registerDto: RegisterDto) {
    const { email, password, nombreEmpresa, nombreAdmin, apellidoAdmin, logoUrl, colorCorporativo, planSuscripcion } = registerDto;

    // 1. Validaciones
    const usuarioExistente = await this.entityManager.findOneBy(Usuario, { email });
    if (usuarioExistente) throw new ConflictException('El correo electrónico ya está registrado.');

    const empresaExistente = await this.entityManager.findOneBy(Empresa, { nombre: nombreEmpresa });
    if (empresaExistente) throw new ConflictException('El nombre de la empresa ya está en uso.');

    // 2. Hash Password
    const passwordHash = await this.hashPassword(password);

    // 3. Transacción "Todo o Nada"
    return this.entityManager.transaction(async (manager) => {

      // a. Crear Empresa
      const nuevaEmpresa = manager.create(Empresa, {
        nombre: nombreEmpresa,
        planSuscripcion: planSuscripcion || 'basic',
        branding: { logoUrl: logoUrl || null, primaryColor: colorCorporativo || '#3f51b5' }
      });
      await manager.save(nuevaEmpresa);

      // b. Crear Usuario (Login)
      const nuevoUsuario = manager.create(Usuario, {
        email,
        passwordHash,
        emailVerificado: true,
      });
      await manager.save(nuevoUsuario);

      // ============================================================
      // c. CREACIÓN DE LOS 5 ROLES MAESTROS (FULL PERMISOS) 👑
      // ============================================================

      const rolesDefinidos = [
        // ------------------------------------------------------------
        // 1. SUPER ADMIN (Dueño del negocio)
        // ------------------------------------------------------------
        {
          nombre: 'Super Admin',
          descripcion: 'Acceso total y control de configuración de la empresa.',
          esNativo: true, esDefecto: false,
          permisos: ['*'] // ⚡ WILDCARD: Acceso Absoluto
        },

        // ------------------------------------------------------------
        // 2. GERENTE DE RRHH (Gestión total de personas y dinero)
        // ------------------------------------------------------------
        {
          nombre: 'Gerente de RRHH',
          descripcion: 'Gestión integral de personal, nómina, contratos y reclutamiento.',
          esNativo: false, esDefecto: false,
          permisos: [
            // Gestión de Empleados
            PERMISSIONS.EMPLOYEES_READ_SENSITIVE,
            PERMISSIONS.EMPLOYEES_MANAGE,
            PERMISSIONS.EMPLOYEES_EDIT,    // (Compatibilidad)
            PERMISSIONS.EMPLOYEES_DELETE,
            PERMISSIONS.EMPLOYEES_EXPORT,
            PERMISSIONS.SALARIES_READ,

            // Nómina y Finanzas
            PERMISSIONS.PAYROLL_READ_ALL,
            PERMISSIONS.PAYROLL_READ,      // (Compatibilidad)
            PERMISSIONS.PAYROLL_PROCESS,
            PERMISSIONS.PAYROLL_CONFIG,
            PERMISSIONS.PAYROLL_EXPORT,
            PERMISSIONS.LOANS_APPROVE,
            PERMISSIONS.BENEFITS_MANAGE,

            // Estructura
            PERMISSIONS.BRANCHES_MANAGE,
            PERMISSIONS.DEPARTMENTS_MANAGE,
            PERMISSIONS.POSITIONS_MANAGE,

            // Ciclo de Vida
            PERMISSIONS.ONBOARDING_MANAGE,
            PERMISSIONS.RECRUITMENT_MANAGE,
            PERMISSIONS.PERFORMANCE_MANAGE,
            PERMISSIONS.DOCUMENTS_MANAGE,
            PERMISSIONS.TRAINING_MANAGE,
            PERMISSIONS.REPORTS_VIEW
          ]
        },

        // ------------------------------------------------------------
        // 3. GERENTE DE SUCURSAL (Operativo y Asistencia)
        // ------------------------------------------------------------
        {
          nombre: 'Gerente de Sucursal',
          descripcion: 'Supervisión operativa de ubicación física. Control de asistencia.',
          esNativo: false, esDefecto: false,
          permisos: [
            // Empleados (Vista limitada)
            PERMISSIONS.EMPLOYEES_READ_BASIC,

            // Asistencia y Tiempo
            PERMISSIONS.ATTENDANCE_READ_ALL,
            PERMISSIONS.ATTENDANCE_MODIFY,
            PERMISSIONS.ATTENDANCE_APPROVE,
            PERMISSIONS.SHIFTS_MANAGE,
            PERMISSIONS.VACATIONS_APPROVE,

            // Onboarding (Ver progreso)
            PERMISSIONS.ONBOARDING_VIEW_PROGRESS,

            // Recursos
            PERMISSIONS.ASSETS_MANAGE,
            PERMISSIONS.REPORTS_VIEW
          ]
        },

        // ------------------------------------------------------------
        // 4. LÍDER DE PROYECTO (Agile y Tareas)
        // ------------------------------------------------------------
        {
          nombre: 'Líder de Proyecto',
          descripcion: 'Gestión de productividad, sprints y asignación de tareas.',
          esNativo: false, esDefecto: false,
          permisos: [
            // Proyectos
            PERMISSIONS.PROJECTS_MANAGE,
            PERMISSIONS.PROJECTS_READ,
            PERMISSIONS.TASKS_MANAGE,

            // Equipo
            PERMISSIONS.EMPLOYEES_READ_BASIC,
            PERMISSIONS.REPORTS_VIEW
          ]
        },

        // ------------------------------------------------------------
        // 5. COLABORADOR (El rol por defecto para nuevos)
        // ------------------------------------------------------------
        {
          nombre: 'Colaborador',
          descripcion: 'Rol estándar. Acceso a portal personal y ejecución de tareas.',
          esNativo: true, esDefecto: true, // 👈 Se asignará a futuros empleados
          permisos: [
            // Autoservicio
            PERMISSIONS.PERFIL_ME,
            PERMISSIONS.PAYROLL_MY_READ,
            PERMISSIONS.ATTENDANCE_MY_READ,
            PERMISSIONS.VACATIONS_REQUEST,
            PERMISSIONS.LOANS_REQUEST,
            PERMISSIONS.ONBOARDING_MY_PROGRESS,

            // Trabajo
            PERMISSIONS.PROJECTS_READ,
            PERMISSIONS.TASKS_MY_READ,
            PERMISSIONS.TASKS_EXECUTE
          ]
        }
      ];

      let rolSuperAdminId: string | null = null;

      // --- BUCLE DE CREACIÓN DE ROLES ---
      for (const r of rolesDefinidos) {
        const nuevoRol = manager.create(Rol, {
          empresaId: nuevaEmpresa.id,
          nombre: r.nombre,
          descripcion: r.descripcion,
          esNativo: r.esNativo,
          esDefecto: r.esDefecto,
          permisos: r.permisos as any // Casting a JSONB
        });

        const rolGuardado = await manager.save(nuevoRol);

        if (r.nombre === 'Super Admin') {
          rolSuperAdminId = rolGuardado.id;
        }
      }

      // ============================================================
      // FIN DE CREACIÓN DE ROLES
      // ============================================================

      // d. Crear Depto General
      const deptoGeneral = manager.create(Departamento, {
        empresaId: nuevaEmpresa.id,
        nombre: 'General',
      });
      await manager.save(deptoGeneral);

      // e. Crear Cargo Gerente
      const cargoAdmin = manager.create(Cargo, {
        departamentoId: deptoGeneral.id,
        nombre: 'Gerente General',
      });
      await manager.save(cargoAdmin);

      // Validación crítica
      if (!rolSuperAdminId) {
        throw new InternalServerErrorException('Error crítico: No se generó el rol de Super Admin.');
      }

      // f. Crear Empleado (Tu Perfil)
      const nuevoEmpleado = manager.create(Empleado, {
        empresaId: nuevaEmpresa.id,
        usuarioId: nuevoUsuario.id,
        rolId: rolSuperAdminId, // ✅ Te asignamos el rol con permiso '*'
        cargoId: cargoAdmin.id,
        nombre: nombreAdmin,
        apellido: apellidoAdmin,
        estado: 'Activo',
      });
      await manager.save(nuevoEmpleado);

      // g. Crear Contrato
      const nuevoContrato = manager.create(Contrato, {
        empleadoId: nuevoEmpleado.id,
        tipo: 'Indefinido',
        salario: 0,
        moneda: 'USD',
        fechaInicio: new Date(),
        estado: 'Vigente',
      });
      await manager.save(nuevoContrato);

      // 4. Retorno Limpio
      const { passwordHash: _, ...usuarioResponse } = nuevoUsuario;

      return {
        status: 'success',
        message: 'Empresa registrada y roles configurados exitosamente.',
        data: {
          empresa: nuevaEmpresa,
          usuario: usuarioResponse,
          empleado: nuevoEmpleado
        }
      };
    });
  }

  async createCompanyForExistingUser(usuarioId: string, data: any) {
    const { nombreEmpresa, logoUrl, colorCorporativo, planSuscripcion, nombreAdmin, apellidoAdmin } = data;

    // 🔥 LOG INICIAL
    console.log('═══════════════════════════════════════');
    console.log('🏢 AUTH SERVICE - createCompanyForExistingUser');
    console.log('👤 UsuarioId a buscar:', usuarioId);
    console.log('📦 Datos de empresa:', { nombreEmpresa, nombreAdmin, apellidoAdmin });
    console.log('═══════════════════════════════════════');

    // 1. Validaciones previas
    const empresaExistente = await this.entityManager.findOneBy(Empresa, { nombre: nombreEmpresa });
    if (empresaExistente) {
      throw new ConflictException('El nombre de la empresa ya está en uso.');
    }

    // 👇 BUSCAR USUARIO CON LOG
    const usuario = await this.entityManager.findOne(Usuario, {
      where: { id: usuarioId },
      select: ['id', 'email', 'emailVerificado']
    });

    if (!usuario) {
      console.error('❌ Usuario NO encontrado con ID:', usuarioId);
      throw new NotFoundException('Usuario no encontrado.');
    }

    // 🔥 LOG CRÍTICO: Confirmar qué usuario se encontró
    console.log('✅ Usuario ENCONTRADO:', {
      id: usuario.id,
      email: usuario.email
    });

    // 2. Transacción Atómica (Todo o Nada)
    return this.entityManager.transaction(async (manager) => {

      // 👇 IMPORTANTE: Volver a buscar el usuario DENTRO de la transacción
      const usuarioEnTransaccion = await manager.findOne(Usuario, {
        where: { id: usuarioId },
        select: ['id', 'email', 'emailVerificado']
      });

      if (!usuarioEnTransaccion) {
        throw new NotFoundException('Usuario no encontrado en transacción.');
      }

      console.log('✅ Usuario confirmado en transacción:', usuarioEnTransaccion.email);

      // A. CREAR EMPRESA
      const nuevaEmpresa = manager.create(Empresa, {
        nombre: nombreEmpresa,
        planSuscripcion: planSuscripcion || 'basic',
        branding: {
          logoUrl: logoUrl || null,
          primaryColor: colorCorporativo || '#3f51b5'
        }
      });
      await manager.save(nuevaEmpresa);

      console.log('🏢 Empresa creada:', {
        id: nuevaEmpresa.id,
        nombre: nuevaEmpresa.nombre
      });

      // B. CREACIÓN DE ROLES MAESTROS
      const rolesDefinidos = [
        {
          nombre: 'Super Admin',
          descripcion: 'Control total del sistema y configuración.',
          esNativo: true, esDefecto: false,
          permisos: ['*']
        },
        {
          nombre: 'Gerente de RRHH',
          descripcion: 'Gestión integral de talento, nómina y reclutamiento.',
          esNativo: false, esDefecto: false,
          permisos: [
            PERMISSIONS.EMPLOYEES_READ_BASIC,
            PERMISSIONS.EMPLOYEES_READ_SENSITIVE,
            PERMISSIONS.EMPLOYEES_MANAGE,
            PERMISSIONS.EMPLOYEES_EDIT,
            PERMISSIONS.EMPLOYEES_DELETE,
            PERMISSIONS.EMPLOYEES_EXPORT,
            PERMISSIONS.SALARIES_READ,
            PERMISSIONS.PAYROLL_READ_ALL,
            PERMISSIONS.PAYROLL_READ,
            PERMISSIONS.PAYROLL_PROCESS,
            PERMISSIONS.PAYROLL_CONFIG,
            PERMISSIONS.PAYROLL_EXPORT,
            PERMISSIONS.LOANS_APPROVE,
            PERMISSIONS.BENEFITS_MANAGE,
            PERMISSIONS.BRANCHES_MANAGE,
            PERMISSIONS.DEPARTMENTS_MANAGE,
            PERMISSIONS.POSITIONS_MANAGE,
            PERMISSIONS.ONBOARDING_MANAGE,
            PERMISSIONS.RECRUITMENT_MANAGE,
            PERMISSIONS.PERFORMANCE_MANAGE,
            PERMISSIONS.DOCUMENTS_MANAGE,
            PERMISSIONS.TRAINING_MANAGE,
            PERMISSIONS.REPORTS_VIEW
          ]
        },
        {
          nombre: 'Gerente de Sucursal',
          descripcion: 'Supervisión operativa, turnos y asistencia.',
          esNativo: false, esDefecto: false,
          permisos: [
            PERMISSIONS.EMPLOYEES_READ_BASIC,
            PERMISSIONS.ATTENDANCE_READ_ALL,
            PERMISSIONS.ATTENDANCE_MODIFY,
            PERMISSIONS.ATTENDANCE_APPROVE,
            PERMISSIONS.SHIFTS_MANAGE,
            PERMISSIONS.VACATIONS_APPROVE,
            PERMISSIONS.ONBOARDING_VIEW_PROGRESS,
            PERMISSIONS.ASSETS_MANAGE,
            PERMISSIONS.REPORTS_VIEW
          ]
        },
        {
          nombre: 'Líder de Proyecto',
          descripcion: 'Gestión de sprints, tareas y productividad.',
          esNativo: false, esDefecto: false,
          permisos: [
            PERMISSIONS.PROJECTS_MANAGE,
            PERMISSIONS.PROJECTS_READ,
            PERMISSIONS.TASKS_MANAGE,
            PERMISSIONS.EMPLOYEES_READ_BASIC,
            PERMISSIONS.REPORTS_VIEW
          ]
        },
        {
          nombre: 'Colaborador',
          descripcion: 'Rol estándar para empleados. Autoservicio.',
          esNativo: true, esDefecto: true,
          permisos: [
            PERMISSIONS.PERFIL_ME,
            PERMISSIONS.PAYROLL_MY_READ,
            PERMISSIONS.ATTENDANCE_MY_READ,
            PERMISSIONS.VACATIONS_REQUEST,
            PERMISSIONS.LOANS_REQUEST,
            PERMISSIONS.ONBOARDING_MY_PROGRESS,
            PERMISSIONS.TASKS_MY_READ,
            PERMISSIONS.TASKS_EXECUTE,
            PERMISSIONS.PROJECTS_READ
          ]
        }
      ];

      let rolSuperAdminId: string | null = null;

      for (const r of rolesDefinidos) {
        const nuevoRol = manager.create(Rol, {
          empresaId: nuevaEmpresa.id,
          nombre: r.nombre,
          descripcion: r.descripcion,
          esNativo: r.esNativo,
          esDefecto: r.esDefecto,
          permisos: r.permisos as any
        });

        const rolGuardado = await manager.save(nuevoRol);

        if (r.nombre === 'Super Admin') {
          rolSuperAdminId = rolGuardado.id;
        }
      }

      if (!rolSuperAdminId) {
        throw new InternalServerErrorException('Error crítico: No se generó el rol de Super Admin.');
      }

      console.log('👑 Roles creados. Super Admin ID:', rolSuperAdminId);

      // C. ESTRUCTURA BASE (Depto y Cargo)
      const deptoGeneral = manager.create(Departamento, {
        empresaId: nuevaEmpresa.id,
        nombre: 'General',
      });
      await manager.save(deptoGeneral);

      const cargoGerente = manager.create(Cargo, {
        departamentoId: deptoGeneral.id,
        nombre: 'Gerente General',
      });
      await manager.save(cargoGerente);

      console.log('🏗️ Estructura base creada');

      // D. CREAR EMPLEADO ✅
      const nuevoEmpleado = manager.create(Empleado, {
        empresaId: nuevaEmpresa.id,
        usuario: usuarioEnTransaccion,  // 👈 Usar el usuario de la transacción
        rolId: rolSuperAdminId,
        cargoId: cargoGerente.id,
        nombre: nombreAdmin || 'Admin',
        apellido: apellidoAdmin || 'Principal',
        estado: 'Activo',
      });

      // 🔥 LOG ANTES DE GUARDAR
      console.log('💼 Empleado a crear:', {
        empresaId: nuevoEmpleado.empresaId,
        usuarioEmail: usuarioEnTransaccion.email,
        nombre: nuevoEmpleado.nombre,
        apellido: nuevoEmpleado.apellido
      });

      const empleadoGuardado = await manager.save(nuevoEmpleado);

      // 🔥 LOG DESPUÉS DE GUARDAR
      console.log('✅ Empleado GUARDADO:', {
        id: empleadoGuardado.id,
        nombre: empleadoGuardado.nombre,
        apellido: empleadoGuardado.apellido
      });

      // E. CREAR CONTRATO INICIAL
      const nuevoContrato = manager.create(Contrato, {
        empleadoId: empleadoGuardado.id,
        tipo: 'Indefinido',
        salario: 0,
        moneda: 'USD',
        fechaInicio: new Date(),
        estado: 'Vigente',
      });
      await manager.save(nuevoContrato);

      console.log('📄 Contrato creado');
      console.log('═══════════════════════════════════════');
      console.log('✅ TRANSACCIÓN COMPLETADA CON ÉXITO');
      console.log('═══════════════════════════════════════');

      // 3. RETORNO DE ÉXITO
      return {
        status: 'success',
        message: 'Organización creada y configurada correctamente.',
        data: {
          id: nuevaEmpresa.id,
          nombre: nuevaEmpresa.nombre,
          branding: nuevaEmpresa.branding,
          empleadoCreado: {
            id: empleadoGuardado.id,
            nombre: empleadoGuardado.nombre,
            usuarioEmail: usuarioEnTransaccion.email
          }
        }
      };
    });
  }
  /**
   * Lógica de Login de Usuario
   * @param loginDto Los datos del formulario de login
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // --- a. Encontrar al usuario ---
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.passwordHash')
      .where('usuario.email = :email', { email })
      .getOne();

    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');

    // --- b. Comparar contraseñas ---
    const passwordValida = await this.comparePassword(password, usuario.passwordHash);
    if (!passwordValida) throw new UnauthorizedException('Credenciales inválidas');

    // ==========================================================
    // --- c. (CORREGIDO) Buscar las membresías COMPLETAS ---
    // ==========================================================

    console.log(`🔍 Buscando membresías para Usuario ID: ${usuario.id}`);

    const membresias = await this.empleadoRepository.find({
      where: {
        usuario: { id: usuario.id }
      },
      relations: [
        'empresa',
        'rol'
      ],
      order: {
        createdAt: 'DESC' // Para que la empresa más nueva salga primero
      }
    });

    console.log(`✅ Membresías encontradas: ${membresias.length}`);

    // Debug: Si sale 1 y esperas 2, imprime los IDs para ver qué está pasando
    if (membresias.length < 2 && process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Alerta: Se esperaba más de 1 empresa. Verifica la tabla "empleados".');
    }

    // --- d. Validaciones y Payload ---
    if (membresias.length === 0) {
      throw new UnauthorizedException('Este usuario no tiene membresías activas.');
    }

    const membresiaActiva = membresias[0];

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      empresaId: membresiaActiva.empresaId,
      empleadoId: membresiaActiva.id,
      rolId: membresiaActiva.rolId,
      rol: membresiaActiva.rol?.nombre || 'Sin Rol',
      permisos: membresiaActiva.rol?.permisos || [],
      sucursalId: membresiaActiva.sucursalId,
      fotoUrl: membresiaActiva.empresa?.branding?.logoUrl
    };

    // --- e. Firmar y devolver ---
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login exitoso',
      accessToken: accessToken,
      membresias: membresias, // Ahora sí incluye branding y cargo
    };
  }
  async createUserForEmployee(data: {
    empleadoId: string;
    email: string;
    nombre: string;
    empresaId: string
  }) {
    console.log(`AUTH: Procesando acceso para ${data.email}`);

    // 1. BUSCAR SI YA EXISTE UN USUARIO CON ESTE EMAIL
    let usuario = await this.usuarioRepository.findOneBy({ email: data.email });
    let esNuevo = false;
    let randomPassword = '';

    if (!usuario) {
      // --- CASO A: NO EXISTE -> LO CREAMOS ---
      esNuevo = true;
      // Generar contraseña aleatoria segura
      randomPassword = Math.random().toString(36).slice(-8) + 'Aa1!';

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(randomPassword, salt);

      usuario = this.usuarioRepository.create({
        email: data.email,
        passwordHash: hashedPassword,
        emailVerificado: true,
        // isActive: true // Descomenta si tu entidad tiene este campo
      });

      await this.usuarioRepository.save(usuario);
      console.log('AUTH: Usuario nuevo creado exitosamente.');
    } else {
      // --- CASO B: YA EXISTE -> SOLO VINCULAMOS ---
      console.log('AUTH: Usuario existente detectado. Vinculando cuenta...');
    }

    // 2. VINCULAR EL EMPLEADO AL USUARIO (Sea nuevo o viejo)
    // Esto es lo vital: Actualizamos la tabla 'empleados' con el ID del usuario
    await this.empleadoRepository.update(data.empleadoId, {
      usuarioId: usuario.id
    });

    // 3. RETORNAR RESULTADO
    // El microservicio de Personal usará 'isNew' para saber qué correo enviar
    return {
      isNew: esNuevo,
      email: data.email,
      password: randomPassword // Solo tendrá valor si es nuevo, si no, va vacío
    };
  }
  async switchCompany(dto: { usuarioId: string; empresaId: string }) {
    console.log('🔍 DTO recibido:', dto);

    // 1. Buscar la membresía del usuario en esa empresa
    const membresia = await this.empleadoRepository.findOne({
      where: {
        usuarioId: dto.usuarioId,
        empresaId: dto.empresaId
      },
      relations: ['empresa', 'rol', 'usuario'],
    });

    console.log('👤 Membresía encontrada:', membresia ? {
      id: membresia.id,
      usuarioId: membresia.usuarioId,
      empresaId: membresia.empresaId
    } : 'NO ENCONTRADA');

    if (!membresia) {
      throw new UnauthorizedException('No tienes acceso a esta empresa');
    }

    if (!membresia.rol) {
      throw new UnauthorizedException('El empleado no tiene un rol asignado');
    }

    // 2. Crear payload con TODOS los campos necesarios (incluyendo sub)
    const payload = {
      sub: dto.usuarioId,  // ✅ ID del usuario (CRÍTICO)
      email: membresia.usuario?.email || membresia.emailPersonal,
      empresaId: membresia.empresaId,
      empleadoId: membresia.id,
      rolId: membresia.rolId,
      rol: membresia.rol.nombre,
      permisos: membresia.rol.permisos,
      fotoUrl: membresia.fotoUrl,
      sucursalId: membresia.sucursalId
    };

    console.log('📝 Payload a firmar:', payload);

    // 3. Generar el token
    const accessToken = await this.jwtService.signAsync(payload);

    console.log('✅ Token generado correctamente');

    return {
      accessToken,
      usuario: {
        ...payload,
        nombreEmpresa: membresia.empresa.nombre
      }
    };
  }
  async createCompanyForUser(usuarioId: string, data: { nombre: string; plan: string; branding: any }) {
    // 1. Buscar usuario
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');

    return this.entityManager.transaction(async (manager) => {
      // a. Crear Empresa
      const nuevaEmpresa = manager.create(Empresa, {
        nombre: data.nombre,
        planSuscripcion: data.plan,
        branding: data.branding
      });
      await manager.save(nuevaEmpresa);

      // b. Crear Rol Admin
      const rolAdmin = manager.create(Rol, {
        empresaId: nuevaEmpresa.id,
        nombre: 'Administrador',
        descripcion: 'Rol administrador',
        permisos: ['*'],
      });
      await manager.save(rolAdmin);

      // c. Depto/Cargo Default
      const depto = manager.create(Departamento, { empresaId: nuevaEmpresa.id, nombre: 'Gerencia' });
      await manager.save(depto);
      const cargo = manager.create(Cargo, { departamentoId: depto.id, nombre: 'CEO' });
      await manager.save(cargo);

      // d. Crear Empleado (Vinculado al usuario existente)
      const nuevoEmpleado = manager.create(Empleado, {
        empresaId: nuevaEmpresa.id,
        usuarioId: usuario.id, // <--- VINCULACIÓN CLAVE
        rolId: rolAdmin.id,
        cargoId: cargo.id,
        nombre: 'Admin', // Puedes pedir estos datos o tomarlos del usuario si los tuviera
        apellido: 'Principal',
        estado: 'Activo'
      });
      await manager.save(nuevoEmpleado);

      // e. Contrato
      const contrato = manager.create(Contrato, {
        empleadoId: nuevoEmpleado.id,
        tipo: 'Fundador',
        salario: 0,
        moneda: 'USD',
        fechaInicio: new Date(),
        estado: 'Vigente'
      });
      await manager.save(contrato);

      return nuevaEmpresa;
    });
  }
}