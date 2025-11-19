// apps/punto-pymes-backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),

    // --- (INICIO DE CAMBIOS) ---
    // 1. Registra AMBOS microservicios
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'auth_service',
            port: +configService.get<number>('AUTH_SERVICE_PORT')!,
          },
        }),
      },
      // 2. AÑADE EL NUEVO SERVICIO
      {
        name: 'PERSONAL_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'personal_service', // <-- Nombre del servicio en Docker
            port: +configService.get<number>('PERSONAL_SERVICE_PORT')!,
          },
        }),
      },
      {
        name: 'NOMINA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'nomina_service',
            port: +configService.get<number>('NOMINA_SERVICE_PORT')!,
          },
        }),
      },
      {
        name: 'PRODUCTIVIDAD_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'productividad_service', // <-- Nombre del servicio en Docker
            port: +configService.get<number>('PRODUCTIVIDAD_SERVICE_PORT')!,
          },
        }),
      },
    ]),
    // --- (FIN DE CAMBIOS) ---

    JwtModule.registerAsync({
      // ... (tu configuración de JwtModule)
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<string>('JWT_EXPIRES_IN')!,
        },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }