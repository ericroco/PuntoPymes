import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
// 👇 IMPORTANTE: Trae tu entidad Sucursal
import { Sucursal } from './sucursal.entity';

export enum PrioridadAnuncio {
    BAJA = 'BAJA',
    MEDIA = 'MEDIA',
    ALTA = 'ALTA',
}

@Entity({ name: 'anuncios' })
export class Anuncio extends BaseEntity {

    @Column()
    titulo: string;

    @Column({ type: 'text' })
    contenido: string;

    @Column({
        type: 'enum',
        enum: PrioridadAnuncio,
        default: PrioridadAnuncio.MEDIA
    })
    prioridad: PrioridadAnuncio;

    @Column({ type: 'timestamp', nullable: true })
    fechaExpiracion: Date;

    // --- ALCANCE ---

    @Column()
    empresaId: string;

    // 👇 LA ESTRATEGIA DE DOCUMENTOS (Relación + ID)
    // Esto crea la Foreign Key automáticamente en Postgres
    @ManyToOne(() => Sucursal, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sucursalId' }) // Enlaza la columna de abajo con la tabla Sucursales
    sucursal: Sucursal;

    // Definimos la columna explícita para poder guardar el ID directo
    @Column({ nullable: true })
    sucursalId: string | null; // 👈 El "| null" es SOLO para que TypeScript no se queje
}