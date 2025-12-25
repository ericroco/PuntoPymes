// apps/auth/src/auth.controller.ts
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
// 1. Importar MessagePattern y Payload
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
// 2. Importar el DTO de Registro
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SwitchCompanyDto } from './dto/switch-company.dto';
import { RpcException } from '@nestjs/microservices';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Escucha el patrón 'ping' (para pruebas)
   */
  @MessagePattern({ cmd: 'ping' })
  ping(_data: any) {
    console.log('¡Ping recibido en el microservicio Auth!');
    return 'Pong desde el Microservicio Auth';
  }

  // --- ¡ESTE ES EL BLOQUE NUEVO QUE FALTABA! ---

  /**
   * Escucha el patrón 'register' desde el API Gateway.
   * @param registerDto Los datos validados
   */
  @MessagePattern({ cmd: 'register' })
  // Habilitamos la validación del DTO (Paso 8.A)
  // Esto comprueba el DTO contra las reglas (@IsEmail, @MinLength, etc.)
  @UsePipes(new ValidationPipe())
  register(@Payload() registerDto: RegisterDto) {
    console.log('Registro recibido en el microservicio Auth');

    // Llama a la lógica de negocio que escribimos en el AuthService
    // (la que crea la Empresa, Usuario, Rol, Depto, Cargo y Empleado)
    return this.authService.register(registerDto);
  }
  @MessagePattern({ cmd: 'login' })
  @UsePipes(new ValidationPipe())
  login(@Payload() loginDto: LoginDto) {
    console.log('Login recibido en el microservicio Auth para:', loginDto.email);
    return this.authService.login(loginDto);
  }
  @MessagePattern({ cmd: 'create_user_auto' })
  async createUserAuto(@Payload() data: { empleadoId: string; email: string; nombre: string; empresaId: string }) {
    return this.authService.createUserForEmployee(data);
  }

  @MessagePattern({ cmd: 'create_company_existing' })
  async createCompanyExisting(@Payload() data: any) {
    // 🔥 LOGS DE DEBUGGING
    console.log('═══════════════════════════════════════');
    console.log('📨 MICROSERVICIO AUTH - Recibido cmd create_company_existing');
    console.log('👤 UsuarioId recibido:', data.usuarioId);
    console.log('📦 Datos completos:', data);
    console.log('═══════════════════════════════════════');

    if (!data.usuarioId) {
      throw new RpcException('usuarioId es requerido');
    }

    return this.authService.createCompanyForExistingUser(data.usuarioId, data);
  }

  @MessagePattern({ cmd: 'switch_company' })
  switchCompany(@Payload() data: SwitchCompanyDto) {
    return this.authService.switchCompany(data);
  }
  @MessagePattern({ cmd: 'create_company_user' })
  createCompanyUser(@Payload() data: { usuarioId: string; nombre: string; plan: string; branding: any }) {
    return this.authService.createCompanyForUser(data.usuarioId, data);
  }

  @MessagePattern({ cmd: 'get_company_detail' })
  async getCompanyDetail(@Payload() data: { empresaId: string, userId: string }) {
    // Si tienes empresaId, busca por eso. Si no, busca por usuario.
    return this.authService.getCompanyDetail(data.empresaId, data.userId);
  }

  @MessagePattern({ cmd: 'update_company_branding' })
  async updateBranding(@Payload() data: { empresaId: string, branding: any }) {
    return this.authService.updateCompanyBranding(data.empresaId, data.branding);
  }
}