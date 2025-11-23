// libs/database/src/entities/empleado.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  // ¡Quitamos DeleteDateColumn!
} from 'typeorm';
import { BaseEntity } from './base.entity';

// ... (todas las importaciones de entidades relacionadas siguen igual)
import { Empresa } from './empresa.entity';
import { Usuario } from './usuario.entity';
import { Rol } from './rol.entity';
import { Cargo } from './cargo.entity';
import { Contrato } from './contrato.entity';
import { NominaEmpleado } from './nominaEmpleado.entity';
import { BeneficioAsignado } from './beneficioAsignado.entity';
import { AsignacionTarea } from './asignacionTarea.entity';
import { Timesheet } from './timesheet.entity';
import { Objetivo } from './objetivo.entity';
import { Evaluacion } from './evaluacion.entity';
import { InscripcionCurso } from './inscripcionCurso.entity';
import { RegistroAsistencia } from './registroAsistencia.entity';
import { ActivoAsignado } from './activoAsignado.entity';
import { ReporteGasto } from './reporteGasto.entity';
import { DocumentoEmpleado } from './documentoEmpleado.entity';

/**
 * Entidad que representa al Empleado (LA PERSONA).
 * Contiene solo datos personales que no cambian.
 * El historial laboral se almacena en la tabla 'Contrato'.
 * Mapea la tabla 'empleados'
 */
@Entity({ name: 'empleados' })
@Index(['empresaId', 'estado'])
@Index(['usuarioId'])
export class Empleado extends BaseEntity {
  @Column({ type: 'varchar', length: 100, comment: 'Nombre del empleado' })
  nombre: string;

  @Column({ type: 'varchar', length: 100, comment: 'Apellido del empleado' })
  apellido: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'Tipo de documento de identidad',
  })
  tipoIdentificacion: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'Número del documento de identidad',
  })
  nroIdentificacion: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Email personal de contacto',
  })
  emailPersonal: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: 'Teléfono de contacto',
  })
  telefono: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: 'Dirección de residencia',
  })
  direccion: string;

  @Column({ type: 'date', nullable: true, comment: 'Fecha de nacimiento' })
  fechaNacimiento: Date;

  // --- (CAMBIO CLAVE: 'fechaContratacion' ELIMINADA) ---
  // (Esta información ahora vive en la tabla 'Contrato'
  //  como 'fechaInicio', lo cual es correcto).

  /**
   * Estado de ACTIVIDAD (no laboral) del empleado.
   * (Activo, De Vacaciones, Licencia Médica)
   */
  @Column({
    type: 'varchar',
    length: 50,
    default: 'Activo',
    comment: 'Estado de actividad (Activo, De Vacaciones, Licencia)',
  })
  estado: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Campos custom definidos por la empresa (RF)',
  })
  datosPersonalizados: any;
  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    comment: 'URL de la foto de perfil',
  })
  fotoUrl: string;

  // --- (CAMBIO CLAVE: 'deletedAt' ELIMINADA) ---
  // (El estado de "Desvinculado" (RF-01-04) ahora se
  //  manejará en la tabla 'Contrato' con su 'estado')

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Empleado PERTENECE A...)
  // ---

  // ... (todas las relaciones ManyToOne siguen EXACTAMENTE IGUAL)
  @ManyToOne(() => Empresa, (empresa) => empresa.empleados, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' })
  empresa: Empresa;

  @Column({ comment: 'ID de la Empresa (Tenant) a la que pertenece' })
  empresaId: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.membresias, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuario;

  @Column({ nullable: true, comment: 'ID del Usuario (login) asociado (opcional)' })
  usuarioId: string;

  @ManyToOne(() => Rol, (rol) => rol.empleados, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'rolId' })
  rol: Rol;

  @Column({ comment: 'ID del Rol asignado en la empresa' })
  rolId: string;

  @ManyToOne(() => Cargo, (cargo) => cargo.empleados, {
    nullable: false, // <-- Esto lo arreglaremos en el auth.service
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'cargoId' })
  cargo: Cargo;

  @Column({ comment: 'ID del Puesto/Cargo que ocupa' })
  cargoId: string;

  @ManyToOne(() => Empleado, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'jefeId' })
  jefe: Empleado;

  @Column({
    nullable: true,
    comment: 'ID del manager/supervisor directo (otro Empleado)',
  })
  jefeId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Empleado TIENE MUCHOS...)
  // ---

  // ... (todas las relaciones OneToMany siguen EXACTAMENTE IGUAL)
  @OneToMany(() => Contrato, (contrato) => contrato.empleado)
  contratos: Contrato[];

  @OneToMany(() => NominaEmpleado, (nomina) => nomina.empleado)
  nominas: NominaEmpleado[];

  // ... (etc. ... todas las demás relaciones)
  @OneToMany(() => BeneficioAsignado, (beneficio) => beneficio.empleado)
  beneficiosAsignados: BeneficioAsignado[];

  @OneToMany(() => AsignacionTarea, (asignacion) => asignacion.empleado)
  tareasAsignadas: AsignacionTarea[];

  @OneToMany(() => Timesheet, (timesheet) => timesheet.empleado)
  timesheets: Timesheet[];

  @OneToMany(() => Objetivo, (objetivo) => objetivo.empleado)
  objetivos: Objetivo[];

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.evaluado)
  evaluacionesRecibidas: Evaluacion[];

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.evaluador)
  evaluacionesHechas: Evaluacion[];

  @OneToMany(() => InscripcionCurso, (inscripcion) => inscripcion.empleado)
  inscripcionesCursos: InscripcionCurso[];

  @OneToMany(() => RegistroAsistencia, (registro) => registro.empleado)
  registrosAsistencia: RegistroAsistencia[];

  @OneToMany(() => ActivoAsignado, (asignacion) => asignacion.empleado)
  activosAsignados: ActivoAsignado[];

  @OneToMany(() => ReporteGasto, (reporte) => reporte.empleado)
  reportesGastos: ReporteGasto[];
  /**
   * Relación: Un Empleado puede tener MUCHAS asignaciones de tareas.
   */
  @OneToMany(() => AsignacionTarea, (asignacion) => asignacion.empleado)
  asignaciones: AsignacionTarea[]; // <--- Esta es la propiedad que faltaba
  @OneToMany(() => DocumentoEmpleado, (doc) => doc.empleado)
  documentos: DocumentoEmpleado[];
}