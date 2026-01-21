import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MensajeDocument = HydratedDocument<Mensaje>;

@Schema({ timestamps: true })
export class Mensaje {
    @Prop({ required: true })
    contenido: string;

    @Prop({ required: true })
    emisorId: string;

    @Prop({ required: true })
    nombreEmisor: string;

    @Prop({ default: 'general' })
    sala: string;
}

export const MensajeSchema = SchemaFactory.createForClass(Mensaje);