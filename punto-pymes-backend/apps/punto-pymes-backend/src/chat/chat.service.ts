import { Injectable, Logger } from '@nestjs/common'; // Agregamos Logger para ver errores claros
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mensaje, MensajeDocument } from './schemas/mensaje.schema';

@Injectable()
export class ChatService {
    private readonly logger = new Logger(ChatService.name);

    constructor(
        @InjectModel(Mensaje.name) private mensajeModel: Model<MensajeDocument>,
    ) { }

    // 1. Guardar un nuevo mensaje
    async crearMensaje(datos: { contenido: string; emisorId: string; nombreEmisor: string; sala: string }) {
        // Validación preventiva (aunque Mongo valida, esto evita crashes feos)
        if (!datos.emisorId || !datos.nombreEmisor) {
            this.logger.error('Intento de guardar mensaje sin emisorId o nombreEmisor', datos);
            throw new Error('Datos incompletos para el mensaje');
        }

        const nuevo = new this.mensajeModel(datos);
        return await nuevo.save();
    }

    // 2. Obtener historial (Los últimos 50 reales)
    async obtenerUltimos(sala: string) {
        const mensajes = await this.mensajeModel
            .find({ sala })
            .sort({ createdAt: -1 }) // 1. Ordenamos Descendente (Primero los más nuevos)
            .limit(50)               // 2. Tomamos solo los 50 más recientes
            .exec();

        // 3. Los invertimos para que el Frontend los reciba cronológicamente (Viejos -> Nuevos)
        return mensajes.reverse();
    }
}