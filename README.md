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

---

# Documentación Backend - Gestión de Talento Humano

## 1. Arquitectura General y Estructura del Repositorio
El proyecto se organiza en un monorepo, gestionado por Nest CLI, que contiene una aplicación principal (API Gateway) y múltiples microservicios (aplicaciones) y una librería compartida.
### Componentes de la arquitectura:

| Componente | Tipo | Responsabilidad Principal | Servicio Docker (Host) |
| ------------------------------- | -------- | ---------- | --- |
| `punto-pymes-backend` | Aplicación (API Gateway) | Punto de entrada HTTP (REST), Autenticación JWT, Enrutamiento a Microservicios. | `punto-pymes-backend` (main app) |
| `auth` | Microservicio | Gestión de Usuarios, Roles, y Autenticación. | `auth_service` |
| `personal` | Microservicio | Gestión de Empleados, Estructura Organizacional (Dptos., Cargos), Reclutamiento. | `personal_service` |
| `nomina` | Microservicio | Gestión de Nómina, Contratos y Beneficios. | `nomina_service` |
| `productividad` | Microservicio | Gestión de Proyectos, Tareas, Asistencia, Desempeño y Activos/Gastos. | `productividad_service` |
| `database` | Librería (`libs/database`) | Definición centralizada de todas las entidades de la aplicación. | N/A |

### Comunicación Inter-Servicios: 
La comunicación entre el API Gateway (`punto-pymes-backend`) y los microservicios es gestionada por el módulo `ClientsModule` de NestJS, utilizando el protocolo **TCP**.

Los servicios cliente están configurados para inyectarse en el API Gateway y dirigir los comandos a los hosts definidos (presumiblemente nombres de servicios Docker) y puertos de entorno:

* **AUTH_SERVICE**: Se conecta a `auth_service`.
* **PERSONAL_SERVICE**: Se conecta a `personal_service`.
* **NOMINA_SERVICE**: Se conecta a `nomina_service`.
* **PRODUCTIVIDAD_SERVICE**: Se conecta a `productividad_service`.

---

## 2. API Gateway (`punto-pymes-backend`)
Es la aplicación principal que expone la interfaz REST al frontend y encapsula la lógica de comunicación con los microservicios internos.

### Autenticación y Seguridad
* **JWT:** El módulo central implementa la autenticación JWT a través de `JwtModule` y `PassportModule`, con una estrategia `JwtStrategy` para validar el token y proveer el contexto de usuario/empresa.
* **Autorización:** Utiliza `PermissionGuard` y un decorador `@Permissions()` para aplicar reglas de acceso basadas en roles y permisos, asegurando que solo usuarios autorizados puedan invocar ciertas rutas.

### Archivos Estáticos
El módulo sirve archivos estáticos (como imágenes de perfil o documentos) a través de la ruta pública `/uploads`, mapeada a la carpeta local `uploads`.

---

## 3. Microservicios y Funcionalidad del Dominio
Cada microservicio se centra en una parte específica del dominio de la gestión de talento humano (HRMS/ERP). Utilizan decoradores `@MessagePattern` para exponer su funcionalidad a través de TCP.

### A. Microservicio `auth` (Autenticación y Núcleo)
Maneja el acceso, la creación inicial de empresas y usuarios, y la gestión de contexto entre empresas.

| Comando (`cmd`) | Descripción | DTO Relacionado |
| --- | --- | --- |
| `ping` | Prueba de salud/conectividad. | N/A |
| `register` | Flujo de registro inicial (crea Empresa, Usuario, Rol y Empleado inicial). | `RegisterDto` |
| `login` | Autenticación de usuario por email/contraseña. | `LoginDto` |
| `switch_company` | Cambia la empresa activa para el usuario, generando un nuevo token. | `SwitchCompanyDto` |
| `create_user_auto` | Crea una cuenta de usuario a partir de un empleado existente (para integración). | N/A |

### B. Microservicio `personal` (Gestión de Personal)
Encargado de la gestión de la fuerza laboral y el ciclo de reclutamiento (Talento).

* **Modelos Clave:** `Empleado`, `Departamento`, `Cargo`, `Rol`, `Vacante`, `Candidato`, `DocumentoEmpleado`, `Sucursal`.
* **Funcionalidad Destacada:** Incluye lógica para actualizar candidatos con información extraída mediante IA (usando `@google/generative-ai` y `pdf-parse`).

