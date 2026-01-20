// =============================================================================
// DICCIONARIO MAESTRO DE PERMISOS (HÍBRIDO: NUEVO + COMPATIBILIDAD)
// =============================================================================
export const PERMISSIONS = {
    // -------------------------------------------------------------------------
    // 1. AUTOSERVICIO (Portal del Colaborador) - [NUEVO]
    // -------------------------------------------------------------------------
    PERFIL_ME: 'perfil.me',
    PAYROLL_MY_READ: 'nomina.leer_propia',
    ATTENDANCE_MY_READ: 'asistencia.leer_propia',
    VACATIONS_REQUEST: 'vacaciones.solicitar',
    LOANS_REQUEST: 'prestamos.solicitar',
    ONBOARDING_MY_PROGRESS: 'onboarding.mi_progreso',
    TASKS_MY_READ: 'tareas.leer_propias',
    EXPENSES_REPORT: 'gastos.reportar',

    // -------------------------------------------------------------------------
    // 2. TALENTO HUMANO (Gestión de Personas)
    // -------------------------------------------------------------------------
    EMPLOYEES_READ_BASIC: 'empleados.leer_basico',
    EMPLOYEES_READ_SENSITIVE: 'empleados.leer_sensible',

    // [COMPATIBILIDAD] Llaves antiguas que tu HTML busca:
    EMPLOYEES_READ: 'empleados.leer',
    EMPLOYEES_CREATE: 'empleados.crear',
    EMPLOYEES_EDIT: 'empleados.editar',

    EMPLOYEES_MANAGE: 'empleados.gestion',
    EMPLOYEES_DELETE: 'empleados.borrar',
    EMPLOYEES_EXPORT: 'empleados.exportar',

    // -------------------------------------------------------------------------
    // 3. ESTRUCTURA ORGANIZACIONAL
    // -------------------------------------------------------------------------
    BRANCHES_MANAGE: 'sucursales.gestion',
    DEPARTMENTS_MANAGE: 'departamentos.gestion',
    POSITIONS_MANAGE: 'cargos.gestion',

    // -------------------------------------------------------------------------
    // 4. PRODUCTIVIDAD Y PROYECTOS (Sprints)
    // -------------------------------------------------------------------------
    PROJECTS_READ: 'proyectos.leer',
    PROJECTS_MANAGE: 'proyectos.gestion',
    TASKS_MANAGE: 'tareas.gestion',
    TASKS_EXECUTE: 'tareas.ejecutar',

    // -------------------------------------------------------------------------
    // 5. NÓMINA Y COMPENSACIÓN
    // -------------------------------------------------------------------------
    SALARIES_READ: 'salarios.leer',
    PAYROLL_READ_ALL: 'nomina.leer_todo',

    // [COMPATIBILIDAD]
    PAYROLL_READ: 'nomina.leer',

    PAYROLL_PROCESS: 'nomina.procesar',
    PAYROLL_CONFIG: 'nomina.configurar',
    PAYROLL_EXPORT: 'nomina.exportar',
    BENEFITS_MANAGE: 'beneficios.gestionar',
    LOANS_APPROVE: 'prestamos.aprobar',

    // -------------------------------------------------------------------------
    // 6. OPERACIONES, TIEMPO Y ASISTENCIA
    // -------------------------------------------------------------------------
    ATTENDANCE_READ_ALL: 'asistencia.leer_todo',
    ATTENDANCE_APPROVE: 'asistencia.aprobar',
    ATTENDANCE_MODIFY: 'asistencia.modificar',
    SHIFTS_MANAGE: 'turnos.gestion',
    VACATIONS_APPROVE: 'vacaciones.aprobar',

    // -------------------------------------------------------------------------
    // 7. RECLUTAMIENTO, ONBOARDING Y EVALUACIONES
    // -------------------------------------------------------------------------
    RECRUITMENT_MANAGE: 'reclutamiento.gestion',
    ONBOARDING_MANAGE: 'onboarding.gestion',
    ONBOARDING_VIEW_PROGRESS: 'onboarding.ver_progreso',

    // [COMPATIBILIDAD]
    PERFORMANCE_MANAGE: 'desempeno.gestionar',
    TRAINING_MANAGE: 'capacitacion.gestionar',

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
            { key: PERMISSIONS.EXPENSES_REPORT, label: 'Reportar Gastos' },
        ]
    },
    {
        name: 'Gestión de Talento Humano',
        permissions: [
            { key: PERMISSIONS.EMPLOYEES_READ_BASIC, label: 'Ver Directorio (Público)' },
            { key: PERMISSIONS.EMPLOYEES_READ_SENSITIVE, label: 'Ver Datos Sensibles (RRHH)' },
            { key: PERMISSIONS.EMPLOYEES_CREATE, label: 'Contratar Empleados' },
            { key: PERMISSIONS.EMPLOYEES_EDIT, label: 'Editar Datos Personales' },
            { key: PERMISSIONS.EMPLOYEES_DELETE, label: 'Desvincular Personal' },
            { key: PERMISSIONS.EMPLOYEES_EXPORT, label: 'Exportar Excel' },
            { key: PERMISSIONS.SALARIES_READ, label: 'Ver Salarios' },
        ]
    },
    {
        name: 'Nómina y Pagos',
        permissions: [
            { key: PERMISSIONS.PAYROLL_READ, label: 'Ver Historial de Nóminas' },
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
            { key: PERMISSIONS.PERFORMANCE_MANAGE, label: 'Gestionar Evaluaciones' },
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