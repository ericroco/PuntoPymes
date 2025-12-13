// Diccionario de Permisos del Sistema (ULTRA COMPLETO)
export const PERMISSIONS = {
    // --- 1. TALENTO HUMANO (Empleados) ---
    EMPLOYEES_READ: 'empleados.leer',       // Ver lista y perfiles
    EMPLOYEES_CREATE: 'empleados.crear',    // Contratar
    EMPLOYEES_EDIT: 'empleados.editar',     // Editar datos
    EMPLOYEES_DELETE: 'empleados.borrar',   // Desvincular
    EMPLOYEES_EXPORT: 'empleados.exportar', // Descargar Excel de empleados

    // --- 2. RECLUTAMIENTO Y ONBOARDING ---
    RECRUITMENT_MANAGE: 'reclutamiento.gestionar', // Ver candidatos, mover fases
    ONBOARDING_MANAGE: 'onboarding.gestionar',     // Configurar tareas de ingreso

    // --- 3. EVALUACIONES Y DESEMPEÑO ---
    PERFORMANCE_MANAGE: 'desempeno.gestionar', // Crear ciclos de evaluación, ver resultados globales

    // --- 4. OPERACIONES Y ASISTENCIA ---
    ATTENDANCE_READ_ALL: 'asistencia.leer_todo', // Ver asistencia de OTROS (Jefes)
    ATTENDANCE_APPROVE: 'asistencia.aprobar',    // Aprobar/Corregir marcaciones o permisos
    TASKS_MANAGE: 'tareas.gestionar',            // Crear Sprints, asignar tareas a otros

    // --- 5. NÓMINA Y COMPENSACIÓN ---
    PAYROLL_READ: 'nomina.leer',         // Ver historial general
    PAYROLL_PROCESS: 'nomina.procesar',  // Generar/Calcular Rol (Botón Mágico)
    PAYROLL_EXPORT: 'nomina.exportar',   // Descargar reportes contables/bancarios
    PAYROLL_CONFIG: 'nomina.configurar', // Editar fórmulas, rubros, reglas
    BENEFITS_MANAGE: 'beneficios.gestionar', // Aprobar solicitudes de préstamos/seguros

    // --- 6. RECURSOS Y ACTIVOS ---
    ASSETS_MANAGE: 'activos.gestionar',    // Asignar computadoras, inventario
    DOCUMENTS_MANAGE: 'documentos.gestionar', // Subir políticas, borrar archivos empresa

    // --- 7. DESARROLLO (Capacitación) ---
    TRAINING_MANAGE: 'capacitacion.gestionar', // Crear cursos, asignar planes

    // --- 8. SEGURIDAD Y CONFIGURACIÓN ---
    ROLES_MANAGE: 'roles.gestionar',       // Crear Roles y dar permisos
    USERS_MANAGE: 'usuarios.gestionar',    // Resetear claves, bloquear accesos
    COMPANY_CONFIG: 'empresa.configurar',  // Editar organigrama, logo, datos fiscales
    REPORTS_VIEW: 'reportes.ver'           // Ver dashboards analíticos avanzados
};

// Estructura para la UI (Grupos de Checkboxes ordenados)
export const PERMISSION_GROUPS = [
    {
        name: 'Gestión de Empleados',
        permissions: [
            { key: PERMISSIONS.EMPLOYEES_READ, label: 'Ver Listado y Perfiles' },
            { key: PERMISSIONS.EMPLOYEES_CREATE, label: 'Contratar (Crear Empleado)' },
            { key: PERMISSIONS.EMPLOYEES_EDIT, label: 'Editar Datos Personales/Laborales' },
            { key: PERMISSIONS.EMPLOYEES_DELETE, label: 'Desvincular Personal' },
            { key: PERMISSIONS.EMPLOYEES_EXPORT, label: 'Exportar Base de Datos' },
        ]
    },
    {
        name: 'Nómina y Pagos',
        permissions: [
            { key: PERMISSIONS.PAYROLL_READ, label: 'Ver Historial de Nóminas' },
            { key: PERMISSIONS.PAYROLL_PROCESS, label: 'Procesar/Calcular Rol de Pagos' },
            { key: PERMISSIONS.PAYROLL_EXPORT, label: 'Exportar Reportes y Archivos Bancarios' },
            { key: PERMISSIONS.PAYROLL_CONFIG, label: 'Configuración Avanzada (Fórmulas/Rubros)' },
            { key: PERMISSIONS.BENEFITS_MANAGE, label: 'Gestionar Beneficios y Préstamos' },
        ]
    },
    {
        name: 'Operaciones y Tiempo',
        permissions: [
            { key: PERMISSIONS.ATTENDANCE_READ_ALL, label: 'Ver Asistencia de Todo el Equipo' },
            { key: PERMISSIONS.ATTENDANCE_APPROVE, label: 'Aprobar/Corregir Asistencias' },
            { key: PERMISSIONS.TASKS_MANAGE, label: 'Administrar Sprints y Tareas' },
            { key: PERMISSIONS.RECRUITMENT_MANAGE, label: 'Gestionar Reclutamiento (ATS)' },
            { key: PERMISSIONS.ONBOARDING_MANAGE, label: 'Gestionar Onboarding' },
            { key: PERMISSIONS.PERFORMANCE_MANAGE, label: 'Administrar Evaluaciones' },
        ]
    },
    {
        name: 'Recursos y Activos',
        permissions: [
            { key: PERMISSIONS.ASSETS_MANAGE, label: 'Gestionar Inventario y Activos' },
            { key: PERMISSIONS.DOCUMENTS_MANAGE, label: 'Administrar Documentos Legales' },
            { key: PERMISSIONS.TRAINING_MANAGE, label: 'Gestionar Cursos y Capacitación' },
        ]
    },
    {
        name: 'Administración del Sistema',
        permissions: [
            { key: PERMISSIONS.ROLES_MANAGE, label: 'Gestionar Roles y Permisos' },
            { key: PERMISSIONS.USERS_MANAGE, label: 'Gestionar Usuarios de Acceso' },
            { key: PERMISSIONS.COMPANY_CONFIG, label: 'Configuración Global Empresa' },
            { key: PERMISSIONS.REPORTS_VIEW, label: 'Ver Reportes Analíticos' },
        ]
    }
];