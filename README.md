# PuntoPymes


# Documentación Frontend - Proyecto Gestión de Talento PuntoPymes

El frontend de Gestión de Talento de PuntoPymes es una aplicación monolítica construida con el framework **Angular**, utilizando una arquitectura modular y componentes *standalone* para optimizar el rendimiento y la mantenibilidad.

## 1\. Estructura de Directorios del Proyecto

La estructura del directorio `src/app` es clave y sigue un patrón de diseño orientado a la modularidad y a la separación de responsabilidades:

```
gestion-talento-frontend/src/app/
├── app.config.ts             // Configuración inicial de la aplicación
├── app.ts                    // Componente raíz (App)
├── app.routes.ts             // Enrutamiento principal (AppRoutingModule)
├── layout/                   // Contenedores visuales y navegación
│   ├── components/
│   │   ├── navbar/           // Componente de la barra superior
│   │   └── sidebar/          // Componente de la barra lateral de navegación
│   └── main-layout/          // Layout principal (Dashboard)
├── modules/                  // Módulos de la aplicación (Lazy-loaded)
│   ├── auth/                 // Módulo de Autenticación
│   │   ├── pages/
│   │   │   └── login/        // Página de Login
│   │   └── auth-module.ts
│   │   └── auth-routing-module.ts
│   └── dashboard/            // Módulo de Gestión de Talento (Core HR)
│       ├── components/       // Componentes de utilidad o Diálogos (Modales)
│       ├── pages/            // Páginas principales del dashboard
│       ├── dashboard-module.ts
│       └── dashboard-routing-module.ts
├── public/                   // Secciones accesibles sin autenticación
│   └── pages/
│       └── vacancy-public-page/ // Página pública para ver vacantes
└── shared/                   // Elementos reutilizables en toda la aplicación
    ├── components/           // Diálogos de uso general, headers, etc.
    └── pipes/                // Pipes de Angular (ej. filtros de datos)
```

## 2\. Componentes y Servicios de Core

| Componente/Archivo | Ubicación | Descripción Extensa |
| :--- | :--- | :--- |
| **`App`** | `app.ts` | **Componente Raíz.** Es el punto de entrada de la interfaz. Su plantilla (`app.html`) contiene únicamente el `RouterOutlet` que renderiza todo el contenido de la aplicación. Gestiona una señal (`signal`) de solo lectura para el título. |
| **`AppRoutingModule`** | `app.routes.ts` | Define el enrutamiento de alto nivel. Carga perezosamente el módulo `auth` y utiliza el `MainLayout` para la ruta `/dashboard`. Redirige la URL raíz (`''`) a `/dashboard` y las URLs no encontradas (`**`) a `/auth`. |
| **`MainLayout`** | `layout/main-layout/main-layout.ts` | **Contenedor Principal del Dashboard.** Componente *standalone* que integra los elementos de navegación persistentes: `Sidebar` y `Navbar`. Todas las rutas protegidas del sistema cargan dentro de su `RouterOutlet`. |
| **`Sidebar`** | `layout/components/sidebar/sidebar.ts` | **Navegación Primaria.** Es la barra lateral que permite la navegación entre todos los módulos del dashboard (Empleados, Reclutamiento, Nómina, Configuración, etc.). |
| **`Navbar`** | `layout/components/navbar/navbar.ts` | **Barra Superior.** Contiene elementos como el título de la página actual, información del usuario, notificaciones y acceso a acciones de perfil/sesión. |

## 3\. Módulos y Enrutamiento por Funcionalidad

La aplicación se divide en dos módulos de enrutamiento principales cargados de forma perezosa (`lazy loading`):

### 3.1. Módulo `Auth` (`/auth`)

  * **Propósito:** Gestionar el acceso.
  * **Componentes Clave:**
      * **`Login` (`/auth/login`):** Componente con formulario reactivo para la autenticación del usuario.

### 3.2. Módulo `Dashboard` (`/dashboard`)

Es el corazón del sistema, que encapsula toda la funcionalidad de Gestión de Recursos Humanos (RR.HH.).

