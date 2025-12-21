import {
    Entity, Column, ManyToOne, JoinColumn, Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Empresa } from './empresa.entity';
import { Sucursal } from './sucursal.entity';

@Entity({ name: 'documentos_empresa' })
@Index(['empresaId'])
@Index(['sucursalId'])
export class DocumentoEmpresa extends BaseEntity {

    @Column({ length: 255 })
    nombre: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'text', comment: 'URL del archivo en S3/Cloudinary/Local' })
    url: string;

    @Column({ length: 50, nullable: true, comment: 'Ej: LEGAL, MANUALES, FORMATOS' })
    categoria: string;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    fechaSubida: Date;

    // --- RELACIONES ---

    @ManyToOne(() => Empresa, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'empresaId' })
    empresa: Empresa;

    @Column()
    empresaId: string;

    // 👇 LA CLAVE DEL HÍBRIDO: Puede ser NULL (Global) o tener ID (Local)
    @ManyToOne(() => Sucursal, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sucursalId' })
    sucursal: Sucursal;

    @Column({ nullable: true })
    sucursalId: string;
}