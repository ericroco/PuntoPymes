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
    ]),
    // 1. CLIENTE PARA LLAMAR AL AUTH SERVICE
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          // 👇 AQUÍ ESTÁ EL ERROR: Probablemente no pusiste host, o por defecto usa localhost
          host: 'auth_service', // <--- AGREGAR ESTA LÍNEA OBLIGATORIAMENTE
          port: 3001
        },
      },
    ]),
    // 2. CONFIGURACIÓN DE CORREO (Usando Gmail como ejemplo)
    // En producción, usa variables de entorno (process.env.SMTP_...)
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // O tu proveedor (Outlook, AWS SES)
        port: 587,
        secure: false,
        auth: {
          user: 'erickrodas559@gmail.com', // ⚠️ PON TU CORREO REAL AQUÍ PARA PROBAR
          pass: 'tqhl basq ufjw vyor',     // ⚠️ GENERA UNA APP PASSWORD EN GOOGLE
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