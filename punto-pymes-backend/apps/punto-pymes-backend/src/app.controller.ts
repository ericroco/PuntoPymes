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

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('PERSONAL_SERVICE') private readonly personalService: ClientProxy,
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
   * Crea un nuevo cargo (RF-02)
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
}