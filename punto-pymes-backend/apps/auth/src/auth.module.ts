// apps/auth/src/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// 1. Importa las 2 entidades ADICIONALES
import {
  DatabaseModule,
  Usuario,
  Empresa,
  Rol,
  Empleado,
  Departamento, // <-- AÑADIR
  Cargo,        // <-- AÑADIR
} from 'default/database'; // Usando tu prefijo correcto

@Module({
  imports: [
    DatabaseModule,

    // 2. Añade las 2 entidades al array 'forFeature'
    TypeOrmModule.forFeature([
      Usuario,
      Empresa,
      Rol,
      Empleado,
      Departamento, // <-- AÑADIR
      Cargo,        // <-- AÑADIR
    ]),
    JwtModule.registerAsync({
      // Importamos ConfigModule para que esté disponible
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './.env',
        }),
      ],
      // Inyectamos el ConfigService
      inject: [ConfigService],
      // Usamos la factory para leer el .env
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Carga el secreto
        signOptions: {
          // El '+' convierte el string "86400" en el número 86400
          // El '!' le dice a TypeScript "confía en mí, este valor no será undefined"
          expiresIn: +configService.get<string>('JWT_EXPIRES_IN')!,
        },
      }),
    }),
    // --- (FIN DE CAMBIOS) ---
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }