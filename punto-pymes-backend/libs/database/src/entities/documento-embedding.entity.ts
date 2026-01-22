import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentoEmpresa } from './documento-empresa.entity';

@Entity('documentos_embeddings')
export class DocumentoEmbedding {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    contenido: string;

    @Column({ type: 'vector', length: 768 })
    vector: string;

    @Column()
    documentoId: string;
    @ManyToOne(() => DocumentoEmpresa, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'documentoId' })
    documento: DocumentoEmpresa;
}