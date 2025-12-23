// src/app/shared/interfaces/notification.interface.ts
export interface Notification {
    id: string;
    type: 'ANUNCIO' | 'ENCUESTA' | 'SISTEMA' | 'TAREA' | 'VACACIONES';
    title: string;
    message?: string;
    icon: string;        // Ej: 'check_circle', 'campaign'
    color: string;       // Ej: 'primary', 'warn'
    read: boolean;
    time: string;        // Ej: 'Hace 5 min' (o Date si prefieres formatear en el front)
    link?: string;       // Ruta para redirigir al hacer click
}