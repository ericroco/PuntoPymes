import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empleado } from './empleado.entity';

@Entity({ name: 'documentos_empleados' })
@Index(['empleadoId'])
export class DocumentoEmpleado extends BaseEntity {

    @Column({ type: 'varchar', length: 255 })
    nombre: string; // Ej: "Cédula de Identidad"

    @Column({ type: 'varchar', length: 100 })
    tipo: string; // Ej: "Legal", "Certificación", "Otros"

    @Column({ type: 'varchar', length: 500 })
    url: string; // La ruta al archivo local o nube

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fechaSubida: Date;

    // --- RELACIONES ---
    @ManyToOne(() => Empleado, (empleado) => empleado.documentos, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'empleadoId' })
    empleado: Empleado;

    @Column()
    empleadoId: string;
}