| Sub-módulo/Página | Rutas Asociadas | Componente Clave | Inferencia de Entidad Principal (Modelo) |
| :--- | :--- | :--- | :--- |
| **General** | `/overview` | `Overview` | **Dashboard Metrics:** Agregación de datos de otras entidades (empleados, vacantes, tareas). |
| **Gestión de Empleados** | `/employees`, `/employee/:id`, `/my-profile` | `EmployeeManagement`, `EmployeeProfile` | **Employee:** Datos personales, contacto, roles, horario, salario, historial. |
| **Reclutamiento** | `/recruitment`, `/recruitment/:id`, `/recruitment/new` | `Recruitment`, `VacancyPipeline`, `CreateVacancy` | **Vacancy, Candidate:** Oferta de trabajo y registro del aspirante. |
| **Productividad** | `/sprints`, `/sprints/:sprintId` | `TasksProductivity`, `SprintBoard` | **Sprint, Task:** Ciclo de trabajo, tareas individuales. |
| **Nómina y Beneficios** | `/payroll`, `/benefits`, `/benefits/assign/:id` | `Payroll`, `Benefits`, `BenefitAssignment` | **Payroll Record, Benefit:** Registros de pago, elementos de la nómina, beneficios disponibles y asignados. |
| **Administración** | `/timesheet`, `/goals`, `/surveys`, `/career-paths`, `/policies`, `/organization-chart`, `/onboarding` | `Timesheet`, `Goals`, `Surveys`, `CareerPaths`, `PolicyLibrary`, `OrganizationChart`, `OnboardingDashboard` | **Time Log, Goal, Survey, CareerPath, Policy:** Registros de seguimiento específicos. |
| **Configuración** | `/settings` y sub-rutas | `Settings` y componentes específicos (ej. `RoleSettings`) | **Settings:** Parámetros clave de la aplicación (Branding, Módulos, Roles, Asistencia). |
| **Público** | `/carreras/:id` | `VacancyPublicPage` | **Vacancy:** Información pública de una oferta de trabajo. |

## 4\. Componentes de Interacción y Flujos (Diálogos Modales)

La mayoría de las interacciones de creación (C) y edición (U) de entidades se manejan a través de diálogos modales (`MatDialog`), que se encuentran en el directorio `modules/dashboard/components`. La existencia de estos componentes es la principal fuente de inferencia para los modelos de negocio.

### 4.1. Diálogos Comunes (`shared/components`)

| Componente | Uso/Flujo de Trabajo | Inferencia de Datos/Modelo |
| :--- | :--- | :--- |
| **`ConfirmationDialog`** | Se utiliza antes de cualquier acción crítica (ej. eliminar, rechazar, desasignar) para solicitar la confirmación del usuario. | `DialogData { title: string, message: string, confirmText: string }` |
| **`SubpageHeader`** | Componente de presentación para títulos y acciones de página. | Recibe el título y potencialmente botones de acción (`@Input()`). |
| **`FilterByTypePipe`** | Pipe de uso general para filtrar datos en plantillas HTML. | Implementa la interfaz `PipeTransform` para filtrar arrays de objetos por una propiedad específica. |

### 4.2. Diálogos Específicos de Módulos (Inferencia de Modelos de Negocio)

La siguiente tabla detalla la inferencia de las entidades y las propiedades que gestiona el frontend a través de sus diálogos:

