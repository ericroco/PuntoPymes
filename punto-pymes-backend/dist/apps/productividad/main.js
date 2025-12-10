/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/productividad/src/dto/create-proyecto.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/productividad/src/dto/create-proyecto.dto.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateProyectoDto = exports.EstadoProyecto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var EstadoProyecto;
(function (EstadoProyecto) {
    EstadoProyecto["ACTIVO"] = "Activo";
    EstadoProyecto["PAUSADO"] = "Pausado";
    EstadoProyecto["COMPLETADO"] = "Completado";
})(EstadoProyecto || (exports.EstadoProyecto = EstadoProyecto = {}));
class CreateProyectoDto {
    nombre;
    descripcion;
    liderId;
    fechaInicio;
    fechaFin;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, maxLength: 255 }, descripcion: { required: false, type: () => String }, liderId: { required: false, type: () => String, format: "uuid" }, fechaInicio: { required: false, type: () => Date }, fechaFin: { required: false, type: () => Date }, estado: { required: false, enum: (__webpack_require__(/*! ./create-proyecto.dto */ "./apps/productividad/src/dto/create-proyecto.dto.ts").EstadoProyecto) } };
    }
}
exports.CreateProyectoDto = CreateProyectoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "liderId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateProyectoDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateProyectoDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(EstadoProyecto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "estado", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-tarea.dto.ts":
/*!********************************************************!*\
  !*** ./apps/productividad/src/dto/create-tarea.dto.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTareaDto = exports.PrioridadTarea = exports.EstadoTarea = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var EstadoTarea;
(function (EstadoTarea) {
    EstadoTarea["PENDIENTE"] = "PENDIENTE";
    EstadoTarea["EN_PROGRESO"] = "EN_PROGRESO";
    EstadoTarea["COMPLETADA"] = "COMPLETADA";
})(EstadoTarea || (exports.EstadoTarea = EstadoTarea = {}));
var PrioridadTarea;
(function (PrioridadTarea) {
    PrioridadTarea["BAJA"] = "BAJA";
    PrioridadTarea["MEDIA"] = "MEDIA";
    PrioridadTarea["ALTA"] = "ALTA";
})(PrioridadTarea || (exports.PrioridadTarea = PrioridadTarea = {}));
class CreateTareaDto {
    titulo;
    descripcion;
    puntosHistoria;
    estado;
    prioridad;
    objetivoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, puntosHistoria: { required: false, type: () => Number, minimum: 0 }, estado: { required: false, enum: (__webpack_require__(/*! ./create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts").EstadoTarea) }, prioridad: { required: false, enum: (__webpack_require__(/*! ./create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts").PrioridadTarea) }, objetivoId: { required: false, type: () => String, format: "uuid" } };
    }
}
exports.CreateTareaDto = CreateTareaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTareaDto.prototype, "puntosHistoria", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(EstadoTarea),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(PrioridadTarea),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "prioridad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "objetivoId", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/dashboard-kpi.dto.ts":
/*!*********************************************************!*\
  !*** ./apps/productividad/src/dto/dashboard-kpi.dto.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardKpiDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
class DashboardKpiDto {
    totalEmpleados;
    totalProyectosActivos;
    totalGastosAprobados;
    tasaAsistenciaHoy;
    distribucion9Box;
    static _OPENAPI_METADATA_FACTORY() {
        return { totalEmpleados: { required: true, type: () => Number }, totalProyectosActivos: { required: true, type: () => Number }, totalGastosAprobados: { required: true, type: () => Number }, tasaAsistenciaHoy: { required: true, type: () => Number }, distribucion9Box: { required: true, type: () => ({ bajoDesempenoBajoPotencial: { required: true, type: () => Number }, altoDesempenoAltoPotencial: { required: true, type: () => Number }, bajoDesempenoAltoPotencial: { required: true, type: () => Number }, altoDesempenoBajoPotencial: { required: true, type: () => Number }, bajoDesempenoMedioPotencial: { required: true, type: () => Number }, altoDesempenoMedioPotencial: { required: true, type: () => Number }, medioDesempenoBajoPotencial: { required: true, type: () => Number }, medioDesempenoMedioPotencial: { required: true, type: () => Number } }) } };
    }
}
exports.DashboardKpiDto = DashboardKpiDto;


/***/ }),

/***/ "./apps/productividad/src/productividad.controller.ts":
/*!************************************************************!*\
  !*** ./apps/productividad/src/productividad.controller.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductividadController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const productividad_service_1 = __webpack_require__(/*! ./productividad.service */ "./apps/productividad/src/productividad.service.ts");
