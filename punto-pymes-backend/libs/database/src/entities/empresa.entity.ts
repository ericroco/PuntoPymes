import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';
import { Rol } from './rol.entity';
import { Departamento } from './departamento.entity';
import { Proyecto } from './proyecto.entity';
import { Curso } from './curso.entity';
import { Activo } from './activo.entity';
import { Beneficio } from './beneficio.entity';
import { PeriodoNomina } from './periodoNomina.entity';
import { CicloEvaluacion } from './cicloEvaluacion.entity';
import { Vacante } from './vacante.entity';
import { Sucursal } from './sucursal.entity';

// --- INTERFACES DE CONFIGURACIÓN (JSONB) ---

export interface ConfiguracionKpis {
  mostrarHeadcount?: boolean;
  mostrarDemografia?: boolean;
  mostrar9Box?: boolean;
  mostrarMasaSalarial?: boolean;
  mostrarAsistencia?: boolean;
  metaAsistencia?: number;
  metaRotacionMaxima?: number;
  metaNPS?: number;
}

export interface ConfiguracionModulos {
  reclutamiento?: boolean;
  onboarding?: boolean;
  desempeno?: boolean;
  proyectos?: boolean;
  kpis?: boolean;
  asistencia?: boolean;
  hojasTiempo?: boolean;
  nomina?: boolean;
  beneficios?: boolean;
  capacitacion?: boolean;
  documentos?: boolean;
  activos?: boolean;
  reportes?: boolean;
  comunicacion?: boolean;
}

export interface ConfiguracionAsistencia {
  horaEntrada?: string;       // Formato "HH:mm" ej: "09:00"
  horaSalida?: string;        // Formato "HH:mm" ej: "18:00"
  toleranciaRetraso?: number; // Minutos, ej: 15
}

export interface ConfiguracionNomina {
  frecuenciaPago?: 'mensual' | 'quincenal' | 'semanal';
  multiplicadorHorasExtra?: number; // ej: 1.5
}

export interface ConfiguracionVacaciones {
  diasPorAnio?: number; // Mínimo legal
}

// La Interfaz Maestra que agrupa todo
export interface ConfiguracionEmpresa {
  modulos?: ConfiguracionModulos;
  asistencia?: ConfiguracionAsistencia;
  nomina?: ConfiguracionNomina;
  vacaciones?: ConfiguracionVacaciones;
  kpis?: ConfiguracionKpis;
}

// --- ENTIDAD ---

@Entity({ name: 'empresas' })
export class Empresa extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre de la empresa cliente',
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Plan de suscripción (Basico, Pro, Enterprise)',
  })
  planSuscripcion: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Logo y colores personalizados (RNF24)',
  })
  branding: { logoUrl?: string | null; color?: string | null; primaryColor?: string | null };

  /**
   * AQUÍ GUARDAMOS TODA LA CONFIGURACIÓN
   * Usamos la interfaz 'ConfiguracionEmpresa' definida arriba
   */
  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Configuraciones globales (Módulos, Nomina, Asistencia, etc)',
  })
  configuracion: ConfiguracionEmpresa;

  // --- RELACIONES ---

  @OneToMany(() => Empleado, (empleado) => empleado.empresa, { cascade: true })
  empleados: Empleado[];

  @OneToMany(() => Rol, (rol) => rol.empresa, { cascade: true })
  roles: Rol[];

  @OneToMany(() => Departamento, (d) => d.empresa, { cascade: true })
  departamentos: Departamento[];

  @OneToMany(() => Proyecto, (p) => p.empresa, { cascade: true })
  proyectos: Proyecto[];

  @OneToMany(() => Curso, (c) => c.empresa, { cascade: true })
  cursos: Curso[];

  @OneToMany(() => Activo, (a) => a.empresa, { cascade: true })
  activos: Activo[];

  @OneToMany(() => Beneficio, (b) => b.empresa, { cascade: true })
  beneficios: Beneficio[];

  @OneToMany(() => PeriodoNomina, (p) => p.empresa, { cascade: true })
  periodosNomina: PeriodoNomina[];

  @OneToMany(() => CicloEvaluacion, (c) => c.empresa, { cascade: true })
  ciclosEvaluacion: CicloEvaluacion[];

  @OneToMany(() => Vacante, (v) => v.empresa, { cascade: true })
  vacantes: Vacante[];

  @OneToMany(() => Sucursal, (s) => s.empresa, { cascade: true })
  sucursales: Sucursal[];
}