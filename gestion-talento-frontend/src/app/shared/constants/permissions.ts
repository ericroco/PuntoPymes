// =============================================================================
// DICCIONARIO MAESTRO DE PERMISOS (HÍBRIDO: NUEVO + COMPATIBILIDAD)
// =============================================================================
export const PERMISSIONS = {
    // -------------------------------------------------------------------------
    // 1. AUTOSERVICIO (Portal del Colaborador) - [NUEVO]
    // -------------------------------------------------------------------------
    PERFIL_ME: 'perfil.me',                  // Ver y editar foto/teléfono propio
    PAYROLL_MY_READ: 'nomina.leer_propia',   // Ver mis roles de pago
    ATTENDANCE_MY_READ: 'asistencia.leer_propia', // Ver mis marcaciones
    VACATIONS_REQUEST: 'vacaciones.solicitar', // Solicitar días libres
    LOANS_REQUEST: 'prestamos.solicitar',    // Solicitar anticipos
    ONBOARDING_MY_PROGRESS: 'onboarding.mi_progreso', // Ver mi inducción
    TASKS_MY_READ: 'tareas.leer_propias',    // Ver tareas asignadas a mí

    // -------------------------------------------------------------------------
    // 2. TALENTO HUMANO (Gestión de Personas)
    // -------------------------------------------------------------------------
    EMPLOYEES_READ_BASIC: 'empleados.leer_basico', // Directorio público
    EMPLOYEES_READ_SENSITIVE: 'empleados.leer_sensible', // Datos privados (RRHH)

    // [COMPATIBILIDAD] Llaves antiguas que tu HTML busca:
    EMPLOYEES_READ: 'empleados.leer',        // (Legacy) Lectura general
    EMPLOYEES_CREATE: 'empleados.crear',     // (Legacy) Contratar
    EMPLOYEES_EDIT: 'empleados.editar',      // (Legacy) Editar <--- ESTA FALTABA EN EL ERROR

    EMPLOYEES_MANAGE: 'empleados.gestion',   // [NUEVO] Gestión total (recomendado)
    EMPLOYEES_DELETE: 'empleados.borrar',    // Desvincular
    EMPLOYEES_EXPORT: 'empleados.exportar',  // Exportar Excel

    // -------------------------------------------------------------------------
    // 3. ESTRUCTURA ORGANIZACIONAL
    // -------------------------------------------------------------------------
    BRANCHES_MANAGE: 'sucursales.gestion',
    DEPARTMENTS_MANAGE: 'departamentos.gestion',
    POSITIONS_MANAGE: 'cargos.gestion',

    // -------------------------------------------------------------------------
    // 4. PRODUCTIVIDAD Y PROYECTOS (Sprints)
    // -------------------------------------------------------------------------
    PROJECTS_READ: 'proyectos.leer',       // Ver tableros
    PROJECTS_MANAGE: 'proyectos.gestion',  // Crear Proyectos (Jefes)
    TASKS_MANAGE: 'tareas.gestion',        // Asignar/Borrar Tareas (Jefes)
    TASKS_EXECUTE: 'tareas.ejecutar',      // Mover columnas/Comentar (Colaboradores)

    // -------------------------------------------------------------------------
    // 5. NÓMINA Y COMPENSACIÓN
    // -------------------------------------------------------------------------
    SALARIES_READ: 'salarios.leer',        // Ver campo sueldo
    PAYROLL_READ_ALL: 'nomina.leer_todo',  // Ver historial completo (RRHH)

    // [COMPATIBILIDAD]
    PAYROLL_READ: 'nomina.leer',           // (Legacy) <--- ESTA FALTABA EN EL ERROR

    PAYROLL_PROCESS: 'nomina.procesar',    // Calcular Rol
    PAYROLL_CONFIG: 'nomina.configurar',   // Fórmulas
    PAYROLL_EXPORT: 'nomina.exportar',     // Archivos bancarios
    BENEFITS_MANAGE: 'beneficios.gestionar', // Préstamos (Legacy)
    LOANS_APPROVE: 'prestamos.aprobar',    // Aprobar préstamos (Nuevo)

    // -------------------------------------------------------------------------
    // 6. OPERACIONES, TIEMPO Y ASISTENCIA
    // -------------------------------------------------------------------------
    ATTENDANCE_READ_ALL: 'asistencia.leer_todo',
    ATTENDANCE_APPROVE: 'asistencia.aprobar',    // (Legacy)
    ATTENDANCE_MODIFY: 'asistencia.modificar',   // (Nuevo) Corregir
    SHIFTS_MANAGE: 'turnos.gestion',
    VACATIONS_APPROVE: 'vacaciones.aprobar',

    // -------------------------------------------------------------------------
    // 7. RECLUTAMIENTO, ONBOARDING Y EVALUACIONES
    // -------------------------------------------------------------------------
    RECRUITMENT_MANAGE: 'reclutamiento.gestion',
    ONBOARDING_MANAGE: 'onboarding.gestion',
    ONBOARDING_VIEW_PROGRESS: 'onboarding.ver_progreso',

    // [COMPATIBILIDAD]
    PERFORMANCE_MANAGE: 'desempeno.gestionar', // <--- ESTA FALTABA EN EL ERROR (Evaluaciones)
    TRAINING_MANAGE: 'capacitacion.gestionar', // Cursos

    // -------------------------------------------------------------------------
    // 8. RECURSOS Y ACTIVOS
    // -------------------------------------------------------------------------
    ASSETS_MANAGE: 'activos.gestionar',
    DOCUMENTS_MANAGE: 'documentos.gestionar',

    // -------------------------------------------------------------------------
    // 9. ADMINISTRACIÓN DEL SISTEMA
    // -------------------------------------------------------------------------
    ROLES_MANAGE: 'roles.gestion',
    USERS_MANAGE: 'usuarios.gestion',
    COMPANY_CONFIG: 'empresa.configurar',
    REPORTS_VIEW: 'reportes.ver',
    AUDIT_LOG_VIEW: 'auditoria.ver',
    COMPANY_POLICIES_MANAGE: 'politicas.gestion',
};

