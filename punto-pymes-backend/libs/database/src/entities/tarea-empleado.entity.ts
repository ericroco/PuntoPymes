import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('tareas_empleado')
@Index(['empleadoId'])
export class TareaEmpleado extends BaseEntity {
    @Column({ type: 'uuid' })
    empleadoId: string;

    @Column()
    titulo: string; // Copiado de la plantilla

    @Column({ type: 'text' })
    descripcion: string; // Copiado de la plantilla

    @Column({ nullable: true })
    enlace: string; // Copiado de la plantilla

    @Column({ default: false })
    completado: boolean; // 👈 Aquí se guarda el 'isComplete'

    @Column({ type: 'uuid', nullable: true })
    plantillaOrigenId: string; // Para saber de qué plantilla salió
}