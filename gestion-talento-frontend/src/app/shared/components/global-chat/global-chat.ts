import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../core/services/chat';
import { AuthService } from '../../../modules/auth/services/auth';
import { EmployeesService } from '../../../modules/dashboard/services/employees';

@Component({
  selector: 'app-global-chat', // Podrías renombrarlo a 'app-chat-widget' en el futuro
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './global-chat.html',
  styleUrls: ['./global-chat.scss']
})
export class GlobalChatComponent implements OnInit, OnDestroy, AfterViewChecked, OnChanges {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  // 👇 NUEVOS INPUTS: Para reutilizar el componente
  @Input() roomId: string = 'general';
  @Input() title: string = 'Chat Global';
  @Input() isFloating: boolean = true; // true = burbuja, false = panel fijo

  isOpen = false;
  messages: any[] = [];
  newMessage = '';
  unreadCount = 0;
  currentUserId = '';
  currentUserName = '';

  private subs: Subscription = new Subscription();

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private employeesService: EmployeesService
  ) { }

  ngOnInit() {
    this.chatService.connect();

    // Si es incrustado (no flotante), que nazca abierto
    if (!this.isFloating) {
      this.isOpen = true;
    }

    this.initChatSession();
  }

  // 👇 DETECTAR CAMBIO DE SPRINT: Si cambias de sprint, cambiamos de sala
  ngOnChanges(changes: SimpleChanges) {
    if (changes['roomId'] && !changes['roomId'].firstChange) {
      this.changeRoom(changes['roomId'].currentValue);
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    // Solo desconectamos si es el chat flotante global para no matar la conexión de otros chats
    if (this.isFloating) {
      this.chatService.disconnect();
    }
  }

  private initChatSession() {
    const user = this.authService.getUser();
    if (!user) return;
    this.currentUserId = user.id;

    if (user.empleadoId) {
      this.employeesService.getEmployeeById(user.empleadoId).subscribe({
        next: (emp) => {
          this.currentUserName = `${emp.nombre} ${emp.apellido}`;
          this.connectToSocket();
        },
        error: () => {
          this.currentUserName = user.email;
          this.connectToSocket();
        }
      });
    } else {
      this.currentUserName = user.email || 'Admin';
      this.connectToSocket();
    }
  }

  private connectToSocket() {
    this.chatService.joinRoom(this.roomId);

    this.subs.add(
      this.chatService.getHistory().subscribe(msgs => {
        if (msgs && msgs.length > 0 && msgs[0].sala === this.roomId) {
          this.messages = msgs;
          setTimeout(() => this.scrollToBottom(), 100);
        } else if (msgs && msgs.length === 0) {
          this.messages = []; // Sala vacía
        }
      })
    );

    // 3. Suscribirse a mensajes nuevos
    this.subs.add(
      this.chatService.getNewMessages().subscribe(msg => {
        // 🛡️ FILTRO CRÍTICO:
        // Como el socket es compartido, llegarán mensajes de 'general' y de 'sprint-X'.
        // Solo procesamos si coincide con mi roomId actual.
        if (msg.sala === this.roomId) {
          this.messages.push(msg);
          this.scrollToBottom();

          if (!this.isOpen && this.isFloating) {
            this.unreadCount++;
          }
        }
      })
    );
  }

  private changeRoom(newRoom: string) {
    this.messages = []; // Limpiar pantalla anterior
    this.chatService.joinRoom(newRoom);
  }

  toggleChat() {
    // Solo permitimos cerrar/abrir si es flotante
    if (this.isFloating) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.unreadCount = 0;
        this.scrollToBottom();
      }
    }
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.chatService.sendMessage(
      this.newMessage,
      this.currentUserId,
      this.currentUserName,
      this.roomId
    );
    this.newMessage = '';
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}