// =============================================================================
// ESTRUCTURA PARA LA UI (Grupos de Checkboxes)
// =============================================================================
export const PERMISSION_GROUPS = [
    {
        name: 'Portal del Colaborador (Autoservicio)',
        permissions: [
            { key: PERMISSIONS.PERFIL_ME, label: 'Ver/Editar mi Perfil' },
            { key: PERMISSIONS.PAYROLL_MY_READ, label: 'Ver mis Roles de Pago' },
            { key: PERMISSIONS.ATTENDANCE_MY_READ, label: 'Ver mi Asistencia' },
            { key: PERMISSIONS.VACATIONS_REQUEST, label: 'Solicitar Vacaciones' },
            { key: PERMISSIONS.LOANS_REQUEST, label: 'Solicitar Préstamos' },
            { key: PERMISSIONS.TASKS_MY_READ, label: 'Ver mis Tareas (Proyectos)' },
        ]
    },
    {
        name: 'Gestión de Talento Humano',
        permissions: [
            { key: PERMISSIONS.EMPLOYEES_READ_BASIC, label: 'Ver Directorio (Público)' },
            { key: PERMISSIONS.EMPLOYEES_READ_SENSITIVE, label: 'Ver Datos Sensibles (RRHH)' },
            { key: PERMISSIONS.EMPLOYEES_CREATE, label: 'Contratar Empleados' },
            { key: PERMISSIONS.EMPLOYEES_EDIT, label: 'Editar Datos Personales' }, // <--- Aquí está la que faltaba
            { key: PERMISSIONS.EMPLOYEES_DELETE, label: 'Desvincular Personal' },
            { key: PERMISSIONS.EMPLOYEES_EXPORT, label: 'Exportar Excel' },
            { key: PERMISSIONS.SALARIES_READ, label: 'Ver Salarios' },
        ]
    },
    {
        name: 'Nómina y Pagos',
        permissions: [
            { key: PERMISSIONS.PAYROLL_READ, label: 'Ver Historial de Nóminas' }, // <--- Aquí está la que faltaba
            { key: PERMISSIONS.PAYROLL_PROCESS, label: 'Procesar/Calcular Rol' },
            { key: PERMISSIONS.PAYROLL_EXPORT, label: 'Archivos Bancarios' },
            { key: PERMISSIONS.PAYROLL_CONFIG, label: 'Configurar Fórmulas' },
            { key: PERMISSIONS.BENEFITS_MANAGE, label: 'Gestionar Beneficios' },
        ]
    },
    {
        name: 'Operaciones y Desempeño',
        permissions: [
            { key: PERMISSIONS.ATTENDANCE_READ_ALL, label: 'Ver Asistencias' },
            { key: PERMISSIONS.ATTENDANCE_APPROVE, label: 'Aprobar Asistencias' },
            { key: PERMISSIONS.SHIFTS_MANAGE, label: 'Gestionar Turnos' },
            { key: PERMISSIONS.VACATIONS_APPROVE, label: 'Aprobar Vacaciones' },
            { key: PERMISSIONS.PERFORMANCE_MANAGE, label: 'Gestionar Evaluaciones' }, // <--- Aquí está la que faltaba
        ]
    },
    {
        name: 'Proyectos y Productividad (Agile)',
        permissions: [
            { key: PERMISSIONS.PROJECTS_READ, label: 'Ver Tableros' },
            { key: PERMISSIONS.TASKS_EXECUTE, label: 'Colaborador: Ejecutar Tareas' },
            { key: PERMISSIONS.PROJECTS_MANAGE, label: 'Manager: Crear Proyectos' },
            { key: PERMISSIONS.TASKS_MANAGE, label: 'Manager: Gestionar Tareas' },
        ]
    },
    {
        name: 'Estructura y Reclutamiento',
        permissions: [
            { key: PERMISSIONS.BRANCHES_MANAGE, label: 'Gestionar Sucursales' },
            { key: PERMISSIONS.DEPARTMENTS_MANAGE, label: 'Gestionar Departamentos' },
            { key: PERMISSIONS.POSITIONS_MANAGE, label: 'Gestionar Cargos' },
            { key: PERMISSIONS.RECRUITMENT_MANAGE, label: 'Gestionar Reclutamiento' },
            { key: PERMISSIONS.ONBOARDING_MANAGE, label: 'Gestionar Onboarding' },
        ]
    },
    {
        name: 'Recursos y Admin',
        permissions: [
            { key: PERMISSIONS.ASSETS_MANAGE, label: 'Activos e Inventario' },
            { key: PERMISSIONS.DOCUMENTS_MANAGE, label: 'Documentos Legales' },
            { key: PERMISSIONS.TRAINING_MANAGE, label: 'Capacitación' },
            { key: PERMISSIONS.ROLES_MANAGE, label: 'Gestionar Roles' },
            { key: PERMISSIONS.USERS_MANAGE, label: 'Gestionar Usuarios' },
            { key: PERMISSIONS.COMPANY_CONFIG, label: 'Configuración Empresa' },
            { key: PERMISSIONS.REPORTS_VIEW, label: 'Ver Reportes' },
            { key: PERMISSIONS.COMPANY_POLICIES_MANAGE, label: 'Gestionar Políticas' },
        ]
    }
];