| Diálogo / Archivos | Inferencia de Modelo (Entidad) | Campos de Datos Inferidos (Propiedades) |
| :--- | :--- | :--- |
| **`add-employee-dialog`** | **Employee (Creación)** | Nombre, Apellido, Email, Cargo (Job), Departamento, Fecha de Ingreso, Salario (inicial). |
| **`edit-employee-dialog`** | **Employee (Edición)** | Campos de datos básicos del empleado. |
| **`edit-contact-info-dialog`** | **Employee Contact Info** | Teléfono, Dirección, Contacto de Emergencia, etc. |
| **`edit-schedule-dialog`** | **Employee Schedule** | Horario de trabajo (entrada/salida), días laborables, zona horaria. |
| **`candidate-profile-dialog`** | **Candidate** | CV/Hoja de vida, notas del reclutador, historial de entrevistas, vacante asociada. |
| **`hire-candidate-dialog`** | **Candidate/Hiring Action** | Fecha de inicio, salario, rol final, manager, confirmación. |
| **`reject-candidate-dialog`** | **Candidate/Rejection Action** | Motivo del rechazo, plantilla de email a enviar al candidato. |
| **`add-sprint-dialog`** | **Sprint** | Nombre, fechas (inicio/fin), equipo/participantes, objetivo. |
| **`add-task-dialog`** | **Task** | Título, descripción, empleado asignado, prioridad, estado (To Do, In Progress, Done), fecha límite. |
| **`update-progress-dialog`** | **Task Progress** | Porcentaje de avance, comentarios, fecha de actualización. |
| **`upload-evidence-dialog`** | **Task Evidence** | Archivos adjuntos (documentos, imágenes), descripción de la evidencia. |
| **`add-course-dialog`** | **Course** | Título, descripción, duración, proveedor, URL, empleados obligatorios/recomendados. |
| **`add-job-dialog`** | **Job (Puesto)** | Título del puesto, descripción, departamento, salario base. |
| **`add-role-dialog`** | **Role (Permisos)** | Nombre del rol, lista de permisos específicos (CRUD por módulo), usuarios asignados. |
| **`invite-admin-dialog`** | **User Invitation** | Email del invitado, rol a asignar (Admin/Manager), fecha de expiración de la invitación. |
| **`add-payroll-item-dialog`** | **Payroll Item** | Nombre, tipo (Deducción/Ganancia), monto/porcentaje, aplicabilidad (fijo/variable). |
| **`add-document-dialog`** | **Policy/Document** | Título, categoría, archivo (upload), visibilidad (empleados/roles), fecha de publicación. |

## 5\. Arquitectura de Datos y Servicios (Inferencia)

Aunque los archivos de servicios (`.service.ts`) no están directamente provistos, la arquitectura Angular implica el siguiente flujo de datos para la capa de presentación:

1.  **Vistas (Pages/Components):** Consumen datos y manejan la interacción del usuario.
2.  **Servicios (Inferred):** Clases inyectables que implementan la lógica de negocio y la comunicación con el backend (API REST). Por ejemplo, existirían servicios como `EmployeeService`, `RecruitmentService`, `SettingsService`, etc.
3.  **Modelos/Interfaces (Inferred):** Tipos de TypeScript que definen la estructura de los datos intercambiados con el backend.

| Servicio Invocado (Inferencia) | Módulos que lo invocan (Ejemplos) | Operaciones Principales Inferidas |
| :--- | :--- | :--- |
| **`AuthService`** | `Login` | `login()`, `logout()`, `refreshToken()` |
| **`EmployeeService`** | `EmployeeManagement`, `EmployeeProfile` | `getEmployees()`, `getEmployee(id)`, `createEmployee()`, `updateEmployee()`, `updateSchedule()` |
| **`VacancyService`** | `Recruitment`, `CreateVacancy`, `VacancyPipeline` | `getVacancies()`, `getVacancy(id)`, `createVacancy()`, `updateVacancy()`, `moveCandidate(id, phase)` |
| **`RoleService`** | `RoleSettings`, `UserSettings` | `getRoles()`, `createRole()`, `updatePermissions()`, `assignRoleToUser()` |
| **`SprintService`** | `TasksProductivity`, `SprintBoard` | `getSprints()`, `getTasks(sprintId)`, `createTask()`, `updateTaskProgress()` |
| **`SettingsService`** | Todas las páginas de `/settings` | `getBranding()`, `updateBranding()`, `getAttendanceRules()`, `updatePayrollSettings()` |

La utilización de *RxJS* (visible en las dependencias de `package.json`) y del patrón de inyección de dependencias de Angular garantizan que la gestión de estado y la comunicación asíncrona con la API sean robustas y reactivas.
