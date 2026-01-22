import { Component, ElementRef, ViewChild, inject, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TextFieldModule } from '@angular/cdk/text-field'; // 👈 IMPORTANTE FALTABA ESTE
import { trigger, transition, style, animate } from '@angular/animations';
import { IaService } from '../../services/ia';
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header'; // Verifica el nombre exacto de tu componente

interface ChatMessage {
    text: string;
    sender: 'user' | 'ai';
    time: Date;
}

@Component({
    selector: 'app-ia-assistant',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        TextFieldModule,
        SubpageHeader
    ],
    templateUrl: './ia-assistant.html',
    styleUrls: ['./ia-assistant.scss'],
    animations: [
        trigger('messageAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class IaAssistantComponent implements AfterViewChecked {
    @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

    private iaService = inject(IaService);
    private cdr = inject(ChangeDetectorRef); // 👈 Inyectamos detector de cambios

    messages: ChatMessage[] = [];

    newMessage = '';
    isLoading = false;

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    askSuggestion(question: string) {
        this.newMessage = question;
        this.sendMessage();
    }

    sendMessage() {
        if (!this.newMessage.trim() || this.isLoading) return;

        const pregunta = this.newMessage;
        this.newMessage = '';

        // 1. Mostrar mensaje del usuario
        this.messages.push({
            text: pregunta,
            sender: 'user',
            time: new Date()
        });

        this.isLoading = true;
        this.cdr.detectChanges(); // Forzamos actualización visual inmediata

        // 2. Llamar al Backend
        console.log('Enviando pregunta:', pregunta); // DEBUG

        this.iaService.consultar(pregunta).subscribe({
            next: (res) => {
                console.log('Respuesta recibida:', res); // DEBUG: Mira esto en la consola del navegador (F12)

                // Verificamos que 'res.respuesta' tenga texto
                const textoRespuesta = res.respuesta || 'La IA respondió vacio...';

                this.messages.push({
                    text: textoRespuesta,
                    sender: 'ai',
                    time: new Date()
                });

                this.isLoading = false;
                this.cdr.detectChanges(); // 👈 DESPERTAR A ANGULAR: ¡Hay datos nuevos!
                this.scrollToBottom();
            },
            error: (err) => {
                console.error('Error en Frontend:', err);
                this.messages.push({
                    text: 'Lo siento, no pude conectar con el servidor. Intenta nuevamente.',
                    sender: 'ai',
                    time: new Date()
                });
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    handleEnterKey(event: Event): void {
        const keyboardEvent = event as KeyboardEvent;
        if (!keyboardEvent.shiftKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    private scrollToBottom(): void {
        try {
            if (this.scrollContainer) {
                this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
            }
        } catch (err) { }
    }
}