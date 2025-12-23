import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Encuesta } from './encuesta.entity';
import { OpcionEncuesta } from './encuesta.entity'; // O donde tengas la opción

@Entity({ name: 'votos' })
// 🔒 ESTO ES LA CLAVE: No permite duplicados de (encuesta + empleado)
@Unique(['encuestaId', 'empleadoId'])
export class Voto extends BaseEntity {

    @Column()
    empleadoId: string; // ID del usuario que vota

    @Column()
    encuestaId: string;

    @Column()
    opcionId: string; // Qué opción eligió

    // --- RELACIONES (Opcionales, pero útiles para reportes) ---

    @ManyToOne(() => Encuesta)
    @JoinColumn({ name: 'encuestaId' })
    encuesta: Encuesta;

    @ManyToOne(() => OpcionEncuesta)
    @JoinColumn({ name: 'opcionId' })
    opcion: OpcionEncuesta;
}