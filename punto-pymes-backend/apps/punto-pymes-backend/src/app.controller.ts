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
} from '@nestjs/common';
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
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('PERSONAL_SERVICE') private readonly personalService: ClientProxy,
    @Inject('NOMINA_SERVICE') private readonly nominaService: ClientProxy,
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
}