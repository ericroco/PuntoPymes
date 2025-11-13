// apps/nomina/src/nomina.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule, Contrato, Empleado, Rol, Beneficio, BeneficioAsignado } from 'default/database';
import { NominaController } from './nomina.controller';
import { NominaService } from './nomina.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([
      Contrato,
      Empleado,
      Rol,
      Beneficio,
      BeneficioAsignado,
    ]),
  ],
  controllers: [NominaController],
  providers: [NominaService],
})
export class NominaModule { }