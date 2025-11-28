import { Entity, Column, ManyToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
import { Empleado } from './empleado.entity';

@Entity({ name: 'sucursales' })
@Index(['empresaId'])
export class Sucursal extends BaseEntity {

    @Column({ type: 'varchar', length: 255, comment: 'Nombre de la sucursal (ej: Matriz Quito)' })
    nombre: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    direccion: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    telefono: string;

    @Column({ type: 'boolean', default: true })
    activa: boolean;

    // --- RELACIONES ---

    @ManyToOne(() => Empresa, (empresa) => empresa.sucursales, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'empresaId' })
    empresa: Empresa;

    @Column()
    empresaId: string;

    @OneToMany(() => Empleado, (empleado) => empleado.sucursal)
    empleados: Empleado[];
}