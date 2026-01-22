// apps/personal/src/personal.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OnboardingService } from './onboarding.service';

// --- 1. IMPORTAR ConfigModule ---
import { ConfigModule } from '@nestjs/config';

// Importa el DatabaseModule y las entidades que usará este servicio
import {
  DatabaseModule,
  Empleado,
  Departamento,
  Cargo,
  Rol,
  Contrato,
  Vacante,
  Candidato,
  Usuario,
  DocumentoEmpleado,
  Sucursal,
  PlantillaOnboarding,
  TareaPlantilla,
  TareaEmpleado,
  DocumentoEmpresa,
} from 'default/database'; // <-- Usa tu prefijo correcto

@Module({
  imports: [
    // --- 2. AÑADIR ConfigModule.forRoot() ---
    // Esto hace que ConfigService esté disponible en el "contexto"
    // de PersonalModule, para que main.ts pueda encontrarlo al arrancar.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),

    DatabaseModule,

    TypeOrmModule.forFeature([
      Empleado,
      Departamento,
      Cargo,
      Rol, Contrato,
      Vacante,
      Candidato,
      Usuario,
      DocumentoEmpleado,
      Sucursal,
      PlantillaOnboarding,
      TareaPlantilla,
      TareaEmpleado,
      DocumentoEmpresa,
    ]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'auth_service',
          port: 3001
        },
      },
      {
        name: 'IA_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'ia_service', // Nombre del servicio en Docker Compose
          port: 3005          // El puerto que definimos para la IA
        },
      },
    ]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'erickrodas559@gmail.com',
          pass: 'tqhl basq ufjw vyor',
        },
      },
      defaults: {
        from: '"PuntoPyMES RRHH" <noreply@puntopymes.com>',
      },
    }),
  ],
  controllers: [PersonalController],
  providers: [PersonalService, OnboardingService],
})
export class PersonalModule { }