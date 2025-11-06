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

@Entity({ name: 'empresas' })
export class Empresa extends BaseEntity {
  /**
   * Nombre de la empresa cliente
   * Mapea: string nombre "Nombre empresa cliente"
   */
  @Column({
    type: 'varchar',
    length: 255,
    comment: 'Nombre de la empresa cliente',
  })
  nombre: string;

  /**
   * Plan de suscripción de la empresa (RNF22)
   * Mapea: string planSuscripcion "Basico Pro Enterprise"
   */
  @Column({
    type: 'varchar',
    length: 50,
    comment: 'Plan de suscripción (Basico, Pro, Enterprise)',
  })
  planSuscripcion: string;

  /**
   * Configuración de branding (logo y colores) (RNF24)
   * Mapea: json branding "Logo y colores personalizados"
   */
  @Column({
    type: 'jsonb', // jsonb es más eficiente para consultas en Postgres
    nullable: true,
    comment: 'Logo y colores personalizados (RNF24)',
  })
  branding: { logoUrl: string; color: string };

  // ---
  // RELACIONES (Una Empresa TIENE MUCHOS...)
  // ---

  /**
   * Relación: Una Empresa tiene muchos Empleados.
   * 'cascade: true' asegura que si se borra una Empresa,
   * se borran todos sus empleados (consistencia de datos).
   */
  @OneToMany(() => Empleado, (empleado) => empleado.empresa, { cascade: true })
  empleados: Empleado[];

  /**
   * Relación: Una Empresa define muchos Roles.
   */
  @OneToMany(() => Rol, (rol) => rol.empresa, { cascade: true })
  roles: Rol[];

  /**
   * Relación: Una Empresa organiza muchos Departamentos.
   */
  @OneToMany(() => Departamento, (departamento) => departamento.empresa, {
    cascade: true,
  })
  departamentos: Departamento[];

  /**
   * Relación: Una Empresa gestiona muchos Proyectos.
   */
  @OneToMany(() => Proyecto, (proyecto) => proyecto.empresa, { cascade: true })
  proyectos: Proyecto[];

  /**
   * Relación: Una Empresa ofrece muchos Cursos.
   */
  @OneToMany(() => Curso, (curso) => curso.empresa, { cascade: true })
  cursos: Curso[];

  /**
   * Relación: Una Empresa posee muchos Activos.
   */
  @OneToMany(() => Activo, (activo) => activo.empresa, { cascade: true })
  activos: Activo[];

  /**
   * Relación: Una Empresa provee muchos Beneficios.
   */
  @OneToMany(() => Beneficio, (beneficio) => beneficio.empresa, {
    cascade: true,
  })
  beneficios: Beneficio[];

  /**
   * Relación: Una Empresa procesa muchos Periodos de Nómina.
   */
  @OneToMany(() => PeriodoNomina, (periodo) => periodo.empresa, {
    cascade: true,
  })
  periodosNomina: PeriodoNomina[];

  /**
   * Relación: Una Empresa ejecuta muchos Ciclos de Evaluación.
   */
  @OneToMany(
    () => CicloEvaluacion,
    (ciclo) => ciclo.empresa,
    { cascade: true },
  )
  ciclosEvaluacion: CicloEvaluacion[];
}