// ==========================================
// 1. ENUMS (Deben coincidir con el Backend)
// ==========================================

export enum AssetStatus {
    DISPONIBLE = 'DISPONIBLE',
    ASIGNADO = 'ASIGNADO',
    EN_REPARACION = 'EN_REPARACION',
    DE_BAJA = 'DE_BAJA'
}

// ==========================================
// 2. MODELO PRINCIPAL (Para la Tabla)
// ==========================================

export interface Asset {
    id: string;              // UUID
    nombre: string;          // Ej: "Laptop Dell"
    tipo: string;            // Ej: "Computación"
    estado: AssetStatus;     // Enum

    // Campos Opcionales (pueden ser nulos en DB)
    serial?: string;
    valor?: number;
    descripcion?: string;
    imageUrl?: string;

    // Las fechas en JSON a veces llegan como string, por eso Date | string
    fechaAdquisicion?: Date | string;

    empresaId: string;

    // --- PROPIEDADES VIRTUALES / RELACIONES ---
    // Estas dependen de si el backend hace 'eager loading' o si nosotros lo mapeamos

    // Objeto simple para mostrar en la tabla quién lo tiene
    asignadoA?: {
        id: string;
        empleadoId: string;
        nombreEmpleado: string;
    } | null;

    // Historial completo (si el backend lo envía)
    asignaciones?: any[];
}

// ==========================================
// 3. DTOs (Data Transfer Objects)
// ==========================================

// Para CREAR un activo (POST)
export interface CreateAssetDto {
    nombre: string;
    tipo: string;
    estado?: AssetStatus;    // Opcional, default: DISPONIBLE
    serial?: string;
    valor?: number;
    fechaAdquisicion?: Date | string;
    descripcion?: string;
    imageUrl?: string;
}

// Para EDITAR un activo (PATCH) - Hereda de Create pero todo opcional
export interface UpdateAssetDto extends Partial<CreateAssetDto> { }

// Para ASIGNAR un activo a un empleado
export interface AssignAssetDto {
    empleadoId: string;      // ID del empleado
    observaciones?: string;  // Ej: "Entregado con cargador"
    fechaAsignacion?: Date | string; // Opcional, default: hoy
}

// Para DEVOLVER un activo (Liberarlo)
export interface ReturnAssetDto {
    observaciones: string;        // Requerido
    fechaDevolucion: Date | string;
    estado?: AssetStatus;         // Nuevo: ¿Cómo regresa el equipo?
}