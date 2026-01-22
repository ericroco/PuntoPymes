// apps/auth/src/auth.module.ts 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailerModule } from '@nestjs-modules/mailer';

import {
  DatabaseModule,
  Usuario,
  Empresa,
  Rol,
  Empleado,
  Departamento,
  Cargo,
  Contrato,
} from 'default/database';

@Module({
  imports: [
    DatabaseModule,

    TypeOrmModule.forFeature([
      Usuario,
      Empresa,
      Rol,
      Empleado,
      Departamento,
      Cargo,
      Contrato,
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
        from: '"Soporte PuntoPymes" <noreply@puntopymes.com>',
      },
    }),

    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './.env',
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<string>('JWT_EXPIRES_IN')!,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }