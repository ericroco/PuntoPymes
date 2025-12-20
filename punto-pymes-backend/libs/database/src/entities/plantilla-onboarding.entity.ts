import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TareaPlantilla } from './tarea-plantilla.entity';

@Entity('plantillas_onboarding')
export class PlantillaOnboarding extends BaseEntity {
    @Column()
    nombre: string; // Ej: "Inducción Desarrolladores"

    @Column({ type: 'uuid' })
    empresaId: string;

    @OneToMany(() => TareaPlantilla, (tarea) => tarea.plantilla, { cascade: true })
    tareas: TareaPlantilla[];
}