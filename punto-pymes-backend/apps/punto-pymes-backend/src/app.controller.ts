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

  // --- Endpoints de Personal (Protegidos) ---

  @UseGuards(JwtAuthGuard)
  @Get('empleados')
  getEmpleados(@Request() req) {
    const { empresaId } = req.user;
    console.log(`Gateway: Pidiendo empleados para empresaId: ${empresaId}`);
    return this.personalService.send(
      { cmd: 'get_empleados' },
      { empresaId: empresaId },
    );
  }
  /**
   * Crea un nuevo empleado (RF-01-01)
   */
  @UseGuards(JwtAuthGuard) // 1. Protegido: Solo usuarios con token pueden crear
  @Post('empleados')
  @UsePipes(new ValidationPipe())
  createEmpleado(
    @Request() req, // 2. Para obtener el req.user (con el token)
    @Body() dto: CreateEmpleadoDto, // 3. Para obtener el body (con los datos del nuevo empleado)
  ) {
    // 4. Extraemos el 'empresaId' del token del admin
    const { empresaId } = req.user;

    console.log(`Gateway: Petición POST /empleados para empresaId: ${empresaId}`);

    // 5. Enviamos AMBAS cosas (el empresaId y el DTO) al microservicio
    return this.personalService.send(
      { cmd: 'create_empleado' },
      {
        empresaId: empresaId,
        dto: dto,
      },
    );
  }// --- 4. ¡NUEVO ENDPOINT PATCH /empleados/:id! (RF-01-03) ---
  // NUEVO: Obtener un empleado por ID
  @UseGuards(JwtAuthGuard) // Protegido, pero accesible para empleados (si ajustas permisos)
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
  /**
   * Actualiza un empleado (RF-01-03)
   * @param id El ID del empleado a actualizar (de la URL)
   */
  @UseGuards(JwtAuthGuard) // 1. Protegido por "la cerradura"
  @Patch('empleados/:id') // 2. Escucha en PATCH /empleados/abc-123
  @UsePipes(new ValidationPipe())
  updateEmpleado(
    @Request() req, // 3. Para obtener el req.user (con el empresaId)
    @Param('id') empleadoId: string, // 4. Para obtener el ID de la URL
    @Body() dto: UpdateEmpleadoDto, // 5. Para obtener el body (con los datos a cambiar)
  ) {
    // 6. Extraemos el 'empresaId' del token del admin
    const { empresaId } = req.user;

    console.log(
      `Gateway: Petición PATCH /empleados/${empleadoId} para empresaId: ${empresaId}`,
    );

    // 7. Enviamos TODO (el empresaId, el empleadoId y el DTO) al microservicio
    return this.personalService.send(
      { cmd: 'update_empleado' },
      {
        empresaId: empresaId,
        empleadoId: empleadoId,
        dto: dto,
      },
    );
  }
  /**
   * Desactiva (Soft Delete) un empleado (RF-01-04)
   */
  @UseGuards(JwtAuthGuard)
  @Delete('empleados/:id') // <-- Escucha en DELETE /empleados/abc-123
  deleteEmpleado(
    @Request() req,
    @Param('id') empleadoId: string, // <-- Lee el ID de la URL
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
  @UseGuards(JwtAuthGuard) // 1. Protegido
  @Post('departamentos') // 2. Escucha en POST /departamentos
  @UsePipes(new ValidationPipe())
  createDepartamento(
    @Request() req, // 3. Para obtener el empresaId del token
    @Body() dto: CreateDepartamentoDto, // 4. Para obtener el 'nombre' del body
  ) {
    const { empresaId } = req.user;
    console.log(`Gateway: Petición POST /departamentos para empresaId: ${empresaId}`);

    return this.personalService.send(
      { cmd: 'create_departamento' },
      {
        empresaId: empresaId,
        dto: dto,
      },
    );
  }
  /**
   * Obtiene la lista de departamentos para la empresa del usuario (RF-02)
   */
  @UseGuards(JwtAuthGuard) // <-- Protegido
  @Get('departamentos') // <-- La nueva ruta GET
  getDepartamentos(@Request() req) {
    // Extraemos el 'empresaId' del token
    const { empresaId } = req.user;

    console.log(`Gateway: Pidiendo departamentos para empresaId: ${empresaId}`);

    // Enviamos el mensaje al microservicio PERSONAL
    return this.personalService.send(
      { cmd: 'get_departamentos' },
      { empresaId: empresaId },
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
  @Get('cargos') // <-- Escucha en GET /cargos
  getCargos(@Request() req) {
    const { empresaId } = req.user;
    console.log(
      `Gateway: Petición GET /cargos para empresaId: ${empresaId}`,
    );

    // Envía el mensaje al microservicio PERSONAL
    return this.personalService.send(
      { cmd: 'get_cargos' },
      { empresaId: empresaId },
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
    @Body() dto: UpdateBeneficioDto,
    NT) {
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

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.proyectos.read') // <-- Define tu permiso
  @Get('proyectos')
  getProyectos(@Request() req) {
    const { empresaId } = req.user;
    // Envía el mensaje al microservicio de productividad
    return this.productividadService.send(
      { cmd: 'get_proyectos' }, // El "comando" que escuchará
      { empresaId: empresaId },
    );
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('productividad.proyectos.create')
  @Post('proyectos')
  @UsePipes(new ValidationPipe())
  createProyecto(
    @Request() req,
    @Body() dto: CreateProyectoDto, // <-- El DTO que ya creamos
  ) {
    const { empresaId } = req.user;
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

  // 4. BORRAR OBJETIVO (DELETE /desempeno/objetivos/:id)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('desempeno.objetivos.delete')
  @Delete('desempeno/objetivos/:id')
  deleteObjetivo(
    @Request() req,
    @Param('id') objetivoId: string,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'delete_objetivo' },
      { empresaId, objetivoId },
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
  //        GESTIÓN DE ACTIVOS
  // ==========================================

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.gestion') // Permiso sugerido
  @Post('activos')
  @UsePipes(new ValidationPipe({ transform: true }))
  createActivo(@Request() req, @Body() dto: CreateActivoDto) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'create_activo' }, { empresaId, dto });
  }

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('activos.gestion')
  @Get('activos')
  getActivos(@Request() req) {
    const { empresaId } = req.user;
    return this.productividadService.send({ cmd: 'get_activos' }, { empresaId });
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

  // 2. AGREGAR ÍTEM (Factura)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('gastos.reportar')
  @Post('gastos/reportes/:reporteId/items')
  @UsePipes(new ValidationPipe({ transform: true }))
  addItemGasto(
    @Request() req,
    @Param('reporteId') reporteId: string,
    @Body() dto: CreateItemGastoDto,
  ) {
    const { empresaId } = req.user;
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
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('gastos.aprobar')
  @Patch('gastos/reportes/:id/estado')
  updateReporteEstado(
    @Request() req,
    @Param('id') reporteId: string,
    @Body() dto: UpdateReporteEstadoDto,
  ) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'update_reporte_estado' },
      { empresaId, reporteId, dto },
    );
  }
  // ==========================================
  //        DASHBOARD & ANALÍTICAS
  // ==========================================

  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('analiticas.ver') // Permiso para ver el dashboard
  @Get('analiticas/dashboard')
  getDashboard(@Request() req) {
    const { empresaId } = req.user;
    return this.productividadService.send(
      { cmd: 'get_dashboard_kpis' },
      { empresaId },
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
  uploadCertificado(
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

  // 1. PUBLICAR VACANTE (Admin)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('reclutamiento.gestion')
  @Post('reclutamiento/vacantes')
  @UsePipes(new ValidationPipe())
  createVacante(
    @Request() req,
    @Body() dto: CreateVacanteDto,
  ) {
    const { empresaId } = req.user;
    return this.personalService.send(
      { cmd: 'create_vacante' },
      { empresaId, dto },
    );
  }

  // 2. LISTAR VACANTES (Público o Admin)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermission('reclutamiento.gestion')
  @Get('reclutamiento/vacantes')
  getVacantesAdmin(@Request() req) {
    const { empresaId } = req.user;
    return this.personalService.send(
      { cmd: 'get_vacantes' },
      { empresaId, publicas: false },
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
}
