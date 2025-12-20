import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PlantillaOnboarding } from './plantilla-onboarding.entity';

@Entity('tareas_plantilla')
export class TareaPlantilla extends BaseEntity {
    @Column()
    titulo: string; // Coincide con 'title'

    @Column({ type: 'text' })
    descripcion: string; // Coincide con 'description'

    @Column({ nullable: true })
    enlace: string; // Coincide con 'link' (opcional)

    @ManyToOne(() => PlantillaOnboarding, (p) => p.tareas)
    plantilla: PlantillaOnboarding;
}