### C. Microservicio `nomina` (Nómina y Compensación)
Gestiona la compensación de los empleados, contratos y periodos de pago.

* **Modelos Clave:** `Contrato`, `PeriodoNomina`, `NominaEmpleado`, `RubroNomina`, `Beneficio`, `ConceptoNomina`, `SolicitudVacaciones`.
* **Funcionalidad Destacada:** Define DTOs para el proceso de cálculo de nómina (`procesar-nomina.dto.ts`) y la gestión de conceptos de nómina (ingresos y egresos).

### D. Microservicio `productividad` (Productividad, Desempeño y Control)
Aglutina las funcionalidades de seguimiento de tiempo, gestión de proyectos, evaluación de desempeño y control de activos/gastos.

* **Modelos Clave:** `Proyecto`, `Sprint`, `Tarea`, `Timesheet`, `RegistroAsistencia`, `Activo`, `Objetivo`, `Evaluacion`, `Curso`.
* **Funcionalidad Destacada:**
* **Asistencia:** Maneja el registro de entrada (`check-in.dto.ts`) y salida (`check-out.dto.ts`).
* **Proyectos/Tareas:** Ofrece DTOs para la creación de proyectos, sprints, y tareas.
* **Activos/Gastos:** Incluye lógica para asignar y retornar activos y gestionar reportes de gastos.



---

## 4. Capa de Datos Compartida (`libs/database`)
La librería `database` define el modelo de datos unificado para todos los microservicios, promoviendo la consistencia.

### Tecnologías de Persistencia
* Utiliza **TypeORM** para bases de datos relacionales (con soporte para **PostgreSQL**, basado en las dependencias).
* Incluye dependencias para **Mongoose** (MongoDB), lo que sugiere una posible arquitectura híbrida de bases de datos o migración pendiente.

### Entidades Centrales
Las entidades se organizan por módulos funcionales:

| Dominio | Entidades Clave |
| --- | --- |
| **Núcleo/Auth** | `Empresa`, `Usuario`, `BaseEntity` |
| **Personal** | `Empleado`, `Rol`, `Departamento`, `Cargo`, `Contrato`, `Sucursal` |
| **Nómina** | `PeriodoNomina`, `NominaEmpleado`, `RubroNomina`, `Beneficio`, `ConceptoNomina`, `NovedadNomina`, `SolicitudVacaciones` |
| **Productividad** | `Proyecto`, `Sprint`, `Tarea`, `Timesheet`, `RegistroAsistencia` |
| **Desempeño/Capacitación** | `CicloEvaluacion`, `Objetivo`, `Evaluacion`, `Curso`, `InscripcionCurso` |
| **Reclutamiento** | `Candidato`, `Vacante` |
| **Control/Activos** | `Activo`, `ActivoAsignado`, `ReporteGasto`, `ItemGasto` |

---

## 5. Dependencias Tecnológicas Clave

| Categoría | Dependencia | Versión | Propósito |
| --- | --- | --- | --- |
| **Core Framework** | `@nestjs/core`, `@nestjs/common`, `typescript` | `^11.0.1`, `^5.7.3` | Base del backend (NestJS, TypeScript) |
| **Microservicios** | `@nestjs/microservices` | `^11.1.8` | Habilita la comunicación RPC (TCP) entre servicios. |
| **Bases de Datos** | `typeorm`, `pg`, `@nestjs/mongoose`, `mongoose` | `^0.3.27`, `^8.16.3`, `^11.0.3`, `^8.19.2` | Soporte para bases de datos SQL (PostgreSQL) y NoSQL (MongoDB). |
| **Autenticación** | `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt` | `^11.0.1`, `^11.0.5`, `^4.0.1`, `^6.0.0` | Generación y validación de tokens JWT, hasheo de contraseñas. |
| **Validación** | `class-validator`, `class-transformer` | `^0.14.2`, `^0.5.1` | Utilizado para la validación de DTOs en los controladores (`@UsePipes(new ValidationPipe())`). |
| **Documentación** | `@nestjs/swagger`, `swagger-ui-express` | `^11.2.3`, `^5.0.1` | Generación de documentación de API (OpenAPI/Swagger). |
| **IA/Documentos** | `@google/generative-ai`, `pdf-parse`, `pdf2json` | `^0.24.1` | Integración de IA de Google y herramientas para procesar archivos PDF. |
