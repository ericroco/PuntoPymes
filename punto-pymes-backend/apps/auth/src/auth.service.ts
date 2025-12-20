// apps/auth/src/auth.service.ts
import { ConflictException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import {
  Usuario,
  Empresa,
  Rol,
  Empleado,
  Departamento,
  Cargo, Contrato,
} from 'default/database';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


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
  async register(registerDto: RegisterDto) {
    const { email, password, nombreEmpresa, nombreAdmin, apellidoAdmin, logoUrl, colorCorporativo, planSuscripcion } = registerDto;

    // --- 1. Validaciones de negocio ---
    const usuarioExistente = await this.usuarioRepository.findOneBy({ email });
    if (usuarioExistente) {
      throw new ConflictException('El correo electrónico ya está registrado.');
    }

    const empresaExistente = await this.empresaRepository.findOneBy({ nombre: nombreEmpresa });
    if (empresaExistente) {
      throw new ConflictException('El nombre de la empresa ya está en uso.');
    }

    // --- 2. Hashing de Contraseña (RNF7) ---
    const passwordHash = await this.hashPassword(password);

    // --- 3. Transacción "Ultra-Completa" (Todo o Nada) ---
    return this.entityManager.transaction(async (manager) => {
      // a. Crear la nueva Empresa (Tenant)
      const nuevaEmpresa = manager.create(Empresa, {
        nombre: nombreEmpresa,
        planSuscripcion: planSuscripcion || 'basic',
        branding: {
          logoUrl: logoUrl || null,
          primaryColor: colorCorporativo || '#3f51b5',
        } // Plan por defecto
      });
      await manager.save(nuevaEmpresa);

      // b. Crear el nuevo Usuario (Login)
      const nuevoUsuario = manager.create(Usuario, {
        email: email,
        passwordHash: passwordHash,
        emailVerificado: true,
      });
      await manager.save(nuevoUsuario);

      // c. Crear el Rol "Admin" para esta nueva empresa
      const rolAdmin = manager.create(Rol, {
        empresaId: nuevaEmpresa.id,
        nombre: 'Administrador',
        permisos: { esAdmin: true, puedeVerTodo: true },
      });
      await manager.save(rolAdmin);

      // d. (NUEVO) Crear el Departamento "General" por defecto
      const deptoGeneral = manager.create(Departamento, {
        empresaId: nuevaEmpresa.id,
        nombre: 'General',
      });
      await manager.save(deptoGeneral);

      // e. (NUEVO) Crear el Cargo "Administrador" por defecto
      const cargoAdmin = manager.create(Cargo, {
        departamentoId: deptoGeneral.id,
        nombre: 'Administrador',
      });
      await manager.save(cargoAdmin);

      // f. (MODIFICADO) Crear el perfil de Empleado (La Persona)
      const nuevoEmpleado = manager.create(Empleado, {
        empresaId: nuevaEmpresa.id,
        usuarioId: nuevoUsuario.id,
        rolId: rolAdmin.id,
        cargoId: cargoAdmin.id,
        nombre: nombreAdmin,
        apellido: apellidoAdmin,
        estado: 'Activo',
      });
      await manager.save(nuevoEmpleado);

      // g. (NUEVO) Crear el primer Contrato para este empleado
      const nuevoContrato = manager.create(Contrato, {
        empleadoId: nuevoEmpleado.id,
        tipo: 'Indefinido', // Asumimos un tipo por defecto
        salario: 0, // El admin deberá actualizar esto
        moneda: 'USD',
        fechaInicio: new Date(), // La fecha de contratación real
        estado: 'Vigente', // Tu nueva "bandera"
      });
      await manager.save(nuevoContrato);

      // --- 4. (¡LA CORRECCIÓN ESTÁ AQUÍ!) ---
      const { passwordHash: _, ...usuarioParaRespuesta } = nuevoUsuario;

      return {
        usuario: usuarioParaRespuesta,
        empresa: nuevaEmpresa,
        empleado: nuevoEmpleado,
        contrato: nuevoContrato, // Devolvemos el nuevo contrato
      };
    });
  }/**
   * Lógica de Login de Usuario
   * @param loginDto Los datos del formulario de login
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // --- a. Encontrar al usuario ---
    // Buscamos al usuario por su email.
    // ¡IMPORTANTE! Debemos pedir explícitamente el passwordHash,
    // ya que en la entidad lo marcamos con 'select: false'.
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.passwordHash') // <-- Pide el hash
      .where('usuario.email = :email', { email })
      .getOne();

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // --- b. Comparar contraseñas ---
    const passwordValida = await this.comparePassword(
      password,
      usuario.passwordHash,
    );

    if (!passwordValida) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // --- c. (SaaS) Buscar las "membresías" del usuario ---
    // Buscamos todos los perfiles de Empleado (en todas las empresas)
    // asociados a este login de Usuario.
    const membresias = await this.empleadoRepository.find({
      where: { usuarioId: usuario.id },
      // Cargamos las relaciones para saber el nombre de la empresa y el rol
      relations: ['empresa', 'rol'],
    });

    // --- d. Crear el Token (Payload) ---
    // Este es el "contenido" que vivirá dentro del JWT.
    // Por ahora, solo guardamos quién es el usuario.
    if (membresias.length === 0) {
      // ¡Caso extremo! El usuario existe pero no está ligado a ningún
      // perfil de empleado. No debería poder hacer nada.
      throw new UnauthorizedException('Este usuario no tiene membresías activas.');
    }

    // Simplificación (Paso 11.C):
    // Por ahora, tomamos la *primera* membresía que encontramos.
    const membresiaActiva = membresias[0];

    // Este es el "contenido" que vivirá dentro del JWT.
    const payload = {
      sub: usuario.id, // 'sub' (subject) es el ID del usuario
      email: usuario.email,
      empresaId: membresiaActiva.empresaId,
      empleadoId: membresiaActiva.id,
      rolId: membresiaActiva.rolId,
      rol: membresiaActiva.rol.nombre, // Ej: 'Administrador'
      permisos: membresiaActiva.rol.permisos, // Ej: { "esAdmin": true }
      fotoUrl: membresiaActiva.fotoUrl
    };
    // (FIN DEL CAMBIO)


    // --- e. Firmar y devolver el Token ---
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login exitoso',
      accessToken: accessToken,
      // Devolvemos las membresías para que el Frontend
      // pueda mostrar una pantalla de "Seleccionar Empresa"
      // si el usuario pertenece a más de una.
      membresias: membresias,
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
      fotoUrl: membresia.fotoUrl
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
        permisos: { esAdmin: true, puedeVerTodo: true },
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