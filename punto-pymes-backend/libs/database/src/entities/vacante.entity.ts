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
import { Departamento } from './departamento.entity'; // Asegúrate de tener esta entidad
import { Candidato } from './candidato.entity';
import { Sucursal } from './sucursal.entity';

export enum EstadoVacante {
    BORRADOR = 'BORRADOR',   // Aún se está redactando
    PUBLICA = 'PUBLICA',     // Visible para candidatos
    INTERNA = 'INTERNA',     // Solo para empleados actuales
    CERRADA = 'CERRADA',     // Ya se contrató o se canceló
}

@Entity({ name: 'vacantes' })
@Index(['empresaId'])
@Index(['sucursalId'])
@Index(['estado']) // Para filtrar rápidamenete las "PÚBLICAS"
export class Vacante extends BaseEntity {

    @Column({
        type: 'varchar',
        length: 255,
        comment: 'Título del puesto (Ej: Desarrollador Senior)',
    })
    titulo: string;

    @Column({
        type: 'text',
        comment: 'Descripción detallada de las responsabilidades',
    })
    descripcion: string;

    @Column({
        type: 'text',
        nullable: true,
        comment: 'Requisitos técnicos y habilidades blandas',
    })
    requisitos: string;

    @Column({
        type: 'varchar',
        length: 50,
        default: EstadoVacante.BORRADOR,
        comment: 'Estado de la vacante (PUBLICA, BORRADOR...)',
    })
    estado: EstadoVacante;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
        comment: 'Ubicación (Ej: Remoto, Quito, Híbrido)',
    })
    ubicacion: string;

    @Column({
        type: 'float',
        nullable: true,
        comment: 'Salario mínimo ofrecido',
    })
    salarioMin: number;

    @Column({
        type: 'float',
        nullable: true,
        comment: 'Salario máximo ofrecido',
    })
    salarioMax: number;

    @Column({
        type: 'date',
        nullable: true,
        comment: 'Fecha límite para postular',
    })
    fechaCierre: Date;

    // --- RELACIONES ---

    @ManyToOne(() => Empresa, (empresa) => empresa.vacantes, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'empresaId' })
    empresa: Empresa;

    @Column({ comment: 'ID de la Empresa' })
    empresaId: string;

    /**
     * Relación con el Departamento (Marketing, TI, Ventas).
     */
    @ManyToOne(() => Departamento, { nullable: true })
    @JoinColumn({ name: 'departamentoId' })
    departamento: Departamento;

    @Column({ nullable: true, comment: 'ID del Departamento solicitante' })
    departamentoId: string;

    // 👇👇 LO NUEVO: SUCURSAL 👇👇
    @ManyToOne(() => Sucursal, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'sucursalId' })
    sucursal: Sucursal;

    @Column({ nullable: true })
    sucursalId: string;

    @OneToMany(() => Candidato, (candidato) => candidato.vacante, { cascade: true })
    candidatos: Candidato[];
}