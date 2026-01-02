// libs/database/src/entities/usuario.entity.ts
import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';

/**
 * Entidad que representa al Usuario (el login global).
 * Esta tabla almacena las credenciales de acceso.
 * Un solo Usuario (un email) puede tener múltiples perfiles de Empleado
 * (si pertenece a múltiples Empresas).
 * Mapea la tabla 'usuarios'
 */
@Entity({ name: 'usuarios' })
export class Usuario extends BaseEntity {
  /**
   * Email de login, debe ser único en toda la plataforma.
   * Mapea: string email UK "Email login unico global"
   */
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    comment: 'Email de login, único globalmente',
  })
  @Index() // Indexamos el email para búsquedas de login rápidas
  email: string;

  /**
   * Hash de la contraseña (generado con bcrypt).
   * Mapea: string passwordHash "Hash contrasena seguro"
   *
   * @security 'select: false' es una medida de seguridad CRÍTICA.
   * Evita que la contraseña hasheada sea enviada accidentalmente
   * al frontend en consultas generales. (RNF7)
   */
  @Column({
    type: 'varchar',
    length: 255,
    select: false, // ¡IMPORTANTE POR SEGURIDAD!
    comment: 'Hash de la contraseña (bcrypt)',
  })
  passwordHash: string;

  /**
   * Estado de verificación del email.
   * Mapea: boolean emailVerificado "Estado verificacion email"
   */
  @Column({
    type: 'boolean',
    default: false,
    comment: 'Estado de verificación de email',
  })
  emailVerificado: boolean;

  /**
   * Secreto para la Autenticación de Dos Factores (2FA) (RNF16).
   * Mapea: string twoFactorSecret "Secret para 2FA"
   *
   * @security 'select: false' por la misma razón que el passwordHash.
   */
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    select: false, // ¡IMPORTANTE POR SEGURIDAD!
    comment: 'Secreto para 2FA (RNF16)',
  })
  twoFactorSecret: string;

  /**
   * Configuración de preferencias del usuario (Tema, Idioma, Notificaciones).
   * Es JSON y Nullable para no romper registros antiguos.
   * Si es NULL, el frontend asume los valores por defecto (Light/Español).
   */
  @Column({
    type: 'json', // O usa 'simple-json' si estás usando MySQL/MariaDB básico
    nullable: true,
    comment: 'Preferencias de UI: { theme: "dark", lang: "en", ... }',
  })
  configuracion: any; // Usamos 'any' o puedes crear una interfaz 'UserConfig'

  // ---
  // RELACIONES (Un Usuario TIENE MUCHOS...)
  // ---

  /**
   * Relación: Un Usuario puede tener muchas "membresías" (perfiles de Empleado),
   * una por cada empresa a la que pertenece.
   */
  @OneToMany(() => Empleado, (empleado) => empleado.usuario)
  membresias: Empleado[];
}