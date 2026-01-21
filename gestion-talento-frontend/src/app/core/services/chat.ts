import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket: Socket;
    private readonly URL = 'http://localhost:3000';
    private currentRoom = 'general';

    constructor() {
        this.socket = io(this.URL, {
            transports: ['websocket'],
            autoConnect: false // 👈 IMPORTANTE: Lo controlamos manualmente ahora
        });

        this.setupListeners();
    }

    // 👇 MÉTODO NUEVO: Para revivir el socket si estaba muerto
    connect() {
        if (!this.socket.connected) {
            this.socket.connect();
        }
    }

    disconnect() {
        if (this.socket.connected) {
            this.socket.disconnect();
        }
    }

    private setupListeners() {
        // 🟢 MAGIA: Apenas conecta, entra a la sala automáticamente
        this.socket.on('connect', () => {
            console.log('✅ Frontend conectado al Socket ID:', this.socket.id);
            this.joinRoom(this.currentRoom);
        });
    }

    joinRoom(sala: string) {
        this.currentRoom = sala;
        // Solo emitimos si ya estamos conectados. Si no, el evento 'connect' de arriba lo hará al conectar.
        if (this.socket.connected) {
            this.socket.emit('entrar-sala', sala);
        }
    }

    sendMessage(contenido: string, emisorId: string, nombreEmisor: string, sala: string = 'general') {
        this.socket.emit('enviar-mensaje', { contenido, emisorId, nombreEmisor, sala });
    }

    getNewMessages(): Observable<any> {
        return new Observable(observer => {
            this.socket.on('nuevo-mensaje', (msg) => observer.next(msg));
        });
    }

    getHistory(): Observable<any[]> {
        return new Observable(observer => {
            this.socket.on('historial-mensajes', (msgs) => observer.next(msgs));
        });
    }
}