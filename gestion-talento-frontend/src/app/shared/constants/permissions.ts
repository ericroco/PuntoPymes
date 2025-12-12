// Diccionario de Permisos (Copia exacta del Backend)
export const PERMISSIONS = {
    // EMPLEADOS
    EMPLOYEES_READ: 'empleados.leer',
    EMPLOYEES_CREATE: 'empleados.crear',
    EMPLOYEES_EDIT: 'empleados.editar',
    EMPLOYEES_DELETE: 'empleados.borrar',

    // NÓMINA
    PAYROLL_READ: 'nomina.leer',
    PAYROLL_PROCESS: 'nomina.procesar',
    PAYROLL_EXPORT: 'nomina.exportar',
    PAYROLL_CONFIG: 'nomina.configurar',

    // SEGURIDAD
    ROLES_MANAGE: 'roles.gestionar',
    USERS_MANAGE: 'usuarios.gestionar',
    COMPANY_CONFIG: 'empresa.configurar'
};

// Estructura para generar la UI (Grupos de Checkboxes)
export const PERMISSION_GROUPS = [
    {
        name: 'Gestión de Talento',
        permissions: [
            { key: PERMISSIONS.EMPLOYEES_READ, label: 'Ver Listado de Empleados' },
            { key: PERMISSIONS.EMPLOYEES_CREATE, label: 'Contratar (Crear Empleado)' },
            { key: PERMISSIONS.EMPLOYEES_EDIT, label: 'Editar Perfiles' },
            { key: PERMISSIONS.EMPLOYEES_DELETE, label: 'Desvincular Personal' },
        ]
    },
    {
        name: 'Nómina y Pagos',
        permissions: [
            { key: PERMISSIONS.PAYROLL_READ, label: 'Ver Historial de Pagos' },
            { key: PERMISSIONS.PAYROLL_PROCESS, label: 'Procesar/Calcular Nómina' },
            { key: PERMISSIONS.PAYROLL_EXPORT, label: 'Exportar Reportes' },
            { key: PERMISSIONS.PAYROLL_CONFIG, label: 'Configuración de Nómina' },
        ]
    },
    {
        name: 'Administración',
        permissions: [
            { key: PERMISSIONS.ROLES_MANAGE, label: 'Gestionar Roles y Permisos' },
            { key: PERMISSIONS.USERS_MANAGE, label: 'Gestionar Usuarios' },
            { key: PERMISSIONS.COMPANY_CONFIG, label: 'Configuración Global' },
        ]
    }
];