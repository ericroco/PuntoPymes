// apps/productividad/src/productividad.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DatabaseModule,
  Proyecto,
  Sprint,
  Tarea,
  AsignacionTarea,
  Empleado,
  CicloEvaluacion,
  Objetivo,
  Evaluacion,
  Curso,
  InscripcionCurso,
  RegistroAsistencia,
  Activo,
  ActivoAsignado,
  ReporteGasto,
  ItemGasto,
  Departamento,
  Anuncio,
  Encuesta,
  Voto,
  OpcionEncuesta,
} from 'default/database';
import { ProductividadController } from './productividad.controller';
import { ProductividadService } from './productividad.service';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    // Conexión a la base de datos (Postgres)
    DatabaseModule,
    // Carga de las entidades que este microservicio utilizará
    TypeOrmModule.forFeature([
      // Entidades que este microservicio gestionará
      Proyecto,
      Sprint,
      Tarea,
      AsignacionTarea,
      Empleado, // Para validar que el 'liderId' sea un empleado válido
      CicloEvaluacion,
      Objetivo,
      Evaluacion,
      Curso,
      InscripcionCurso,
      RegistroAsistencia,
      Activo,
      ActivoAsignado,
      ReporteGasto,
      ItemGasto,
      Departamento,
      Anuncio,
      Encuesta,
      Voto,
      OpcionEncuesta,
    ]),
  ],
  controllers: [ProductividadController],
  providers: [ProductividadService],
})
export class ProductividadModule { }