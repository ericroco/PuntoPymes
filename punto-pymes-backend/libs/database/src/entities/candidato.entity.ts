import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Vacante } from './vacante.entity';

export enum EstadoCandidato {
    NUEVO = 'NUEVO',
    ANALIZANDO_IA = 'ANALIZANDO_IA', // Nuevo estado sugerido
    REVISION = 'REVISION',
    ENTREVISTA = 'ENTREVISTA',
    OFERTA = 'OFERTA',
    CONTRATADO = 'CONTRATADO',
    RECHAZADO = 'RECHAZADO',
}

@Entity({ name: 'candidatos' })
@Index(['vacanteId'])
@Index(['email'])
export class Candidato extends BaseEntity {

    @Column({ type: 'varchar', length: 255, comment: 'Nombre completo' })
    nombre: string;

    @Column({ type: 'varchar', length: 255, comment: 'Correo electrónico' })
    email: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    telefono: string;

    @Column({ type: 'varchar', length: 500, nullable: true, comment: 'Link al CV' })
    cvUrl: string;

    /**
     * Puntuación de IA (0 - 100).
     * Indica qué tanto se ajusta el perfil a la vacante.
     */
    @Column({
        type: 'int',
        nullable: true,
        comment: 'Puntaje de coincidencia calculado por IA (0-100)'
    })
    aiScore: number | null;

    /**
     * Resumen/Feedback de la IA.
     * Aquí guardamos el "Por qué" del puntaje.
     */
    @Column({
        type: 'text',
        nullable: true,
        comment: 'Análisis cualitativo de la IA sobre el candidato'
    })
    aiAnalysis: string | null;

    @Column({
        type: 'varchar',
        length: 50,
        default: EstadoCandidato.NUEVO,
    })
    estado: EstadoCandidato;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fechaPostulacion: Date;

    // --- RELACIONES ---

    @ManyToOne(() => Vacante, (vacante) => vacante.candidatos, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'vacanteId' })
    vacante: Vacante;

    @Column()
    vacanteId: string;
}