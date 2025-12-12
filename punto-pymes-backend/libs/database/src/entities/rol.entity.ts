// libs/database/src/entities/rol.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
import { Empleado } from './empleado.entity';

/**
 * Entidad que representa un Rol dentro de una Empresa (Tenant).
 * (Ej: 'Administrador', 'Manager', 'Empleado').
 * Contiene el mapa de permisos (RBAC) que cumple con RNF7.
 * Mapea la tabla 'roles'
 */
@Entity({ name: 'roles' })
// Indexamos para buscar roles rápidamente por empresa
@Index(['empresaId'])
export class Rol extends BaseEntity {
  /**
   * Nombre del rol
   * Mapea: string nombre "Nombre rol sistema"
   */
  @Column({
    type: 'varchar',
    length: 100,
    comment: 'Nombre del rol (Admin, Empleado, Manager)',
  })
  nombre: string;

  /**
   * Mapa de permisos (Role-Based Access Control - RBAC).
   * Mapea: json permisos "Mapa permisos RBAC"
   *
   * @example { "puedeCrearEmpleado": true, "puedeVerNomina": false }
   * @fulfills RNF7
   */
  @Column({
    type: 'jsonb',
    comment: 'Mapa de permisos RBAC (RNF7)',
    default: {}
  })
  permisos: Record<string, boolean>;

  @Column({
    type: 'boolean',
    default: false,
    comment: 'Si es true, este rol se asigna automáticamente a nuevos empleados'
  })
  esDefecto: boolean;

  // ---
  // RELACIONES "MUCHOS A UNO" (Un Rol PERTENECE A...)
  // ---

  /**
   * Relación: Un Rol pertenece a UNA Empresa (Tenant).
   * onDelete: 'CASCADE' = Si la Empresa se borra, sus roles se borran.
   */
  @ManyToOne(() => Empresa, (empresa) => empresa.roles, {
    nullable: false, // Un rol no puede existir sin una empresa
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'empresaId' }) // Define el nombre de la columna FK
  empresa: Empresa;

  /**
   * Mapea: string empresaId FK "Empresa propietaria rol"
   */
  @Column({ comment: 'ID de la Empresa (Tenant) propietaria del rol' })
  empresaId: string;

  // ---
  // RELACIONES "UNO A MUCHOS" (Un Rol TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Rol puede estar asignado a muchos Empleados.
   * Este es el "otro lado" de la relación definida en 'empleado.entity.ts'.
   */
  @OneToMany(() => Empleado, (empleado) => empleado.rol)
  empleados: Empleado[];
}