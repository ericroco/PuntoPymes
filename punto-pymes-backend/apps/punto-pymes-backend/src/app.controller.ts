// apps/punto-pymes-backend/src/app.controller.ts
import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UnauthorizedException,
  Headers
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { RegisterDto } from '../../auth/src/dto/register.dto';
import { LoginDto } from '../../auth/src/dto/login.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateEmpleadoDto } from '../../personal/src/dto/create-empleado.dto';
import { UpdateEmpleadoDto } from '../../personal/src/dto/update-empleado.dto';
import { CreateDepartamentoDto } from '../../personal/src/dto/create-departamento.dto';
import { UpdateDepartamentoDto } from '../../personal/src/dto/update-departamento.dto';
import { CreateCargoDto } from '../../personal/src/dto/create-cargo.dto';
import { UpdateCargoDto } from '../../personal/src/dto/update-cargo.dto';
import { CreateRolDto } from '../../personal/src/dto/create-rol.dto';
import { UpdateRolDto } from '../../personal/src/dto/update-rol.dto';
import { RequirePermission } from './auth/decorators/permission.decorator';
import { PermissionGuard } from './auth/guards/permission.guard';
import { CreateContratoDto } from '../../nomina/src/dto/create-contrato.dto';
import { UpdateContratoDto } from '../../nomina/src/dto/update-contrato.dto';
import { CreateBeneficioDto } from '../../nomina/src/dto/create-beneficio.dto';
import { UpdateBeneficioDto } from '../../nomina/src/dto/update-beneficio.dto';
import { CreatePeriodoNominaDto } from '../../nomina/src/dto/create-periodo-nomina.dto';
import { UpdatePeriodoNominaDto } from '../../nomina/src/dto/update-periodo-nomina.dto';
import { CreateConceptoNominaDto } from '../../nomina/src/dto/create-concepto-nomina.dto';
import { UpdateConceptoNominaDto } from '../../nomina/src/dto/update-concepto-nomina.dto';
import { ProcesarNominaDto } from '../../nomina/src/dto/procesar-nomina.dto';
import { CreateProyectoDto } from 'apps/productividad/src/dto/create-proyecto.dto';
import { UpdateProyectoDto } from 'apps/productividad/src/dto/update-proyecto.dto';
import { CreateSprintDto } from 'apps/productividad/src/dto/create-sprint.dto';
import { UpdateSprintDto } from 'apps/productividad/src/dto/update-sprint.dto';
import { CreateTareaDto } from 'apps/productividad/src/dto/create-tarea.dto';
import { UpdateTareaDto } from 'apps/productividad/src/dto/update-tarea.dto';
import { CreateAsignacionDto } from 'apps/productividad/src/dto/create-asignacion.dto';
import { UpdateAsignacionDto } from 'apps/productividad/src/dto/update-asignacion.dto';
import { CreateCicloDto } from 'apps/productividad/src/dto/create-ciclo.dto';
import { UpdateCicloDto } from 'apps/productividad/src/dto/update-ciclo.dto';
import { CreateObjetivoDto } from 'apps/productividad/src/dto/create-objetivo.dto';
import { UpdateObjetivoDto } from 'apps/productividad/src/dto/update-objetivo.dto';
import { CreateEvaluacionDto } from 'apps/productividad/src/dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from 'apps/productividad/src/dto/update-evaluacion.dto';
import { CreateCursoDto } from 'apps/productividad/src/dto/create-curso.dto';
import { UpdateCursoDto } from 'apps/productividad/src/dto/update-curso.dto';
import { RechazarCandidatoDto } from 'apps/personal/src/dto/rechazar-candidato.dto';
import { CreateInscripcionDto } from 'apps/productividad/src/dto/create-inscripcion.dto';
import { UpdateInscripcionDto } from 'apps/productividad/src/dto/update-inscripcion.dto';
import { CheckInDto } from 'apps/productividad/src/dto/check-in.dto';
import { CheckOutDto } from 'apps/productividad/src/dto/check-out.dto';
import { CreateActivoDto } from 'apps/productividad/src/dto/create-activo.dto';
import { UpdateActivoDto } from 'apps/productividad/src/dto/update-activo.dto';
import { AssignActivoDto } from 'apps/productividad/src/dto/assign-activo.dto';
import { ReturnActivoDto } from 'apps/productividad/src/dto/return-activo.dto';
import { CreateReporteDto } from 'apps/productividad/src/dto/create-reporte.dto';
import { CreateItemGastoDto } from 'apps/productividad/src/dto/create-item-gasto.dto';
import { UpdateReporteEstadoDto } from 'apps/productividad/src/dto/update-reporte-estado.dto';
import { createMulterOptions } from './shared/utils/multer-config.util';
import { CreateCandidatoDto } from 'apps/personal/src/dto/create-candidato.dto';
import { CreateVacanteDto } from 'apps/personal/src/dto/create-vacante.dto';
import { CreateSolicitudDto } from 'apps/nomina/src/dto/create-solicitud.dto';
import { CreateSucursalDto } from '../../personal/src/dto/create-sucursal.dto';
import { UpdateSucursalDto } from '../../personal/src/dto/update-sucursal.dto';
import { CreateDocumentoEmpresaDto } from 'apps/personal/src/dto/create-documento-empresa.dto';
import { UpdateVacanteDto } from 'apps/personal/src/dto/update-vacante.dto';
import { CreateAnuncioDto } from 'apps/productividad/src/dto/create-anuncio.dto';
import { CreateEncuestaDto } from 'apps/productividad/src/dto/create-encuesta.dto';
import { VoteDto } from 'apps/productividad/src/dto/vote.dto';
import { ResponderSolicitudDto, EstadoSolicitud } from 'apps/nomina/src/dto/responder-solicitud.dto';
import { UpdateConfiguracionEmpresaDto } from 'apps/auth/src/dto/update-configuracion.dto';
import { ChangePasswordDto } from 'apps/auth/src/dto/change-password.dto';
import { PERMISSIONS } from '../../../libs/common/src/constants/permissions';
import { lastValueFrom } from 'rxjs';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('PERSONAL_SERVICE') private readonly personalService: ClientProxy,
    @Inject('NOMINA_SERVICE') private readonly nominaService: ClientProxy,
    @Inject('PRODUCTIVIDAD_SERVICE') private readonly productividadService: ClientProxy,
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // --- Endpoints de Auth (Públicos) ---

  @Get('ping-auth')
  pingAuthService() {
    console.log('Enviando PING al microservicio Auth...');
    return this.authService.send({ cmd: 'ping' }, {});
  }

  @Post('auth/register')
  @UsePipes(new ValidationPipe())
  register(@Body() registerDto: RegisterDto) {
    console.log('API Gateway recibió solicitud de registro');
    return this.authService.send({ cmd: 'register' }, registerDto);
  }

  @Post('auth/login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginDto: LoginDto) {
    console.log('API Gateway recibió solicitud de login');
    return this.authService.send({ cmd: 'login' }, loginDto);
  }


  @Post('auth/forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.send({ cmd: 'request_reset_password' }, { email });
  }

  @Post('auth/reset-password')
  async resetPassword(@Body() body: any) {
    return this.authService.send({ cmd: 'reset_password' }, body);
  }
  // =======================================================
  // 1. SUBIR LOGO (Solo guarda el archivo y devuelve URL) 📸
  // =======================================================
  @UseGuards(JwtAuthGuard)
  @Post('empresa/upload-logo')
  @UseInterceptors(
    FileInterceptor('file', createMulterOptions('logos-empresa', 2)) // 2MB max
  )
  uploadLogo(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Archivo requerido');

    // Asumiendo que req.user tiene el empresaId, o usamos 'temp' si es nuevo
    // Generamos la URL pública
    const url = `http://localhost:3000/uploads/logos-empresa/${file.filename}`;
    return { url };
  }

  // =======================================================
  // 2. OBTENER MI EMPRESA (Para cargar la configuración actual) 🔍
  // =======================================================
  @UseGuards(JwtAuthGuard)
  @Get('empresa/me')
  async getMyCompany(@Request() req) {
    const { empresaId, userId } = req.user; // Asegúrate de que tu JWT strategy devuelva esto

    return this.authService.send(
      { cmd: 'get_company_detail' },
      { empresaId, userId }
    );
  }

  // =======================================================
  // 3. ACTUALIZAR BRANDING (Guarda URL y Color en BD) 💾
  // =======================================================
  @UseGuards(JwtAuthGuard)
  @Patch('empresa/me/branding')
  async updateBranding(@Request() req, @Body() body: { branding: any }) {
    const { empresaId } = req.user;

    return this.authService.send(
      { cmd: 'update_company_branding' },
      {
        empresaId,
        branding: body.branding // { logoUrl: '...', primaryColor: '...' }
      }
    );
  }

  // --- Endpoints de Perfil (Protegidos) ---

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('Petición exitosa a ruta protegida /profile');
    return {
      message: '¡Acceso concedido a ruta protegida!',
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/create-company')
  createCompany(@Request() req, @Body() data: any) {
    // 🔥 LOGS DE DEBUGGING
    console.log('═══════════════════════════════════════');
    console.log('🎯 GATEWAY - CREATE COMPANY');
    console.log('👤 req.user completo:', req.user);
    console.log('📦 Body recibido:', data);

    // 👇 CAMBIO CRÍTICO: Usar fallbacks para compatibilidad total
    const usuarioId = req.user?.userId || req.user?.sub || req.user?.id;

    console.log('✅ UsuarioId extraído:', usuarioId);
    console.log('═══════════════════════════════════════');

    if (!usuarioId) {
      throw new UnauthorizedException('Token inválido: no se pudo identificar al usuario');
    }

    console.log('📡 Gateway: Enviando solicitud al microservicio AUTH');

    // Enviamos el mensaje al Microservicio
    return this.authService.send(
      { cmd: 'create_company_existing' },
      { usuarioId, ...data }  // 👈 Aseguramos que usuarioId va primero
    );
  }

  // --- Endpoints de Personal (Protegidos) ---

  @UseGuards(JwtAuthGuard)
  @Get('empleados')
  getEmpleados(
    @Request() req,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 1. Capturamos el Header
  ) {
    const { empresaId, sucursalId, permisos } = req.user;

    const idParaFiltrar = (sucursalId) ? sucursalId : headerSucursalId;

    return this.personalService.send(
      { cmd: 'get_empleados' },
      {
        empresaId: empresaId,
        filtroSucursalId: idParaFiltrar // 👈 2. Lo enviamos en el paquete
      },
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post('empleados')
  @UsePipes(new ValidationPipe())
  createEmpleado(
    @Request() req,
    @Body() dto: CreateEmpleadoDto,
    @Headers('x-sucursal-id') headerSucursalId: string
  ) {
    const { empresaId, sucursalId, permisos } = req.user;

    if (sucursalId) {
      dto.sucursalId = sucursalId;
    }
    else if (headerSucursalId) {
      dto.sucursalId = headerSucursalId;
    }

    return this.personalService.send(
      { cmd: 'create_empleado' },
      {
        empresaId: empresaId,
        dto: dto,
      },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('empleados/lista-directorio')
  getDirectorio(@Request() req) {
    return this.personalService.send(
      { cmd: 'get_directorio' },
      { empresaId: req.user.empresaId }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('empleados/organigrama')
  async getOrganigrama(@Request() req) {
    return this.personalService.send(
      { cmd: 'get_organigrama_data' },
      { empresaId: req.user.empresaId }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('empleados/:id')
  getEmpleado(
    @Request() req,
    @Param('id') empleadoId: string,
  ) {
    const { empresaId } = req.user;
    return this.personalService.send(
      { cmd: 'get_empleado' },
      { empresaId, empleadoId },
    );
  }
  @UseGuards(JwtAuthGuard)
  @Patch('empleados/:id')
  @UsePipes(new ValidationPipe())
  updateEmpleado(
    @Request() req,
    @Param('id') empleadoId: string,
    @Body() dto: UpdateEmpleadoDto,
  ) {
    const { empresaId } = req.user;

    return this.personalService.send(
      { cmd: 'update_empleado' },
      {
        empresaId: empresaId,
        empleadoId: empleadoId,
        dto: dto,
      },
    );
  }
  @UseGuards(JwtAuthGuard)
  @Delete('empleados/:id')
  deleteEmpleado(
    @Request() req,
    @Param('id') empleadoId: string,
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición DELETE /empleados/${empleadoId} para empresaId: ${empresaId}`,
    );

    return this.personalService.send(
      { cmd: 'delete_empleado' },
      {
        empresaId: empresaId,
        empleadoId: empleadoId,
      },
    );
  }

  // ==========================================
  //        FOTO DE PERFIL
  // ==========================================
  @UseGuards(JwtAuthGuard)
  @Post('empleados/:id/foto')
  @UseInterceptors(
    FileInterceptor('file', createMulterOptions(
      (req) => `empleados/${req.params.id}/foto`, // Carpeta específica
      2, // Max 2MB para fotos
      /\/(jpg|jpeg|png)$/ // Solo imágenes
    ))
  )
  async uploadFotoPerfil(
    @Request() req,
    @Param('id') empleadoId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Imagen requerida');

    const { empresaId } = req.user;
    const empresaFolder = empresaId;
    const fileUrl = `http://localhost:3000/uploads/${empresaFolder}/empleados/${empleadoId}/foto/${file.filename}`;

    return this.personalService.send(
      { cmd: 'update_foto_perfil' },
      { empresaId, empleadoId, fileUrl },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('empleados/:id/documentos')
  getDocumentosEmpleado(
    @Request() req,
    @Param('id') empleadoId: string,
  ) {
    const { empresaId } = req.user;
    return this.personalService.send(
      { cmd: 'get_documentos_empleado' },
      { empresaId, empleadoId },
    );
  }
  /**
     * Crea un nuevo departamento (RF-02)
     */
  @UseGuards(JwtAuthGuard)
  @Post('departamentos')
  @UsePipes(new ValidationPipe())
  createDepartamento(
    @Request() req,
    @Body() dto: CreateDepartamentoDto,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 1. Capturamos Header
  ) {
    const { empresaId, sucursalId } = req.user;

    // 2. Lógica de Asignación de Sede
    if (sucursalId) {
      // A. Gerente: Se crea en SU sucursal obligatoriamente
      dto.sucursalId = sucursalId;
    } else if (headerSucursalId) {
      // B. Admin: Se crea en la sucursal que está viendo (filtro)
      dto.sucursalId = headerSucursalId;
    }
    // C. Si no hay ninguno, se crea como Global (sucursalId = null/undefined)

    console.log(`Gateway: Creando departamento en sucursal: ${dto.sucursalId || 'Global'}`);

    return this.personalService.send(
      { cmd: 'create_departamento' },
      {
        empresaId: empresaId,
        dto: dto,
      },
    );
  }

  /**
   * Obtiene la lista de departamentos (Con Filtro de Sede)
   */
  @UseGuards(JwtAuthGuard)
  @Get('departamentos')
  getDepartamentos(
    @Request() req,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 3. Capturamos Header
  ) {
    const { empresaId, sucursalId } = req.user;

    // 4. Lógica de Filtrado
    const filtroFinal = sucursalId ? sucursalId : headerSucursalId;

    console.log(`Gateway: Pidiendo departamentos. Filtro: ${filtroFinal || 'Todos'}`);

    return this.personalService.send(
      { cmd: 'get_departamentos' },
      {
        empresaId: empresaId,
        filtroSucursalId: filtroFinal // 👈 5. Enviamos el filtro
      },
    );
  }
  /**
   * Actualiza un departamento (RF-02)
   */
  @UseGuards(JwtAuthGuard)
  @Patch('departamentos/:id') // <-- Escucha en PATCH /departamentos/abc-123
  @UsePipes(new ValidationPipe())
  updateDepartamento(
    @Request() req,
    @Param('id') deptoId: string, // <-- Lee el ID de la URL
    @Body() dto: UpdateDepartamentoDto,
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición PATCH /departamentos/${deptoId} para empresaId: ${empresaId}`,
    );

    return this.personalService.send(
      { cmd: 'update_departamento' },
      {
        empresaId: empresaId,
        deptoId: deptoId,
        dto: dto,
      },
    );
  }
  /**
   * Desactiva (Soft Delete) un departamento (RF-02)
   */
  @UseGuards(JwtAuthGuard)
  @Delete('departamentos/:id') // <-- Escucha en DELETE /departamentos/abc-123
  deleteDepartamento(
    @Request() req,
    @Param('id') deptoId: string, // <-- Lee el ID de la URL
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición DELETE /departamentos/${deptoId} para empresaId: ${empresaId}`,
    );

    return this.personalService.send(
      { cmd: 'delete_departamento' },
      {
        empresaId: empresaId,
        deptoId: deptoId,
      },
    );
  }
  /**
    * Endpoint del Gateway para CREAR un Cargo.
    * (Este es el que tú ya tenías)
    */
  @UseGuards(JwtAuthGuard)
  @Post('cargos') // <-- Escucha en POST /cargos
  @UsePipes(new ValidationPipe())
  createCargo(
    @Request() req, // Para obtener el empresaId del token
    @Body() dto: CreateCargoDto, // Para obtener el 'nombre' y 'departamentoId'
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición POST /cargos para empresaId: ${empresaId}`,
    );

    // Envía el mensaje al microservicio PERSONAL
    return this.personalService.send(
      { cmd: 'create_cargo' },
      {
        empresaId: empresaId,
        dto: dto,
      },
    );
  }

  /**
   * Endpoint del Gateway para OBTENER TODOS los Cargos.
   */
  @UseGuards(JwtAuthGuard)
  @Get('cargos')
  getCargos(@Request() req, @Headers('x-sucursal-id') headerSucursalId: string) {
    const { empresaId, sucursalId } = req.user;
    const filtroFinal = sucursalId ? sucursalId : headerSucursalId;

    return this.personalService.send(
      { cmd: 'get_cargos' },
      { empresaId, filtroSucursalId: filtroFinal }
    );
  }

  /**
   * Endpoint del Gateway para ACTUALIZAR un Cargo.
   */
  @UseGuards(JwtAuthGuard)
  @Patch('cargos/:id') // <-- Escucha en PATCH /cargos/un-id
  @UsePipes(new ValidationPipe())
  updateCargo(
    @Request() req,
    @Param('id') cargoId: string, // <-- Obtiene el ID de la URL
    @Body() dto: UpdateCargoDto, // <-- Obtiene los datos a actualizar
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición PATCH /cargos/${cargoId} para empresaId: ${empresaId}`,
    );

    // Envía el mensaje al microservicio PERSONAL
    return this.personalService.send(
      { cmd: 'update_cargo' },
      {
        empresaId: empresaId,
        cargoId: cargoId,
        dto: dto,
      },
    );
  }

  /**
   * Endpoint del Gateway para ELIMINAR (Soft Delete) un Cargo.
   */
  @UseGuards(JwtAuthGuard)
  @Delete('cargos/:id') // <-- Escucha en DELETE /cargos/un-id
  deleteCargo(
    @Request() req,
    @Param('id') cargoId: string, // <-- Obtiene el ID de la URL
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición DELETE /cargos/${cargoId} para empresaId: ${empresaId}`,
    );

    // Envía el mensaje al microservicio PERSONAL
    return this.personalService.send(
      { cmd: 'delete_cargo' },
      {
        empresaId: empresaId,
        cargoId: cargoId,
      },
    );
  }
  // --- INICIO DE CRUD PARA ROL (RF-02, RF-29) ---

  @UseGuards(JwtAuthGuard, PermissionGuard) // <-- 1. AÑADIR PermissionGuard
  @RequirePermission('roles.create') // <-- 2. DEFINIR EL PERMISO
  @Post('roles')
  @UsePipes(new ValidationPipe())
  createRol(@Request() req, @Body() dto: CreateRolDto) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición POST /roles para empresaId: ${empresaId}`,
    );
    return this.personalService.send(
      { cmd: 'create_rol' },
      { empresaId: empresaId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('roles.read') // <-- Ejemplo
  @Get('roles')
  getRoles(@Request() req) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición GET /roles para empresaId: ${empresaId}`,
    );
    return this.personalService.send(
      { cmd: 'get_roles' },
      { empresaId: empresaId },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('roles.update') // <-- Ejemplo
  @Patch('roles/:id')
  @UsePipes(new ValidationPipe())
  updateRol(@Request() req, @Param('id') rolId: string, @Body() dto: UpdateRolDto) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición PATCH /roles/${rolId} para empresaId: ${empresaId}`,
    );
    return this.personalService.send(
      { cmd: 'update_rol' },
      { empresaId: empresaId, rolId: rolId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('roles.delete') // <-- Ejemplo
  @Delete('roles/:id')
  deleteRol(@Request() req, @Param('id') rolId: string) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición DELETE /roles/${rolId} para empresaId: ${empresaId}`,
    );
    return this.personalService.send(
      { cmd: 'delete_rol' },
      { empresaId: empresaId, rolId: rolId },
    );
  }
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('contratos.create') // <-- Protegido por RBAC
  @Post('contratos')
  @UsePipes(new ValidationPipe())
  createContrato(
    @Request() req,
    @Body() dto: CreateContratoDto,
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición POST /contratos para empresaId: ${empresaId}`,
    );
    // 3. Enviar el comando al NOMINA_SERVICE
    return this.nominaService.send(
      { cmd: 'create_contrato' },
      { empresaId: empresaId, dto: dto },
    );
  }

  /**
   * Endpoint del Gateway para OBTENER todos los contratos DE UN EMPLEADO
   * (Ruta REST anidada para mejor semántica)
   */
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('contratos.read')
  @Get('empleados/:empleadoId/contratos')
  getContratosByEmpleado(
    @Request() req,
    @Param('empleadoId') empleadoId: string,
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición GET /empleados/${empleadoId}/contratos para empresaId: ${empresaId}`,
    );
    // 3. Enviar el comando al NOMINA_SERVICE
    return this.nominaService.send(
      { cmd: 'get_contratos_by_empleado' },
      { empresaId: empresaId, empleadoId: empleadoId },
    );
  }

  /**
   * Endpoint del Gateway para ACTUALIZAR un Contrato
   */
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('contratos.update')
  @Patch('contratos/:id')
  @UsePipes(new ValidationPipe())
  updateContrato(
    @Request() req,
    @Param('id') contratoId: string,
    @Body() dto: UpdateContratoDto,
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición PATCH /contratos/${contratoId} para empresaId: ${empresaId}`,
    );
    // 3. Enviar el comando al NOMINA_SERVICE
    return this.nominaService.send(
      { cmd: 'update_contrato' },
      { empresaId: empresaId, contratoId: contratoId, dto: dto },
    );
  }

  /**
   * Endpoint del Gateway para ELIMINAR (Soft Delete) un Contrato
   */
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('contratos.delete')
  @Delete('contratos/:id')
  deleteContrato(
    @Request() req,
    @Param('id') contratoId: string,
  ) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición DELETE /contratos/${contratoId} para empresaId: ${empresaId}`,
    );
    // 3. Enviar el comando al NOMINA_SERVICE
    return this.nominaService.send(
      { cmd: 'delete_contrato' },
      { empresaId: empresaId, contratoId: contratoId },
    );
  }
  // --- INICIO DE CRUD PARA BENEFICIO (RF-19) ---

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('beneficios.read')
  @Get('beneficios')
  getBeneficios(@Request() req) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'get_beneficios' },
      { empresaId: empresaId },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('beneficios.create')
  @Post('beneficios')
  @UsePipes(new ValidationPipe())
  createBeneficio(
    @Request() req,
    @Body() dto: CreateBeneficioDto,
  ) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'create_beneficio' },
      { empresaId: empresaId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('beneficios.update')
  @Patch('beneficios/:id')
  @UsePipes(new ValidationPipe())
  updateBeneficio(
    @Request() req,
    @Param('id') beneficioId: string,
    @Body() dto: UpdateBeneficioDto,) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'update_beneficio' },
      { empresaId: empresaId, beneficioId: beneficioId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('beneficios.delete')
  @Delete('beneficios/:id')
  deleteBeneficio(
    @Request() req,
    @Param('id') beneficioId: string,
  ) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'delete_beneficio' },
      { empresaId: empresaId, beneficioId: beneficioId },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('beneficios.read')
  @Get('concepts/recurring-stats') // Ruta exacta que usa tu Frontend
  getBeneficiosStats(@Request() req) {
    return this.nominaService.send(
      { cmd: 'get_beneficios_stats' },
      { empresaId: req.user.empresaId },
    );
  }

  // 1. Ver detalle del beneficio
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('beneficios.read')
  @Get('beneficios/:id')
  getBeneficioById(@Request() req, @Param('id') id: string) {
    return this.nominaService.send(
      { cmd: 'get_beneficio_by_id' },
      { id, empresaId: req.user.empresaId }
    );
  }

  // 2. Ver asignaciones
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('beneficios.read')
  @Get('beneficios/:id/asignaciones')
  getBeneficioAssignments(@Request() req, @Param('id') id: string) {
    return this.nominaService.send(
      { cmd: 'get_beneficio_assignments' },
      { beneficioId: id, empresaId: req.user.empresaId }
    );
  }

  // 3. Guardar asignaciones
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('beneficios.update')
  @Post('beneficios/:id/asignaciones')
  updateBeneficioAssignments(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { employeeIds: string[] }
  ) {
    return this.nominaService.send(
      { cmd: 'update_beneficio_assignments' },
      {
        beneficioId: id,
        empresaId: req.user.empresaId,
        employeeIds: body.employeeIds
      }
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.periodos.read') // <-- Protegido por RBAC
  @Get('periodos-nomina')
  getPeriodosNomina(@Request() req) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'get_periodos_nomina' },
      { empresaId: empresaId },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.periodos.create')
  @Post('periodos-nomina')
  @UsePipes(new ValidationPipe())
  createPeriodoNomina(
    @Request() req,
    @Body() dto: CreatePeriodoNominaDto,
  ) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'create_periodo_nomina' },
      { empresaId: empresaId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.periodos.update')
  @Patch('periodos-nomina/:id')
  @UsePipes(new ValidationPipe())
  updatePeriodoNomina(
    @Request() req,
    @Param('id') periodoId: string,
    @Body() dto: UpdatePeriodoNominaDto,
  ) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'update_periodo_nomina' },
      { empresaId: empresaId, periodoId: periodoId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.periodos.delete')
  @Delete('periodos-nomina/:id')
  deletePeriodoNomina(
    @Request() req,
    @Param('id') periodoId: string,
  ) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'delete_periodo_nomina' },
      { empresaId: empresaId, periodoId: periodoId },
    );
  }
  // --- INICIO DE CRUD PARA CONCEPTO NOMINA (Semana 9) ---

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.conceptos.read') // <-- Protegido por RBAC
  @Get('conceptos-nomina')
  getConceptosNomina(@Request() req) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'get_conceptos_nomina' },
      { empresaId: empresaId },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.conceptos.create')
  @Post('conceptos-nomina')
  @UsePipes(new ValidationPipe())
  createConceptoNomina(
    @Request() req,
    @Body() dto: CreateConceptoNominaDto,
  ) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'create_concepto_nomina' },
      { empresaId: empresaId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.conceptos.update')
  @Patch('conceptos-nomina/:id')
  @UsePipes(new ValidationPipe())
  updateConceptoNomina(
    @Request() req,
    @Param('id') conceptoId: string,
    @Body() dto: UpdateConceptoNominaDto,
  ) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'update_concepto_nomina' },
      { empresaId: empresaId, conceptoId: conceptoId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.conceptos.delete')
  @Delete('conceptos-nomina/:id')
  deleteConceptoNomina(
    @Request() req,
    @Param('id') conceptoId: string,
  ) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'delete_concepto_nomina' },
      { empresaId: empresaId, conceptoId: conceptoId },
    );
  }
  // --- INICIO DE LÓGICA DE PROCESAMIENTO (Semana 9) ---

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.procesar') // <-- ¡Protegido!
  @Post('nomina/procesar')
  @UsePipes(new ValidationPipe())
  procesarNomina(
    @Request() req,
    @Body() dto: ProcesarNominaDto,
  ) {
    const { empresaId } = req.user;
    return this.nominaService.send(
      { cmd: 'procesar_nomina' },
      { empresaId: empresaId, dto: dto },
    );
  }
  // --- INICIO DE CRUD PARA PROYECTO (Semana 9) ---

  // ==========================================
  //  GET: Leer Proyectos (Con Filtro)
  // ==========================================
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.proyectos.read')
  @Get('proyectos')
  getProyectos(
    @Request() req,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 2. Capturamos Header
  ) {
    const { empresaId, sucursalId } = req.user;

    // Lógica de Prioridad:
    // 1. Si soy Gerente (tengo sucursalId en token) -> Mando mi ID.
    // 2. Si soy Admin (no tengo sucursalId) -> Mando lo que diga el Header (Contexto).
    const filtroFinal = sucursalId ? sucursalId : headerSucursalId;

    return this.productividadService.send(
      { cmd: 'get_proyectos' },
      {
        empresaId: empresaId,
        filtroSucursalId: filtroFinal // 👈 3. Enviamos el filtro
      },
    );
  }

  // ==========================================
  //  POST: Crear Proyecto (Con Asignación)
  // ==========================================
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.proyectos.create')
  @Post('proyectos')
  @UsePipes(new ValidationPipe())
  createProyecto(
    @Request() req,
    @Body() dto: CreateProyectoDto,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 4. Capturamos Header
  ) {
    const { empresaId, sucursalId } = req.user;

    // Lógica de Seguridad (Assignment):
    if (sucursalId) {
      // Soy Gerente: El proyecto ES MÍO obligatoriamente.
      dto.sucursalId = sucursalId;
    } else if (headerSucursalId) {
      // Soy Admin filtrando una sede: Lo creo en esa sede por comodidad.
      dto.sucursalId = headerSucursalId;
    }
    // Si no hay ninguno, se crea como "Global" o lo que diga el DTO original.

    return this.productividadService.send(
      { cmd: 'create_proyecto' },
      { empresaId: empresaId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.proyectos.update')
  @Patch('proyectos/:id')
  @UsePipes(new ValidationPipe())
  updateProyecto(
    @Request() req,
    @Param('id') proyectoId: string, // 'id' debe coincidir con la ruta
    @Body() dto: UpdateProyectoDto, // El DTO de actualización
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_proyecto' },
      { empresaId: empresaId, proyectoId: proyectoId, dto: dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.proyectos.delete')
  @Delete('proyectos/:id')
  deleteProyecto(
    @Request() req,
    @Param('id') proyectoId: string, // 'id' debe coincidir con la ruta
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'delete_proyecto' },
      { empresaId: empresaId, proyectoId: proyectoId },
    );
  }
  // 1. Crear Sprint (POST /proyectos/:id/sprints)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.sprints.create')
  @Post('proyectos/:proyectoId/sprints')
  @UsePipes(new ValidationPipe({ transform: true }))
  createSprint(
    @Request() req,
    @Param('proyectoId') proyectoId: string,
    @Body() dto: CreateSprintDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'create_sprint' },
      { empresaId, proyectoId, dto },
    );
  }

  // 2. Listar Sprints (GET /proyectos/:id/sprints)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.sprints.read')
  @Get('proyectos/:proyectoId/sprints')
  getSprints(
    @Request() req,
    @Param('proyectoId') proyectoId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_sprints_by_proyecto' },
      { empresaId, proyectoId },
    );
  }

  // 3. Actualizar Sprint (PATCH /sprints/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.sprints.update')
  @Patch('sprints/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateSprint(
    @Request() req,
    @Param('id') sprintId: string,
    @Body() dto: UpdateSprintDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_sprint' },
      { empresaId, sprintId, dto },
    );
  }

  // 4. Borrar Sprint (DELETE /sprints/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.sprints.delete')
  @Delete('sprints/:id')
  deleteSprint(
    @Request() req,
    @Param('id') sprintId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'delete_sprint' },
      { empresaId, sprintId },
    );
  }
  // 1. CREAR TAREA (POST /sprints/:sprintId/tareas)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.tareas.create')
  @Post('sprints/:sprintId/tareas')
  @UsePipes(new ValidationPipe())
  createTarea(
    @Request() req,
    @Param('sprintId') sprintId: string,
    @Body() dto: CreateTareaDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'create_tarea' },
      { empresaId, sprintId, dto },
    );
  }

  // 2. LISTAR TAREAS (GET /sprints/:sprintId/tareas)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.tareas.read')
  @Get('sprints/:sprintId/tareas')
  getTareasBySprint(
    @Request() req,
    @Param('sprintId') sprintId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_tareas_by_sprint' },
      { empresaId, sprintId },
    );
  }

  // 3. ACTUALIZAR TAREA (PATCH /tareas/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.tareas.update')
  @Patch('tareas/:id')
  @UsePipes(new ValidationPipe())
  updateTarea(
    @Request() req,
    @Param('id') tareaId: string,
    @Body() dto: UpdateTareaDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_tarea' },
      { empresaId, tareaId, dto },
    );
  }

  // 4. BORRAR TAREA (DELETE /tareas/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.tareas.delete')
  @Delete('tareas/:id')
  deleteTarea(
    @Request() req,
    @Param('id') tareaId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'delete_tarea' },
      { empresaId, tareaId },
    );
  }
  // ==========================================
  //          ASIGNACIONES (Staffing)
  // ==========================================

  // 1. ASIGNAR EMPLEADO (POST /tareas/:tareaId/asignaciones)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.tareas.assign')
  @Post('tareas/:tareaId/asignaciones')
  @UsePipes(new ValidationPipe())
  assignTarea(
    @Request() req,
    @Param('tareaId') tareaId: string,
    @Body() dto: CreateAsignacionDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'assign_tarea' },
      { empresaId, tareaId, dto },
    );
  }

  // 2. VER QUIÉN ESTÁ ASIGNADO (GET /tareas/:tareaId/asignaciones)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.tareas.read')
  @Get('tareas/:tareaId/asignaciones')
  getAsignaciones(
    @Request() req,
    @Param('tareaId') tareaId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_asignaciones' },
      { empresaId, tareaId },
    );
  }

  // 3. DESASIGNAR (DELETE /asignaciones/:id)
  // Nota: Usamos el ID de la ASIGNACIÓN, no del empleado
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.tareas.assign') // Mismo permiso que asignar
  @Delete('asignaciones/:id')
  removeAsignacion(
    @Request() req,
    @Param('id') asignacionId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'remove_asignacion' },
      { empresaId, asignacionId },
    );
  }
  // 4. ACTUALIZAR ASIGNACIÓN (PATCH /asignaciones/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.tareas.assign') // Usamos el mismo permiso de asignar
  @Patch('asignaciones/:id')
  @UsePipes(new ValidationPipe())
  updateAsignacion(
    @Request() req,
    @Param('id') asignacionId: string,
    @Body() dto: UpdateAsignacionDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_asignacion' },
      { empresaId, asignacionId, dto },
    );
  }
  // ==========================================
  //        DESEMPEÑO: CICLOS DE EVALUACIÓN
  // ==========================================

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.ciclos.create') // Nuevo permiso sugerido
  @Post('desempeno/ciclos')
  @UsePipes(new ValidationPipe({ transform: true }))
  createCiclo(@Request() req, @Body() dto: CreateCicloDto) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'create_ciclo' }, { empresaId, dto });
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.ciclos.read')
  @Get('desempeno/ciclos')
  getCiclos(@Request() req) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'get_ciclos' }, { empresaId });
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.ciclos.update')
  @Patch('desempeno/ciclos/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateCiclo(@Request() req, @Param('id') cicloId: string, @Body() dto: UpdateCicloDto) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'update_ciclo' }, { empresaId, cicloId, dto });
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.ciclos.delete')
  @Delete('desempeno/ciclos/:id')
  deleteCiclo(@Request() req, @Param('id') cicloId: string) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'delete_ciclo' }, { empresaId, cicloId });
  }
  // ==========================================
  //        DESEMPEÑO: OBJETIVOS
  // ==========================================

  // 1. CREAR OBJETIVO (POST /desempeno/ciclos/:cicloId/objetivos)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.objetivos.create')
  @Post('desempeno/ciclos/:cicloId/objetivos')
  @UsePipes(new ValidationPipe())
  createObjetivo(
    @Request() req,
    @Param('cicloId') cicloId: string,
    @Body() dto: CreateObjetivoDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'create_objetivo' },
      { empresaId, cicloId, dto },
    );
  }

  // 2. LISTAR OBJETIVOS DEL CICLO (GET /desempeno/ciclos/:cicloId/objetivos)
  // Soporta ?empleadoId=... para filtrar
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.objetivos.read')
  @Get('desempeno/ciclos/:cicloId/objetivos')
  getObjetivos(
    @Request() req,
    @Param('cicloId') cicloId: string,
    @Query('empleadoId') empleadoId?: string, // Opcional: filtrar por empleado
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_objetivos' },
      { empresaId, cicloId, empleadoId },
    );
  }

  // 3. ACTUALIZAR OBJETIVO (PATCH /desempeno/objetivos/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.objetivos.update')
  @Patch('desempeno/objetivos/:id')
  @UsePipes(new ValidationPipe())
  updateObjetivo(
    @Request() req,
    @Param('id') objetivoId: string,
    @Body() dto: UpdateObjetivoDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_objetivo' },
      { empresaId, objetivoId, dto },
    );
  }

  // ==========================================
  //        DESEMPEÑO: EVALUACIONES (9-BOX)
  // ==========================================

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.evaluaciones.create')
  @Post('desempeno/ciclos/:cicloId/evaluaciones')
  @UsePipes(new ValidationPipe())
  createEvaluacion(
    @Request() req,
    @Param('cicloId') cicloId: string,
    @Body() dto: CreateEvaluacionDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'create_evaluacion' },
      { empresaId, cicloId, dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.evaluaciones.read')
  @Get('desempeno/ciclos/:cicloId/evaluaciones')
  getEvaluaciones(
    @Request() req,
    @Param('cicloId') cicloId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_evaluaciones' },
      { empresaId, cicloId },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.evaluaciones.update')
  @Patch('desempeno/evaluaciones/:id')
  @UsePipes(new ValidationPipe())
  updateEvaluacion(
    @Request() req,
    @Param('id') evaluacionId: string,
    @Body() dto: UpdateEvaluacionDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_evaluacion' },
      { empresaId, evaluacionId, dto },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.evaluaciones.delete')
  @Delete('desempeno/evaluaciones/:id')
  deleteEvaluacion(
    @Request() req,
    @Param('id') evaluacionId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'delete_evaluacion' },
      { empresaId, evaluacionId },
    );
  }
  // ==========================================
  //        LMS: GESTIÓN DE CURSOS
  // ==========================================

  // 1. CREAR CURSO (POST /capacitacion/cursos)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('capacitacion.cursos.create')
  @Post('capacitacion/cursos')
  @UsePipes(new ValidationPipe())
  createCurso(
    @Request() req,
    @Body() dto: CreateCursoDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'create_curso' },
      { empresaId, dto },
    );
  }

  // 2. LISTAR CURSOS (GET /capacitacion/cursos)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('capacitacion.cursos.read')
  @Get('capacitacion/cursos')
  getCursos(@Request() req) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_cursos' },
      { empresaId },
    );
  }

  // 3. ACTUALIZAR CURSO (PATCH /capacitacion/cursos/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('capacitacion.cursos.update')
  @Patch('capacitacion/cursos/:id')
  @UsePipes(new ValidationPipe())
  updateCurso(
    @Request() req,
    @Param('id') cursoId: string,
    @Body() dto: UpdateCursoDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_curso' },
      { empresaId, cursoId, dto },
    );
  }

  // 4. BORRAR CURSO (DELETE /capacitacion/cursos/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('capacitacion.cursos.delete')
  @Delete('capacitacion/cursos/:id')
  deleteCurso(
    @Request() req,
    @Param('id') cursoId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'delete_curso' },
      { empresaId, cursoId },
    );
  }
  // ==========================================
  //        LMS: INSCRIPCIONES
  // ==========================================

  // 1. INSCRIBIR EMPLEADO (POST /capacitacion/cursos/:cursoId/inscripciones)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('capacitacion.inscripciones.create')
  @Post('capacitacion/cursos/:cursoId/inscripciones')
  @UsePipes(new ValidationPipe())
  createInscripcion(
    @Request() req,
    @Param('cursoId') cursoId: string,
    @Body() dto: CreateInscripcionDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'create_inscripcion' },
      { empresaId, cursoId, dto },
    );
  }

  // 2. VER ALUMNOS DEL CURSO (GET /capacitacion/cursos/:cursoId/inscripciones)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('capacitacion.inscripciones.read')
  @Get('capacitacion/cursos/:cursoId/inscripciones')
  getInscripciones(
    @Request() req,
    @Param('cursoId') cursoId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_inscripciones_curso' },
      { empresaId, cursoId },
    );
  }

  // 3. ACTUALIZAR PROGRESO/NOTA (PATCH /capacitacion/inscripciones/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('capacitacion.inscripciones.update')
  @Patch('capacitacion/inscripciones/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateInscripcion(
    @Request() req,
    @Param('id') inscripcionId: string,
    @Body() dto: UpdateInscripcionDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_inscripcion' },
      { empresaId, inscripcionId, dto },
    );
  }

  // 4. ELIMINAR INSCRIPCIÓN (DELETE /capacitacion/inscripciones/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('capacitacion.inscripciones.delete')
  @Delete('capacitacion/inscripciones/:id')
  deleteInscripcion(
    @Request() req,
    @Param('id') inscripcionId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'delete_inscripcion' },
      { empresaId, inscripcionId },
    );
  }

  @UseGuards(JwtAuthGuard) // No requiere permiso especial, solo estar logueado
  @Get('capacitacion/mis-cursos')
  getMisCursos(@Request() req) {
    // Extraemos los datos del usuario logueado
    const { empresaId, empleadoId } = req.user;

    // Enviamos al microservicio
    return this.productividadService.send(
      { cmd: 'get_mis_cursos' },
      { empresaId, empleadoId },
    );
  }
  // ==========================================
  //        CONTROL DE ASISTENCIA
  // ==========================================

  // 1. MARCAR ENTRADA
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('asistencia.registro')
  @Post('asistencia/check-in')
  @UsePipes(new ValidationPipe())
  checkIn(
    @Request() req,
    @Body() dto: CheckInDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'check_in' },
      { empresaId, dto },
    );
  }

  // 2. MARCAR SALIDA
  // OJO: Usamos un Query Param para saber qué empleado sale (en modo admin/prueba)
  // En producción real, esto vendría del usuario logueado.
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('asistencia.registro')
  @Post('asistencia/check-out')
  @UsePipes(new ValidationPipe())
  checkOut(
    @Request() req,
    @Body() dto: CheckOutDto,
    @Query('empleadoId') empleadoId: string, // ?empleadoId=UUID
  ) {
    const { empresaId } = req.user;

    if (!empleadoId) {
      // Fallback para pruebas si no mandas query, intentar sacarlo del body si existiera o lanzar error
      // Para este ejemplo, exigimos el query param para ser explícitos.
      // throw new BadRequestException('Falta el parámetro empleadoId');
    }

    return this.productividadService.send(
      { cmd: 'check_out' },
      { empresaId, empleadoId, dto },
    );
  }

  // 3. VER HISTORIAL
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('asistencia.reportes')
  @Get('asistencia/empleados/:empleadoId')
  getHistorialAsistencia(
    @Request() req,
    @Param('empleadoId') empleadoId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_asistencia' },
      { empresaId, empleadoId },
    );
  }
  // ==========================================
  //  POST: Crear Activo (Con Asignación de Sede)
  // ==========================================
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.gestion')
  @Post('activos')
  @UsePipes(new ValidationPipe({ transform: true }))
  createActivo(
    @Request() req,
    @Body() dto: CreateActivoDto,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 1. Capturar Header
  ) {
    const { empresaId, sucursalId } = req.user;

    // 2. Lógica de Seguridad (Assignment)
    if (sucursalId) {
      dto.sucursalId = sucursalId; // Gerente -> Su sede
    } else if (headerSucursalId) {
      dto.sucursalId = headerSucursalId; // Admin -> Sede filtrada
    }

    return this.productividadService.send(
      { cmd: 'create_activo' },
      { empresaId, dto }
    );
  }

  // ==========================================
  //  GET: Leer Activos (Con Filtro)
  // ==========================================
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.gestion')
  @Get('activos')
  getActivos(
    @Request() req,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 3. Capturar Header
  ) {
    const { empresaId, sucursalId } = req.user;

    // 4. Lógica de Filtro
    const filtroFinal = sucursalId ? sucursalId : headerSucursalId;

    return this.productividadService.send(
      { cmd: 'get_activos' },
      {
        empresaId,
        filtroSucursalId: filtroFinal // 👈 5. Enviar filtro
      }
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.gestion')
  @Patch('activos/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateActivo(@Request() req, @Param('id') activoId: string, @Body() dto: UpdateActivoDto) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'update_activo' }, { empresaId, activoId, dto });
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.gestion')
  @Delete('activos/:id')
  deleteActivo(@Request() req, @Param('id') activoId: string) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'delete_activo' }, { empresaId, activoId });
  }
  // ==========================================
  //        ASIGNACIÓN DE ACTIVOS
  // ==========================================

  // 1. ASIGNAR ACTIVO
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.asignar')
  @Post('activos/:activoId/asignaciones')
  @UsePipes(new ValidationPipe({ transform: true }))
  assignActivo(
    @Request() req,
    @Param('activoId') activoId: string,
    @Body() dto: AssignActivoDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'assign_activo' },
      { empresaId, activoId, dto },
    );
  }

  // 2. DEVOLVER ACTIVO
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.asignar')
  @Post('activos/asignaciones/:id/devolver')
  @UsePipes(new ValidationPipe({ transform: true }))
  returnActivo(
    @Request() req,
    @Param('id') asignacionId: string,
    @Body() dto: ReturnActivoDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'return_activo' },
      { empresaId, asignacionId, dto },
    );
  }

  // 3. VER ACTIVOS DE UN EMPLEADO
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.gestion')
  @Get('activos/empleados/:empleadoId')
  getActivosEmpleado(
    @Request() req,
    @Param('empleadoId') empleadoId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_activos_empleado' },
      { empresaId, empleadoId },
    );
  }

  // 4. VER HISTORIAL DE UN ACTIVO
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.gestion')
  @Get('activos/:activoId/historial')
  getHistorialActivo(
    @Request() req,
    @Param('activoId') activoId: string
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_historial_activo' },
      { empresaId, activoId }
    );
  }
  // ==========================================
  //        GESTIÓN DE GASTOS
  // ==========================================

  // 1. CREAR REPORTE (Cabecera)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('gastos.reportar')
  @Post('gastos/reportes')
  @UsePipes(new ValidationPipe())
  createReporte(
    @Request() req,
    @Body() dto: CreateReporteDto,
    @Query('empleadoId') empleadoId: string, // En producción, sacarlo de req.user si es autoservicio
  ) {
    const { empresaId } = req.user;
    // Si no mandan empleadoId (autoservicio), usar el del usuario logueado (si tuvieras esa lógica).
    // Para admin, exigimos query param o body.
    return this.productividadService.send(
      { cmd: 'create_reporte' },
      { empresaId, empleadoId, dto },
    );
  }

  // ==========================================
  // 1. ENDPOINT SOLO PARA SUBIR LA FACTURA 📸
  // ==========================================
  @UseGuards(JwtAuthGuard)
  @Post('gastos/upload-factura') // Endpoint: localhost:3000/gastos/upload-factura
  @UseInterceptors(
    // Reutilizamos TU helper, pero cambiamos la carpeta a 'gastos-facturas'
    FileInterceptor('file', createMulterOptions('gastos-facturas', 5)) // 5MB max
  )
  uploadFactura(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Factura requerida');

    const { empresaId } = req.user;

    // Construimos la URL pública
    // Ejemplo: http://localhost:3000/uploads/123/gastos-facturas/factura-xyz.pdf
    const fileUrl = `http://localhost:3000/uploads/${empresaId}/gastos-facturas/${file.filename}`;

    // Devolvemos la URL para que Angular la guarde temporalmente
    return { url: fileUrl };
  }

  // 2. AGREGAR ÍTEM (Factura)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('gastos.reportar')
  @Post('gastos/reportes/:reporteId/items')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  addItemGasto(
    @Request() req,
    @Param('reporteId') reporteId: string,
    @Body() dto: CreateItemGastoDto,
  ) {
    const { empresaId } = req.user;

    // Aquí el DTO ya trae 'facturaUrl' y 'categoria'
    return this.productividadService.send(
      { cmd: 'add_item_gasto' },
      { empresaId, reporteId, dto },
    );
  }

  // 3. LISTAR REPORTES
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('gastos.ver')
  @Get('gastos/reportes')
  getReportes(
    @Request() req,
    @Query('empleadoId') empleadoId?: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_reportes' },
      { empresaId, empleadoId },
    );
  }

  // 4. CAMBIAR ESTADO (Aprobar/Rechazar)
  // 4. CAMBIAR ESTADO (Aprobar/Rechazar)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('gastos.aprobar') // Usamos el permiso que ya tienes
  @Patch('gastos/reportes/:id/estado')
  updateReporteEstado(
    @Request() req,
    @Param('id') reporteId: string,
    @Body() dto: UpdateReporteEstadoDto,
  ) {
    // 👇 EXTRAEMOS DATOS DEL USUARIO (Igual que en vacaciones)
    const { empresaId, sucursalId, role } = req.user;

    return this.productividadService.send(
      { cmd: 'update_reporte_estado' },
      {
        empresaId,
        reporteId,
        dto,
        // 👇 ENVIAMOS EL CONTEXTO DE QUIEN APRUEBA
        usuario: { role, sucursalId }
      },
    );
  }

  // 5. OBTENER UN REPORTE (Detalle)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('gastos.ver') // O gastos.reportar si es el propio empleado
  @Get('gastos/reportes/:id')
  getReporteById(
    @Request() req,
    @Param('id') reporteId: string,
  ) {
    const { empresaId, sucursalId, role } = req.user;
    return this.productividadService.send(
      { cmd: 'get_reporte_by_id' },
      {
        empresaId,
        reporteId,
        usuario: { role, sucursalId } // Enviamos usuario para validar seguridad (que no vea reporte de otra sucursal)
      },
    );
  }

  // 6. ELIMINAR ÍTEM
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('gastos.reportar')
  @Delete('gastos/reportes/:reporteId/items/:itemId')
  deleteItemGasto(
    @Request() req,
    @Param('reporteId') reporteId: string,
    @Param('itemId') itemId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'delete_item_gasto' },
      { empresaId, reporteId, itemId },
    );
  }
  // ==========================================
  //        DASHBOARD & ANALÍTICAS
  // ==========================================

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('analiticas.ver')
  @Get('analiticas/dashboard')
  getDashboard(
    @Request() req,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 1. Capturamos Header
  ) {
    const { empresaId, sucursalId } = req.user;

    // 2. Lógica de Prioridad (Igual que en Proyectos/Empleados)
    // Si soy Gerente (token) -> Mando mi ID.
    // Si soy Admin (header) -> Mando el del selector.
    const filtroFinal = sucursalId ? sucursalId : headerSucursalId;

    return this.productividadService.send(
      { cmd: 'get_dashboard_kpis' },
      {
        empresaId,
        filtroSucursalId: filtroFinal // 👈 3. Enviamos el filtro
      },
    );
  }
  // ==========================================
  //        1. SUBIR CERTIFICADO (LMS)
  // ==========================================
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @Post('capacitacion/inscripciones/:id/certificado')
  @UseInterceptors(
    // USAMOS EL HELPER: Carpeta 'certificados', Max 5MB, solo PDF/Imágenes
    FileInterceptor('file', createMulterOptions('certificados', 5))
  )
  ploadCertificado(
    @Request() req,
    @Param('id') inscripcionId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Archivo requerido');
    const { empresaId } = req.user;

    // Generamos la URL pública relativa a la empresa
    // Nota: file.filename ya es único. 
    // La URL debe coincidir con la estructura de carpetas o usar un endpoint proxy.
    // Para simplificar con ServeStatic, servimos todo 'uploads'
    const fileUrl = `http://localhost:3000/uploads/${empresaId}/certificados/${file.filename}`;

    return this.productividadService.send(
      { cmd: 'upload_certificado' },
      { empresaId, inscripcionId, fileUrl },
    );
  }
  // ==========================================
  //        RECLUTAMIENTO (ATS)
  // ==========================================

  // 1. PUBLICAR VACANTEu
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('reclutamiento.gestion')
  @Post('reclutamiento/vacantes')
  @UsePipes(new ValidationPipe())
  createVacante(
    @Request() req,
    @Body() dto: CreateVacanteDto,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 1. Capturar
  ) {
    const { empresaId, sucursalId } = req.user;

    // 2. Lógica de Asignación
    if (sucursalId) {
      dto.sucursalId = sucursalId; // Gerente crea para su sede
    } else if (headerSucursalId) {
      dto.sucursalId = headerSucursalId; // Admin crea para la sede filtrada
    }

    return this.personalService.send(
      { cmd: 'create_vacante' },
      { empresaId, dto },
    );
  }

  // 2. ACTUALIZAR / CERRAR VACANTE (PATCH)
  // Este endpoint maneja tanto la edición de datos como el cambio de estado (Cerrar)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('reclutamiento.gestion')
  @Patch('reclutamiento/vacantes/:id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true })) // whitelist evita campos basura
  updateVacante(
    @Request() req,
    @Param('id') vacanteId: string,
    @Body() dto: UpdateVacanteDto
  ) {
    const { empresaId } = req.user;

    return this.personalService.send(
      { cmd: 'update_vacante' },
      {
        empresaId,
        vacanteId,
        dto
      }
    );
  }

  // 2. LISTAR VACANTES (Admin/Interno)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('reclutamiento.gestion')
  @Get('reclutamiento/vacantes')
  getVacantesAdmin(
    @Request() req,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 3. Capturar
  ) {
    const { empresaId, sucursalId } = req.user;

    // 4. Lógica de Filtro
    const filtroFinal = sucursalId ? sucursalId : headerSucursalId;

    return this.personalService.send(
      { cmd: 'get_vacantes' },
      {
        empresaId,
        publicas: false,
        filtroSucursalId: filtroFinal // 👈 5. Enviar filtro
      },
    );
  }

  // ==========================================
  //        POSTULACIÓN (Carga de CV + Registro)
  // ==========================================

  // 3. POSTULARSE (Este endpoint hace TODO: Subir archivo + Crear candidato)
  @Post('reclutamiento/vacantes/:vacanteId/postular')
  @UseInterceptors(
    FileInterceptor('file', createMulterOptions(
      (req) => `vacantes/${req.params.vacanteId}/candidatos`,
      10,
      /\/(pdf)$/
    ))
  )
  async postularCandidato(
    @Request() req,
    @Param('vacanteId') vacanteId: string,
    @Body() body: any, // Usamos any porque al ser form-data, los campos vienen planos
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('El CV (PDF) es obligatorio');

    // 1. Determinar carpeta (Si es público, usamos 'public')
    const empresaFolder = req.user?.empresaId || 'public';

    // 2. Construir URL pública
    const fileUrl = `http://localhost:3000/uploads/${empresaFolder}/vacantes/${vacanteId}/candidatos/${file.filename}`;

    // 3. Armar el DTO para el microservicio
    // Mapeamos los campos del body (form-data) al DTO
    const candidatoDto: CreateCandidatoDto = {
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono,
      vacanteId: vacanteId,
      cvUrl: fileUrl, // ¡Aquí va el archivo que acabamos de subir!
    };

    // 4. Llamar al servicio (que luego llamará a la IA)
    return this.personalService.send(
      { cmd: 'registrar_candidato' },
      candidatoDto,
    );
  }
  // 4. VER CANDIDATOS DE UNA VACANTE (GET /reclutamiento/vacantes/:id/candidatos)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('reclutamiento.gestion')
  @Get('reclutamiento/vacantes/:vacanteId/candidatos')
  getCandidatos(
    @Request() req,
    @Param('vacanteId') vacanteId: string,
  ) {
    const { empresaId } = req.user;
    return this.personalService.send(
      { cmd: 'get_candidatos' },
      { empresaId, vacanteId },
    );
  }
  // 5. REINTENTAR ANÁLISIS IA (POST /reclutamiento/candidatos/:id/reanalizar)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('reclutamiento.gestion')
  @Post('reclutamiento/candidatos/:candidatoId/reanalizar')
  reanalizarCandidato(
    @Param('candidatoId') candidatoId: string,
  ) {
    // No necesitamos empresaId porque el candidato ya existe y es único
    return this.personalService.send(
      { cmd: 'reanalizar_candidato' },
      { candidatoId },
    );
  }
  @UseGuards(JwtAuthGuard) // Permite a empleados y admins
  @Post('empleados/:id/documentos')
  @UseInterceptors(
    FileInterceptor('file', createMulterOptions(
      (req) => `empleados/${req.params.id}/documentos`, // Carpeta dinámica por ID de empleado
      10 // Max 10MB
    ))
  )
  async uploadDocumentoEmpleado(
    @Request() req,
    @Param('id') empleadoId: string,
    @Body('nombre') nombre: string,
    @Body('tipo') tipo: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Archivo requerido');

    const { empresaId } = req.user;
    const empresaFolder = empresaId; // O lógica para sacar folder

    const fileUrl = `http://localhost:3000/uploads/${empresaFolder}/empleados/${empleadoId}/documentos/${file.filename}`;

    // Llamamos al microservicio Personal para guardar en BD
    return this.personalService.send(
      { cmd: 'upload_documento_empleado' },
      {
        empresaId,
        empleadoId,
        dto: { nombre, tipo, url: fileUrl }
      },
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('desempeno/ciclos/activo')
  getCicloActivo(@Request() req) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'get_ciclo_activo' }, { empresaId });
  }
  @UseGuards(JwtAuthGuard)
  @Get('asistencia/empleados/:id/resumen')
  getAsistenciaSummary(@Request() req, @Param('id') empleadoId: string) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'get_asistencia_summary' }, { empresaId, empleadoId });
  }
  @UseGuards(JwtAuthGuard)
  @Delete('empleados/documentos/:id') // Ruta: /empleados/documentos/DOC_ID
  deleteDocumento(
    @Request() req,
    @Param('id') documentoId: string,
  ) {
    const { empresaId } = req.user;
    return this.personalService.send(
      { cmd: 'delete_documento' },
      { empresaId, documentoId },
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post('nomina/vacaciones')
  solicitarVacaciones(@Request() req, @Body() dto: CreateSolicitudDto) {
    const { empresaId, empleadoId } = req.user; // Usamos el ID del token para seguridad
    // Forzamos el empleadoId del token si es un empleado normal
    // O permitimos que venga en el DTO si es admin creando para otro.
    // Para simplificar "Mi Solicitud":
    dto.empleadoId = empleadoId;

    return this.nominaService.send({ cmd: 'crear_solicitud_vacaciones' }, { empresaId, dto });
  }

  @UseGuards(JwtAuthGuard) // Solo admin debería ver todas
  @Get('nomina/vacaciones')
  getSolicitudes(@Request() req) {
    const { empresaId } = req.user;
    return this.nominaService.send({ cmd: 'get_solicitudes_vacaciones' }, { empresaId });
  }
  // ==========================================
  //        UTILIDAD: SEEDER (Poblar BD)
  // ==========================================

  @UseGuards(JwtAuthGuard)
  @Post('admin/seed-data')
  async seedData(@Request() req) {
    // 👇 2. USA EL ID DEL USUARIO LOGUEADO
    const { empresaId } = req.user;

    // Validación de seguridad para desarrollo
    if (!empresaId) {
      throw new BadRequestException('Necesitas estar logueado para ejecutar el seed.');
    }

    return this.productividadService.send({ cmd: 'seed_data' }, { empresaId });
  }
  // ==========================================
  //        REGISTRO: SUBIDA DE LOGO
  // ==========================================
  // Este endpoint es público porque el usuario aún no tiene token
  @Post('auth/upload-logo')
  @UseInterceptors(
    FileInterceptor('file', createMulterOptions(
      'temp/logos', // Lo guardamos en una carpeta temporal o pública
      2, // Max 2MB
      /\/(jpg|jpeg|png)$/
    ))
  )
  uploadCompanyLogo(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Archivo requerido');

    // Como es público, no tenemos empresaId. Usamos una ruta genérica.
    // El helper createMulterOptions usará 'public' o lo que definimos.
    // Asumimos que el helper usa 'public' si no hay user.

    // Construimos la URL pública
    // Nota: Ajusta la ruta si tu helper usa 'public' por defecto cuando no hay usuario
    const fileUrl = `http://localhost:3000/uploads/public/temp/logos/${file.filename}`;

    return { url: fileUrl };
  }
  @UseGuards(JwtAuthGuard) // Solo admin puede ejecutar esto
  @Post('admin/fix-permissions')
  async fixPermissions(@Request() req) {
    const { empresaId } = req.user;
    return this.personalService.send({ cmd: 'fix_permissions' }, { empresaId });
  }
  // ==========================================
  //        GESTIÓN DE SUCURSALES
  // ==========================================

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('sucursales.gestion') // Puedes crear este permiso o usar uno genérico
  @Post('sucursales')
  @UsePipes(new ValidationPipe())
  createSucursal(@Request() req, @Body() dto: CreateSucursalDto) {
    const { empresaId } = req.user;
    return this.personalService.send({ cmd: 'create_sucursal' }, { empresaId, dto });
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('sucursales.gestion')
  @Get('sucursales')
  getSucursales(@Request() req) {
    const { empresaId } = req.user;
    return this.personalService.send({ cmd: 'get_sucursales' }, { empresaId });
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('sucursales.gestion')
  @Patch('sucursales/:id')
  @UsePipes(new ValidationPipe())
  updateSucursal(@Request() req, @Param('id') sucursalId: string, @Body() dto: UpdateSucursalDto) {
    const { empresaId } = req.user;
    return this.personalService.send({ cmd: 'update_sucursal' }, { empresaId, sucursalId, dto });
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('sucursales.gestion')
  @Delete('sucursales/:id')
  deleteSucursal(@Request() req, @Param('id') sucursalId: string) {
    const { empresaId } = req.user;
    return this.personalService.send({ cmd: 'delete_sucursal' }, { empresaId, sucursalId });
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/switch-company')
  switchCompany(@Request() req, @Body('empresaId') empresaId: string) {
    console.log('🔍 req.user:', req.user);

    // ✅ Usar userId en lugar de sub
    const usuarioId = req.user?.userId;

    if (!usuarioId) {
      throw new UnauthorizedException('No se pudo obtener el usuario del token');
    }

    console.log('📤 Enviando al microservicio:', { usuarioId, empresaId });

    return this.authService.send({ cmd: 'switch_company' }, { usuarioId, empresaId });
  }
  @UseGuards(JwtAuthGuard)
  @Post('auth/create-company-user')
  createCompanyUser(@Request() req, @Body() body: any) {
    const usuarioId = req.user.sub;
    return this.authService.send({ cmd: 'create_company_user' }, { usuarioId, ...body });
  }
  @UseGuards(JwtAuthGuard)
  @Get('desempeno/ciclos/:cicloId/departamentos/:deptoId/objetivos')
  getObjetivosDepto(
    @Request() req,
    @Param('cicloId') cicloId: string,
    @Param('deptoId') deptoId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'get_objetivos_departamento' }, { empresaId, cicloId, departamentoId: deptoId });
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.objetivos.read')
  @Get('desempeno/ciclos/:cicloId/objetivos-globales') // <--- Nueva ruta
  getAllObjetivos(
    @Request() req,
    @Param('cicloId') cicloId: string
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'get_all_objetivos' }, { empresaId, cicloId });
  }
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.objetivos.delete') // O un permiso genérico de admin
  @Delete('desempeno/objetivos/:id')
  deleteObjetivo(@Request() req, @Param('id') objetivoId: string) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'delete_objetivo' }, { empresaId, objetivoId });
  }

  // 1. VER VACANTE PÚBLICA (GET /public/vacantes/:id)
  // Nota: Sin @UseGuards para que cualquiera pueda verla
  @Get('public/vacantes/:id')
  getPublicVacancy(@Param('id') id: string) {
    console.log(`Gateway: Petición pública vacante ${id}`);
    // Enviamos solo el ID, no necesitamos empresaId porque es público
    return this.personalService.send(
      { cmd: 'get_public_vacancy' },
      { vacanteId: id }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('nomina/novedades')
  async crearNovedad(@Request() req, @Body() body: any) {
    const { empresaId } = req.user;

    // Pass the payload to the microservice
    return this.nominaService.send(
      { cmd: 'crear_novedad' },
      { ...body, empresaId }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('nomina/novedades/empleado/:id') // Nueva ruta
  async getNovedadesEmpleado(@Param('id') id: string) {
    return this.nominaService.send(
      { cmd: 'obtener_novedades_empleado' },
      { empleadoId: id }
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('nomina/configuracion')
  async getNominaConfig(@Request() req) {
    return this.nominaService.send(
      { cmd: 'get_configuracion_nomina' },
      { empresaId: req.user.empresaId }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('nomina/configuracion')
  async updateNominaConfig(@Request() req, @Body() config: any) {
    return this.nominaService.send(
      { cmd: 'update_configuracion_nomina' },
      { empresaId: req.user.empresaId, config }
    );
  }
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('nomina.reportes') // O el permiso que desees
  @Get('nomina/reportes/:periodoId')
  async getReporteNomina(@Request() req, @Param('periodoId') periodoId: string) {
    return this.nominaService.send(
      { cmd: 'obtener_reporte_nomina' },
      { empresaId: req.user.empresaId, periodoId }
    );
  }
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('empleados.crear') // Usamos el permiso de crear, o crea uno nuevo 'empleados.importar'
  @Post('empleados/importar-masivo')    // 👈 Esta es la URL que llamará el Frontend
  importarMasivoEmpleados(
    @Request() req,
    @Body() body: { employees: any[] } // El frontend envía { employees: [...] }
  ) {
    const { empresaId } = req.user;

    // Enviamos el comando al Microservicio de Personal
    // Asegúrate de que 'this.personalService' sea tu ClientProxy inyectado
    return this.personalService.send(
      { cmd: 'import_bulk_empleados' }, // 👈 Debe coincidir con el @MessagePattern del Microservicio
      {
        empresaId,
        empleados: body.employees
      }
    );
  }
  /**
   * 1. CREAR PLANTILLA (Para RRHH)
   * Ruta: POST /onboarding/plantillas
   */
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('onboarding.gestion') // O usa 'empleados.crear' si prefieres
  @Post('onboarding/plantillas')
  crearPlantillaOnboarding(@Request() req, @Body() dto: any) {
    const { empresaId } = req.user;

    return this.personalService.send(
      { cmd: 'create_onboarding_template' }, // 👈 Coincide con Microservicio
      { empresaId, dto }
    );
  }

  /**
   * 2. ASIGNAR PLANTILLA A EMPLEADO
   * Ruta: POST /onboarding/asignar
   */
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('empleados.editar')
  @Post('onboarding/asignar')
  asignarOnboarding(@Body() body: { empleadoId: string; plantillaId: string }) {
    // Aquí no necesitamos empresaId porque ya va implícito en el empleado
    return this.personalService.send(
      { cmd: 'assign_onboarding' },
      {
        empleadoId: body.empleadoId,
        plantillaId: body.plantillaId
      }
    );
  }

  /**
   * 3. VER MIS TAREAS (Para el Empleado - Dashboard)
   * Ruta: GET /empleados/me/onboarding
   */
  @UseGuards(JwtAuthGuard) // Solo necesita estar logueado
  @Get('empleados/me/onboarding')
  getMisTareasOnboarding(@Request() req) {
    // ⚠️ IMPORTANTE: Asumo que tu JWT Strategy agrega 'empleadoId' al req.user.
    // Si tu usuario es Administrador y no tiene empleadoId, esto podría llegar null.
    // Verifica que req.user.empleadoId exista.
    const { empleadoId } = req.user;

    return this.personalService.send(
      { cmd: 'get_my_onboarding' },
      { empleadoId }
    );
  }

  /**
   * 4. MARCAR TAREA COMO COMPLETADA/PENDIENTE
   * Ruta: PATCH /empleados/me/onboarding/:tareaId
   */
  @UseGuards(JwtAuthGuard)
  @Patch('empleados/me/onboarding/:tareaId')
  toggleTareaOnboarding(
    @Param('tareaId') tareaId: string,
    @Body() body: { isComplete: boolean }
  ) {
    return this.personalService.send(
      { cmd: 'toggle_onboarding_task' },
      {
        tareaId,
        isComplete: body.isComplete
      }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('onboarding/seed-test')
  runSeedTest(@Request() req) {
    const { empresaId, empleadoId } = req.user; // Asegúrate de tener empleadoId en el token
    // Si tu usuario admin no tiene empleadoId, tendrás que pasarlo por body

    return this.personalService.send(
      { cmd: 'seed_onboarding_test' },
      { empresaId, empleadoId }
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission(PERMISSIONS.ROLES_MANAGE) // Solo admins pueden hacer esto
  @Post('roles/seed-defaults')
  seedRolesDefault(@Request() req) {
    // Tomamos el ID de la empresa del usuario logueado
    const { empresaId } = req.user;

    console.log(`📡 Gateway: Solicitando roles por defecto para empresa ${empresaId}`);

    return this.personalService.send(
      { cmd: 'seed_roles_default' },
      { empresaId }
    );
  }

  // ==========================================
  //  DOCUMENTOS CORPORATIVOS
  // ==========================================

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('documentos.gestion')
  @Post('documentos-empresa')
  createDocEmpresa(
    @Request() req,
    @Body() dto: CreateDocumentoEmpresaDto,
    @Headers('x-sucursal-id') headerSucursalId: string
  ) {
    const { empresaId, sucursalId } = req.user;

    // LÓGICA DE ASIGNACIÓN:
    // 1. Gerente: Siempre Local.
    if (sucursalId) {
      dto.sucursalId = sucursalId;
    }
    // 2. Admin: 
    //    - Si tiene filtro en Navbar -> Lo crea Local para esa sede.
    //    - Si NO tiene filtro -> Lo crea GLOBAL (sucursalId undefined).
    else if (headerSucursalId) {
      dto.sucursalId = headerSucursalId;
    }

    return this.personalService.send(
      { cmd: 'create_doc_empresa' },
      { empresaId, dto }
    );
  }

  @UseGuards(JwtAuthGuard) // Permiso más relajado (lectura)
  @Get('documentos-empresa')
  getDocsEmpresa(
    @Request() req,
    @Headers('x-sucursal-id') headerSucursalId: string
  ) {
    const { empresaId, sucursalId } = req.user;
    const filtroFinal = sucursalId ? sucursalId : headerSucursalId;

    return this.personalService.send(
      { cmd: 'get_docs_empresa' },
      { empresaId, filtroSucursalId: filtroFinal }
    );
  }

  // ==========================================
  //  SUBIDA DE ARCHIVOS CORPORATIVOS (Solo físico)
  // ==========================================
  @UseGuards(JwtAuthGuard) // Necesario para obtener req.user.empresaId
  @Post('documentos-empresa/upload') // Endpoint: localhost:3000/documentos-empresa/upload
  @UseInterceptors(
    // Reutilizamos TU helper. 
    // Guardará en: /uploads/{empresaId}/documentos-empresa/archivo.pdf
    FileInterceptor('file', createMulterOptions('documentos-empresa', 10)) // 10MB max
  )
  uploadDocumentoFisico(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Archivo requerido');

    const { empresaId } = req.user;

    // Construimos la URL igual que en tu ejemplo de certificados
    // Asegúrate de que 'uploads' sea estático en tu app.module
    const fileUrl = `http://localhost:3000/uploads/${empresaId}/documentos-empresa/${file.filename}`;

    // Devolvemos la URL para que el Frontend la use en el paso 2
    return { url: fileUrl };
  }
  // ===================== ANUNCIOS =====================

  @UseGuards(JwtAuthGuard)
  @Post('anuncios')
  createAnuncio(
    @Request() req,
    @Body() dto: CreateAnuncioDto,
    @Headers('x-sucursal-id') headerSucursalId: string // 👈 1. Capturamos Header
  ) {
    const { empresaId, sucursalId } = req.user;

    // LÓGICA DE ASIGNACIÓN (IGUAL QUE EN DOCUMENTOS):

    // A. Si soy Gerente/Empleado (tengo sucursal en token):
    if (sucursalId) {
      dto.sucursalId = sucursalId; // Se fuerza mi sucursal
    }
    // B. Si soy Admin (no tengo sucursal, pero quizás mandé header):
    else if (headerSucursalId) {
      dto.sucursalId = headerSucursalId; // Uso el filtro del Navbar
    }
    // C. Si no soy nada de lo anterior y no mandé header -> Queda undefined (GLOBAL)

    return this.productividadService.send(
      { cmd: 'create_anuncio' },
      { empresaId, dto }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('anuncios')
  getMyAnuncios(
    @Request() req,
    @Headers('x-sucursal-id') headerSucursalId: string
  ) {
    // req.user viene de tu JwtStrategy
    const { empresaId, sucursalId, role } = req.user;

    console.log('--- DEBUG ANUNCIOS GATEWAY ---');
    console.log('Usuario:', req.user.email);
    console.log('Rol:', role);
    console.log('Sucursal en Token:', sucursalId); // 👈 ESTO ES CLAVE

    // LÓGICA DE PRIORIDAD:
    // 1. Si el usuario TIENE sucursal fija (Empleado/Gerente), USAMOS ESA OBLIGATORIAMENTE.
    // 2. Si es Admin (sucursalId es null), intentamos usar el Header del Navbar.
    // 3. Si no hay nada, mandamos undefined (y el servicio mostrará solo Globales).

    const filtroFinal = sucursalId ? sucursalId : headerSucursalId;

    return this.productividadService.send(
      { cmd: 'get_anuncios' },
      {
        empresaId,
        filtroSucursalId: filtroFinal
      }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('encuestas')
  createEncuesta(@Request() req, @Body() dto: CreateEncuestaDto) {
    return this.productividadService.send(
      { cmd: 'create_encuesta' },
      {
        empresaId: req.user.empresaId,
        user: req.user, // 👈 AGREGA ESTA LÍNEA (Sin esto fallará la validación de rol)
        dto
      }
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('encuestas')
  getMyEncuestas(@Request() req) {
    return this.productividadService.send(
      { cmd: 'get_encuestas' },
      {
        empresaId: req.user.empresaId,
        sucursalId: req.user.sucursalId,
        empleadoId: req.user.sub
      }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('productividad/admin/encuestas')
  getAllSurveysAdmin(@Request() req) {
    return this.productividadService.send(
      { cmd: 'get_all_encuestas_admin' },
      { empresaId: req.user.empresaId } // Ahora req.user SÍ existirá
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post('encuestas/:id/votar')
  votarEncuesta(
    @Request() req,
    @Param('id') encuestaId: string,
    @Body() dto: VoteDto
  ) {
    return this.productividadService.send(
      { cmd: 'registrar_voto' },
      {
        encuestaId,
        opcionId: dto.opcionId,
        empleadoId: req.user.sub
      }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('nomina/vacaciones/:id/responder')
  async responderSolicitudVacaciones(
    @Request() req,
    @Param('id') solicitudId: string,
    @Body() dto: ResponderSolicitudDto
  ) {
    const { empresaId, sucursalId, role } = req.user;

    // 1. Llamar a NÓMINA para aprobar/rechazar
    // El Gateway solo actúa de intermediario, que es su función correcta.
    const solicitud = await lastValueFrom(
      this.nominaService.send(
        { cmd: 'responder_solicitud_vacaciones' },
        {
          empresaId,
          solicitudId,
          dto,
          usuario: { role, sucursalId }
        }
      )
    );

    return solicitud;
  }

  // 5. RECHAZAR CANDIDATO (PATCH /reclutamiento/vacantes/:vacanteId/candidatos/:candidatoId/rechazar)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('reclutamiento.gestion')
  @Patch('reclutamiento/vacantes/:vacanteId/candidatos/:candidatoId/rechazar')
  rechazarCandidato(
    @Request() req,
    @Param('vacanteId') vacanteId: string,
    @Param('candidatoId') candidatoId: string,
    @Body() body: { motivo?: string }, // Recibimos el motivo opcional del body
  ) {
    const { empresaId } = req.user;

    // Enviamos al microservicio
    return this.personalService.send(
      { cmd: 'rechazar_candidato' },
      {
        empresaId,
        vacanteId,
        candidatoId,
        motivo: body.motivo
      },
    );
  }

  // 1. OBTENER CONFIGURACIÓN (GET /empresas/configuracion)
  // Sirve para pintar los toggles y formularios en el Front
  @UseGuards(JwtAuthGuard)
  @Get('empresas/configuracion')
  async getEmpresaConfig(@Request() req) {
    const { empresaId } = req.user;

    // Enviamos al microservicio de Auth (donde vive la Empresa)
    return this.authService.send(
      { cmd: 'get_company_config' },
      { empresaId }
    );
  }

  // 2. GUARDAR CONFIGURACIÓN (PATCH /empresas/configuracion)
  // Sirve para el botón "Guardar Cambios" de Módulos, Asistencia, etc.
  @UseGuards(JwtAuthGuard)
  @Patch('empresas/configuracion')
  async updateEmpresaConfig(
    @Request() req,
    @Body() dto: UpdateConfiguracionEmpresaDto // Validación con el DTO que creamos
  ) {
    const { empresaId } = req.user;

    // Enviamos al microservicio de Auth
    return this.authService.send(
      { cmd: 'update_company_config' },
      {
        empresaId,
        config: dto // Pasamos el objeto validado dentro del payload
      }
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('auth/change-password') // <--- Definimos la ruta completa aquí
  async changePassword(
    @Request() req,
    @Body() dto: ChangePasswordDto // El DTO que definimos antes
  ) {
    // En tu JWT Strategy, normalmente el ID viene en 'sub' o 'userId'
    // Revisa tu payload, pero asumo que es 'sub' o 'id'
    const userId = req.user.sub || req.user.id || req.user.userId;

    // Enviamos al microservicio de Auth
    return this.authService.send(
      { cmd: 'change_password' }, // El comando para el microservicio
      {
        userId,
        dto // Enviamos { passwordActual, nuevaPassword }
      }
    );
  }

  // ============================================================
  // 1. OBTENER SALDO (GET /nomina/vacaciones/saldo/:id)
  // ============================================================
  @UseGuards(JwtAuthGuard)
  @Get('nomina/vacaciones/saldo/:empleadoId')
  async getSaldoVacaciones(@Param('empleadoId') empleadoId: string) {
    // Enviamos mensaje al microservicio de nómina
    return this.nominaService.send(
      { cmd: 'get_saldo_vacaciones' }, // El comando
      { empleadoId }                   // El payload
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('usuarios/configuracion') // Ruta limpia
  async updateConfig(@Request() req, @Body() config: any) {
    // Obtenemos el ID del usuario directamente del Token (seguridad)
    // Dependiendo de tu estrategia JWT, puede ser req.user.id o req.user.sub
    const usuarioId = req.user.id;

    return this.authService.send(
      { cmd: 'update_user_config' },
      { usuarioId, config }
    );
  }

  // 1. GET ONE (Para ver resultados o detalle)
  @UseGuards(JwtAuthGuard)
  @Get('productividad/encuestas/:id')
  async getEncuestaById(@Request() req, @Param('id') encuestaId: string) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_encuesta_detail' },
      { encuestaId, empresaId }
    );
  }

  // 2. UPDATE (Editar o Cerrar/Abrir)
  @UseGuards(JwtAuthGuard)
  @Patch('productividad/encuestas/:id')
  async updateEncuesta(
    @Request() req,
    @Param('id') encuestaId: string,
    @Body() dto: any // O tu UpdateEncuestaDto
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_encuesta' },
      { encuestaId, empresaId, dto }
    );
  }

  // 3. DELETE (Eliminar)
  @UseGuards(JwtAuthGuard)
  @Delete('productividad/encuestas/:id')
  async deleteEncuesta(@Request() req, @Param('id') encuestaId: string) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'delete_encuesta' },
      { encuestaId, empresaId }
    );
  }


  @UseGuards(JwtAuthGuard)
  @Post('ia/chat')
  async chatConIA(@Body() body: { pregunta: string }) {
    return this.personalService.send(
      { cmd: 'consultar_ia_puente' },
      { pregunta: body.pregunta }
    );
  }

  @Post('personal/ia/sincronizar')
  async triggerSincronizacionIA() {
    return this.personalService.send({ cmd: 'sincronizar_ia' }, {});
  }
}