let ProductividadController = class ProductividadController {
    productividadService;
    constructor(productividadService) {
        this.productividadService = productividadService;
    }
    getProyectos(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido get_proyectos para empresa: ${data.empresaId}`);
        return this.productividadService.getProyectos(data.empresaId);
    }
    createProyecto(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido create_proyecto: ${data.dto.nombre}`);
        return this.productividadService.createProyecto(data.empresaId, data.dto);
    }
    updateProyecto(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido update_proyecto para: ${data.proyectoId}`);
        return this.productividadService.updateProyecto(data.empresaId, data.proyectoId, data.dto);
    }
    deleteProyecto(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido delete_proyecto para: ${data.proyectoId}`);
        return this.productividadService.deleteProyecto(data.empresaId, data.proyectoId);
    }
    createSprint(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido create_sprint en proyecto: ${data.proyectoId}`);
        return this.productividadService.createSprint(data.empresaId, data.proyectoId, data.dto);
    }
    getSprintsByProyecto(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido get_sprints para proyecto: ${data.proyectoId}`);
        return this.productividadService.getSprintsByProyecto(data.empresaId, data.proyectoId);
    }
    updateSprint(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido update_sprint para sprint: ${data.sprintId}`);
        return this.productividadService.updateSprint(data.empresaId, data.sprintId, data.dto);
    }
    deleteSprint(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido delete_sprint para sprint: ${data.sprintId}`);
        return this.productividadService.deleteSprint(data.empresaId, data.sprintId);
    }
    createTarea(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido create_tarea en sprint: ${data.sprintId}`);
        return this.productividadService.createTarea(data.empresaId, data.sprintId, data.dto);
    }
    getTareasBySprint(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido get_tareas para sprint: ${data.sprintId}`);
        return this.productividadService.getTareasBySprint(data.empresaId, data.sprintId);
    }
    updateTarea(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido update_tarea para: ${data.tareaId}`);
        return this.productividadService.updateTarea(data.empresaId, data.tareaId, data.dto);
    }
    deleteTarea(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Recibido delete_tarea para: ${data.tareaId}`);
        return this.productividadService.deleteTarea(data.empresaId, data.tareaId);
    }
    assignTarea(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Asignando tarea ${data.tareaId} al empleado ${data.dto.empleadoId}`);
        return this.productividadService.assignTarea(data.empresaId, data.tareaId, data.dto);
    }
    getAsignaciones(data) {
        return this.productividadService.getAsignacionesByTarea(data.empresaId, data.tareaId);
    }
    removeAsignacion(data) {
        return this.productividadService.removeAsignacion(data.empresaId, data.asignacionId);
    }
    updateAsignacion(data) {
        console.log(`Microservicio PRODUCTIVIDAD: Actualizando asignación ${data.asignacionId}`);
        return this.productividadService.updateAsignacion(data.empresaId, data.asignacionId, data.dto);
    }
    createCiclo(data) {
        return this.productividadService.createCiclo(data.empresaId, data.dto);
    }
    getCiclos(data) {
        return this.productividadService.getCiclos(data.empresaId);
    }
    updateCiclo(data) {
        return this.productividadService.updateCiclo(data.empresaId, data.cicloId, data.dto);
    }
    deleteCiclo(data) {
        return this.productividadService.deleteCiclo(data.empresaId, data.cicloId);
    }
    createObjetivo(data) {
        return this.productividadService.createObjetivo(data.empresaId, data.cicloId, data.dto);
    }
    getObjetivos(data) {
        return this.productividadService.getObjetivos(data.empresaId, data.cicloId, data.empleadoId);
    }
    updateObjetivo(data) {
        return this.productividadService.updateObjetivo(data.empresaId, data.objetivoId, data.dto);
    }
    createEvaluacion(data) {
        return this.productividadService.createEvaluacion(data.empresaId, data.cicloId, data.dto);
    }
    getEvaluaciones(data) {
        return this.productividadService.getEvaluaciones(data.empresaId, data.cicloId);
    }
    updateEvaluacion(data) {
        return this.productividadService.updateEvaluacion(data.empresaId, data.evaluacionId, data.dto);
    }
    deleteEvaluacion(data) {
        return this.productividadService.deleteEvaluacion(data.empresaId, data.evaluacionId);
    }
    createCurso(data) {
        return this.productividadService.createCurso(data.empresaId, data.dto);
    }
    getCursos(data) {
        return this.productividadService.getCursos(data.empresaId);
    }
    updateCurso(data) {
        return this.productividadService.updateCurso(data.empresaId, data.cursoId, data.dto);
    }
    deleteCurso(data) {
        return this.productividadService.deleteCurso(data.empresaId, data.cursoId);
    }
    createInscripcion(data) {
        return this.productividadService.createInscripcion(data.empresaId, data.cursoId, data.dto);
    }
    getInscripcionesCurso(data) {
        return this.productividadService.getInscripcionesByCurso(data.empresaId, data.cursoId);
    }
    updateInscripcion(data) {
        return this.productividadService.updateInscripcion(data.empresaId, data.inscripcionId, data.dto);
    }
    deleteInscripcion(data) {
        return this.productividadService.deleteInscripcion(data.empresaId, data.inscripcionId);
    }
    checkIn(data) {
        return this.productividadService.checkIn(data.empresaId, data.dto);
    }
    checkOut(data) {
        return this.productividadService.checkOut(data.empresaId, data.empleadoId, data.dto);
    }
    getAsistencia(data) {
        return this.productividadService.getHistorialAsistencia(data.empresaId, data.empleadoId);
    }
    createActivo(data) {
        return this.productividadService.createActivo(data.empresaId, data.dto);
    }
    getActivos(data) {
        return this.productividadService.getActivos(data.empresaId);
    }
    updateActivo(data) {
        return this.productividadService.updateActivo(data.empresaId, data.activoId, data.dto);
    }
    deleteActivo(data) {
        return this.productividadService.deleteActivo(data.empresaId, data.activoId);
    }
    assignActivo(data) {
        return this.productividadService.assignActivo(data.empresaId, data.activoId, data.dto);
    }
    returnActivo(data) {
        return this.productividadService.returnActivo(data.empresaId, data.asignacionId, data.dto);
    }
    getActivosEmpleado(data) {
        return this.productividadService.getActivosByEmpleado(data.empresaId, data.empleadoId);
    }
    getHistorialActivo(data) {
        return this.productividadService.getHistorialActivo(data.empresaId, data.activoId);
    }
    createReporte(data) {
        return this.productividadService.createReporte(data.empresaId, data.empleadoId, data.dto);
    }
    addItemGasto(data) {
        return this.productividadService.addItemToReporte(data.empresaId, data.reporteId, data.dto);
    }
    getReportes(data) {
        return this.productividadService.getReportes(data.empresaId, data.empleadoId);
    }
    updateReporteEstado(data) {
        return this.productividadService.updateEstadoReporte(data.empresaId, data.reporteId, data.dto);
    }
    getDashboardKpis(data) {
        return this.productividadService.getDashboardKPIs(data.empresaId);
    }
    getCicloActivo(data) {
        return this.productividadService.getCicloActivo(data.empresaId);
    }
    getAsistenciaSummary(data) {
        return this.productividadService.getAsistenciaSummary(data.empresaId, data.empleadoId);
    }
    seedData(data) {
        return this.productividadService.seedData(data.empresaId);
    }
    getObjetivosDepto(data) {
        return this.productividadService.getObjetivosDepartamento(data.empresaId, data.cicloId, data.departamentoId);
    }
    getAllObjetivos(data) {
        return this.productividadService.getAllObjetivos(data.empresaId, data.cicloId);
    }
    deleteObjetivo(data) {
        return this.productividadService.deleteObjetivo(data.empresaId, data.objetivoId);
    }
};
exports.ProductividadController = ProductividadController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_proyectos' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts").Proyecto)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getProyectos", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_proyecto' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts").Proyecto) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createProyecto", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_proyecto' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts").Proyecto) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateProyecto", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_proyecto' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "deleteProyecto", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_sprint' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/sprint.entity */ "./libs/database/src/entities/sprint.entity.ts").Sprint) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createSprint", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_sprints_by_proyecto' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/sprint.entity */ "./libs/database/src/entities/sprint.entity.ts").Sprint)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getSprintsByProyecto", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_sprint' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/sprint.entity */ "./libs/database/src/entities/sprint.entity.ts").Sprint) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateSprint", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_sprint' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "deleteSprint", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_tarea' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/tarea.entity */ "./libs/database/src/entities/tarea.entity.ts").Tarea) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createTarea", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_tareas_by_sprint' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/tarea.entity */ "./libs/database/src/entities/tarea.entity.ts").Tarea)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getTareasBySprint", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_tarea' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/tarea.entity */ "./libs/database/src/entities/tarea.entity.ts").Tarea) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateTarea", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_tarea' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "deleteTarea", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'assign_tarea' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts").AsignacionTarea) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "assignTarea", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_asignaciones' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts").AsignacionTarea)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getAsignaciones", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'remove_asignacion' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "removeAsignacion", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_asignacion' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts").AsignacionTarea) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateAsignacion", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_ciclo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").CicloEvaluacion) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createCiclo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_ciclos' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").CicloEvaluacion)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getCiclos", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_ciclo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").CicloEvaluacion) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateCiclo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_ciclo' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "deleteCiclo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_objetivo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createObjetivo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_objetivos' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getObjetivos", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_objetivo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateObjetivo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_evaluacion' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts").Evaluacion) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createEvaluacion", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_evaluaciones' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts").Evaluacion)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getEvaluaciones", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_evaluacion' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts").Evaluacion) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateEvaluacion", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_evaluacion' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "deleteEvaluacion", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_curso' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/curso.entity */ "./libs/database/src/entities/curso.entity.ts").Curso) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createCurso", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_cursos' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/curso.entity */ "./libs/database/src/entities/curso.entity.ts").Curso)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getCursos", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_curso' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/curso.entity */ "./libs/database/src/entities/curso.entity.ts").Curso) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateCurso", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_curso' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "deleteCurso", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_inscripcion' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").InscripcionCurso) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createInscripcion", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_inscripciones_curso' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").InscripcionCurso)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getInscripcionesCurso", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_inscripcion' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").InscripcionCurso) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateInscripcion", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_inscripcion' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "deleteInscripcion", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'check_in' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/registroAsistencia.entity */ "./libs/database/src/entities/registroAsistencia.entity.ts").RegistroAsistencia) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "checkIn", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'check_out' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/registroAsistencia.entity */ "./libs/database/src/entities/registroAsistencia.entity.ts").RegistroAsistencia) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "checkOut", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_asistencia' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/registroAsistencia.entity */ "./libs/database/src/entities/registroAsistencia.entity.ts").RegistroAsistencia)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getAsistencia", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_activo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/activo.entity */ "./libs/database/src/entities/activo.entity.ts").Activo) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createActivo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_activos' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/activo.entity */ "./libs/database/src/entities/activo.entity.ts").Activo)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getActivos", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_activo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/activo.entity */ "./libs/database/src/entities/activo.entity.ts").Activo) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateActivo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_activo' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "deleteActivo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'assign_activo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts").ActivoAsignado) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "assignActivo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'return_activo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts").ActivoAsignado) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "returnActivo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_activos_empleado' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts").ActivoAsignado)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getActivosEmpleado", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_historial_activo' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts").ActivoAsignado)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getHistorialActivo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_reporte' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").ReporteGasto) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "createReporte", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'add_item_gasto' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/itemGasto.entity */ "./libs/database/src/entities/itemGasto.entity.ts").ItemGasto) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "addItemGasto", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_reportes' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").ReporteGasto)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getReportes", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_reporte_estado' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").ReporteGasto) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "updateReporteEstado", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_dashboard_kpis' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ./dto/dashboard-kpi.dto */ "./apps/productividad/src/dto/dashboard-kpi.dto.ts").DashboardKpiDto) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getDashboardKpis", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_ciclo_activo' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getCicloActivo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_asistencia_summary' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getAsistenciaSummary", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'seed_data' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "seedData", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_objetivos_departamento' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getObjetivosDepto", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_all_objetivos' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "getAllObjetivos", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_objetivo' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductividadController.prototype, "deleteObjetivo", null);
exports.ProductividadController = ProductividadController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [productividad_service_1.ProductividadService])
], ProductividadController);


/***/ }),

/***/ "./apps/productividad/src/productividad.module.ts":
/*!********************************************************!*\
  !*** ./apps/productividad/src/productividad.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductividadModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const database_1 = __webpack_require__(/*! default/database */ "./libs/database/src/index.ts");
const productividad_controller_1 = __webpack_require__(/*! ./productividad.controller */ "./apps/productividad/src/productividad.controller.ts");
const productividad_service_1 = __webpack_require__(/*! ./productividad.service */ "./apps/productividad/src/productividad.service.ts");
let ProductividadModule = class ProductividadModule {
};
exports.ProductividadModule = ProductividadModule;
exports.ProductividadModule = ProductividadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env',
            }),
            database_1.DatabaseModule,
            typeorm_1.TypeOrmModule.forFeature([
                database_1.Proyecto,
                database_1.Sprint,
                database_1.Tarea,
                database_1.AsignacionTarea,
                database_1.Empleado,
                database_1.CicloEvaluacion,
                database_1.Objetivo,
                database_1.Evaluacion,
                database_1.Curso,
                database_1.InscripcionCurso,
                database_1.RegistroAsistencia,
                database_1.Activo,
                database_1.ActivoAsignado,
                database_1.ReporteGasto,
                database_1.ItemGasto,
                database_1.Departamento,
            ]),
        ],
        controllers: [productividad_controller_1.ProductividadController],
        providers: [productividad_service_1.ProductividadService],
    })
], ProductividadModule);


/***/ }),

/***/ "./apps/productividad/src/productividad.service.ts":
/*!*********************************************************!*\
  !*** ./apps/productividad/src/productividad.service.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductividadService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const database_1 = __webpack_require__(/*! default/database */ "./libs/database/src/index.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const create_proyecto_dto_1 = __webpack_require__(/*! ./dto/create-proyecto.dto */ "./apps/productividad/src/dto/create-proyecto.dto.ts");
const create_tarea_dto_1 = __webpack_require__(/*! ./dto/create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts");
let ProductividadService = class ProductividadService {
    proyectoRepository;
    sprintRepository;
    empleadoRepository;
    tareaRepository;
    asignacionRepository;
    cicloRepository;
    objetivoRepository;
    evaluacionRepository;
    cursoRepository;
    inscripcionRepository;
    asistenciaRepository;
    activoRepository;
    activoAsignadoRepository;
    reporteRepository;
    itemGastoRepository;
    constructor(proyectoRepository, sprintRepository, empleadoRepository, tareaRepository, asignacionRepository, cicloRepository, objetivoRepository, evaluacionRepository, cursoRepository, inscripcionRepository, asistenciaRepository, activoRepository, activoAsignadoRepository, reporteRepository, itemGastoRepository) {
        this.proyectoRepository = proyectoRepository;
        this.sprintRepository = sprintRepository;
        this.empleadoRepository = empleadoRepository;
        this.tareaRepository = tareaRepository;
        this.asignacionRepository = asignacionRepository;
        this.cicloRepository = cicloRepository;
        this.objetivoRepository = objetivoRepository;
        this.evaluacionRepository = evaluacionRepository;
        this.cursoRepository = cursoRepository;
        this.inscripcionRepository = inscripcionRepository;
        this.asistenciaRepository = asistenciaRepository;
        this.activoRepository = activoRepository;
        this.activoAsignadoRepository = activoAsignadoRepository;
        this.reporteRepository = reporteRepository;
        this.itemGastoRepository = itemGastoRepository;
    }
    async getProyectos(empresaId) {
        return this.proyectoRepository.find({
            where: { empresaId: empresaId },
            relations: ['lider'],
            withDeleted: false,
        });
    }
    async createProyecto(empresaId, dto) {
        const existente = await this.proyectoRepository.findOneBy({
            nombre: dto.nombre,
            empresaId: empresaId,
        });
        if (existente) {
            throw new common_1.ConflictException('Ya existe un proyecto con ese nombre en esta empresa.');
        }
        if (dto.liderId) {
            const lider = await this.empleadoRepository.findOneBy({
                id: dto.liderId,
                empresaId: empresaId,
            });
            if (!lider) {
                throw new common_1.BadRequestException('El líder seleccionado no es un empleado válido de esta empresa.');
            }
        }
        const nuevoProyecto = this.proyectoRepository.create({
            ...dto,
            empresaId: empresaId,
            estado: dto.estado || create_proyecto_dto_1.EstadoProyecto.ACTIVO,
        });
        return this.proyectoRepository.save(nuevoProyecto);
    }
    async updateProyecto(empresaId, proyectoId, dto) {
        const proyecto = await this.proyectoRepository.findOneBy({
            id: proyectoId,
            empresaId: empresaId,
        });
        if (!proyecto) {
            throw new common_1.NotFoundException('Proyecto no encontrado o no pertenece a esta empresa.');
        }
        if (dto.liderId && dto.liderId !== proyecto.liderId) {
            const lider = await this.empleadoRepository.findOneBy({
                id: dto.liderId,
                empresaId: empresaId,
            });
            if (!lider) {
                throw new common_1.BadRequestException('El líder seleccionado no es un empleado válido de esta empresa.');
            }
        }
        if (dto.nombre && dto.nombre !== proyecto.nombre) {
            const existente = await this.proyectoRepository.findOneBy({
                nombre: dto.nombre,
                empresaId: empresaId,
                id: (0, typeorm_2.Not)(proyectoId),
            });
            if (existente) {
                throw new common_1.ConflictException('Ya existe un proyecto con ese nombre en esta empresa.');
            }
        }
        const proyectoActualizado = this.proyectoRepository.merge(proyecto, dto);
        return this.proyectoRepository.save(proyectoActualizado);
    }
    async deleteProyecto(empresaId, proyectoId) {
        const proyecto = await this.proyectoRepository.findOneBy({
            id: proyectoId,
            empresaId: empresaId,
        });
        if (!proyecto) {
            throw new common_1.NotFoundException('Proyecto no encontrado o no pertenece a esta empresa.');
        }
        const sprints = await this.sprintRepository.count({
            where: { proyectoId: proyectoId },
        });
        if (sprints > 0) {
            throw new common_1.ConflictException(`No se puede eliminar. Este proyecto tiene ${sprints} sprint(s) asociados.`);
        }
        await this.proyectoRepository.softRemove(proyecto);
        return { message: 'Proyecto eliminado correctamente.' };
    }
    async createSprint(empresaId, proyectoId, dto) {
        const proyecto = await this.proyectoRepository.findOneBy({
            id: proyectoId,
            empresaId: empresaId,
        });
        if (!proyecto) {
            throw new common_1.NotFoundException('Proyecto no encontrado o no tienes acceso.');
        }
        if (dto.fechaInicio >= dto.fechaFin) {
            throw new common_1.BadRequestException('La fecha de inicio debe ser anterior a la de fin.');
        }
        const sprint = this.sprintRepository.create({
            ...dto,
            proyectoId: proyectoId,
        });
        return this.sprintRepository.save(sprint);
    }
    async getSprintsByProyecto(empresaId, proyectoId) {
        const proyecto = await this.proyectoRepository.findOneBy({
            id: proyectoId,
            empresaId: empresaId,
        });
        if (!proyecto)
            throw new common_1.NotFoundException('Proyecto no encontrado.');
        return this.sprintRepository.find({
            where: { proyectoId: proyectoId },
            order: { fechaInicio: 'ASC' },
        });
    }
    async updateSprint(empresaId, sprintId, dto) {
        const sprint = await this.sprintRepository.findOne({
            where: { id: sprintId },
            relations: ['proyecto'],
        });
        if (!sprint || sprint.proyecto.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Sprint no encontrado o no tienes acceso.');
        }
        const inicio = dto.fechaInicio ? new Date(dto.fechaInicio) : sprint.fechaInicio;
        const fin = dto.fechaFin ? new Date(dto.fechaFin) : sprint.fechaFin;
        if (inicio >= fin) {
            throw new common_1.BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin.');
        }
        this.sprintRepository.merge(sprint, dto);
        return this.sprintRepository.save(sprint);
    }
    async deleteSprint(empresaId, sprintId) {
        const sprint = await this.sprintRepository.findOne({
            where: { id: sprintId },
            relations: ['proyecto'],
        });
        if (!sprint || sprint.proyecto.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Sprint no encontrado o no tienes acceso.');
        }
        await this.sprintRepository.softRemove(sprint);
        return { message: 'Sprint eliminado correctamente.' };
    }
    async createTarea(empresaId, sprintId, dto) {
        const sprint = await this.sprintRepository.findOne({
            where: { id: sprintId },
            relations: ['proyecto'],
        });
        if (!sprint || sprint.proyecto.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Sprint no encontrado o no tienes acceso.');
        }
        const tarea = this.tareaRepository.create({
            ...dto,
            sprintId: sprintId,
            proyectoId: sprint.proyecto.id,
            estado: dto.estado || create_tarea_dto_1.EstadoTarea.PENDIENTE,
            prioridad: dto.prioridad || create_tarea_dto_1.PrioridadTarea.MEDIA,
        });
        return this.tareaRepository.save(tarea);
    }
    async getTareasBySprint(empresaId, sprintId) {
        const sprint = await this.sprintRepository.findOne({
            where: { id: sprintId },
            relations: ['proyecto'],
        });
        if (!sprint || sprint.proyecto.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Sprint no encontrado o no tienes acceso.');
        }
        return this.tareaRepository.find({
            where: { sprintId: sprintId },
            relations: [
                'asignaciones',
                'asignaciones.empleado',
                'objetivo'
            ],
            order: { createdAt: 'DESC' },
        });
    }
    async updateTarea(empresaId, tareaId, dto) {
        const tarea = await this.tareaRepository.findOne({
            where: { id: tareaId },
            relations: ['proyecto'],
        });
        if (!tarea || tarea.proyecto.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Tarea no encontrada o no tienes acceso.');
        }
        this.tareaRepository.merge(tarea, dto);
        return this.tareaRepository.save(tarea);
    }
    async deleteTarea(empresaId, tareaId) {
        const tarea = await this.tareaRepository.findOne({
            where: { id: tareaId },
            relations: ['proyecto'],
        });
        if (!tarea || tarea.proyecto.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Tarea no encontrada o no tienes acceso.');
        }
        await this.tareaRepository.softRemove(tarea);
        return { message: 'Tarea eliminada correctamente.' };
    }
    async assignTarea(empresaId, tareaId, dto) {
        console.log('🔍 DEBUG 1: Iniciando assignTarea');
        try {
            if (!this.tareaRepository)
                throw new Error('CRÍTICO: tareaRepository es undefined');
            if (!this.empleadoRepository)
                throw new Error('CRÍTICO: empleadoRepository es undefined');
            if (!this.asignacionRepository)
                throw new Error('CRÍTICO: asignacionRepository es undefined');
            console.log('🔍 DEBUG 2: Buscando tarea', tareaId);
            const tarea = await this.tareaRepository.findOne({
                where: { id: tareaId },
                relations: ['proyecto'],
            });
            if (!tarea)
                throw new common_1.NotFoundException('Tarea no encontrada');
            if (tarea.proyecto.empresaId !== empresaId)
                throw new common_1.NotFoundException('No tienes acceso a esta tarea');
            console.log('🔍 DEBUG 3: Buscando empleado', dto.empleadoId);
            const empleado = await this.empleadoRepository.findOneBy({
                id: dto.empleadoId,
                empresaId: empresaId,
            });
            if (!empleado)
                throw new common_1.BadRequestException('Empleado no encontrado o es de otra empresa');
            console.log('🔍 DEBUG 4: Creando asignación');
            const asignacion = this.asignacionRepository.create({
                tareaId: tareaId,
                empleadoId: dto.empleadoId,
                observaciones: dto.observaciones,
            });
            console.log('🔍 DEBUG 5: Guardando...');
            const guardado = await this.asignacionRepository.save(asignacion);
            console.log('✅ ÉXITO: Guardado correcto');
            return guardado;
        }
        catch (error) {
            console.error('💥💥 ERROR EXPLÍCITO EN MICROSERVICIO 💥💥');
            console.error(error);
            throw error;
        }
    }
    async getAsignacionesByTarea(empresaId, tareaId) {
        const tarea = await this.tareaRepository.findOne({
            where: { id: tareaId },
            relations: ['proyecto'],
        });
        if (!tarea || tarea.proyecto.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Tarea no encontrada.');
        }
        return this.asignacionRepository.find({
            where: { tareaId: tareaId },
            relations: ['empleado'],
        });
    }
    async removeAsignacion(empresaId, asignacionId) {
        const asignacion = await this.asignacionRepository.findOne({
            where: { id: asignacionId },
            relations: ['tarea', 'tarea.proyecto'],
        });
        if (!asignacion || asignacion.tarea.proyecto.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Asignación no encontrada o no tienes acceso.');
        }
        await this.asignacionRepository.remove(asignacion);
        return { message: 'Empleado desasignado correctamente.' };
    }
    async updateAsignacion(empresaId, asignacionId, dto) {
        const asignacion = await this.asignacionRepository.findOne({
            where: { id: asignacionId },
            relations: ['tarea', 'tarea.proyecto'],
        });
        if (!asignacion || asignacion.tarea.proyecto.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Asignación no encontrada o no tienes acceso.');
        }
        if (dto.empleadoId && dto.empleadoId !== asignacion.empleadoId) {
            const nuevoEmpleado = await this.empleadoRepository.findOneBy({
                id: dto.empleadoId,
                empresaId: empresaId,
            });
            if (!nuevoEmpleado) {
                throw new common_1.BadRequestException('El nuevo empleado no es válido o no pertenece a tu empresa.');
            }
        }
        this.asignacionRepository.merge(asignacion, dto);
        return this.asignacionRepository.save(asignacion);
    }
    async createCiclo(empresaId, dto) {
        if (dto.fechaInicio >= dto.fechaFin) {
            throw new common_1.BadRequestException('La fecha de inicio debe ser anterior al fin.');
        }
        const ciclo = this.cicloRepository.create({
            ...dto,
            empresaId,
            estado: dto.estado || database_1.EstadoCiclo.PLANIFICACION,
        });
        return this.cicloRepository.save(ciclo);
    }
    async getCiclos(empresaId) {
        return this.cicloRepository.find({
            where: { empresaId },
            order: { fechaInicio: 'DESC' },
        });
    }
    async updateCiclo(empresaId, cicloId, dto) {
        const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
        if (!ciclo)
            throw new common_1.NotFoundException('Ciclo no encontrado.');
        this.cicloRepository.merge(ciclo, dto);
        return this.cicloRepository.save(ciclo);
    }
    async deleteCiclo(empresaId, cicloId) {
        const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
        if (!ciclo)
            throw new common_1.NotFoundException('Ciclo no encontrado.');
        await this.cicloRepository.remove(ciclo);
        return { message: 'Ciclo eliminado.' };
    }
    async createObjetivo(empresaId, cicloId, dto) {
        const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
        if (!ciclo)
            throw new common_1.NotFoundException('Ciclo no encontrado.');
        if (dto.tipo === database_1.TipoObjetivo.DEPARTAMENTO && !dto.departamentoId) {
            throw new common_1.BadRequestException('Las metas departamentales requieren un departamentoId');
        }
        const nuevoObjetivo = this.objetivoRepository.create({
            descripcion: dto.descripcion,
            progreso: dto.progreso || 0,
            tipo: dto.tipo || database_1.TipoObjetivo.PERSONAL,
            cicloId: ciclo.id,
            empleadoId: dto.empleadoId,
            departamentoId: dto.departamentoId,
            parentObjetivoId: dto.parentObjetivoId
        });
        return this.objetivoRepository.save(nuevoObjetivo);
    }
    async getObjetivosDepartamento(empresaId, cicloId, departamentoId) {
        return this.objetivoRepository.find({
            where: {
                cicloId,
                departamentoId,
                tipo: database_1.TipoObjetivo.DEPARTAMENTO
            }
        });
    }
    async getAllObjetivos(empresaId, cicloId) {
        const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
        if (!ciclo)
            throw new common_1.NotFoundException('Ciclo no encontrado');
        return this.objetivoRepository.find({
            where: { cicloId },
            relations: ['empleado', 'departamento'],
            order: { createdAt: 'DESC' }
        });
    }
    async getObjetivos(empresaId, cicloId, empleadoId) {
        const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
        if (!ciclo)
            throw new common_1.NotFoundException('Ciclo no encontrado.');
        const whereCondition = { cicloId };
        if (empleadoId) {
            whereCondition.empleadoId = empleadoId;
        }
        return this.objetivoRepository.find({
            where: whereCondition,
            relations: ['empleado'],
        });
    }
    async updateObjetivo(empresaId, objetivoId, dto) {
        const objetivo = await this.objetivoRepository.findOne({
            where: { id: objetivoId },
            relations: ['ciclo'],
        });
        if (!objetivo || objetivo.ciclo.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Objetivo no encontrado.');
        }
        this.objetivoRepository.merge(objetivo, dto);
        return this.objetivoRepository.save(objetivo);
    }
    async deleteObjetivo(empresaId, objetivoId) {
        const objetivo = await this.objetivoRepository.findOne({
            where: { id: objetivoId },
            relations: ['ciclo']
        });
        if (!objetivo || objetivo.ciclo.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Objetivo no encontrado o no tienes permisos.');
        }
        await this.objetivoRepository.remove(objetivo);
        return { message: 'Objetivo eliminado correctamente.' };
    }
    async createEvaluacion(empresaId, cicloId, dto) {
        const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
        if (!ciclo)
            throw new common_1.NotFoundException('Ciclo no encontrado.');
        const evaluado = await this.empleadoRepository.findOneBy({ id: dto.evaluadoId, empresaId });
        if (!evaluado)
            throw new common_1.BadRequestException('Empleado a evaluar no válido.');
        const evaluador = await this.empleadoRepository.findOneBy({ id: dto.evaluadorId, empresaId });
        if (!evaluador)
            throw new common_1.BadRequestException('Evaluador no válido.');
        const existente = await this.evaluacionRepository.findOne({
            where: { cicloId, evaluadoId: dto.evaluadoId }
        });
        if (existente)
            throw new common_1.ConflictException('Este empleado ya fue evaluado en este ciclo.');
        const evaluacion = this.evaluacionRepository.create({
            ...dto,
            cicloId,
        });
        return this.evaluacionRepository.save(evaluacion);
    }
    async getEvaluaciones(empresaId, cicloId) {
        const ciclo = await this.cicloRepository.findOneBy({ id: cicloId, empresaId });
        if (!ciclo)
            throw new common_1.NotFoundException('Ciclo no encontrado.');
        return this.evaluacionRepository.find({
            where: { cicloId },
            relations: ['evaluado', 'evaluador'],
        });
    }
    async updateEvaluacion(empresaId, evaluacionId, dto) {
        const evaluacion = await this.evaluacionRepository.findOne({
            where: { id: evaluacionId },
            relations: ['ciclo'],
        });
        if (!evaluacion || evaluacion.ciclo.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Evaluación no encontrada.');
        }
        this.evaluacionRepository.merge(evaluacion, dto);
        return this.evaluacionRepository.save(evaluacion);
    }
    async deleteEvaluacion(empresaId, evaluacionId) {
        const evaluacion = await this.evaluacionRepository.findOne({
            where: { id: evaluacionId },
            relations: ['ciclo'],
        });
        if (!evaluacion || evaluacion.ciclo.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Evaluación no encontrada.');
        }
        await this.evaluacionRepository.remove(evaluacion);
        return { message: 'Evaluación eliminada.' };
    }
    async createCurso(empresaId, dto) {
        const existente = await this.cursoRepository.findOneBy({
            titulo: dto.titulo,
            empresaId
        });
        if (existente) {
            throw new common_1.ConflictException('Ya existe un curso con este título en tu catálogo.');
        }
        const curso = this.cursoRepository.create({
            ...dto,
            empresaId,
        });
        return this.cursoRepository.save(curso);
    }
    async getCursos(empresaId) {
        return this.cursoRepository.find({
            where: { empresaId },
            order: { createdAt: 'DESC' },
        });
    }
    async updateCurso(empresaId, cursoId, dto) {
        const curso = await this.cursoRepository.findOneBy({ id: cursoId, empresaId });
        if (!curso) {
            throw new common_1.NotFoundException('Curso no encontrado.');
        }
        this.cursoRepository.merge(curso, dto);
        return this.cursoRepository.save(curso);
    }
    async deleteCurso(empresaId, cursoId) {
        const curso = await this.cursoRepository.findOneBy({ id: cursoId, empresaId });
        if (!curso) {
            throw new common_1.NotFoundException('Curso no encontrado.');
        }
        await this.cursoRepository.remove(curso);
        return { message: 'Curso eliminado del catálogo.' };
    }
    async createInscripcion(empresaId, cursoId, dto) {
        const curso = await this.cursoRepository.findOneBy({ id: cursoId, empresaId });
        if (!curso)
            throw new common_1.NotFoundException('Curso no encontrado.');
        const empleado = await this.empleadoRepository.findOneBy({ id: dto.empleadoId, empresaId });
        if (!empleado)
            throw new common_1.BadRequestException('Empleado no válido.');
        const existente = await this.inscripcionRepository.findOne({
            where: { cursoId, empleadoId: dto.empleadoId }
        });
        if (existente)
            throw new common_1.ConflictException('El empleado ya está inscrito en este curso.');
        const inscripcion = this.inscripcionRepository.create({
            cursoId,
            empleadoId: dto.empleadoId,
            estado: dto.estado || database_1.EstadoInscripcion.INSCRITO,
        });
        return this.inscripcionRepository.save(inscripcion);
    }
    async getInscripcionesByCurso(empresaId, cursoId) {
        const curso = await this.cursoRepository.findOneBy({ id: cursoId, empresaId });
        if (!curso)
            throw new common_1.NotFoundException('Curso no encontrado.');
        return this.inscripcionRepository.find({
            where: { cursoId },
            relations: ['empleado'],
        });
    }
    async updateInscripcion(empresaId, inscripcionId, dto) {
        const inscripcion = await this.inscripcionRepository.findOne({
            where: { id: inscripcionId },
            relations: ['curso'],
        });
        if (!inscripcion || inscripcion.curso.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Inscripción no encontrada.');
        }
        if (dto.estado === database_1.EstadoInscripcion.COMPLETADO && !dto.fechaCompletado && !inscripcion.fechaCompletado) {
            inscripcion.fechaCompletado = new Date();
        }
        this.inscripcionRepository.merge(inscripcion, dto);
        return this.inscripcionRepository.save(inscripcion);
    }
    async deleteInscripcion(empresaId, inscripcionId) {
        const inscripcion = await this.inscripcionRepository.findOne({
            where: { id: inscripcionId },
            relations: ['curso'],
        });
        if (!inscripcion || inscripcion.curso.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Inscripción no encontrada.');
        }
        await this.inscripcionRepository.remove(inscripcion);
        return { message: 'Inscripción eliminada.' };
    }
    async checkIn(empresaId, dto) {
        const empleado = await this.empleadoRepository.findOneBy({ id: dto.empleadoId, empresaId });
        if (!empleado)
            throw new common_1.BadRequestException('Empleado no válido o de otra empresa.');
        const hoy = new Date();
        const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));
        const finDia = new Date(hoy.setHours(23, 59, 59, 999));
        const registroExistente = await this.asistenciaRepository.findOne({
            where: {
                empleadoId: dto.empleadoId,
                fecha: (0, typeorm_2.Between)(inicioDia, finDia),
            },
        });
        if (registroExistente) {
            throw new common_1.ConflictException('Ya registraste tu entrada el día de hoy.');
        }
        const nuevoRegistro = this.asistenciaRepository.create({
            empleadoId: dto.empleadoId,
            fecha: new Date(),
            horaEntrada: new Date(),
            estado: 'ABIERTO',
            observaciones: dto.observaciones,
        });
        return this.asistenciaRepository.save(nuevoRegistro);
    }
    async checkOut(empresaId, empleadoId, dto) {
        const hoy = new Date();
        const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));
        const finDia = new Date(hoy.setHours(23, 59, 59, 999));
        const registro = await this.asistenciaRepository.findOne({
            where: {
                empleadoId,
                fecha: (0, typeorm_2.Between)(inicioDia, finDia),
            },
            relations: ['empleado'],
        });
        if (!registro) {
            throw new common_1.NotFoundException('No has marcado entrada hoy. No puedes marcar salida.');
        }
        if (registro.empleado.empresaId !== empresaId) {
            throw new common_1.NotFoundException('No tienes acceso.');
        }
        if (registro.horaSalida) {
            throw new common_1.ConflictException('Ya marcaste tu salida hoy.');
        }
        const horaSalida = new Date();
        const diferenciaMs = horaSalida.getTime() - registro.horaEntrada.getTime();
        const horasTrabajadas = diferenciaMs / (1000 * 60 * 60);
        registro.horaSalida = horaSalida;
        registro.totalHoras = parseFloat(horasTrabajadas.toFixed(2));
        registro.estado = 'CERRADO';
        if (dto.observaciones) {
            registro.observaciones = registro.observaciones
                ? `${registro.observaciones} | Salida: ${dto.observaciones}`
                : dto.observaciones;
        }
        return this.asistenciaRepository.save(registro);
    }
    async getHistorialAsistencia(empresaId, empleadoId) {
        const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
        if (!empleado)
            throw new common_1.NotFoundException('Empleado no encontrado.');
        return this.asistenciaRepository.find({
            where: { empleadoId },
            order: { fecha: 'DESC' }
        });
    }
    async createActivo(empresaId, dto) {
        if (dto.serial) {
            const existente = await this.activoRepository.findOneBy({
                empresaId,
                serial: dto.serial,
            });
            if (existente) {
                throw new common_1.ConflictException('Ya existe un activo con este serial en tu inventario.');
            }
        }
        const activo = this.activoRepository.create({
            ...dto,
            empresaId,
            estado: dto.estado || database_1.EstadoActivo.DISPONIBLE,
        });
        return this.activoRepository.save(activo);
    }
    async getActivos(empresaId) {
        return this.activoRepository.find({
            where: { empresaId },
            order: { nombre: 'ASC' },
        });
    }
    async updateActivo(empresaId, activoId, dto) {
        const activo = await this.activoRepository.findOneBy({ id: activoId, empresaId });
        if (!activo)
            throw new common_1.NotFoundException('Activo no encontrado.');
        if (dto.serial && dto.serial !== activo.serial) {
            const duplicado = await this.activoRepository.findOneBy({ empresaId, serial: dto.serial });
            if (duplicado)
                throw new common_1.ConflictException('El serial ya está en uso por otro activo.');
        }
        this.activoRepository.merge(activo, dto);
        return this.activoRepository.save(activo);
    }
    async deleteActivo(empresaId, activoId) {
        const activo = await this.activoRepository.findOneBy({ id: activoId, empresaId });
        if (!activo)
            throw new common_1.NotFoundException('Activo no encontrado.');
        await this.activoRepository.remove(activo);
        return { message: 'Activo eliminado del inventario.' };
    }
    async assignActivo(empresaId, activoId, dto) {
        const activo = await this.activoRepository.findOneBy({ id: activoId, empresaId });
        if (!activo)
            throw new common_1.NotFoundException('Activo no encontrado.');
        if (activo.estado !== database_1.EstadoActivo.DISPONIBLE) {
            throw new common_1.ConflictException(`El activo no está disponible (Estado: ${activo.estado}).`);
        }
        const empleado = await this.empleadoRepository.findOneBy({ id: dto.empleadoId, empresaId });
        if (!empleado)
            throw new common_1.BadRequestException('Empleado no válido.');
        const asignacion = this.activoAsignadoRepository.create({
            activoId,
            empleadoId: dto.empleadoId,
            observaciones: dto.observaciones,
            fechaAsignacion: dto.fechaAsignacion || new Date(),
            estado: database_1.EstadoAsignacion.VIGENTE,
        });
        activo.estado = database_1.EstadoActivo.ASIGNADO;
        await this.activoRepository.save(activo);
        return this.activoAsignadoRepository.save(asignacion);
    }
    async returnActivo(empresaId, asignacionId, dto) {
        const asignacion = await this.activoAsignadoRepository.findOne({
            where: { id: asignacionId },
            relations: ['activo'],
        });
        if (!asignacion || asignacion.activo.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Asignación no encontrada.');
        }
        if (asignacion.estado === database_1.EstadoAsignacion.DEVUELTO) {
            throw new common_1.ConflictException('Este activo ya fue devuelto.');
        }
        asignacion.fechaDevolucion = dto.fechaDevolucion || new Date();
        asignacion.estado = database_1.EstadoAsignacion.DEVUELTO;
        if (dto.observaciones) {
            asignacion.observaciones = asignacion.observaciones
                ? `${asignacion.observaciones} | Devolución: ${dto.observaciones}`
                : dto.observaciones;
        }
        asignacion.activo.estado = database_1.EstadoActivo.DISPONIBLE;
        await this.activoRepository.save(asignacion.activo);
        return this.activoAsignadoRepository.save(asignacion);
    }
    async getActivosByEmpleado(empresaId, empleadoId) {
        const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
        if (!empleado)
            throw new common_1.NotFoundException('Empleado no encontrado.');
        return this.activoAsignadoRepository.find({
            where: {
                empleadoId,
                estado: database_1.EstadoAsignacion.VIGENTE
            },
            relations: ['activo'],
        });
    }
    async getHistorialActivo(empresaId, activoId) {
        const activo = await this.activoRepository.findOneBy({ id: activoId, empresaId });
        if (!activo)
            throw new common_1.NotFoundException('Activo no encontrado');
        return this.activoAsignadoRepository.find({
            where: { activoId },
            relations: ['empleado'],
            order: { fechaAsignacion: 'DESC' }
        });
    }
    async createReporte(empresaId, empleadoId, dto) {
        const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
        if (!empleado)
            throw new common_1.BadRequestException('Empleado no válido.');
        const reporte = this.reporteRepository.create({
            ...dto,
            empleadoId,
            estado: database_1.EstadoReporte.BORRADOR,
            total: 0,
        });
        return this.reporteRepository.save(reporte);
    }
    async addItemToReporte(empresaId, reporteId, dto) {
        const reporte = await this.reporteRepository.findOne({
            where: { id: reporteId },
            relations: ['empleado']
        });
        if (!reporte || reporte.empleado.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Reporte no encontrado o sin acceso.');
        }
        if (reporte.estado !== database_1.EstadoReporte.BORRADOR && reporte.estado !== database_1.EstadoReporte.RECHAZADO) {
            throw new common_1.ConflictException('No puedes agregar items a un reporte que ya fue enviado o aprobado.');
        }
        const item = this.itemGastoRepository.create({
            ...dto,
            reporteId,
        });
        await this.itemGastoRepository.save(item);
        const suma = await this.itemGastoRepository.sum('monto', { reporteId });
        reporte.total = suma || 0;
        await this.reporteRepository.save(reporte);
        return item;
    }
    async removeItemFromReporte(empresaId, itemId) {
        const item = await this.itemGastoRepository.findOne({
            where: { id: itemId },
            relations: ['reporte', 'reporte.empleado'],
        });
        if (!item || item.reporte.empleado.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Ítem no encontrado.');
        }
        if (item.reporte.estado !== database_1.EstadoReporte.BORRADOR) {
            throw new common_1.ConflictException('Reporte bloqueado. No se pueden borrar items.');
        }
        const reporteId = item.reporteId;
        await this.itemGastoRepository.remove(item);
        const suma = await this.itemGastoRepository.sum('monto', { reporteId });
        await this.reporteRepository.update(reporteId, { total: suma || 0 });
        return { message: 'Ítem eliminado y total actualizado.' };
    }
    async getReportes(empresaId, empleadoId) {
        const where = { empleado: { empresaId } };
        if (empleadoId)
            where.empleadoId = empleadoId;
        return this.reporteRepository.find({
            where,
            relations: ['items', 'empleado'],
            order: { fechaReporte: 'DESC' },
        });
    }
    async updateEstadoReporte(empresaId, reporteId, dto) {
        const reporte = await this.reporteRepository.findOne({
            where: { id: reporteId },
            relations: ['empleado'],
        });
        if (!reporte || reporte.empleado.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Reporte no encontrado.');
        }
        reporte.estado = dto.estado;
        return this.reporteRepository.save(reporte);
    }
    async getDashboardKPIs(empresaId) {
        const totalEmpleados = await this.empleadoRepository.count({
            where: { empresaId, estado: 'Activo' }
        });
        const totalProyectosActivos = await this.proyectoRepository.count({
            where: {
                empresaId,
                estado: create_proyecto_dto_1.EstadoProyecto.ACTIVO
            }
        });
        const gastos = await this.reporteRepository
            .createQueryBuilder('reporte')
            .leftJoin('reporte.empleado', 'empleado')
            .where('empleado.empresaId = :empresaId', { empresaId })
            .andWhere('reporte.estado = :estado', { estado: database_1.EstadoReporte.APROBADO })
            .select('SUM(reporte.total)', 'sum')
            .getRawOne();
        const totalGastosAprobados = parseFloat(gastos.sum || '0');
        const hoy = new Date();
        const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));
        const finDia = new Date(hoy.setHours(23, 59, 59, 999));
        const asistenciasHoy = await this.asistenciaRepository.count({
            where: {
                empleado: { empresaId },
                fecha: (0, typeorm_2.Between)(inicioDia, finDia)
            }
        });
        const tasaAsistenciaHoy = totalEmpleados > 0
            ? Math.round((asistenciasHoy / totalEmpleados) * 100)
            : 0;
        const estrellas = await this.evaluacionRepository.count({
            where: {
                evaluado: { empresaId },
                calificacionDesempeno: (0, typeorm_2.MoreThanOrEqual)(7),
                calificacionPotencial: (0, typeorm_2.MoreThanOrEqual)(7)
            }
        });
        const enRiesgo = await this.evaluacionRepository.count({
            where: {
                evaluado: { empresaId },
                calificacionDesempeno: (0, typeorm_2.LessThanOrEqual)(3),
                calificacionPotencial: (0, typeorm_2.LessThanOrEqual)(3)
            }
        });
        return {
            totalEmpleados,
            totalProyectosActivos,
            totalGastosAprobados,
            tasaAsistenciaHoy,
            distribucion9Box: {
                altoDesempenoAltoPotencial: estrellas,
                bajoDesempenoBajoPotencial: enRiesgo,
                bajoDesempenoAltoPotencial: 0,
                altoDesempenoBajoPotencial: 0,
                bajoDesempenoMedioPotencial: 0,
                altoDesempenoMedioPotencial: 0,
                medioDesempenoBajoPotencial: 0,
                medioDesempenoMedioPotencial: 0,
            }
        };
    }
    async getCicloActivo(empresaId) {
        return this.cicloRepository.findOne({
            where: {
                empresaId,
                estado: database_1.EstadoCiclo.ACTIVO
            }
        });
    }
    async getAsistenciaSummary(empresaId, empleadoId) {
        const hoy = new Date();
        const finDia = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const registros = await this.asistenciaRepository.find({
            where: {
                empleadoId,
                fecha: (0, typeorm_2.MoreThanOrEqual)(inicioMes),
            },
        });
        const diasTrabajados = registros.length;
        let diasHabiles = 0;
        const cursor = new Date(inicioMes);
        while (cursor <= hoy) {
            const diaSemana = cursor.getDay();
            if (diaSemana !== 0 && diaSemana !== 6) {
                diasHabiles++;
            }
            cursor.setDate(cursor.getDate() + 1);
        }
        let porcentaje = 0;
        if (diasHabiles > 0) {
            porcentaje = Math.round((diasTrabajados / diasHabiles) * 100);
        }
        if (porcentaje > 100)
            porcentaje = 100;
        return {
            asistenciaPercentage: porcentaje,
            diasTrabajados: diasTrabajados,
            diasHabilesEsperados: diasHabiles
        };
    }
    async seedData(empresaIdParam) {
        console.log('🌱 Iniciando Seed de Productividad...');
        const empresaId = empresaIdParam || 'd845d7a9-9dcf-4db3-95f3-131b93e40673';
        try {
            console.log('🧹 Limpiando datos anteriores del seed...');
            const nombresProyectosSeed = ['App Móvil v2', 'Rediseño Web Corporativa', 'Migración a Nube'];
            const proyectosExistentes = await this.proyectoRepository.find({
                where: {
                    nombre: (0, typeorm_2.In)(nombresProyectosSeed),
                    empresaId
                }
            });
            if (proyectosExistentes.length > 0) {
                const proyectoIds = proyectosExistentes.map(p => p.id);
                await this.tareaRepository.delete({
                    proyectoId: (0, typeorm_2.In)(proyectoIds)
                });
                await this.sprintRepository.delete({
                    proyectoId: (0, typeorm_2.In)(proyectoIds)
                });
                await this.proyectoRepository.delete({
                    id: (0, typeorm_2.In)(proyectoIds)
                });
            }
            console.log('✅ Datos anteriores eliminados');
            console.log('📁 Creando proyectos...');
            const proyectosData = [
                { nombre: 'App Móvil v2', descripcion: 'Desarrollo de nueva versión mobile' },
                { nombre: 'Rediseño Web Corporativa', descripcion: 'Actualización del sitio web principal' },
                { nombre: 'Migración a Nube', descripcion: 'Migración de infraestructura a AWS' }
            ];
            const proyectos = [];
            for (const { nombre, descripcion } of proyectosData) {
                const p = this.proyectoRepository.create({
                    nombre,
                    descripcion,
                    empresaId,
                    estado: 'Activo'
                });
                const saved = await this.proyectoRepository.save(p);
                proyectos.push(saved);
            }
            console.log(`✅ ${proyectos.length} proyectos creados`);
            const proyectoPrincipal = proyectos[0];
            console.log(`🏃 Creando sprints para: ${proyectoPrincipal.nombre}`);
            const fechaInicioSprint1 = new Date();
            fechaInicioSprint1.setDate(fechaInicioSprint1.getDate() - 28);
            const fechaFinSprint1 = new Date();
            fechaFinSprint1.setDate(fechaFinSprint1.getDate() - 14);
            const sprint1 = await this.sprintRepository.save(this.sprintRepository.create({
                nombre: 'Sprint 1: Fundamentos',
                fechaInicio: fechaInicioSprint1,
                fechaFin: fechaFinSprint1,
                proyectoId: proyectoPrincipal.id
            }));
            console.log('✅ Sprint 1 creado (Completado)');
            const tareasSprint1 = this.tareaRepository.create([
                {
                    titulo: 'Configurar Repositorio Git',
                    descripcion: 'Inicializar repo y configurar ramas',
                    estado: create_tarea_dto_1.EstadoTarea.COMPLETADA,
                    prioridad: create_tarea_dto_1.PrioridadTarea.ALTA,
                    sprintId: sprint1.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 3
                },
                {
                    titulo: 'Diseñar Esquema DB',
                    descripcion: 'Crear diagrama ER y tablas principales',
                    estado: create_tarea_dto_1.EstadoTarea.COMPLETADA,
                    prioridad: create_tarea_dto_1.PrioridadTarea.ALTA,
                    sprintId: sprint1.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 5
                },
                {
                    titulo: 'Setup CI/CD',
                    descripcion: 'Configurar pipeline de despliegue',
                    estado: create_tarea_dto_1.EstadoTarea.COMPLETADA,
                    prioridad: create_tarea_dto_1.PrioridadTarea.MEDIA,
                    sprintId: sprint1.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 3
                }
            ]);
            await this.tareaRepository.save(tareasSprint1);
            console.log('✅ 3 tareas creadas para Sprint 1');
            const fechaInicioSprint2 = new Date();
            fechaInicioSprint2.setDate(fechaInicioSprint2.getDate() - 7);
            const fechaFinSprint2 = new Date();
            fechaFinSprint2.setDate(fechaFinSprint2.getDate() + 7);
            const sprint2 = await this.sprintRepository.save(this.sprintRepository.create({
                nombre: 'Sprint 2: Autenticación',
                fechaInicio: fechaInicioSprint2,
                fechaFin: fechaFinSprint2,
                proyectoId: proyectoPrincipal.id
            }));
            console.log('✅ Sprint 2 creado (En Progreso)');
            const tareasSprint2 = this.tareaRepository.create([
                {
                    titulo: 'API Endpoint Login',
                    descripcion: 'Crear endpoint POST /auth/login con validación',
                    estado: create_tarea_dto_1.EstadoTarea.COMPLETADA,
                    prioridad: create_tarea_dto_1.PrioridadTarea.ALTA,
                    sprintId: sprint2.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 8
                },
                {
                    titulo: 'Pantalla Login Mobile',
                    descripcion: 'Diseñar e implementar UI de login',
                    estado: create_tarea_dto_1.EstadoTarea.EN_PROGRESO,
                    prioridad: create_tarea_dto_1.PrioridadTarea.ALTA,
                    sprintId: sprint2.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 5
                },
                {
                    titulo: 'Validación JWT',
                    descripcion: 'Implementar middleware de validación de tokens',
                    estado: create_tarea_dto_1.EstadoTarea.EN_PROGRESO,
                    prioridad: create_tarea_dto_1.PrioridadTarea.ALTA,
                    sprintId: sprint2.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 3
                },
                {
                    titulo: 'Registro de Usuarios',
                    descripcion: 'Crear flujo completo de registro',
                    estado: create_tarea_dto_1.EstadoTarea.PENDIENTE,
                    prioridad: create_tarea_dto_1.PrioridadTarea.MEDIA,
                    sprintId: sprint2.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 5
                },
                {
                    titulo: 'Reset de Password',
                    descripcion: 'Implementar recuperación de contraseña',
                    estado: create_tarea_dto_1.EstadoTarea.PENDIENTE,
                    prioridad: create_tarea_dto_1.PrioridadTarea.BAJA,
                    sprintId: sprint2.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 3
                }
            ]);
            await this.tareaRepository.save(tareasSprint2);
            console.log('✅ 5 tareas creadas para Sprint 2');
            const fechaInicioSprint3 = new Date();
            fechaInicioSprint3.setDate(fechaInicioSprint3.getDate() + 8);
            const fechaFinSprint3 = new Date();
            fechaFinSprint3.setDate(fechaFinSprint3.getDate() + 22);
            const sprint3 = await this.sprintRepository.save(this.sprintRepository.create({
                nombre: 'Sprint 3: Dashboard Principal',
                fechaInicio: fechaInicioSprint3,
                fechaFin: fechaFinSprint3,
                proyectoId: proyectoPrincipal.id
            }));
            console.log('✅ Sprint 3 creado (Planificado)');
            const tareasSprint3 = this.tareaRepository.create([
                {
                    titulo: 'Diseño UI Dashboard',
                    descripcion: 'Crear mockups y flujo de navegación',
                    estado: create_tarea_dto_1.EstadoTarea.PENDIENTE,
                    prioridad: create_tarea_dto_1.PrioridadTarea.ALTA,
                    sprintId: sprint3.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 5
                },
                {
                    titulo: 'API de Métricas',
                    descripcion: 'Endpoint para estadísticas del usuario',
                    estado: create_tarea_dto_1.EstadoTarea.PENDIENTE,
                    prioridad: create_tarea_dto_1.PrioridadTarea.ALTA,
                    sprintId: sprint3.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 8
                },
                {
                    titulo: 'Gráficos Interactivos',
                    descripcion: 'Implementar charts con animaciones',
                    estado: create_tarea_dto_1.EstadoTarea.PENDIENTE,
                    prioridad: create_tarea_dto_1.PrioridadTarea.MEDIA,
                    sprintId: sprint3.id,
                    proyectoId: proyectoPrincipal.id,
                    puntosHistoria: 13
                }
            ]);
            await this.tareaRepository.save(tareasSprint3);
            console.log('✅ 3 tareas creadas para Sprint 3');
            console.log('🎉 Seed de Productividad completado exitosamente!');
            return {
                message: 'Datos de productividad inyectados exitosamente',
                resumen: {
                    proyectos: proyectos.length,
                    sprints: 3,
                    tareas: 11,
                    proyectoPrincipal: {
                        id: proyectoPrincipal.id,
                        nombre: proyectoPrincipal.nombre
                    }
                }
            };
        }
        catch (error) {
            console.error('❌ Error en seed de productividad:', error);
            throw error;
        }
    }
};
exports.ProductividadService = ProductividadService;
exports.ProductividadService = ProductividadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.Proyecto)),
    __param(1, (0, typeorm_1.InjectRepository)(database_1.Sprint)),
    __param(2, (0, typeorm_1.InjectRepository)(database_1.Empleado)),
    __param(3, (0, typeorm_1.InjectRepository)(database_1.Tarea)),
    __param(4, (0, typeorm_1.InjectRepository)(database_1.AsignacionTarea)),
    __param(5, (0, typeorm_1.InjectRepository)(database_1.CicloEvaluacion)),
    __param(6, (0, typeorm_1.InjectRepository)(database_1.Objetivo)),
    __param(7, (0, typeorm_1.InjectRepository)(database_1.Evaluacion)),
    __param(8, (0, typeorm_1.InjectRepository)(database_1.Curso)),
    __param(9, (0, typeorm_1.InjectRepository)(database_1.InscripcionCurso)),
    __param(10, (0, typeorm_1.InjectRepository)(database_1.RegistroAsistencia)),
    __param(11, (0, typeorm_1.InjectRepository)(database_1.Activo)),
    __param(12, (0, typeorm_1.InjectRepository)(database_1.ActivoAsignado)),
    __param(13, (0, typeorm_1.InjectRepository)(database_1.ReporteGasto)),
    __param(14, (0, typeorm_1.InjectRepository)(database_1.ItemGasto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductividadService);


/***/ }),

/***/ "./libs/database/src/database.module.ts":
/*!**********************************************!*\
  !*** ./libs/database/src/database.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const entities = __importStar(__webpack_require__(/*! ./entities */ "./libs/database/src/entities/index.ts"));
const entityList = Object.values(entities).filter((entity) => typeof entity === 'function');
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [
                    config_1.ConfigModule.forRoot({
                        isGlobal: true,
                        envFilePath: './.env',
                    }),
                ],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_POSTGRES_HOST'),
                    port: configService.get('DB_POSTGRES_PORT'),
                    username: configService.get('DB_POSTGRES_USER'),
                    password: configService.get('DB_POSTGRES_PASSWORD'),
                    database: configService.get('DB_POSTGRES_DATABASE'),
                    entities: entityList,
                    synchronize: true,
                }),
            }),
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], DatabaseModule);


/***/ }),

/***/ "./libs/database/src/entities/activo.entity.ts":
/*!*****************************************************!*\
  !*** ./libs/database/src/entities/activo.entity.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Activo = exports.EstadoActivo = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const activoAsignado_entity_1 = __webpack_require__(/*! ./activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts");
var EstadoActivo;
(function (EstadoActivo) {
    EstadoActivo["DISPONIBLE"] = "DISPONIBLE";
    EstadoActivo["ASIGNADO"] = "ASIGNADO";
    EstadoActivo["EN_REPARACION"] = "EN_REPARACION";
    EstadoActivo["DE_BAJA"] = "DE_BAJA";
})(EstadoActivo || (exports.EstadoActivo = EstadoActivo = {}));
let Activo = class Activo extends base_entity_1.BaseEntity {
    nombre;
    serial;
    tipo;
    estado;
    valor;
    fechaAdquisicion;
    empresa;
    empresaId;
    asignaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, serial: { required: true, type: () => String }, tipo: { required: true, type: () => String }, estado: { required: true, description: "Estado actual. Controlado por Enum.", enum: (__webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts").EstadoActivo) }, valor: { required: true, type: () => Number, description: "Valor estimado o costo de compra (Opcional pero \u00FAtil para inventario)" }, fechaAdquisicion: { required: true, type: () => Date, description: "Fecha de adquisici\u00F3n" }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, asignaciones: { required: true, type: () => [(__webpack_require__(/*! ./activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts").ActivoAsignado)], description: "Historial de asignaciones." } };
    }
};
exports.Activo = Activo;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre o descripción del activo (Laptop Dell XPS, Silla)',
    }),
    __metadata("design:type", String)
], Activo.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: 'Número de serial único (si aplica)',
    }),
    __metadata("design:type", String)
], Activo.prototype, "serial", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        comment: 'Categoría o tipo (Computación, Mobiliario, Vehículo)',
    }),
    __metadata("design:type", String)
], Activo.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoActivo.DISPONIBLE,
        comment: 'Estado actual (DISPONIBLE, ASIGNADO...)',
    }),
    __metadata("design:type", String)
], Activo.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: true,
        comment: 'Valor monetario del activo',
    }),
    __metadata("design:type", Number)
], Activo.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
        comment: 'Fecha de compra o adquisición',
    }),
    __metadata("design:type", Date)
], Activo.prototype, "fechaAdquisicion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.activos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Activo.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa propietaria' }),
    __metadata("design:type", String)
], Activo.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activoAsignado_entity_1.ActivoAsignado, (asignacion) => asignacion.activo),
    __metadata("design:type", Array)
], Activo.prototype, "asignaciones", void 0);
exports.Activo = Activo = __decorate([
    (0, typeorm_1.Entity)({ name: 'activos' }),
    (0, typeorm_1.Index)(['empresaId']),
    (0, typeorm_1.Unique)(['empresaId', 'serial'])
], Activo);


/***/ }),

/***/ "./libs/database/src/entities/activoAsignado.entity.ts":
/*!*************************************************************!*\
  !*** ./libs/database/src/entities/activoAsignado.entity.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivoAsignado = exports.EstadoAsignacion = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const activo_entity_1 = __webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
var EstadoAsignacion;
(function (EstadoAsignacion) {
    EstadoAsignacion["VIGENTE"] = "VIGENTE";
    EstadoAsignacion["DEVUELTO"] = "DEVUELTO";
})(EstadoAsignacion || (exports.EstadoAsignacion = EstadoAsignacion = {}));
let ActivoAsignado = class ActivoAsignado extends base_entity_1.BaseEntity {
    fechaAsignacion;
    fechaDevolucion;
    estado;
    observaciones;
    activo;
    activoId;
    empleado;
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { fechaAsignacion: { required: true, type: () => Date, description: "Fecha de entrega.\nDefault: La fecha actual al momento de crear el registro." }, fechaDevolucion: { required: true, type: () => Date, description: "Fecha de devoluci\u00F3n (null mientras est\u00E9 VIGENTE)." }, estado: { required: true, description: "Estado de la asignaci\u00F3n (VIGENTE vs DEVUELTO).", enum: (__webpack_require__(/*! ./activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts").EstadoAsignacion) }, observaciones: { required: true, type: () => String, description: "Notas sobre el estado f\u00EDsico o accesorios (Ej: \"Incluye cargador\")." }, activo: { required: true, type: () => (__webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts").Activo) }, activoId: { required: true, type: () => String }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String } };
    }
};
exports.ActivoAsignado = ActivoAsignado;
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        default: () => 'CURRENT_DATE',
        comment: 'Fecha de entrega del activo al empleado',
    }),
    __metadata("design:type", Date)
], ActivoAsignado.prototype, "fechaAsignacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
        comment: 'Fecha de devolución del activo',
    }),
    __metadata("design:type", Date)
], ActivoAsignado.prototype, "fechaDevolucion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoAsignacion.VIGENTE,
        comment: 'Estado de la asignación (VIGENTE, DEVUELTO)',
    }),
    __metadata("design:type", String)
], ActivoAsignado.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Observaciones de entrega o devolución',
    }),
    __metadata("design:type", String)
], ActivoAsignado.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activo_entity_1.Activo, (activo) => activo.asignaciones, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'activoId' }),
    __metadata("design:type", activo_entity_1.Activo)
], ActivoAsignado.prototype, "activo", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Activo asignado' }),
    __metadata("design:type", String)
], ActivoAsignado.prototype, "activoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.activosAsignados, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], ActivoAsignado.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado que recibe el activo' }),
    __metadata("design:type", String)
], ActivoAsignado.prototype, "empleadoId", void 0);
exports.ActivoAsignado = ActivoAsignado = __decorate([
    (0, typeorm_1.Entity)({ name: 'activos_asignados' }),
    (0, typeorm_1.Index)(['activoId']),
    (0, typeorm_1.Index)(['empleadoId'])
], ActivoAsignado);


/***/ }),

/***/ "./libs/database/src/entities/asignacionTarea.entity.ts":
/*!**************************************************************!*\
  !*** ./libs/database/src/entities/asignacionTarea.entity.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsignacionTarea = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const tarea_entity_1 = __webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let AsignacionTarea = class AsignacionTarea extends base_entity_1.BaseEntity {
    fechaAsignacion;
    observaciones;
    tarea;
    tareaId;
    empleado;
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { fechaAsignacion: { required: true, type: () => Date, description: "Fecha en que se realiz\u00F3 la asignaci\u00F3n.\nTipo: 'timestamp' para guardar fecha y hora.\nDefault: Se llena sola con la hora actual si no se env\u00EDa." }, observaciones: { required: true, type: () => String, description: "Observaciones o instrucciones espec\u00EDficas (Ej: \"Solo backend\").\nCORRECCI\u00D3N: Faltaba esta columna y causaba error en el servicio." }, tarea: { required: true, type: () => (__webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts").Tarea) }, tareaId: { required: true, type: () => String, description: "ID de la Tarea (FK expl\u00EDcita)" }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado), description: "Relaci\u00F3n: La asignaci\u00F3n pertenece a UN Empleado.\nonDelete: 'CASCADE' = Si el Empleado es borrado, sus asignaciones se borran.\nNOTA: Aseg\u00FArate que en tu entidad Empleado tengas la propiedad 'asignaciones' o 'tareasAsignadas'.\nAqu\u00ED asumo que se llama 'asignaciones' para mantener consistencia." }, empleadoId: { required: true, type: () => String, description: "ID del Empleado (FK expl\u00EDcita)" } };
    }
};
exports.AsignacionTarea = AsignacionTarea;
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha y hora de asignación',
    }),
    __metadata("design:type", Date)
], AsignacionTarea.prototype, "fechaAsignacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Observaciones o instrucciones para la asignación',
    }),
    __metadata("design:type", String)
], AsignacionTarea.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tarea_entity_1.Tarea, (tarea) => tarea.asignaciones, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tareaId' }),
    __metadata("design:type", tarea_entity_1.Tarea)
], AsignacionTarea.prototype, "tarea", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Tarea asignada' }),
    __metadata("design:type", String)
], AsignacionTarea.prototype, "tareaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.asignaciones, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], AsignacionTarea.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado responsable' }),
    __metadata("design:type", String)
], AsignacionTarea.prototype, "empleadoId", void 0);
exports.AsignacionTarea = AsignacionTarea = __decorate([
    (0, typeorm_1.Entity)({ name: 'asignaciones_tareas' }),
    (0, typeorm_1.Index)(['tareaId']),
    (0, typeorm_1.Index)(['empleadoId']),
    (0, typeorm_1.Unique)(['tareaId', 'empleadoId'])
], AsignacionTarea);


/***/ }),

/***/ "./libs/database/src/entities/base.entity.ts":
/*!***************************************************!*\
  !*** ./libs/database/src/entities/base.entity.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntity = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
class BaseEntity {
    id;
    createdAt;
    updatedAt;
    deletedAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date } };
    }
}
exports.BaseEntity = BaseEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha de creación del registro',
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        comment: 'Fecha de última actualización del registro',
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        nullable: true,
        comment: 'Fecha de borrado lógico (soft delete)',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Date)
], BaseEntity.prototype, "deletedAt", void 0);


/***/ }),

/***/ "./libs/database/src/entities/beneficio.entity.ts":
/*!********************************************************!*\
  !*** ./libs/database/src/entities/beneficio.entity.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Beneficio = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const beneficioAsignado_entity_1 = __webpack_require__(/*! ./beneficioAsignado.entity */ "./libs/database/src/entities/beneficioAsignado.entity.ts");
let Beneficio = class Beneficio extends base_entity_1.BaseEntity {
    nombre;
    descripcion;
    empresa;
    empresaId;
    asignaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre del beneficio\nMapea: string nombre \"Nombre beneficio\"" }, descripcion: { required: true, type: () => String, description: "Descripci\u00F3n detallada del beneficio\nMapea: string descripcion \"Descripcion detallada\"" }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String, description: "Mapea: string empresaId FK \"Empresa ofrece beneficio\"" }, asignaciones: { required: true, type: () => [(__webpack_require__(/*! ./beneficioAsignado.entity */ "./libs/database/src/entities/beneficioAsignado.entity.ts").BeneficioAsignado)] } };
    }
};
exports.Beneficio = Beneficio;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre del beneficio (Ej: Seguro Médico)',
    }),
    __metadata("design:type", String)
], Beneficio.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        comment: 'Descripción detallada del beneficio',
    }),
    __metadata("design:type", String)
], Beneficio.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.beneficios, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Beneficio.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) que ofrece este beneficio' }),
    __metadata("design:type", String)
], Beneficio.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => beneficioAsignado_entity_1.BeneficioAsignado, (beneficioAsignado) => beneficioAsignado.beneficio),
    __metadata("design:type", Array)
], Beneficio.prototype, "asignaciones", void 0);
exports.Beneficio = Beneficio = __decorate([
    (0, typeorm_1.Entity)({ name: 'beneficios' }),
    (0, typeorm_1.Index)(['empresaId'])
], Beneficio);


/***/ }),

/***/ "./libs/database/src/entities/beneficioAsignado.entity.ts":
/*!****************************************************************!*\
  !*** ./libs/database/src/entities/beneficioAsignado.entity.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BeneficioAsignado = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
const beneficio_entity_1 = __webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts");
let BeneficioAsignado = class BeneficioAsignado extends base_entity_1.BaseEntity {
    fechaAsignacion;
    empleado;
    empleadoId;
    beneficio;
    beneficioId;
    static _OPENAPI_METADATA_FACTORY() {
        return { fechaAsignacion: { required: true, type: () => Date, description: "Fecha de asignaci\u00F3n del beneficio al empleado\nMapea: date fechaAsignacion \"Fecha asignacion beneficio\"" }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String, description: "Mapea: string empleadoId FK \"Empleado recibe beneficio\"" }, beneficio: { required: true, type: () => (__webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").Beneficio), description: "Relaci\u00F3n: La asignaci\u00F3n se refiere a UN Beneficio del cat\u00E1logo.\nonDelete: 'CASCADE' = Si el Beneficio es borrado del cat\u00E1logo\nde la empresa, tambi\u00E9n se borran las asignaciones existentes." }, beneficioId: { required: true, type: () => String, description: "Mapea: string beneficioId FK \"Beneficio otorgado\"" } };
    }
};
exports.BeneficioAsignado = BeneficioAsignado;
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de asignación del beneficio al empleado',
    }),
    __metadata("design:type", Date)
], BeneficioAsignado.prototype, "fechaAsignacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.beneficiosAsignados, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], BeneficioAsignado.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado que recibe el beneficio' }),
    __metadata("design:type", String)
], BeneficioAsignado.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => beneficio_entity_1.Beneficio, (beneficio) => beneficio.asignaciones, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'beneficioId' }),
    __metadata("design:type", beneficio_entity_1.Beneficio)
], BeneficioAsignado.prototype, "beneficio", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Beneficio otorgado' }),
    __metadata("design:type", String)
], BeneficioAsignado.prototype, "beneficioId", void 0);
exports.BeneficioAsignado = BeneficioAsignado = __decorate([
    (0, typeorm_1.Entity)({ name: 'beneficios_asignados' }),
    (0, typeorm_1.Index)(['empleadoId']),
    (0, typeorm_1.Index)(['beneficioId']),
    (0, typeorm_1.Unique)(['empleadoId', 'beneficioId'])
], BeneficioAsignado);


/***/ }),

/***/ "./libs/database/src/entities/candidato.entity.ts":
/*!********************************************************!*\
  !*** ./libs/database/src/entities/candidato.entity.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Candidato = exports.EstadoCandidato = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const vacante_entity_1 = __webpack_require__(/*! ./vacante.entity */ "./libs/database/src/entities/vacante.entity.ts");
var EstadoCandidato;
(function (EstadoCandidato) {
    EstadoCandidato["NUEVO"] = "NUEVO";
    EstadoCandidato["ANALIZANDO_IA"] = "ANALIZANDO_IA";
    EstadoCandidato["REVISION"] = "REVISION";
    EstadoCandidato["ENTREVISTA"] = "ENTREVISTA";
    EstadoCandidato["OFERTA"] = "OFERTA";
    EstadoCandidato["CONTRATADO"] = "CONTRATADO";
    EstadoCandidato["RECHAZADO"] = "RECHAZADO";
})(EstadoCandidato || (exports.EstadoCandidato = EstadoCandidato = {}));
let Candidato = class Candidato extends base_entity_1.BaseEntity {
    nombre;
    email;
    telefono;
    cvUrl;
    aiScore;
    aiAnalysis;
    estado;
    fechaPostulacion;
    vacante;
    vacanteId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, email: { required: true, type: () => String }, telefono: { required: true, type: () => String }, cvUrl: { required: true, type: () => String }, aiScore: { required: true, type: () => Number, nullable: true, description: "Puntuaci\u00F3n de IA (0 - 100).\nIndica qu\u00E9 tanto se ajusta el perfil a la vacante." }, aiAnalysis: { required: true, type: () => String, nullable: true, description: "Resumen/Feedback de la IA.\nAqu\u00ED guardamos el \"Por qu\u00E9\" del puntaje." }, estado: { required: true, enum: (__webpack_require__(/*! ./candidato.entity */ "./libs/database/src/entities/candidato.entity.ts").EstadoCandidato) }, fechaPostulacion: { required: true, type: () => Date }, vacante: { required: true, type: () => (__webpack_require__(/*! ./vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").Vacante) }, vacanteId: { required: true, type: () => String } };
    }
};
exports.Candidato = Candidato;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, comment: 'Nombre completo' }),
    __metadata("design:type", String)
], Candidato.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, comment: 'Correo electrónico' }),
    __metadata("design:type", String)
], Candidato.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Candidato.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true, comment: 'Link al CV' }),
    __metadata("design:type", String)
], Candidato.prototype, "cvUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        comment: 'Puntaje de coincidencia calculado por IA (0-100)'
    }),
    __metadata("design:type", Object)
], Candidato.prototype, "aiScore", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Análisis cualitativo de la IA sobre el candidato'
    }),
    __metadata("design:type", Object)
], Candidato.prototype, "aiAnalysis", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoCandidato.NUEVO,
    }),
    __metadata("design:type", String)
], Candidato.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], Candidato.prototype, "fechaPostulacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vacante_entity_1.Vacante, (vacante) => vacante.candidatos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'vacanteId' }),
    __metadata("design:type", vacante_entity_1.Vacante)
], Candidato.prototype, "vacante", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidato.prototype, "vacanteId", void 0);
exports.Candidato = Candidato = __decorate([
    (0, typeorm_1.Entity)({ name: 'candidatos' }),
    (0, typeorm_1.Index)(['vacanteId']),
    (0, typeorm_1.Index)(['email'])
], Candidato);


/***/ }),

/***/ "./libs/database/src/entities/cargo.entity.ts":
/*!****************************************************!*\
  !*** ./libs/database/src/entities/cargo.entity.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cargo = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const departamento_entity_1 = __webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Cargo = class Cargo extends base_entity_1.BaseEntity {
    nombre;
    salarioMin;
    salarioMax;
    departamento;
    departamentoId;
    empleados;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, salarioMin: { required: true, type: () => Number }, salarioMax: { required: true, type: () => Number }, departamento: { required: true, type: () => (__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento) }, departamentoId: { required: true, type: () => String }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] } };
    }
};
exports.Cargo = Cargo;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre del puesto de trabajo',
    }),
    __metadata("design:type", String)
], Cargo.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: true,
        default: 0,
        comment: 'Salario mínimo de la banda salarial',
    }),
    __metadata("design:type", Number)
], Cargo.prototype, "salarioMin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: true,
        default: 0,
        comment: 'Salario máximo de la banda salarial',
    }),
    __metadata("design:type", Number)
], Cargo.prototype, "salarioMax", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departamento_entity_1.Departamento, (departamento) => departamento.cargos, {
        nullable: false,
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'departamentoId' }),
    __metadata("design:type", departamento_entity_1.Departamento)
], Cargo.prototype, "departamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Departamento padre' }),
    __metadata("design:type", String)
], Cargo.prototype, "departamentoId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => empleado_entity_1.Empleado, (empleado) => empleado.cargo),
    __metadata("design:type", Array)
], Cargo.prototype, "empleados", void 0);
exports.Cargo = Cargo = __decorate([
    (0, typeorm_1.Entity)({ name: 'cargos' }),
    (0, typeorm_1.Index)(['departamentoId'])
], Cargo);


/***/ }),

/***/ "./libs/database/src/entities/cicloEvaluacion.entity.ts":
/*!**************************************************************!*\
  !*** ./libs/database/src/entities/cicloEvaluacion.entity.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CicloEvaluacion = exports.EstadoCiclo = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const objetivo_entity_1 = __webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts");
const evaluacion_entity_1 = __webpack_require__(/*! ./evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts");
var EstadoCiclo;
(function (EstadoCiclo) {
    EstadoCiclo["PLANIFICACION"] = "PLANIFICACION";
    EstadoCiclo["ACTIVO"] = "ACTIVO";
    EstadoCiclo["CERRADO"] = "CERRADO";
})(EstadoCiclo || (exports.EstadoCiclo = EstadoCiclo = {}));
let CicloEvaluacion = class CicloEvaluacion extends base_entity_1.BaseEntity {
    nombre;
    fechaInicio;
    fechaFin;
    estado;
    empresa;
    empresaId;
    objetivos;
    evaluaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, fechaInicio: { required: true, type: () => Date }, fechaFin: { required: true, type: () => Date }, estado: { required: true, enum: (__webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").EstadoCiclo) }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, objetivos: { required: true, type: () => [(__webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo)] }, evaluaciones: { required: true, type: () => [(__webpack_require__(/*! ./evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts").Evaluacion)] } };
    }
};
exports.CicloEvaluacion = CicloEvaluacion;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre del ciclo (Ej: Evaluación Anual 2025)',
    }),
    __metadata("design:type", String)
], CicloEvaluacion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de inicio del ciclo',
    }),
    __metadata("design:type", Date)
], CicloEvaluacion.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de fin del ciclo',
    }),
    __metadata("design:type", Date)
], CicloEvaluacion.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoCiclo.PLANIFICACION,
        comment: 'Estado del ciclo (PLANIFICACION, ACTIVO, CERRADO)',
    }),
    __metadata("design:type", String)
], CicloEvaluacion.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.ciclosEvaluacion, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], CicloEvaluacion.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) que ejecuta el ciclo' }),
    __metadata("design:type", String)
], CicloEvaluacion.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => objetivo_entity_1.Objetivo, (objetivo) => objetivo.ciclo, { cascade: true }),
    __metadata("design:type", Array)
], CicloEvaluacion.prototype, "objetivos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evaluacion_entity_1.Evaluacion, (evaluacion) => evaluacion.ciclo, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], CicloEvaluacion.prototype, "evaluaciones", void 0);
exports.CicloEvaluacion = CicloEvaluacion = __decorate([
    (0, typeorm_1.Entity)({ name: 'ciclos_evaluacion' }),
    (0, typeorm_1.Index)(['empresaId'])
], CicloEvaluacion);


/***/ }),

/***/ "./libs/database/src/entities/conceptoNomina.entity.ts":
/*!*************************************************************!*\
  !*** ./libs/database/src/entities/conceptoNomina.entity.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConceptoNomina = exports.TipoRubro = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
var TipoRubro;
(function (TipoRubro) {
    TipoRubro["INGRESO"] = "Ingreso";
    TipoRubro["EGRESO"] = "Egreso";
})(TipoRubro || (exports.TipoRubro = TipoRubro = {}));
let ConceptoNomina = class ConceptoNomina extends base_entity_1.BaseEntity {
    nombre;
    tipo;
    esFijo;
    formula;
    empresa;
    empresaId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, tipo: { required: true, enum: (__webpack_require__(/*! ./conceptoNomina.entity */ "./libs/database/src/entities/conceptoNomina.entity.ts").TipoRubro) }, esFijo: { required: true, type: () => Boolean }, formula: { required: true, type: () => String }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String } };
    }
};
exports.ConceptoNomina = ConceptoNomina;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre del concepto (Salario Base, Aporte IESS)',
    }),
    __metadata("design:type", String)
], ConceptoNomina.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoRubro,
        comment: 'Tipo de rubro (Ingreso, Egreso)',
    }),
    __metadata("design:type", String)
], ConceptoNomina.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        comment: 'Indica si es un monto fijo o calculado por fórmula',
    }),
    __metadata("design:type", Boolean)
], ConceptoNomina.prototype, "esFijo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 1000,
        nullable: true,
        comment: 'Fórmula para el cálculo (ej. "(salario / 30) * dias_trabajados")',
    }),
    __metadata("design:type", String)
], ConceptoNomina.prototype, "formula", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], ConceptoNomina.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) a la que pertenece' }),
    __metadata("design:type", String)
], ConceptoNomina.prototype, "empresaId", void 0);
exports.ConceptoNomina = ConceptoNomina = __decorate([
    (0, typeorm_1.Entity)({ name: 'conceptos_nomina' }),
    (0, typeorm_1.Index)(['empresaId', 'tipo'])
], ConceptoNomina);


/***/ }),

/***/ "./libs/database/src/entities/contrato.entity.ts":
/*!*******************************************************!*\
  !*** ./libs/database/src/entities/contrato.entity.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Contrato = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Contrato = class Contrato extends base_entity_1.BaseEntity {
    tipo;
    salario;
    moneda;
    fechaInicio;
    fechaFin;
    estado;
    empleadoId;
    empleado;
    static _OPENAPI_METADATA_FACTORY() {
        return { tipo: { required: true, type: () => String, description: "Tipo de contrato laboral (Indefinido, Temporal, Servicios, etc.)\nMapea: string tipo \"Tipo contrato laboral\"" }, salario: { required: true, type: () => Number, description: "Salario mensual nominal\nMapea: float salario \"Salario mensual nominal\"" }, moneda: { required: true, type: () => String, description: "C\u00F3digo de moneda de pago (USD, EUR, etc.)\nMapea: string moneda \"Codigo moneda pago\"" }, fechaInicio: { required: true, type: () => Date, description: "Fecha de inicio de vigencia del contrato\nMapea: date fechaInicio \"Inicio vigencia contrato\"" }, fechaFin: { required: true, type: () => Date, description: "Fecha de fin de vigencia del contrato (opcional)\nMapea: date fechaFin \"Fin vigencia nullable\"" }, estado: { required: true, type: () => String }, empleadoId: { required: true, type: () => String, description: "Mapea: string empleadoId FK \"Empleado contratado\"" }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) } };
    }
};
exports.Contrato = Contrato;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        comment: 'Tipo de contrato laboral',
    }),
    __metadata("design:type", String)
], Contrato.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        comment: 'Salario mensual nominal',
    }),
    __metadata("design:type", Number)
], Contrato.prototype, "salario", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 10,
        comment: 'Código de moneda de pago (USD, EUR)',
    }),
    __metadata("design:type", String)
], Contrato.prototype, "moneda", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de inicio de vigencia del contrato',
    }),
    __metadata("design:type", Date)
], Contrato.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
        comment: 'Fecha de fin de vigencia (si aplica)',
    }),
    __metadata("design:type", Date)
], Contrato.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'Vigente',
        comment: 'Estado del vínculo laboral (Vigente, Finalizado)',
    }),
    __metadata("design:type", String)
], Contrato.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado al que pertenece el contrato' }),
    __metadata("design:type", String)
], Contrato.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.contratos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Contrato.prototype, "empleado", void 0);
exports.Contrato = Contrato = __decorate([
    (0, typeorm_1.Entity)({ name: 'contratos' }),
    (0, typeorm_1.Index)(['empleadoId'])
], Contrato);


/***/ }),

/***/ "./libs/database/src/entities/curso.entity.ts":
/*!****************************************************!*\
  !*** ./libs/database/src/entities/curso.entity.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Curso = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const inscripcionCurso_entity_1 = __webpack_require__(/*! ./inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts");
let Curso = class Curso extends base_entity_1.BaseEntity {
    titulo;
    descripcion;
    duracionHoras;
    empresa;
    empresaId;
    inscripciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String, description: "T\u00EDtulo del curso de capacitaci\u00F3n\nMapea: string titulo \"Titulo curso capacitacion\"" }, descripcion: { required: true, type: () => String, description: "Descripci\u00F3n del contenido del curso\nMapea: string descripcion \"Descripcion contenido curso\"" }, duracionHoras: { required: true, type: () => Number, description: "Duraci\u00F3n total estimada en horas\nMapea: int duracionHoras \"Duracion total horas\"" }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String, description: "Mapea: string empresaId FK \"Empresa ofrece curso\"" }, inscripciones: { required: true, type: () => [(__webpack_require__(/*! ./inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").InscripcionCurso)] } };
    }
};
exports.Curso = Curso;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Título del curso de capacitación',
    }),
    __metadata("design:type", String)
], Curso.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        comment: 'Descripción del contenido del curso',
    }),
    __metadata("design:type", String)
], Curso.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        comment: 'Duración total estimada en horas',
    }),
    __metadata("design:type", Number)
], Curso.prototype, "duracionHoras", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.cursos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Curso.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) que ofrece el curso' }),
    __metadata("design:type", String)
], Curso.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inscripcionCurso_entity_1.InscripcionCurso, (inscripcion) => inscripcion.curso),
    __metadata("design:type", Array)
], Curso.prototype, "inscripciones", void 0);
exports.Curso = Curso = __decorate([
    (0, typeorm_1.Entity)({ name: 'cursos' }),
    (0, typeorm_1.Index)(['empresaId'])
], Curso);


/***/ }),

/***/ "./libs/database/src/entities/departamento.entity.ts":
/*!***********************************************************!*\
  !*** ./libs/database/src/entities/departamento.entity.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Departamento = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const cargo_entity_1 = __webpack_require__(/*! ./cargo.entity */ "./libs/database/src/entities/cargo.entity.ts");
let Departamento = class Departamento extends base_entity_1.BaseEntity {
    nombre;
    empresa;
    empresaId;
    cargos;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre del \u00E1rea o departamento\nMapea: string nombre \"Nombre area departamento\"" }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String, description: "Mapea: string empresaId FK \"Empresa propietaria\"" }, cargos: { required: true, type: () => [(__webpack_require__(/*! ./cargo.entity */ "./libs/database/src/entities/cargo.entity.ts").Cargo)] } };
    }
};
exports.Departamento = Departamento;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre del área o departamento',
    }),
    __metadata("design:type", String)
], Departamento.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.departamentos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Departamento.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) propietaria' }),
    __metadata("design:type", String)
], Departamento.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cargo_entity_1.Cargo, (cargo) => cargo.departamento),
    __metadata("design:type", Array)
], Departamento.prototype, "cargos", void 0);
exports.Departamento = Departamento = __decorate([
    (0, typeorm_1.Entity)({ name: 'departamentos' }),
    (0, typeorm_1.Index)(['empresaId'])
], Departamento);


/***/ }),

/***/ "./libs/database/src/entities/documentoEmpleado.entity.ts":
/*!****************************************************************!*\
  !*** ./libs/database/src/entities/documentoEmpleado.entity.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentoEmpleado = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let DocumentoEmpleado = class DocumentoEmpleado extends base_entity_1.BaseEntity {
    nombre;
    tipo;
    url;
    fechaSubida;
    empleado;
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, tipo: { required: true, type: () => String }, url: { required: true, type: () => String }, fechaSubida: { required: true, type: () => Date }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String } };
    }
};
exports.DocumentoEmpleado = DocumentoEmpleado;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], DocumentoEmpleado.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], DocumentoEmpleado.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500 }),
    __metadata("design:type", String)
], DocumentoEmpleado.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], DocumentoEmpleado.prototype, "fechaSubida", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.documentos, {
        nullable: false,
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], DocumentoEmpleado.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentoEmpleado.prototype, "empleadoId", void 0);
exports.DocumentoEmpleado = DocumentoEmpleado = __decorate([
    (0, typeorm_1.Entity)({ name: 'documentos_empleados' }),
    (0, typeorm_1.Index)(['empleadoId'])
], DocumentoEmpleado);


/***/ }),

/***/ "./libs/database/src/entities/empleado.entity.ts":
/*!*******************************************************!*\
  !*** ./libs/database/src/entities/empleado.entity.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Empleado = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const usuario_entity_1 = __webpack_require__(/*! ./usuario.entity */ "./libs/database/src/entities/usuario.entity.ts");
const rol_entity_1 = __webpack_require__(/*! ./rol.entity */ "./libs/database/src/entities/rol.entity.ts");
const cargo_entity_1 = __webpack_require__(/*! ./cargo.entity */ "./libs/database/src/entities/cargo.entity.ts");
const contrato_entity_1 = __webpack_require__(/*! ./contrato.entity */ "./libs/database/src/entities/contrato.entity.ts");
const nominaEmpleado_entity_1 = __webpack_require__(/*! ./nominaEmpleado.entity */ "./libs/database/src/entities/nominaEmpleado.entity.ts");
const beneficioAsignado_entity_1 = __webpack_require__(/*! ./beneficioAsignado.entity */ "./libs/database/src/entities/beneficioAsignado.entity.ts");
const asignacionTarea_entity_1 = __webpack_require__(/*! ./asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts");
const timesheet_entity_1 = __webpack_require__(/*! ./timesheet.entity */ "./libs/database/src/entities/timesheet.entity.ts");
const objetivo_entity_1 = __webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts");
const evaluacion_entity_1 = __webpack_require__(/*! ./evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts");
const inscripcionCurso_entity_1 = __webpack_require__(/*! ./inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts");
const registroAsistencia_entity_1 = __webpack_require__(/*! ./registroAsistencia.entity */ "./libs/database/src/entities/registroAsistencia.entity.ts");
const activoAsignado_entity_1 = __webpack_require__(/*! ./activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts");
const reporteGasto_entity_1 = __webpack_require__(/*! ./reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts");
const documentoEmpleado_entity_1 = __webpack_require__(/*! ./documentoEmpleado.entity */ "./libs/database/src/entities/documentoEmpleado.entity.ts");
const sucursal_entity_1 = __webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts");
let Empleado = class Empleado extends base_entity_1.BaseEntity {
    nombre;
    apellido;
    tipoIdentificacion;
    nroIdentificacion;
    emailPersonal;
    telefono;
    direccion;
    fechaNacimiento;
    estado;
    datosPersonalizados;
    fotoUrl;
    sucursal;
    sucursalId;
    empresa;
    empresaId;
    usuario;
    usuarioId;
    rol;
    rolId;
    cargo;
    cargoId;
    jefe;
    jefeId;
    contratos;
    nominas;
    beneficiosAsignados;
    tareasAsignadas;
    timesheets;
    objetivos;
    evaluacionesRecibidas;
    evaluacionesHechas;
    inscripcionesCursos;
    registrosAsistencia;
    activosAsignados;
    reportesGastos;
    asignaciones;
    documentos;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, apellido: { required: true, type: () => String }, tipoIdentificacion: { required: true, type: () => String }, nroIdentificacion: { required: true, type: () => String }, emailPersonal: { required: true, type: () => String }, telefono: { required: true, type: () => String }, direccion: { required: true, type: () => String }, fechaNacimiento: { required: true, type: () => Date }, estado: { required: true, type: () => String }, datosPersonalizados: { required: true, type: () => Object }, fotoUrl: { required: true, type: () => String }, sucursal: { required: true, type: () => (__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts").Sucursal) }, sucursalId: { required: true, type: () => String }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, usuario: { required: true, type: () => (__webpack_require__(/*! ./usuario.entity */ "./libs/database/src/entities/usuario.entity.ts").Usuario) }, usuarioId: { required: true, type: () => String }, rol: { required: true, type: () => (__webpack_require__(/*! ./rol.entity */ "./libs/database/src/entities/rol.entity.ts").Rol) }, rolId: { required: true, type: () => String }, cargo: { required: true, type: () => (__webpack_require__(/*! ./cargo.entity */ "./libs/database/src/entities/cargo.entity.ts").Cargo) }, cargoId: { required: true, type: () => String }, jefe: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, jefeId: { required: true, type: () => String }, contratos: { required: true, type: () => [(__webpack_require__(/*! ./contrato.entity */ "./libs/database/src/entities/contrato.entity.ts").Contrato)] }, nominas: { required: true, type: () => [(__webpack_require__(/*! ./nominaEmpleado.entity */ "./libs/database/src/entities/nominaEmpleado.entity.ts").NominaEmpleado)] }, beneficiosAsignados: { required: true, type: () => [(__webpack_require__(/*! ./beneficioAsignado.entity */ "./libs/database/src/entities/beneficioAsignado.entity.ts").BeneficioAsignado)] }, tareasAsignadas: { required: true, type: () => [(__webpack_require__(/*! ./asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts").AsignacionTarea)] }, timesheets: { required: true, type: () => [(__webpack_require__(/*! ./timesheet.entity */ "./libs/database/src/entities/timesheet.entity.ts").Timesheet)] }, objetivos: { required: true, type: () => [(__webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo)] }, evaluacionesRecibidas: { required: true, type: () => [(__webpack_require__(/*! ./evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts").Evaluacion)] }, evaluacionesHechas: { required: true, type: () => [(__webpack_require__(/*! ./evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts").Evaluacion)] }, inscripcionesCursos: { required: true, type: () => [(__webpack_require__(/*! ./inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").InscripcionCurso)] }, registrosAsistencia: { required: true, type: () => [(__webpack_require__(/*! ./registroAsistencia.entity */ "./libs/database/src/entities/registroAsistencia.entity.ts").RegistroAsistencia)] }, activosAsignados: { required: true, type: () => [(__webpack_require__(/*! ./activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts").ActivoAsignado)] }, reportesGastos: { required: true, type: () => [(__webpack_require__(/*! ./reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").ReporteGasto)] }, asignaciones: { required: true, type: () => [(__webpack_require__(/*! ./asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts").AsignacionTarea)], description: "Relaci\u00F3n: Un Empleado puede tener MUCHAS asignaciones de tareas." }, documentos: { required: true, type: () => [(__webpack_require__(/*! ./documentoEmpleado.entity */ "./libs/database/src/entities/documentoEmpleado.entity.ts").DocumentoEmpleado)] } };
    }
};
exports.Empleado = Empleado;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, comment: 'Nombre del empleado' }),
    __metadata("design:type", String)
], Empleado.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, comment: 'Apellido del empleado' }),
    __metadata("design:type", String)
], Empleado.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: 'Tipo de documento de identidad',
    }),
    __metadata("design:type", String)
], Empleado.prototype, "tipoIdentificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: 'Número del documento de identidad',
    }),
    __metadata("design:type", String)
], Empleado.prototype, "nroIdentificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: 'Email personal de contacto',
    }),
    __metadata("design:type", String)
], Empleado.prototype, "emailPersonal", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        nullable: true,
        comment: 'Teléfono de contacto',
    }),
    __metadata("design:type", String)
], Empleado.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: 'Dirección de residencia',
    }),
    __metadata("design:type", String)
], Empleado.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, comment: 'Fecha de nacimiento' }),
    __metadata("design:type", Date)
], Empleado.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'Activo',
        comment: 'Estado de actividad (Activo, De Vacaciones, Licencia)',
    }),
    __metadata("design:type", String)
], Empleado.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        comment: 'Campos custom definidos por la empresa (RF)',
    }),
    __metadata("design:type", Object)
], Empleado.prototype, "datosPersonalizados", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: 'URL de la foto de perfil',
    }),
    __metadata("design:type", String)
], Empleado.prototype, "fotoUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sucursal_entity_1.Sucursal, (sucursal) => sucursal.empleados, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sucursalId' }),
    __metadata("design:type", sucursal_entity_1.Sucursal)
], Empleado.prototype, "sucursal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'ID de la Sucursal a la que pertenece' }),
    __metadata("design:type", String)
], Empleado.prototype, "sucursalId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.empleados, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Empleado.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) a la que pertenece' }),
    __metadata("design:type", String)
], Empleado.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.membresias, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'usuarioId' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], Empleado.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'ID del Usuario (login) asociado (opcional)' }),
    __metadata("design:type", String)
], Empleado.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rol_entity_1.Rol, (rol) => rol.empleados, {
        nullable: false,
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'rolId' }),
    __metadata("design:type", rol_entity_1.Rol)
], Empleado.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Rol asignado en la empresa' }),
    __metadata("design:type", String)
], Empleado.prototype, "rolId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cargo_entity_1.Cargo, (cargo) => cargo.empleados, {
        nullable: false,
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'cargoId' }),
    __metadata("design:type", cargo_entity_1.Cargo)
], Empleado.prototype, "cargo", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Puesto/Cargo que ocupa' }),
    __metadata("design:type", String)
], Empleado.prototype, "cargoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Empleado, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'jefeId' }),
    __metadata("design:type", Empleado)
], Empleado.prototype, "jefe", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'ID del manager/supervisor directo (otro Empleado)',
    }),
    __metadata("design:type", String)
], Empleado.prototype, "jefeId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contrato_entity_1.Contrato, (contrato) => contrato.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "contratos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nominaEmpleado_entity_1.NominaEmpleado, (nomina) => nomina.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "nominas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => beneficioAsignado_entity_1.BeneficioAsignado, (beneficio) => beneficio.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "beneficiosAsignados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asignacionTarea_entity_1.AsignacionTarea, (asignacion) => asignacion.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "tareasAsignadas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timesheet_entity_1.Timesheet, (timesheet) => timesheet.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "timesheets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => objetivo_entity_1.Objetivo, (objetivo) => objetivo.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "objetivos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evaluacion_entity_1.Evaluacion, (evaluacion) => evaluacion.evaluado),
    __metadata("design:type", Array)
], Empleado.prototype, "evaluacionesRecibidas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => evaluacion_entity_1.Evaluacion, (evaluacion) => evaluacion.evaluador),
    __metadata("design:type", Array)
], Empleado.prototype, "evaluacionesHechas", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inscripcionCurso_entity_1.InscripcionCurso, (inscripcion) => inscripcion.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "inscripcionesCursos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => registroAsistencia_entity_1.RegistroAsistencia, (registro) => registro.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "registrosAsistencia", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activoAsignado_entity_1.ActivoAsignado, (asignacion) => asignacion.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "activosAsignados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => reporteGasto_entity_1.ReporteGasto, (reporte) => reporte.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "reportesGastos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asignacionTarea_entity_1.AsignacionTarea, (asignacion) => asignacion.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "asignaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => documentoEmpleado_entity_1.DocumentoEmpleado, (doc) => doc.empleado),
    __metadata("design:type", Array)
], Empleado.prototype, "documentos", void 0);
exports.Empleado = Empleado = __decorate([
    (0, typeorm_1.Entity)({ name: 'empleados' }),
    (0, typeorm_1.Index)(['empresaId', 'estado']),
    (0, typeorm_1.Index)(['usuarioId'])
], Empleado);


/***/ }),

/***/ "./libs/database/src/entities/empresa.entity.ts":
/*!******************************************************!*\
  !*** ./libs/database/src/entities/empresa.entity.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Empresa = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
const rol_entity_1 = __webpack_require__(/*! ./rol.entity */ "./libs/database/src/entities/rol.entity.ts");
const departamento_entity_1 = __webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts");
const proyecto_entity_1 = __webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts");
const curso_entity_1 = __webpack_require__(/*! ./curso.entity */ "./libs/database/src/entities/curso.entity.ts");
const activo_entity_1 = __webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts");
const beneficio_entity_1 = __webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts");
const periodoNomina_entity_1 = __webpack_require__(/*! ./periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts");
const cicloEvaluacion_entity_1 = __webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts");
const vacante_entity_1 = __webpack_require__(/*! ./vacante.entity */ "./libs/database/src/entities/vacante.entity.ts");
const sucursal_entity_1 = __webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts");
let Empresa = class Empresa extends base_entity_1.BaseEntity {
    nombre;
    planSuscripcion;
    branding;
    configuracion;
    empleados;
    roles;
    departamentos;
    proyectos;
    cursos;
    activos;
    beneficios;
    periodosNomina;
    ciclosEvaluacion;
    vacantes;
    sucursales;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre de la empresa cliente\nMapea: string nombre \"Nombre empresa cliente\"" }, planSuscripcion: { required: true, type: () => String, description: "Plan de suscripci\u00F3n de la empresa (RNF22)\nMapea: string planSuscripcion \"Basico Pro Enterprise\"" }, branding: { required: true, type: () => ({ logoUrl: { required: false, type: () => String, nullable: true }, color: { required: false, type: () => String, nullable: true }, primaryColor: { required: false, type: () => String, nullable: true } }), description: "Configuraci\u00F3n de branding (logo y colores) (RNF24)\nMapea: json branding \"Logo y colores personalizados\"" }, configuracion: { required: true, type: () => Object }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] }, roles: { required: true, type: () => [(__webpack_require__(/*! ./rol.entity */ "./libs/database/src/entities/rol.entity.ts").Rol)], description: "Relaci\u00F3n: Una Empresa define muchos Roles." }, departamentos: { required: true, type: () => [(__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento)], description: "Relaci\u00F3n: Una Empresa organiza muchos Departamentos." }, proyectos: { required: true, type: () => [(__webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts").Proyecto)], description: "Relaci\u00F3n: Una Empresa gestiona muchos Proyectos." }, cursos: { required: true, type: () => [(__webpack_require__(/*! ./curso.entity */ "./libs/database/src/entities/curso.entity.ts").Curso)], description: "Relaci\u00F3n: Una Empresa ofrece muchos Cursos." }, activos: { required: true, type: () => [(__webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts").Activo)], description: "Relaci\u00F3n: Una Empresa posee muchos Activos." }, beneficios: { required: true, type: () => [(__webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").Beneficio)], description: "Relaci\u00F3n: Una Empresa provee muchos Beneficios." }, periodosNomina: { required: true, type: () => [(__webpack_require__(/*! ./periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts").PeriodoNomina)], description: "Relaci\u00F3n: Una Empresa procesa muchos Periodos de N\u00F3mina." }, ciclosEvaluacion: { required: true, type: () => [(__webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").CicloEvaluacion)], description: "Relaci\u00F3n: Una Empresa ejecuta muchos Ciclos de Evaluaci\u00F3n." }, vacantes: { required: true, type: () => [(__webpack_require__(/*! ./vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").Vacante)] }, sucursales: { required: true, type: () => [(__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts").Sucursal)] } };
    }
};
exports.Empresa = Empresa;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre de la empresa cliente',
    }),
    __metadata("design:type", String)
], Empresa.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: 'Plan de suscripción (Basico, Pro, Enterprise)',
    }),
    __metadata("design:type", String)
], Empresa.prototype, "planSuscripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        comment: 'Logo y colores personalizados (RNF24)',
    }),
    __metadata("design:type", Object)
], Empresa.prototype, "branding", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        comment: 'Configuraciones globales de la empresa (Nomina, Asistencia, etc)',
    }),
    __metadata("design:type", Object)
], Empresa.prototype, "configuracion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => empleado_entity_1.Empleado, (empleado) => empleado.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "empleados", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rol_entity_1.Rol, (rol) => rol.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => departamento_entity_1.Departamento, (departamento) => departamento.empresa, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Empresa.prototype, "departamentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proyecto_entity_1.Proyecto, (proyecto) => proyecto.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "proyectos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => curso_entity_1.Curso, (curso) => curso.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "cursos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activo_entity_1.Activo, (activo) => activo.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "activos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => beneficio_entity_1.Beneficio, (beneficio) => beneficio.empresa, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Empresa.prototype, "beneficios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => periodoNomina_entity_1.PeriodoNomina, (periodo) => periodo.empresa, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Empresa.prototype, "periodosNomina", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cicloEvaluacion_entity_1.CicloEvaluacion, (ciclo) => ciclo.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "ciclosEvaluacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vacante_entity_1.Vacante, (vacante) => vacante.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "vacantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sucursal_entity_1.Sucursal, (sucursal) => sucursal.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "sucursales", void 0);
exports.Empresa = Empresa = __decorate([
    (0, typeorm_1.Entity)({ name: 'empresas' })
], Empresa);


/***/ }),

/***/ "./libs/database/src/entities/evaluacion.entity.ts":
/*!*********************************************************!*\
  !*** ./libs/database/src/entities/evaluacion.entity.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Evaluacion = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const cicloEvaluacion_entity_1 = __webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Evaluacion = class Evaluacion extends base_entity_1.BaseEntity {
    calificacionPotencial;
    calificacionDesempeno;
    feedback;
    ciclo;
    cicloId;
    evaluado;
    evaluadoId;
    evaluador;
    evaluadorId;
    static _OPENAPI_METADATA_FACTORY() {
        return { calificacionPotencial: { required: true, type: () => Number, description: "Calificaci\u00F3n de potencial (Eje Y de la 9-Box)\nMapea: int calificacionPotencial \"Calificacion potencial 1-9\"" }, calificacionDesempeno: { required: true, type: () => Number, description: "Calificaci\u00F3n de desempe\u00F1o (Eje X de la 9-Box)\nMapea: int calificacionDesempeno \"Calificacion desempeno 1-9\"" }, feedback: { required: true, type: () => String, description: "Comentarios y feedback cualitativo de la evaluaci\u00F3n\nMapea: string feedback \"Comentarios evaluacion\"" }, ciclo: { required: true, type: () => (__webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").CicloEvaluacion) }, cicloId: { required: true, type: () => String, description: "Mapea: string cicloId FK \"Ciclo evaluacion pertenece\"" }, evaluado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado), description: "Relaci\u00F3n: La evaluaci\u00F3n es de UN Empleado (el evaluado).\nonDelete: 'CASCADE' = Si el Empleado evaluado es borrado, sus\nevaluaciones (que no tienen sentido sin \u00E9l) tambi\u00E9n se borran." }, evaluadoId: { required: true, type: () => String, description: "Mapea: string evaluadoId FK \"Empleado siendo evaluado\"" }, evaluador: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado), description: "Relaci\u00F3n: La evaluaci\u00F3n es realizada por UN Empleado (el evaluador).\nonDelete: 'CASCADE' = Si el Empleado evaluador es borrado,\nsus evaluaciones realizadas se borran.\n(Podr\u00EDa ser 'SET NULL' si queremos conservar el registro an\u00F3nimo).\nVamos a usar 'CASCADE' por simplicidad, como 'evaluado'." }, evaluadorId: { required: true, type: () => String, description: "Mapea: string evaluadorId FK \"Manager realiza evaluacion\"" } };
    }
};
exports.Evaluacion = Evaluacion;
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        comment: 'Calificación de potencial (1-9) para la Matriz 9-Box (RF-45-04)',
    }),
    __metadata("design:type", Number)
], Evaluacion.prototype, "calificacionPotencial", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        comment: 'Calificación de desempeño (1-9) para la Matriz 9-Box (RF-45-04)',
    }),
    __metadata("design:type", Number)
], Evaluacion.prototype, "calificacionDesempeno", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Comentarios y feedback cualitativo de la evaluación',
    }),
    __metadata("design:type", String)
], Evaluacion.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cicloEvaluacion_entity_1.CicloEvaluacion, (ciclo) => ciclo.evaluaciones, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'cicloId' }),
    __metadata("design:type", cicloEvaluacion_entity_1.CicloEvaluacion)
], Evaluacion.prototype, "ciclo", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Ciclo de Evaluación al que pertenece' }),
    __metadata("design:type", String)
], Evaluacion.prototype, "cicloId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.evaluacionesRecibidas, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'evaluadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Evaluacion.prototype, "evaluado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado que está siendo evaluado' }),
    __metadata("design:type", String)
], Evaluacion.prototype, "evaluadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.evaluacionesHechas, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'evaluadorId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Evaluacion.prototype, "evaluador", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado (manager) que realiza la evaluación' }),
    __metadata("design:type", String)
], Evaluacion.prototype, "evaluadorId", void 0);
exports.Evaluacion = Evaluacion = __decorate([
    (0, typeorm_1.Entity)({ name: 'evaluaciones' }),
    (0, typeorm_1.Index)(['cicloId']),
    (0, typeorm_1.Index)(['evaluadoId']),
    (0, typeorm_1.Index)(['evaluadorId']),
    (0, typeorm_1.Unique)(['cicloId', 'evaluadoId'])
], Evaluacion);


/***/ }),

/***/ "./libs/database/src/entities/index.ts":
/*!*********************************************!*\
  !*** ./libs/database/src/entities/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./usuario.entity */ "./libs/database/src/entities/usuario.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./rol.entity */ "./libs/database/src/entities/rol.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./cargo.entity */ "./libs/database/src/entities/cargo.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./contrato.entity */ "./libs/database/src/entities/contrato.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./nominaEmpleado.entity */ "./libs/database/src/entities/nominaEmpleado.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./rubroNomina.entity */ "./libs/database/src/entities/rubroNomina.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./beneficioAsignado.entity */ "./libs/database/src/entities/beneficioAsignado.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./sprint.entity */ "./libs/database/src/entities/sprint.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./timesheet.entity */ "./libs/database/src/entities/timesheet.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./curso.entity */ "./libs/database/src/entities/curso.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./registroAsistencia.entity */ "./libs/database/src/entities/registroAsistencia.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./itemGasto.entity */ "./libs/database/src/entities/itemGasto.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./conceptoNomina.entity */ "./libs/database/src/entities/conceptoNomina.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./candidato.entity */ "./libs/database/src/entities/candidato.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./vacante.entity */ "./libs/database/src/entities/vacante.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./documentoEmpleado.entity */ "./libs/database/src/entities/documentoEmpleado.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./solicitudVacaciones.entity */ "./libs/database/src/entities/solicitudVacaciones.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./novedadNomina.entity */ "./libs/database/src/entities/novedadNomina.entity.ts"), exports);


/***/ }),

/***/ "./libs/database/src/entities/inscripcionCurso.entity.ts":
/*!***************************************************************!*\
  !*** ./libs/database/src/entities/inscripcionCurso.entity.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InscripcionCurso = exports.EstadoInscripcion = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const curso_entity_1 = __webpack_require__(/*! ./curso.entity */ "./libs/database/src/entities/curso.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
var EstadoInscripcion;
(function (EstadoInscripcion) {
    EstadoInscripcion["INSCRITO"] = "INSCRITO";
    EstadoInscripcion["EN_PROGRESO"] = "EN_PROGRESO";
    EstadoInscripcion["COMPLETADO"] = "COMPLETADO";
    EstadoInscripcion["CANCELADO"] = "CANCELADO";
})(EstadoInscripcion || (exports.EstadoInscripcion = EstadoInscripcion = {}));
let InscripcionCurso = class InscripcionCurso extends base_entity_1.BaseEntity {
    estado;
    calificacion;
    fechaInscripcion;
    fechaCompletado;
    curso;
    cursoId;
    empleado;
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { estado: { required: true, description: "Estado del progreso. Usa el Enum para consistencia.", enum: (__webpack_require__(/*! ./inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").EstadoInscripcion) }, calificacion: { required: true, type: () => Number }, fechaInscripcion: { required: true, type: () => Date, description: "Fecha de inscripci\u00F3n.\nDefault: Se llena sola con la fecha actual." }, fechaCompletado: { required: true, type: () => Date, description: "Fecha en que complet\u00F3 el curso.\nImportante para reportes y certificados." }, curso: { required: true, type: () => (__webpack_require__(/*! ./curso.entity */ "./libs/database/src/entities/curso.entity.ts").Curso) }, cursoId: { required: true, type: () => String }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String } };
    }
};
exports.InscripcionCurso = InscripcionCurso;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoInscripcion.INSCRITO,
        comment: 'Estado del progreso (INSCRITO, COMPLETADO...)',
    }),
    __metadata("design:type", String)
], InscripcionCurso.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: true,
        comment: 'Nota final del curso (si aplica)',
    }),
    __metadata("design:type", Number)
], InscripcionCurso.prototype, "calificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        default: () => 'CURRENT_DATE',
        comment: 'Fecha de inscripción al curso',
    }),
    __metadata("design:type", Date)
], InscripcionCurso.prototype, "fechaInscripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
        comment: 'Fecha de finalización del curso',
    }),
    __metadata("design:type", Date)
], InscripcionCurso.prototype, "fechaCompletado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => curso_entity_1.Curso, (curso) => curso.inscripciones, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'cursoId' }),
    __metadata("design:type", curso_entity_1.Curso)
], InscripcionCurso.prototype, "curso", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Curso al que se inscribió' }),
    __metadata("design:type", String)
], InscripcionCurso.prototype, "cursoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.inscripcionesCursos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], InscripcionCurso.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado (estudiante)' }),
    __metadata("design:type", String)
], InscripcionCurso.prototype, "empleadoId", void 0);
exports.InscripcionCurso = InscripcionCurso = __decorate([
    (0, typeorm_1.Entity)({ name: 'inscripciones_cursos' }),
    (0, typeorm_1.Index)(['cursoId']),
    (0, typeorm_1.Index)(['empleadoId']),
    (0, typeorm_1.Unique)(['cursoId', 'empleadoId'])
], InscripcionCurso);


/***/ }),

/***/ "./libs/database/src/entities/itemGasto.entity.ts":
/*!********************************************************!*\
  !*** ./libs/database/src/entities/itemGasto.entity.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemGasto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const reporteGasto_entity_1 = __webpack_require__(/*! ./reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts");
let ItemGasto = class ItemGasto extends base_entity_1.BaseEntity {
    concepto;
    monto;
    fecha;
    facturaUrl;
    reporte;
    reporteId;
    static _OPENAPI_METADATA_FACTORY() {
        return { concepto: { required: true, type: () => String, description: "Concepto o descripci\u00F3n del gasto\nMapea: string concepto \"Concepto descripcion gasto\"" }, monto: { required: true, type: () => Number, description: "Monto individual del gasto\nMapea: float monto \"Monto individual gasto\"" }, fecha: { required: true, type: () => Date, description: "Fecha en que se realiz\u00F3 el gasto\nMapea: date fecha \"Fecha gasto realizado\"" }, facturaUrl: { required: true, type: () => String, description: "URL del comprobante o factura (alojado en S3/Mongo)\nMapea: string facturaUrl \"URL comprobante factura\"\n\n@fulfills RNF13 (Almacenamiento Seguro de Archivos)\n@logic Esta columna no guarda el archivo, solo el enlace a \u00E9l." }, reporte: { required: true, type: () => (__webpack_require__(/*! ./reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").ReporteGasto) }, reporteId: { required: true, type: () => String, description: "Mapea: string reporteId FK \"Reporte padre contiene\"" } };
    }
};
exports.ItemGasto = ItemGasto;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Concepto o descripción del gasto (Factura Hotel, Taxi)',
    }),
    __metadata("design:type", String)
], ItemGasto.prototype, "concepto", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        comment: 'Monto individual del gasto',
    }),
    __metadata("design:type", Number)
], ItemGasto.prototype, "monto", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha en que se realizó el gasto',
    }),
    __metadata("design:type", Date)
], ItemGasto.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 1024,
        nullable: true,
        comment: 'URL del comprobante (Mongo/S3) (RNF13)',
    }),
    __metadata("design:type", String)
], ItemGasto.prototype, "facturaUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => reporteGasto_entity_1.ReporteGasto, (reporte) => reporte.items, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'reporteId' }),
    __metadata("design:type", reporteGasto_entity_1.ReporteGasto)
], ItemGasto.prototype, "reporte", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Reporte padre al que pertenece' }),
    __metadata("design:type", String)
], ItemGasto.prototype, "reporteId", void 0);
exports.ItemGasto = ItemGasto = __decorate([
    (0, typeorm_1.Entity)({ name: 'items_gasto' }),
    (0, typeorm_1.Index)(['reporteId'])
], ItemGasto);


/***/ }),

/***/ "./libs/database/src/entities/nominaEmpleado.entity.ts":
/*!*************************************************************!*\
  !*** ./libs/database/src/entities/nominaEmpleado.entity.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NominaEmpleado = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const periodoNomina_entity_1 = __webpack_require__(/*! ./periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
const rubroNomina_entity_1 = __webpack_require__(/*! ./rubroNomina.entity */ "./libs/database/src/entities/rubroNomina.entity.ts");
let NominaEmpleado = class NominaEmpleado extends base_entity_1.BaseEntity {
    totalIngresos;
    totalEgresos;
    netoAPagar;
    periodo;
    periodoId;
    empleado;
    empleadoId;
    rubros;
    static _OPENAPI_METADATA_FACTORY() {
        return { totalIngresos: { required: true, type: () => Number, description: "Suma total de todos los ingresos del empleado en este periodo.\nMapea: float totalIngresos \"Suma total ingresos\"" }, totalEgresos: { required: true, type: () => Number, description: "Suma total de todas las deducciones del empleado en este periodo.\nMapea: float totalEgresos \"Suma total deducciones\"" }, netoAPagar: { required: true, type: () => Number, description: "Monto neto a pagar (Ingresos - Egresos).\nMapea: float netoAPagar \"Monto neto pagar\"" }, periodo: { required: true, type: () => (__webpack_require__(/*! ./periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts").PeriodoNomina) }, periodoId: { required: true, type: () => String, description: "Mapea: string periodoId FK \"Periodo nomina pertenece\"" }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado), description: "Relaci\u00F3n: El rol de pago pertenece a UN Empleado.\nonDelete: 'CASCADE' = Si el Empleado es borrado, todo su\nhistorial de roles de pago se borra con \u00E9l." }, empleadoId: { required: true, type: () => String, description: "Mapea: string empleadoId FK \"Empleado recibe pago\"" }, rubros: { required: true, type: () => [(__webpack_require__(/*! ./rubroNomina.entity */ "./libs/database/src/entities/rubroNomina.entity.ts").RubroNomina)] } };
    }
};
exports.NominaEmpleado = NominaEmpleado;
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        comment: 'Suma total de ingresos (calculado de los rubros)',
        default: 0,
    }),
    __metadata("design:type", Number)
], NominaEmpleado.prototype, "totalIngresos", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        comment: 'Suma total de deducciones (calculado de los rubros)',
        default: 0,
    }),
    __metadata("design:type", Number)
], NominaEmpleado.prototype, "totalEgresos", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        comment: 'Monto neto a pagar (TotalIngresos - TotalEgresos)',
        default: 0,
    }),
    __metadata("design:type", Number)
], NominaEmpleado.prototype, "netoAPagar", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => periodoNomina_entity_1.PeriodoNomina, (periodo) => periodo.nominas, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'periodoId' }),
    __metadata("design:type", periodoNomina_entity_1.PeriodoNomina)
], NominaEmpleado.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Periodo de Nómina al que pertenece' }),
    __metadata("design:type", String)
], NominaEmpleado.prototype, "periodoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.nominas, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], NominaEmpleado.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado que recibe este pago' }),
    __metadata("design:type", String)
], NominaEmpleado.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rubroNomina_entity_1.RubroNomina, (rubro) => rubro.nominaEmpleado, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], NominaEmpleado.prototype, "rubros", void 0);
exports.NominaEmpleado = NominaEmpleado = __decorate([
    (0, typeorm_1.Entity)({ name: 'nominas_empleados' }),
    (0, typeorm_1.Index)(['periodoId']),
    (0, typeorm_1.Index)(['empleadoId']),
    (0, typeorm_1.Unique)(['periodoId', 'empleadoId'])
], NominaEmpleado);


/***/ }),

/***/ "./libs/database/src/entities/novedadNomina.entity.ts":
/*!************************************************************!*\
  !*** ./libs/database/src/entities/novedadNomina.entity.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NovedadNomina = exports.EstadoNovedad = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
const conceptoNomina_entity_1 = __webpack_require__(/*! ./conceptoNomina.entity */ "./libs/database/src/entities/conceptoNomina.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
var EstadoNovedad;
(function (EstadoNovedad) {
    EstadoNovedad["PENDIENTE"] = "Pendiente";
    EstadoNovedad["PROCESADA"] = "Procesada";
    EstadoNovedad["CANCELADA"] = "Cancelada";
})(EstadoNovedad || (exports.EstadoNovedad = EstadoNovedad = {}));
let NovedadNomina = class NovedadNomina extends base_entity_1.BaseEntity {
    valor;
    fecha;
    observacion;
    estado;
    empleado;
    empleadoId;
    concepto;
    conceptoId;
    empresa;
    empresaId;
    static _OPENAPI_METADATA_FACTORY() {
        return { valor: { required: true, type: () => Number }, fecha: { required: true, type: () => Date }, observacion: { required: true, type: () => String }, estado: { required: true, enum: (__webpack_require__(/*! ./novedadNomina.entity */ "./libs/database/src/entities/novedadNomina.entity.ts").EstadoNovedad) }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String }, concepto: { required: true, type: () => (__webpack_require__(/*! ./conceptoNomina.entity */ "./libs/database/src/entities/conceptoNomina.entity.ts").ConceptoNomina) }, conceptoId: { required: true, type: () => String }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String } };
    }
};
exports.NovedadNomina = NovedadNomina;
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, comment: 'Monetary value' }),
    __metadata("design:type", Number)
], NovedadNomina.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', comment: 'Date of occurrence' }),
    __metadata("design:type", Date)
], NovedadNomina.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], NovedadNomina.prototype, "observacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EstadoNovedad,
        default: EstadoNovedad.PENDIENTE
    }),
    __metadata("design:type", String)
], NovedadNomina.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], NovedadNomina.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NovedadNomina.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => conceptoNomina_entity_1.ConceptoNomina, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'conceptoId' }),
    __metadata("design:type", conceptoNomina_entity_1.ConceptoNomina)
], NovedadNomina.prototype, "concepto", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NovedadNomina.prototype, "conceptoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], NovedadNomina.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NovedadNomina.prototype, "empresaId", void 0);
exports.NovedadNomina = NovedadNomina = __decorate([
    (0, typeorm_1.Entity)({ name: 'novedades_nomina' }),
    (0, typeorm_1.Index)(['empresaId', 'estado'])
], NovedadNomina);


/***/ }),

/***/ "./libs/database/src/entities/objetivo.entity.ts":
/*!*******************************************************!*\
  !*** ./libs/database/src/entities/objetivo.entity.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Objetivo = exports.TipoObjetivo = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const cicloEvaluacion_entity_1 = __webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
const departamento_entity_1 = __webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts");
var TipoObjetivo;
(function (TipoObjetivo) {
    TipoObjetivo["PERSONAL"] = "PERSONAL";
    TipoObjetivo["DEPARTAMENTO"] = "DEPARTAMENTO";
    TipoObjetivo["EMPRESA"] = "EMPRESA";
})(TipoObjetivo || (exports.TipoObjetivo = TipoObjetivo = {}));
let Objetivo = class Objetivo extends base_entity_1.BaseEntity {
    descripcion;
    progreso;
    tipo;
    ciclo;
    cicloId;
    empleado;
    empleadoId;
    departamento;
    departamentoId;
    parentObjetivo;
    parentObjetivoId;
    subObjetivos;
    static _OPENAPI_METADATA_FACTORY() {
        return { descripcion: { required: true, type: () => String }, progreso: { required: true, type: () => Number }, tipo: { required: true, enum: (__webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").TipoObjetivo) }, ciclo: { required: true, type: () => (__webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").CicloEvaluacion) }, cicloId: { required: true, type: () => String }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String }, departamento: { required: true, type: () => (__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento) }, departamentoId: { required: true, type: () => String }, parentObjetivo: { required: true, type: () => (__webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo) }, parentObjetivoId: { required: true, type: () => String }, subObjetivos: { required: true, type: () => [(__webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo)] } };
    }
};
exports.Objetivo = Objetivo;
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        comment: 'Descripción del objetivo a medir',
    }),
    __metadata("design:type", String)
], Objetivo.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        default: 0,
        comment: 'Porcentaje de progreso (0-100)',
    }),
    __metadata("design:type", Number)
], Objetivo.prototype, "progreso", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: TipoObjetivo.PERSONAL,
        comment: 'Tipo de objetivo (PERSONAL, DEPARTAMENTO, EMPRESA)'
    }),
    __metadata("design:type", String)
], Objetivo.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cicloEvaluacion_entity_1.CicloEvaluacion, (ciclo) => ciclo.objetivos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'cicloId' }),
    __metadata("design:type", cicloEvaluacion_entity_1.CicloEvaluacion)
], Objetivo.prototype, "ciclo", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Ciclo de Evaluación' }),
    __metadata("design:type", String)
], Objetivo.prototype, "cicloId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.objetivos, {
        nullable: true,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Objetivo.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'ID del Empleado (si es personal)' }),
    __metadata("design:type", String)
], Objetivo.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departamento_entity_1.Departamento, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'departamentoId' }),
    __metadata("design:type", departamento_entity_1.Departamento)
], Objetivo.prototype, "departamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'ID del Departamento (si es grupal)' }),
    __metadata("design:type", String)
], Objetivo.prototype, "departamentoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Objetivo, (obj) => obj.subObjetivos, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'parentObjetivoId' }),
    __metadata("design:type", Objetivo)
], Objetivo.prototype, "parentObjetivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'ID de la Meta superior a la que contribuye' }),
    __metadata("design:type", String)
], Objetivo.prototype, "parentObjetivoId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Objetivo, (obj) => obj.parentObjetivo),
    __metadata("design:type", Array)
], Objetivo.prototype, "subObjetivos", void 0);
exports.Objetivo = Objetivo = __decorate([
    (0, typeorm_1.Entity)({ name: 'objetivos' }),
    (0, typeorm_1.Index)(['cicloId']),
    (0, typeorm_1.Index)(['empleadoId']),
    (0, typeorm_1.Index)(['departamentoId'])
], Objetivo);


/***/ }),

/***/ "./libs/database/src/entities/periodoNomina.entity.ts":
/*!************************************************************!*\
  !*** ./libs/database/src/entities/periodoNomina.entity.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PeriodoNomina = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const nominaEmpleado_entity_1 = __webpack_require__(/*! ./nominaEmpleado.entity */ "./libs/database/src/entities/nominaEmpleado.entity.ts");
let PeriodoNomina = class PeriodoNomina extends base_entity_1.BaseEntity {
    fechaInicio;
    fechaFin;
    estado;
    empresa;
    empresaId;
    nominas;
    static _OPENAPI_METADATA_FACTORY() {
        return { fechaInicio: { required: true, type: () => Date, description: "Fecha de inicio del periodo de pago\nMapea: date fechaInicio \"Inicio periodo pago\"" }, fechaFin: { required: true, type: () => Date, description: "Fecha de fin del periodo de pago\nMapea: date fechaFin \"Fin periodo pago\"" }, estado: { required: true, type: () => String, description: "Estado del procesamiento del periodo\nMapea: string estado \"Estado procesamiento\"" }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String, description: "Mapea: string empresaId FK \"Empresa periodo nomina\"" }, nominas: { required: true, type: () => [(__webpack_require__(/*! ./nominaEmpleado.entity */ "./libs/database/src/entities/nominaEmpleado.entity.ts").NominaEmpleado)] } };
    }
};
exports.PeriodoNomina = PeriodoNomina;
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de inicio del periodo de pago',
    }),
    __metadata("design:type", Date)
], PeriodoNomina.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de fin del periodo de pago',
    }),
    __metadata("design:type", Date)
], PeriodoNomina.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: 'Estado del procesamiento (Abierto, Procesando, Pagado)',
    }),
    __metadata("design:type", String)
], PeriodoNomina.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.periodosNomina, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], PeriodoNomina.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) que procesa este periodo' }),
    __metadata("design:type", String)
], PeriodoNomina.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nominaEmpleado_entity_1.NominaEmpleado, (nominaEmpleado) => nominaEmpleado.periodo),
    __metadata("design:type", Array)
], PeriodoNomina.prototype, "nominas", void 0);
exports.PeriodoNomina = PeriodoNomina = __decorate([
    (0, typeorm_1.Entity)({ name: 'periodos_nomina' }),
    (0, typeorm_1.Index)(['empresaId', 'estado'])
], PeriodoNomina);


/***/ }),

/***/ "./libs/database/src/entities/proyecto.entity.ts":
/*!*******************************************************!*\
  !*** ./libs/database/src/entities/proyecto.entity.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Proyecto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const sprint_entity_1 = __webpack_require__(/*! ./sprint.entity */ "./libs/database/src/entities/sprint.entity.ts");
const tarea_entity_1 = __webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Proyecto = class Proyecto extends base_entity_1.BaseEntity {
    nombre;
    descripcion;
    estado;
    empresa;
    empresaId;
    lider;
    liderId;
    sprints;
    tareas;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre del proyecto\nMapea: string nombre \"Nombre proyecto\"" }, descripcion: { required: true, type: () => String, description: "Descripci\u00F3n detallada del proyecto\nMapea: string descripcion \"Descripcion proyecto\"" }, estado: { required: true, type: () => String }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String, description: "Mapea: string empresaId FK \"Empresa propietaria proyecto\"" }, lider: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, liderId: { required: true, type: () => String }, sprints: { required: true, type: () => [(__webpack_require__(/*! ./sprint.entity */ "./libs/database/src/entities/sprint.entity.ts").Sprint)] }, tareas: { required: true, type: () => [(__webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts").Tarea)], description: "Relaci\u00F3n: Un Proyecto contiene muchas Tareas.\n'cascade: true' = Si se borra el Proyecto, sus Tareas se borran." } };
    }
};
exports.Proyecto = Proyecto;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre del proyecto',
    }),
    __metadata("design:type", String)
], Proyecto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Descripción detallada del proyecto',
    }),
    __metadata("design:type", String)
], Proyecto.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'ACTIVO',
        comment: 'Estado actual del proyecto',
    }),
    __metadata("design:type", String)
], Proyecto.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.proyectos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Proyecto.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) propietaria del proyecto' }),
    __metadata("design:type", String)
], Proyecto.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'liderId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Proyecto.prototype, "lider", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'ID del Empleado (opcional) que lidera el proyecto',
    }),
    __metadata("design:type", String)
], Proyecto.prototype, "liderId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sprint_entity_1.Sprint, (sprint) => sprint.proyecto, { cascade: true }),
    __metadata("design:type", Array)
], Proyecto.prototype, "sprints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tarea_entity_1.Tarea, (tarea) => tarea.proyecto, { cascade: true }),
    __metadata("design:type", Array)
], Proyecto.prototype, "tareas", void 0);
exports.Proyecto = Proyecto = __decorate([
    (0, typeorm_1.Entity)({ name: 'proyectos' }),
    (0, typeorm_1.Index)(['empresaId'])
], Proyecto);


/***/ }),

/***/ "./libs/database/src/entities/registroAsistencia.entity.ts":
/*!*****************************************************************!*\
  !*** ./libs/database/src/entities/registroAsistencia.entity.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegistroAsistencia = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let RegistroAsistencia = class RegistroAsistencia extends base_entity_1.BaseEntity {
    fecha;
    horaEntrada;
    horaSalida;
    totalHoras;
    estado;
    observaciones;
    empleado;
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { fecha: { required: true, type: () => Date, description: "Fecha de la jornada (YYYY-MM-DD).\nSirve para agrupar y buscar." }, horaEntrada: { required: true, type: () => Date, description: "Hora exacta de entrada (Check-In)." }, horaSalida: { required: true, type: () => Date, description: "Hora exacta de salida (Check-Out).\nEs nullable porque al entrar, a\u00FAn no ha salido." }, totalHoras: { required: true, type: () => Number, description: "Horas trabajadas calculadas (se llena al hacer Check-Out)." }, estado: { required: true, type: () => String, description: "Estado de la asistencia." }, observaciones: { required: true, type: () => String, description: "Observaciones (ej: \"Sal\u00ED temprano por cita m\u00E9dica\")." }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String } };
    }
};
exports.RegistroAsistencia = RegistroAsistencia;
__decorate([
    (0, typeorm_1.Column)({ type: 'date', comment: 'Fecha de la jornada laboral' }),
    __metadata("design:type", Date)
], RegistroAsistencia.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', comment: 'Hora de entrada' }),
    __metadata("design:type", Date)
], RegistroAsistencia.prototype, "horaEntrada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, comment: 'Hora de salida' }),
    __metadata("design:type", Date)
], RegistroAsistencia.prototype, "horaSalida", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: true,
        comment: 'Total de horas trabajadas en el día'
    }),
    __metadata("design:type", Number)
], RegistroAsistencia.prototype, "totalHoras", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: 'ABIERTO',
        comment: 'Estado (ABIERTO, CERRADO)'
    }),
    __metadata("design:type", String)
], RegistroAsistencia.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], RegistroAsistencia.prototype, "observaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.registrosAsistencia, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], RegistroAsistencia.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RegistroAsistencia.prototype, "empleadoId", void 0);
exports.RegistroAsistencia = RegistroAsistencia = __decorate([
    (0, typeorm_1.Entity)({ name: 'registros_asistencia' }),
    (0, typeorm_1.Index)(['empleadoId']),
    (0, typeorm_1.Index)(['fecha']),
    (0, typeorm_1.Unique)(['empleadoId', 'fecha'])
], RegistroAsistencia);


/***/ }),

/***/ "./libs/database/src/entities/reporteGasto.entity.ts":
/*!***********************************************************!*\
  !*** ./libs/database/src/entities/reporteGasto.entity.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReporteGasto = exports.EstadoReporte = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
const itemGasto_entity_1 = __webpack_require__(/*! ./itemGasto.entity */ "./libs/database/src/entities/itemGasto.entity.ts");
var EstadoReporte;
(function (EstadoReporte) {
    EstadoReporte["BORRADOR"] = "BORRADOR";
    EstadoReporte["PENDIENTE"] = "PENDIENTE";
    EstadoReporte["APROBADO"] = "APROBADO";
    EstadoReporte["RECHAZADO"] = "RECHAZADO";
    EstadoReporte["PAGADO"] = "PAGADO";
})(EstadoReporte || (exports.EstadoReporte = EstadoReporte = {}));
let ReporteGasto = class ReporteGasto extends base_entity_1.BaseEntity {
    nombre;
    descripcion;
    estado;
    total;
    fechaReporte;
    empleado;
    empleadoId;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, estado: { required: true, description: "Estado del reporte.", enum: (__webpack_require__(/*! ./reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").EstadoReporte) }, total: { required: true, type: () => Number, description: "Monto total calculado autom\u00E1ticamente." }, fechaReporte: { required: true, type: () => Date }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String }, items: { required: true, type: () => [(__webpack_require__(/*! ./itemGasto.entity */ "./libs/database/src/entities/itemGasto.entity.ts").ItemGasto)] } };
    }
};
exports.ReporteGasto = ReporteGasto;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre o título del reporte (Ej: Viaje a Quito)',
    }),
    __metadata("design:type", String)
], ReporteGasto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Descripción general del motivo del gasto',
    }),
    __metadata("design:type", String)
], ReporteGasto.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoReporte.BORRADOR,
        comment: 'Estado (BORRADOR, PENDIENTE, APROBADO...)',
    }),
    __metadata("design:type", String)
], ReporteGasto.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        default: 0,
        comment: 'Monto total de los gastos reportados',
    }),
    __metadata("design:type", Number)
], ReporteGasto.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        default: () => 'CURRENT_DATE',
        comment: 'Fecha de creación del reporte',
    }),
    __metadata("design:type", Date)
], ReporteGasto.prototype, "fechaReporte", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.reportesGastos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], ReporteGasto.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado que genera el reporte' }),
    __metadata("design:type", String)
], ReporteGasto.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => itemGasto_entity_1.ItemGasto, (item) => item.reporte, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], ReporteGasto.prototype, "items", void 0);
exports.ReporteGasto = ReporteGasto = __decorate([
    (0, typeorm_1.Entity)({ name: 'reportes_gasto' }),
    (0, typeorm_1.Index)(['empleadoId', 'estado'])
], ReporteGasto);


/***/ }),

/***/ "./libs/database/src/entities/rol.entity.ts":
/*!**************************************************!*\
  !*** ./libs/database/src/entities/rol.entity.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rol = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Rol = class Rol extends base_entity_1.BaseEntity {
    nombre;
    permisos;
    empresa;
    empresaId;
    empleados;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre del rol\nMapea: string nombre \"Nombre rol sistema\"" }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String, description: "Mapea: string empresaId FK \"Empresa propietaria rol\"" }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] } };
    }
};
exports.Rol = Rol;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        comment: 'Nombre del rol (Admin, Empleado, Manager)',
    }),
    __metadata("design:type", String)
], Rol.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        comment: 'Mapa de permisos RBAC (RNF7)',
    }),
    __metadata("design:type", Object)
], Rol.prototype, "permisos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.roles, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Rol.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) propietaria del rol' }),
    __metadata("design:type", String)
], Rol.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => empleado_entity_1.Empleado, (empleado) => empleado.rol),
    __metadata("design:type", Array)
], Rol.prototype, "empleados", void 0);
exports.Rol = Rol = __decorate([
    (0, typeorm_1.Entity)({ name: 'roles' }),
    (0, typeorm_1.Index)(['empresaId'])
], Rol);


/***/ }),

/***/ "./libs/database/src/entities/rubroNomina.entity.ts":
/*!**********************************************************!*\
  !*** ./libs/database/src/entities/rubroNomina.entity.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RubroNomina = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const nominaEmpleado_entity_1 = __webpack_require__(/*! ./nominaEmpleado.entity */ "./libs/database/src/entities/nominaEmpleado.entity.ts");
let RubroNomina = class RubroNomina extends base_entity_1.BaseEntity {
    tipo;
    concepto;
    valor;
    nominaEmpleado;
    nominaEmpleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { tipo: { required: true, type: () => String, description: "Tipo de rubro (Ingreso o Egreso)\nMapea: string tipo \"Tipo rubro ingreso egreso\"" }, concepto: { required: true, type: () => String, description: "Concepto o descripci\u00F3n del rubro\nMapea: string concepto \"Concepto descripcion rubro\"" }, valor: { required: true, type: () => Number, description: "Monto del rubro (positivo para ingresos, negativo para egresos)\nMapea: float valor \"Monto rubro\"" }, nominaEmpleado: { required: true, type: () => (__webpack_require__(/*! ./nominaEmpleado.entity */ "./libs/database/src/entities/nominaEmpleado.entity.ts").NominaEmpleado) }, nominaEmpleadoId: { required: true, type: () => String, description: "Mapea: string nominaEmpleadoId FK \"Nomina linea detalle\"" } };
    }
};
exports.RubroNomina = RubroNomina;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: 'Tipo de rubro (Ingreso, Egreso)',
    }),
    __metadata("design:type", String)
], RubroNomina.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Concepto/descripción del rubro (Salario Base, Aporte IESS)',
    }),
    __metadata("design:type", String)
], RubroNomina.prototype, "concepto", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        comment: 'Monto del rubro (positivo para Ingreso, negativo para Egreso)',
    }),
    __metadata("design:type", Number)
], RubroNomina.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => nominaEmpleado_entity_1.NominaEmpleado, (nomina) => nomina.rubros, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'nominaEmpleadoId' }),
    __metadata("design:type", nominaEmpleado_entity_1.NominaEmpleado)
], RubroNomina.prototype, "nominaEmpleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Nómina (rol de pago) a la que pertenece esta línea' }),
    __metadata("design:type", String)
], RubroNomina.prototype, "nominaEmpleadoId", void 0);
exports.RubroNomina = RubroNomina = __decorate([
    (0, typeorm_1.Entity)({ name: 'rubros_nomina' }),
    (0, typeorm_1.Index)(['nominaEmpleadoId'])
], RubroNomina);


/***/ }),

/***/ "./libs/database/src/entities/solicitudVacaciones.entity.ts":
/*!******************************************************************!*\
  !*** ./libs/database/src/entities/solicitudVacaciones.entity.ts ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SolicitudVacaciones = exports.EstadoSolicitud = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
var EstadoSolicitud;
(function (EstadoSolicitud) {
    EstadoSolicitud["PENDIENTE"] = "PENDIENTE";
    EstadoSolicitud["APROBADA"] = "APROBADA";
    EstadoSolicitud["RECHAZADA"] = "RECHAZADA";
})(EstadoSolicitud || (exports.EstadoSolicitud = EstadoSolicitud = {}));
let SolicitudVacaciones = class SolicitudVacaciones extends base_entity_1.BaseEntity {
    fechaInicio;
    fechaFin;
    diasSolicitados;
    estado;
    comentario;
    respuestaAdmin;
    empleado;
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { fechaInicio: { required: true, type: () => Date }, fechaFin: { required: true, type: () => Date }, diasSolicitados: { required: true, type: () => Number }, estado: { required: true, enum: (__webpack_require__(/*! ./solicitudVacaciones.entity */ "./libs/database/src/entities/solicitudVacaciones.entity.ts").EstadoSolicitud) }, comentario: { required: true, type: () => String }, respuestaAdmin: { required: true, type: () => String }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String } };
    }
};
exports.SolicitudVacaciones = SolicitudVacaciones;
__decorate([
    (0, typeorm_1.Column)({ type: 'date', comment: 'Fecha de inicio de las vacaciones' }),
    __metadata("design:type", Date)
], SolicitudVacaciones.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', comment: 'Fecha de fin de las vacaciones' }),
    __metadata("design:type", Date)
], SolicitudVacaciones.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', comment: 'Cantidad de días solicitados' }),
    __metadata("design:type", Number)
], SolicitudVacaciones.prototype, "diasSolicitados", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoSolicitud.PENDIENTE
    }),
    __metadata("design:type", String)
], SolicitudVacaciones.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: 'Motivo o comentario del empleado' }),
    __metadata("design:type", String)
], SolicitudVacaciones.prototype, "comentario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: 'Respuesta del aprobador' }),
    __metadata("design:type", String)
], SolicitudVacaciones.prototype, "respuestaAdmin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], SolicitudVacaciones.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SolicitudVacaciones.prototype, "empleadoId", void 0);
exports.SolicitudVacaciones = SolicitudVacaciones = __decorate([
    (0, typeorm_1.Entity)({ name: 'solicitudes_vacaciones' }),
    (0, typeorm_1.Index)(['empleadoId'])
], SolicitudVacaciones);


/***/ }),

/***/ "./libs/database/src/entities/sprint.entity.ts":
/*!*****************************************************!*\
  !*** ./libs/database/src/entities/sprint.entity.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sprint = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const proyecto_entity_1 = __webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts");
const tarea_entity_1 = __webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts");
let Sprint = class Sprint extends base_entity_1.BaseEntity {
    nombre;
    fechaInicio;
    fechaFin;
    proyecto;
    proyectoId;
    tareas;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre o identificador del sprint\nMapea: string nombre \"Nombre identificador sprint\"" }, fechaInicio: { required: true, type: () => Date, description: "Fecha de inicio del sprint\nMapea: date fechaInicio \"Inicio sprint\"" }, fechaFin: { required: true, type: () => Date, description: "Fecha de fin del sprint\nMapea: date fechaFin \"Fin sprint\"" }, proyecto: { required: true, type: () => (__webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts").Proyecto) }, proyectoId: { required: true, type: () => String, description: "Mapea: string proyectoId FK \"Proyecto padre sprint\"" }, tareas: { required: true, type: () => [(__webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts").Tarea)] } };
    }
};
exports.Sprint = Sprint;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre o identificador del sprint',
    }),
    __metadata("design:type", String)
], Sprint.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de inicio del sprint',
    }),
    __metadata("design:type", Date)
], Sprint.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de fin del sprint',
    }),
    __metadata("design:type", Date)
], Sprint.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyecto_entity_1.Proyecto, (proyecto) => proyecto.sprints, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'proyectoId' }),
    __metadata("design:type", proyecto_entity_1.Proyecto)
], Sprint.prototype, "proyecto", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Proyecto padre' }),
    __metadata("design:type", String)
], Sprint.prototype, "proyectoId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tarea_entity_1.Tarea, (tarea) => tarea.sprint, { onDelete: 'SET NULL' }),
    __metadata("design:type", Array)
], Sprint.prototype, "tareas", void 0);
exports.Sprint = Sprint = __decorate([
    (0, typeorm_1.Entity)({ name: 'sprints' }),
    (0, typeorm_1.Index)(['proyectoId'])
], Sprint);


/***/ }),

/***/ "./libs/database/src/entities/sucursal.entity.ts":
/*!*******************************************************!*\
  !*** ./libs/database/src/entities/sucursal.entity.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sucursal = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Sucursal = class Sucursal extends base_entity_1.BaseEntity {
    nombre;
    direccion;
    telefono;
    activa;
    empresa;
    empresaId;
    empleados;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, direccion: { required: true, type: () => String }, telefono: { required: true, type: () => String }, activa: { required: true, type: () => Boolean }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] } };
    }
};
exports.Sucursal = Sucursal;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, comment: 'Nombre de la sucursal (ej: Matriz Quito)' }),
    __metadata("design:type", String)
], Sucursal.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Sucursal.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Sucursal.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Sucursal.prototype, "activa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.sucursales, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Sucursal.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sucursal.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => empleado_entity_1.Empleado, (empleado) => empleado.sucursal),
    __metadata("design:type", Array)
], Sucursal.prototype, "empleados", void 0);
exports.Sucursal = Sucursal = __decorate([
    (0, typeorm_1.Entity)({ name: 'sucursales' }),
    (0, typeorm_1.Index)(['empresaId'])
], Sucursal);


/***/ }),

/***/ "./libs/database/src/entities/tarea.entity.ts":
/*!****************************************************!*\
  !*** ./libs/database/src/entities/tarea.entity.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tarea = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const proyecto_entity_1 = __webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts");
const sprint_entity_1 = __webpack_require__(/*! ./sprint.entity */ "./libs/database/src/entities/sprint.entity.ts");
const asignacionTarea_entity_1 = __webpack_require__(/*! ./asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts");
const timesheet_entity_1 = __webpack_require__(/*! ./timesheet.entity */ "./libs/database/src/entities/timesheet.entity.ts");
const objetivo_entity_1 = __webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts");
const create_tarea_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts");
let Tarea = class Tarea extends base_entity_1.BaseEntity {
    titulo;
    descripcion;
    puntosHistoria;
    estado;
    prioridad;
    proyecto;
    objetivo;
    objetivoId;
    proyectoId;
    sprint;
    sprintId;
    asignaciones;
    timesheets;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String, description: "T\u00EDtulo de la tarea\nMapea: string titulo \"Titulo tarea\"" }, descripcion: { required: true, type: () => String, description: "Descripci\u00F3n detallada de la tarea\nMapea: string descripcion \"Descripcion detallada tarea\"" }, puntosHistoria: { required: true, type: () => Number, description: "Puntos de historia (Estimaci\u00F3n de esfuerzo)\n\u00DAtil para metodolog\u00EDas \u00E1giles." }, estado: { required: true, description: "Estado actual de la tarea\nUsa el Enum: PENDIENTE, EN_PROGRESO, COMPLETADA", enum: (__webpack_require__(/*! ../../../../apps/productividad/src/dto/create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts").EstadoTarea) }, prioridad: { required: true, description: "Nivel de prioridad de la tarea\nUsa el Enum: BAJA, MEDIA, ALTA\nIMPORTANTE: Tipo 'varchar' porque el Enum tiene valores de texto.", enum: (__webpack_require__(/*! ../../../../apps/productividad/src/dto/create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts").PrioridadTarea) }, proyecto: { required: true, type: () => (__webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts").Proyecto) }, objetivo: { required: true, type: () => (__webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo) }, objetivoId: { required: true, type: () => String }, proyectoId: { required: true, type: () => String, description: "Mapea: string proyectoId FK \"Proyecto padre tarea\"" }, sprint: { required: true, type: () => (__webpack_require__(/*! ./sprint.entity */ "./libs/database/src/entities/sprint.entity.ts").Sprint), description: "Relaci\u00F3n: Una Tarea PUEDE pertenecer a UN Sprint (opcional).\nonDelete: 'SET NULL' = Si se borra el Sprint, la tarea vuelve al Backlog (sprintId = null)" }, sprintId: { required: true, type: () => String, description: "Mapea: string sprintId FK \"Sprint pertenece nullable\"" }, asignaciones: { required: true, type: () => [(__webpack_require__(/*! ./asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts").AsignacionTarea)] }, timesheets: { required: true, type: () => [(__webpack_require__(/*! ./timesheet.entity */ "./libs/database/src/entities/timesheet.entity.ts").Timesheet)], description: "Relaci\u00F3n: En una Tarea se pueden registrar muchas entradas de horas (Timesheets).\n'cascade: true' = Si se borra la Tarea, sus registros de horas se borran." } };
    }
};
exports.Tarea = Tarea;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Título de la tarea',
    }),
    __metadata("design:type", String)
], Tarea.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Descripción detallada de la tarea',
    }),
    __metadata("design:type", String)
], Tarea.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        default: 0,
        comment: 'Puntos de historia (Estimación)',
    }),
    __metadata("design:type", Number)
], Tarea.prototype, "puntosHistoria", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: create_tarea_dto_1.EstadoTarea.PENDIENTE,
        comment: 'Estado actual de la tarea',
    }),
    __metadata("design:type", String)
], Tarea.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: create_tarea_dto_1.PrioridadTarea.MEDIA,
        comment: 'Nivel de prioridad (BAJA, MEDIA, ALTA)',
    }),
    __metadata("design:type", String)
], Tarea.prototype, "prioridad", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyecto_entity_1.Proyecto, (proyecto) => proyecto.tareas, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'proyectoId' }),
    __metadata("design:type", proyecto_entity_1.Proyecto)
], Tarea.prototype, "proyecto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => objetivo_entity_1.Objetivo, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'objetivoId' }),
    __metadata("design:type", objetivo_entity_1.Objetivo)
], Tarea.prototype, "objetivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'Objetivo estratégico vinculado' }),
    __metadata("design:type", String)
], Tarea.prototype, "objetivoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Proyecto padre' }),
    __metadata("design:type", String)
], Tarea.prototype, "proyectoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sprint_entity_1.Sprint, (sprint) => sprint.tareas, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sprintId' }),
    __metadata("design:type", sprint_entity_1.Sprint)
], Tarea.prototype, "sprint", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        comment: 'ID del Sprint al que pertenece (opcional)',
    }),
    __metadata("design:type", String)
], Tarea.prototype, "sprintId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => asignacionTarea_entity_1.AsignacionTarea, (asignacion) => asignacion.tarea, { cascade: true }),
    __metadata("design:type", Array)
], Tarea.prototype, "asignaciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => timesheet_entity_1.Timesheet, (timesheet) => timesheet.tarea, { cascade: true }),
    __metadata("design:type", Array)
], Tarea.prototype, "timesheets", void 0);
exports.Tarea = Tarea = __decorate([
    (0, typeorm_1.Entity)({ name: 'tareas' }),
    (0, typeorm_1.Index)(['proyectoId']),
    (0, typeorm_1.Index)(['sprintId'])
], Tarea);


/***/ }),

/***/ "./libs/database/src/entities/timesheet.entity.ts":
/*!********************************************************!*\
  !*** ./libs/database/src/entities/timesheet.entity.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Timesheet = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
const tarea_entity_1 = __webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts");
let Timesheet = class Timesheet extends base_entity_1.BaseEntity {
    fecha;
    horas;
    empleado;
    empleadoId;
    tarea;
    tareaId;
    static _OPENAPI_METADATA_FACTORY() {
        return { fecha: { required: true, type: () => Date, description: "Fecha del registro de horas\nMapea: date fecha \"Fecha registro horas\"" }, horas: { required: true, type: () => Number, description: "Cantidad de horas trabajadas en esa fecha y tarea\nMapea: float horas \"Cantidad horas trabajadas\"" }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String, description: "Mapea: string empleadoId FK \"Empleado reporta tiempo\"" }, tarea: { required: true, type: () => (__webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts").Tarea), description: "Relaci\u00F3n: El registro de horas pertenece a UNA Tarea.\nonDelete: 'CASCADE' = Si la Tarea es borrada, sus registros\nde horas asociados tambi\u00E9n se borran." }, tareaId: { required: true, type: () => String, description: "Mapea: string tareaId FK \"Tarea trabajada\"" } };
    }
};
exports.Timesheet = Timesheet;
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha del registro de horas',
    }),
    __metadata("design:type", Date)
], Timesheet.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        comment: 'Cantidad de horas trabajadas',
    }),
    __metadata("design:type", Number)
], Timesheet.prototype, "horas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.timesheets, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Timesheet.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado que reporta el tiempo' }),
    __metadata("design:type", String)
], Timesheet.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tarea_entity_1.Tarea, (tarea) => tarea.timesheets, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'tareaId' }),
    __metadata("design:type", tarea_entity_1.Tarea)
], Timesheet.prototype, "tarea", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Tarea en la que se trabajó' }),
    __metadata("design:type", String)
], Timesheet.prototype, "tareaId", void 0);
exports.Timesheet = Timesheet = __decorate([
    (0, typeorm_1.Entity)({ name: 'timesheets' }),
    (0, typeorm_1.Index)(['empleadoId']),
    (0, typeorm_1.Index)(['tareaId'])
], Timesheet);


/***/ }),

/***/ "./libs/database/src/entities/usuario.entity.ts":
/*!******************************************************!*\
  !*** ./libs/database/src/entities/usuario.entity.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Usuario = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Usuario = class Usuario extends base_entity_1.BaseEntity {
    email;
    passwordHash;
    emailVerificado;
    twoFactorSecret;
    membresias;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, description: "Email de login, debe ser \u00FAnico en toda la plataforma.\nMapea: string email UK \"Email login unico global\"" }, passwordHash: { required: true, type: () => String, description: "Hash de la contrase\u00F1a (generado con bcrypt).\nMapea: string passwordHash \"Hash contrasena seguro\"\n\n@security 'select: false' es una medida de seguridad CR\u00CDTICA.\nEvita que la contrase\u00F1a hasheada sea enviada accidentalmente\nal frontend en consultas generales. (RNF7)" }, emailVerificado: { required: true, type: () => Boolean, description: "Estado de verificaci\u00F3n del email.\nMapea: boolean emailVerificado \"Estado verificacion email\"" }, twoFactorSecret: { required: true, type: () => String, description: "Secreto para la Autenticaci\u00F3n de Dos Factores (2FA) (RNF16).\nMapea: string twoFactorSecret \"Secret para 2FA\"\n\n@security 'select: false' por la misma raz\u00F3n que el passwordHash." }, membresias: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] } };
    }
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        unique: true,
        comment: 'Email de login, único globalmente',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        select: false,
        comment: 'Hash de la contraseña (bcrypt)',
    }),
    __metadata("design:type", String)
], Usuario.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        comment: 'Estado de verificación de email',
    }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "emailVerificado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
        select: false,
        comment: 'Secreto para 2FA (RNF16)',
    }),
    __metadata("design:type", String)
], Usuario.prototype, "twoFactorSecret", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => empleado_entity_1.Empleado, (empleado) => empleado.usuario),
    __metadata("design:type", Array)
], Usuario.prototype, "membresias", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)({ name: 'usuarios' })
], Usuario);


/***/ }),

/***/ "./libs/database/src/entities/vacante.entity.ts":
/*!******************************************************!*\
  !*** ./libs/database/src/entities/vacante.entity.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vacante = exports.EstadoVacante = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const departamento_entity_1 = __webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts");
const candidato_entity_1 = __webpack_require__(/*! ./candidato.entity */ "./libs/database/src/entities/candidato.entity.ts");
var EstadoVacante;
(function (EstadoVacante) {
    EstadoVacante["BORRADOR"] = "BORRADOR";
    EstadoVacante["PUBLICA"] = "PUBLICA";
    EstadoVacante["INTERNA"] = "INTERNA";
    EstadoVacante["CERRADA"] = "CERRADA";
})(EstadoVacante || (exports.EstadoVacante = EstadoVacante = {}));
let Vacante = class Vacante extends base_entity_1.BaseEntity {
    titulo;
    descripcion;
    requisitos;
    estado;
    ubicacion;
    salarioMin;
    salarioMax;
    fechaCierre;
    empresa;
    empresaId;
    departamento;
    departamentoId;
    candidatos;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, requisitos: { required: true, type: () => String }, estado: { required: true, enum: (__webpack_require__(/*! ./vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").EstadoVacante) }, ubicacion: { required: true, type: () => String }, salarioMin: { required: true, type: () => Number }, salarioMax: { required: true, type: () => Number }, fechaCierre: { required: true, type: () => Date }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, departamento: { required: true, type: () => (__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento), description: "Relaci\u00F3n con el Departamento (Marketing, TI, Ventas)." }, departamentoId: { required: true, type: () => String }, candidatos: { required: true, type: () => [(__webpack_require__(/*! ./candidato.entity */ "./libs/database/src/entities/candidato.entity.ts").Candidato)] } };
    }
};
exports.Vacante = Vacante;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Título del puesto (Ej: Desarrollador Senior)',
    }),
    __metadata("design:type", String)
], Vacante.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        comment: 'Descripción detallada de las responsabilidades',
    }),
    __metadata("design:type", String)
], Vacante.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Requisitos técnicos y habilidades blandas',
    }),
    __metadata("design:type", String)
], Vacante.prototype, "requisitos", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoVacante.BORRADOR,
        comment: 'Estado de la vacante (PUBLICA, BORRADOR...)',
    }),
    __metadata("design:type", String)
], Vacante.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
        comment: 'Ubicación (Ej: Remoto, Quito, Híbrido)',
    }),
    __metadata("design:type", String)
], Vacante.prototype, "ubicacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: true,
        comment: 'Salario mínimo ofrecido',
    }),
    __metadata("design:type", Number)
], Vacante.prototype, "salarioMin", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: true,
        comment: 'Salario máximo ofrecido',
    }),
    __metadata("design:type", Number)
], Vacante.prototype, "salarioMax", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
        comment: 'Fecha límite para postular',
    }),
    __metadata("design:type", Date)
], Vacante.prototype, "fechaCierre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.vacantes, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Vacante.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa' }),
    __metadata("design:type", String)
], Vacante.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departamento_entity_1.Departamento, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'departamentoId' }),
    __metadata("design:type", departamento_entity_1.Departamento)
], Vacante.prototype, "departamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'ID del Departamento solicitante' }),
    __metadata("design:type", String)
], Vacante.prototype, "departamentoId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => candidato_entity_1.Candidato, (candidato) => candidato.vacante, { cascade: true }),
    __metadata("design:type", Array)
], Vacante.prototype, "candidatos", void 0);
exports.Vacante = Vacante = __decorate([
    (0, typeorm_1.Entity)({ name: 'vacantes' }),
    (0, typeorm_1.Index)(['empresaId']),
    (0, typeorm_1.Index)(['estado'])
], Vacante);


/***/ }),

/***/ "./libs/database/src/index.ts":
/*!************************************!*\
  !*** ./libs/database/src/index.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./database.module */ "./libs/database/src/database.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./entities */ "./libs/database/src/entities/index.ts"), exports);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!****************************************!*\
  !*** ./apps/productividad/src/main.ts ***!
  \****************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const productividad_module_1 = __webpack_require__(/*! ./productividad.module */ "./apps/productividad/src/productividad.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(productividad_module_1.ProductividadModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PRODUCTIVIDAD_SERVICE_PORT') || 3004;
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: port,
        },
    });
    await app.startAllMicroservices();
    console.log(`🚀 Microservicio PRODUCTIVIDAD está escuchando en el puerto ${port}`);
}
bootstrap();

})();

/******/ })()
;