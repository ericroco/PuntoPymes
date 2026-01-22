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
import { UpdateConfiguracionEmpresaDto } from './dto/update-configuracion.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern({ cmd: 'ping' })
  ping(_data: any) {
    console.log('¡Ping recibido en el microservicio Auth!');
    return 'Pong desde el Microservicio Auth';
  }

  @MessagePattern({ cmd: 'register' })
  @UsePipes(new ValidationPipe())
  register(@Payload() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @MessagePattern({ cmd: 'login' })
  @UsePipes(new ValidationPipe())
  login(@Payload() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @MessagePattern({ cmd: 'create_user_auto' })
  async createUserAuto(@Payload() data: { empleadoId: string; email: string; nombre: string; empresaId: string }) {
    return this.authService.createUserForEmployee(data);
  }

  @MessagePattern({ cmd: 'create_company_existing' })
  async createCompanyExisting(@Payload() data: any) {
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
    return this.authService.getCompanyDetail(data.empresaId, data.userId);
  }

  @MessagePattern({ cmd: 'update_company_branding' })
  async updateBranding(@Payload() data: { empresaId: string, branding: any }) {
    return this.authService.updateCompanyBranding(data.empresaId, data.branding);
  }

  @MessagePattern({ cmd: 'get_company_config' })
  async getCompanyConfig(@Payload() data: { empresaId: string }) {
    return this.authService.getCompanyConfig(data.empresaId);
  }

  @MessagePattern({ cmd: 'update_company_config' })
  async updateCompanyConfig(@Payload() data: { empresaId: string, config: any }) {
    return this.authService.updateCompanyConfig(data.empresaId, data.config);
  }

  @MessagePattern({ cmd: 'update_user_config' })
  async updateUserConfig(@Payload() data: { usuarioId: string, config: any }) {
    return this.authService.updateUserConfig(data.usuarioId, data.config);
  }

  @MessagePattern({ cmd: 'change_password' })
  async changePassword(@Payload() data: { userId: string, dto: any }) {
    return this.authService.changePassword(data.userId, data.dto);
  }
  @MessagePattern({ cmd: 'request_reset_password' })
  async requestReset(@Payload() data: { email: string }) {
    return this.authService.requestPasswordReset(data.email);
  }

  @MessagePattern({ cmd: 'reset_password' })
  async resetPassword(@Payload() data: { token: string; newPassword: string }) {
    return this.authService.resetPassword(data.token, data.newPassword);
  }
}