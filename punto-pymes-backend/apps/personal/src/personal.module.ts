// apps/personal/src/personal.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalController } from './personal.controller';
import { PersonalService } from './personal.service';

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
    ]),
  ],
  controllers: [PersonalController],
  providers: [PersonalService],
})
export class PersonalModule { }