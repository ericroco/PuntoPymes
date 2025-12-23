import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Voto } from './voto.entity';

@Entity({ name: 'encuestas' })
export class Encuesta extends BaseEntity {
    @Column()
    titulo: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'timestamp' })
    fechaFin: Date; // Cuándo se cierra la votación

    @Column({ default: false })
    esAnonima: boolean;

    @Column({ default: true })
    activa: boolean;

    // --- ALCANCE ---
    @Column()
    empresaId: string;

    @Column({ type: 'uuid', nullable: true })
    sucursalId: string | null;

    // --- RELACIONES ---
    @OneToMany(() => OpcionEncuesta, (opcion) => opcion.encuesta, {
        cascade: true, // 👈 CLAVE: Al guardar la encuesta, guarda sus opciones automáticamente
    })
    opciones: OpcionEncuesta[];
}

// --- SUB-ENTIDAD: OPCIONES ---
@Entity({ name: 'encuesta_opciones' })
export class OpcionEncuesta extends BaseEntity {
    @Column()
    texto: string; // Ej: "Muy Satisfecho", "Regular", "Malo"

    @Column({ default: 0 })
    votos: number; // Contador simple de votos

    @ManyToOne(() => Encuesta, (encuesta) => encuesta.opciones, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'encuestaId' })
    encuesta: Encuesta;

    @Column()
    encuestaId: string;

    miVoto?: Voto;
}