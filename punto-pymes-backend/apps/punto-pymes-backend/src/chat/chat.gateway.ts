import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    constructor(private chatService: ChatService) { }

    handleConnection(client: Socket) {
        console.log(`🔌 Cliente conectado al chat: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`❌ Cliente desconectado: ${client.id}`);
    }

    @SubscribeMessage('enviar-mensaje')
    async handleMessage(@MessageBody() payload: any) {
        console.log('📨 [DEBUG] Payload recibido:', JSON.stringify(payload));

        try {
            // 1. Guardar en Mongo
            const mensajeGuardado = await this.chatService.crearMensaje({
                contenido: payload.contenido,
                emisorId: payload.emisorId,
                nombreEmisor: payload.nombreEmisor,
                sala: payload.sala || 'general'
            });

            console.log('✅ [DEBUG] Mensaje guardado ID:', mensajeGuardado._id);

            // 2. CORRECCIÓN IMPORTANTE:
            // Usamos .to(sala) para asegurar que solo la gente en 'general' lo reciba.
            // Si el frontend no se unió bien a la sala, no recibirá nada (y así detectamos el error).
            this.server.to(payload.sala || 'general').emit('nuevo-mensaje', mensajeGuardado);

        } catch (error) {
            console.error('🔥 [DEBUG] ERROR:', error);
        }
    }

    // AÑADE ESTO PARA DEBUGEAR LA ENTRADA A SALAS
    @SubscribeMessage('entrar-sala')
    async handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() sala: string
    ) {
        const salaReal = sala || 'general';
        client.join(salaReal);
        console.log(`🔌 Cliente ${client.id} se unió a la sala: ${salaReal}`);

        // 1. Obtener historial
        try {
            const historial = await this.chatService.obtenerUltimos(salaReal);

            // 2. IMPORTANTE: Usamos 'historial-mensajes' para que coincida con el Frontend
            client.emit('historial-mensajes', historial);
            console.log(`📜 Historial enviado a ${client.id} (${historial.length} msgs)`);
        } catch (error) {
            console.error('Error enviando historial al unirse:', error);
        }
    }

    @SubscribeMessage('solicitar-historial')
    async handleHistorial(
        @ConnectedSocket() client: Socket,
        @MessageBody() sala: string
    ) {
        console.log(`📜 [DEBUG] Cliente ${client.id} solicita historial de: ${sala}`);
        try {
            const historial = await this.chatService.obtenerUltimos(sala || 'general');
            client.emit('historial-recibido', historial);
        } catch (error) {
            console.error('🔥 [DEBUG] Error al obtener historial:', error);
        }
    }
}