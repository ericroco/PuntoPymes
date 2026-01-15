/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/nomina/src/dto/create-concepto-nomina.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/nomina/src/dto/create-concepto-nomina.dto.ts ***!
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
exports.CreateConceptoNominaDto = exports.IndicadorNomina = exports.TipoRubroExtendido = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var TipoRubroExtendido;
(function (TipoRubroExtendido) {
    TipoRubroExtendido["INGRESO"] = "Ingreso";
    TipoRubroExtendido["EGRESO"] = "Egreso";
    TipoRubroExtendido["MONETARIO"] = "Monetario";
    TipoRubroExtendido["NO_MONETARIO"] = "No Monetario";
})(TipoRubroExtendido || (exports.TipoRubroExtendido = TipoRubroExtendido = {}));
var IndicadorNomina;
(function (IndicadorNomina) {
    IndicadorNomina["INGRESO"] = "Ingreso";
    IndicadorNomina["DESCUENTO"] = "Descuento";
})(IndicadorNomina || (exports.IndicadorNomina = IndicadorNomina = {}));
class CreateConceptoNominaDto {
    nombre;
    tipo;
    indicador;
    esRecurrente;
    esFijo;
    esAutomatico;
    descripcion;
    montoEstimado;
    formula;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, maxLength: 255 }, tipo: { required: true, enum: (__webpack_require__(/*! ./create-concepto-nomina.dto */ "./apps/nomina/src/dto/create-concepto-nomina.dto.ts").TipoRubroExtendido) }, indicador: { required: false, enum: (__webpack_require__(/*! ./create-concepto-nomina.dto */ "./apps/nomina/src/dto/create-concepto-nomina.dto.ts").IndicadorNomina) }, esRecurrente: { required: false, type: () => Boolean }, esFijo: { required: false, type: () => Boolean }, esAutomatico: { required: false, type: () => Boolean }, descripcion: { required: false, type: () => String, maxLength: 1000 }, montoEstimado: { required: false, type: () => Number, minimum: 1 }, formula: { required: false, type: () => String } };
    }
}
exports.CreateConceptoNominaDto = CreateConceptoNominaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateConceptoNominaDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TipoRubroExtendido),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConceptoNominaDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(IndicadorNomina),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConceptoNominaDto.prototype, "indicador", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateConceptoNominaDto.prototype, "esRecurrente", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateConceptoNominaDto.prototype, "esFijo", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateConceptoNominaDto.prototype, "esAutomatico", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateConceptoNominaDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateConceptoNominaDto.prototype, "montoEstimado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateConceptoNominaDto.prototype, "formula", void 0);


/***/ }),

/***/ "./apps/nomina/src/dto/create-contrato.dto.ts":
/*!****************************************************!*\
  !*** ./apps/nomina/src/dto/create-contrato.dto.ts ***!
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
exports.CreateContratoDto = exports.EstadoContrato = exports.TipoContrato = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var TipoContrato;
(function (TipoContrato) {
    TipoContrato["INDEFINIDO"] = "Indefinido";
    TipoContrato["PLAZO_FIJO"] = "Plazo Fijo";
    TipoContrato["SERVICIOS"] = "Servicios";
    TipoContrato["OBRA_LABOR"] = "Obra Labor";
})(TipoContrato || (exports.TipoContrato = TipoContrato = {}));
var EstadoContrato;
(function (EstadoContrato) {
    EstadoContrato["VIGENTE"] = "Vigente";
    EstadoContrato["FINALIZADO"] = "Finalizado";
    EstadoContrato["PENDIENTE"] = "Pendiente";
})(EstadoContrato || (exports.EstadoContrato = EstadoContrato = {}));
class CreateContratoDto {
    empleadoId;
    tipo;
    salario;
    moneda;
    fechaInicio;
    fechaFin;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { empleadoId: { required: true, type: () => String, format: "uuid" }, tipo: { required: true, enum: (__webpack_require__(/*! ./create-contrato.dto */ "./apps/nomina/src/dto/create-contrato.dto.ts").TipoContrato) }, salario: { required: true, type: () => Number, minimum: 1 }, moneda: { required: true, type: () => String }, fechaInicio: { required: true, type: () => Date }, fechaFin: { required: false, type: () => Date }, estado: { required: false, enum: (__webpack_require__(/*! ./create-contrato.dto */ "./apps/nomina/src/dto/create-contrato.dto.ts").EstadoContrato) } };
    }
}
exports.CreateContratoDto = CreateContratoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del empleado es requerido.' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "empleadoId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El tipo de contrato es requerido.' }),
    (0, class_validator_1.IsEnum)(TipoContrato),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'El salario debe ser un número.' }),
    (0, class_validator_1.IsPositive)({ message: 'El salario debe ser un número positivo.' }),
    __metadata("design:type", Number)
], CreateContratoDto.prototype, "salario", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "moneda", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de inicio debe ser una fecha válida.' }),
    __metadata("design:type", Date)
], CreateContratoDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de fin debe ser una fecha válida.' }),
    __metadata("design:type", Date)
], CreateContratoDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(EstadoContrato),
    __metadata("design:type", String)
], CreateContratoDto.prototype, "estado", void 0);


/***/ }),

/***/ "./apps/nomina/src/dto/create-periodo-nomina.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/nomina/src/dto/create-periodo-nomina.dto.ts ***!
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
exports.CreatePeriodoNominaDto = exports.EstadoPeriodo = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var EstadoPeriodo;
(function (EstadoPeriodo) {
    EstadoPeriodo["ABIERTO"] = "Abierto";
    EstadoPeriodo["CERRADO"] = "Cerrado";
    EstadoPeriodo["PROCESADO"] = "Procesado";
})(EstadoPeriodo || (exports.EstadoPeriodo = EstadoPeriodo = {}));
class CreatePeriodoNominaDto {
    fechaInicio;
    fechaFin;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { fechaInicio: { required: true, type: () => Date }, fechaFin: { required: true, type: () => Date }, estado: { required: false, enum: (__webpack_require__(/*! ./create-periodo-nomina.dto */ "./apps/nomina/src/dto/create-periodo-nomina.dto.ts").EstadoPeriodo) } };
    }
}
exports.CreatePeriodoNominaDto = CreatePeriodoNominaDto;
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de inicio debe ser una fecha válida.' }),
    __metadata("design:type", Date)
], CreatePeriodoNominaDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de fin debe ser una fecha válida.' }),
    __metadata("design:type", Date)
], CreatePeriodoNominaDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(EstadoPeriodo),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePeriodoNominaDto.prototype, "estado", void 0);


/***/ }),

/***/ "./apps/nomina/src/nomina.controller.ts":
/*!**********************************************!*\
  !*** ./apps/nomina/src/nomina.controller.ts ***!
  \**********************************************/
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
exports.NominaController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const nomina_service_1 = __webpack_require__(/*! ./nomina.service */ "./apps/nomina/src/nomina.service.ts");
let NominaController = class NominaController {
    nominaService;
    constructor(nominaService) {
        this.nominaService = nominaService;
    }
    getContratosByEmpleado(data) {
        console.log(`Microservicio NOMINA: Recibido get_contratos_by_empleado para: ${data.empleadoId}`);
        return this.nominaService.getContratosByEmpleado(data.empresaId, data.empleadoId);
    }
    createContrato(data) {
        console.log(`Microservicio NOMINA: Recibido create_contrato para empresa: ${data.empresaId}`);
        return this.nominaService.createContrato(data.empresaId, data.dto);
    }
    updateContrato(data) {
        console.log(`Microservicio NOMINA: Recibido update_contrato para contrato: ${data.contratoId}`);
        return this.nominaService.updateContrato(data.empresaId, data.contratoId, data.dto);
    }
    deleteContrato(data) {
        console.log(`Microservicio NOMINA: Recibido delete_contrato para contrato: ${data.contratoId}`);
        return this.nominaService.deleteContrato(data.empresaId, data.contratoId);
    }
    getBeneficios(data) {
        return this.nominaService.getBeneficios(data.empresaId);
    }
    createBeneficio(data) {
        return this.nominaService.createBeneficio(data.empresaId, data.dto);
    }
    updateBeneficio(data) {
        return this.nominaService.updateBeneficio(data.empresaId, data.beneficioId, data.dto);
    }
    deleteBeneficio(data) {
        return this.nominaService.deleteBeneficio(data.empresaId, data.beneficioId);
    }
    getPeriodosNomina(data) {
        return this.nominaService.getPeriodosNomina(data.empresaId);
    }
    createPeriodoNomina(data) {
        return this.nominaService.createPeriodoNomina(data.empresaId, data.dto);
    }
    updatePeriodoNomina(data) {
        return this.nominaService.updatePeriodoNomina(data.empresaId, data.periodoId, data.dto);
    }
    deletePeriodoNomina(data) {
        return this.nominaService.deletePeriodoNomina(data.empresaId, data.periodoId);
    }
    getConceptosNomina(data) {
        return this.nominaService.getConceptosNomina(data.empresaId);
    }
    createConceptoNomina(data) {
        return this.nominaService.createConceptoNomina(data.empresaId, data.dto);
    }
    updateConceptoNomina(data) {
        return this.nominaService.updateConceptoNomina(data.empresaId, data.conceptoId, data.dto);
    }
    deleteConceptoNomina(data) {
        return this.nominaService.deleteConceptoNomina(data.empresaId, data.conceptoId);
    }
    procesarNomina(data) {
        console.log(`Microservicio NOMINA: Recibido procesar_nomina para período: ${data.dto.periodoId}`);
        return this.nominaService.procesarNomina(data.empresaId, data.dto.periodoId);
    }
    crearSolicitud(data) {
        return this.nominaService.solicitarVacaciones(data.empresaId, data.dto);
    }
    getSolicitudes(data) {
        return this.nominaService.getSolicitudes(data.empresaId);
    }
    crearNovedad(data) {
        return this.nominaService.registrarNovedad(data);
    }
    obtenerNovedadesPorEmpleado(data) {
        return this.nominaService.obtenerNovedadesPorEmpleado(data.empleadoId);
    }
    getConfig(data) {
        return this.nominaService.obtenerConfiguracion(data.empresaId);
    }
    updateConfig(data) {
        return this.nominaService.actualizarConfiguracion(data.empresaId, data.config);
    }
    obtenerReporte(data) {
        return this.nominaService.obtenerReporteNomina(data.empresaId, data.periodoId);
    }
    getBeneficiosStats(data) {
        return this.nominaService.getBeneficiosStats(data.empresaId);
    }
    async getBeneficioById(data) {
        return this.nominaService.getBeneficioById(data.empresaId, data.id);
    }
    async getBeneficioAssignments(data) {
        return this.nominaService.getAssignments(data.empresaId, data.beneficioId);
    }
    async updateBeneficioAssignments(data) {
        return this.nominaService.updateAssignments(data.empresaId, data.beneficioId, data.employeeIds);
    }
    responderSolicitud(data) {
        return this.nominaService.responderSolicitud(data);
    }
    async getSaldoVacaciones(data) {
        return this.nominaService.consultarSaldo(data.empleadoId);
    }
};
exports.NominaController = NominaController;
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'get_contratos_by_empleado' (RF-20)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'get_contratos_by_empleado' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/contrato.entity */ "./libs/database/src/entities/contrato.entity.ts").Contrato)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "getContratosByEmpleado", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'create_contrato' (RF-20)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'create_contrato' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/contrato.entity */ "./libs/database/src/entities/contrato.entity.ts").Contrato) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "createContrato", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'update_contrato' (RF-20)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'update_contrato' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/contrato.entity */ "./libs/database/src/entities/contrato.entity.ts").Contrato) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "updateContrato", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'delete_contrato' (RF-20)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'delete_contrato' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "deleteContrato", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_beneficios' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").Beneficio)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "getBeneficios", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_beneficio' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").Beneficio) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "createBeneficio", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_beneficio' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").Beneficio) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "updateBeneficio", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_beneficio' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "deleteBeneficio", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_periodos_nomina' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts").PeriodoNomina)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "getPeriodosNomina", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_periodo_nomina' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts").PeriodoNomina) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "createPeriodoNomina", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_periodo_nomina' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts").PeriodoNomina) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "updatePeriodoNomina", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_periodo_nomina' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "deletePeriodoNomina", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_conceptos_nomina' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/conceptoNomina.entity */ "./libs/database/src/entities/conceptoNomina.entity.ts").ConceptoNomina)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "getConceptosNomina", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_concepto_nomina' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "createConceptoNomina", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_concepto_nomina' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "updateConceptoNomina", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_concepto_nomina' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "deleteConceptoNomina", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'procesar_nomina' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "procesarNomina", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'crear_solicitud_vacaciones' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/solicitudVacaciones.entity */ "./libs/database/src/entities/solicitudVacaciones.entity.ts").SolicitudVacaciones) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "crearSolicitud", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_solicitudes_vacaciones' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/solicitudVacaciones.entity */ "./libs/database/src/entities/solicitudVacaciones.entity.ts").SolicitudVacaciones)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "getSolicitudes", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'crear_novedad' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/novedadNomina.entity */ "./libs/database/src/entities/novedadNomina.entity.ts").NovedadNomina) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "crearNovedad", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'obtener_novedades_empleado' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/novedadNomina.entity */ "./libs/database/src/entities/novedadNomina.entity.ts").NovedadNomina)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "obtenerNovedadesPorEmpleado", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_configuracion_nomina' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "getConfig", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_configuracion_nomina' }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "updateConfig", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'obtener_reporte_nomina' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "obtenerReporte", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_beneficios_stats' }),
    openapi.ApiResponse({ status: 200, type: [Object] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "getBeneficiosStats", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_beneficio_by_id' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").Beneficio) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NominaController.prototype, "getBeneficioById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_beneficio_assignments' }),
    openapi.ApiResponse({ status: 200, type: [String] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NominaController.prototype, "getBeneficioAssignments", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_beneficio_assignments' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NominaController.prototype, "updateBeneficioAssignments", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'responder_solicitud_vacaciones' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/solicitudVacaciones.entity */ "./libs/database/src/entities/solicitudVacaciones.entity.ts").SolicitudVacaciones) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NominaController.prototype, "responderSolicitud", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_saldo_vacaciones' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NominaController.prototype, "getSaldoVacaciones", null);
exports.NominaController = NominaController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [nomina_service_1.NominaService])
], NominaController);


/***/ }),

/***/ "./apps/nomina/src/nomina.module.ts":
/*!******************************************!*\
  !*** ./apps/nomina/src/nomina.module.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NominaModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const database_1 = __webpack_require__(/*! default/database */ "./libs/database/src/index.ts");
const nomina_controller_1 = __webpack_require__(/*! ./nomina.controller */ "./apps/nomina/src/nomina.controller.ts");
const nomina_service_1 = __webpack_require__(/*! ./nomina.service */ "./apps/nomina/src/nomina.service.ts");
let NominaModule = class NominaModule {
};
exports.NominaModule = NominaModule;
exports.NominaModule = NominaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env',
            }),
            database_1.DatabaseModule,
            typeorm_1.TypeOrmModule.forFeature([
                database_1.Contrato,
                database_1.Empleado,
                database_1.Rol,
                database_1.Beneficio,
                database_1.BeneficioAsignado,
                database_1.PeriodoNomina,
                database_1.NominaEmpleado,
                database_1.RubroNomina,
                database_1.ConceptoNomina,
                database_1.SolicitudVacaciones,
                database_1.NovedadNomina,
                database_1.Empresa, database_1.SaldoVacaciones
            ]),
        ],
        controllers: [nomina_controller_1.NominaController],
        providers: [nomina_service_1.NominaService],
    })
], NominaModule);


/***/ }),

/***/ "./apps/nomina/src/nomina.service.ts":
/*!*******************************************!*\
  !*** ./apps/nomina/src/nomina.service.ts ***!
  \*******************************************/
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
exports.NominaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const database_1 = __webpack_require__(/*! default/database */ "./libs/database/src/index.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const create_contrato_dto_1 = __webpack_require__(/*! ./dto/create-contrato.dto */ "./apps/nomina/src/dto/create-contrato.dto.ts");
const create_periodo_nomina_dto_1 = __webpack_require__(/*! ./dto/create-periodo-nomina.dto */ "./apps/nomina/src/dto/create-periodo-nomina.dto.ts");
const create_concepto_nomina_dto_1 = __webpack_require__(/*! ./dto/create-concepto-nomina.dto */ "./apps/nomina/src/dto/create-concepto-nomina.dto.ts");
const conceptoNomina_entity_1 = __webpack_require__(/*! ../../../libs/database/src/entities/conceptoNomina.entity */ "./libs/database/src/entities/conceptoNomina.entity.ts");
let NominaService = class NominaService {
    contratoRepository;
    empleadoRepository;
    beneficioRepository;
    beneficioAsignadoRepository;
    periodoNominaRepository;
    nominaEmpleadoRepository;
    rubroNominaRepository;
    conceptoNominaRepository;
    entityManager;
    solicitudRepo;
    novedadNominaRepo;
    empresaRepository;
    saldoRepo;
    constructor(contratoRepository, empleadoRepository, beneficioRepository, beneficioAsignadoRepository, periodoNominaRepository, nominaEmpleadoRepository, rubroNominaRepository, conceptoNominaRepository, entityManager, solicitudRepo, novedadNominaRepo, empresaRepository, saldoRepo) {
        this.contratoRepository = contratoRepository;
        this.empleadoRepository = empleadoRepository;
        this.beneficioRepository = beneficioRepository;
        this.beneficioAsignadoRepository = beneficioAsignadoRepository;
        this.periodoNominaRepository = periodoNominaRepository;
        this.nominaEmpleadoRepository = nominaEmpleadoRepository;
        this.rubroNominaRepository = rubroNominaRepository;
        this.conceptoNominaRepository = conceptoNominaRepository;
        this.entityManager = entityManager;
        this.solicitudRepo = solicitudRepo;
        this.novedadNominaRepo = novedadNominaRepo;
        this.empresaRepository = empresaRepository;
        this.saldoRepo = saldoRepo;
    }
    async getContratosByEmpleado(empresaId, empleadoId) {
        console.log(`Microservicio NOMINA: Buscando contratos para empleado ${empleadoId}`);
        const empleado = await this.empleadoRepository.findOneBy({
            id: empleadoId,
            empresaId: empresaId,
        });
        if (!empleado) {
            throw new common_1.NotFoundException('Empleado no encontrado o no pertenece a esta empresa.');
        }
        return this.contratoRepository.find({
            where: { empleadoId: empleadoId },
            withDeleted: false,
            order: { fechaInicio: 'DESC' },
        });
    }
    async createContrato(empresaId, dto) {
        const empleado = await this.empleadoRepository.findOneBy({
            id: dto.empleadoId,
            empresaId: empresaId,
        });
        if (!empleado) {
            throw new common_1.BadRequestException('El empleadoId proporcionado no es válido o no pertenece a esta empresa.');
        }
        const estadoNuevo = dto.estado || create_contrato_dto_1.EstadoContrato.VIGENTE;
        if (estadoNuevo === create_contrato_dto_1.EstadoContrato.VIGENTE) {
            const contratoActivo = await this.contratoRepository.findOneBy({
                empleadoId: dto.empleadoId,
                estado: create_contrato_dto_1.EstadoContrato.VIGENTE,
            });
            if (contratoActivo) {
                throw new common_1.ConflictException('El empleado ya tiene un contrato "Vigente". No se puede crear otro.');
            }
        }
        const nuevoContrato = this.contratoRepository.create({
            ...dto,
            estado: estadoNuevo,
        });
        return this.contratoRepository.save(nuevoContrato);
    }
    async updateContrato(empresaId, contratoId, dto) {
        const contrato = await this.contratoRepository.findOne({
            where: { id: contratoId },
            relations: ['empleado'],
        });
        if (!contrato || contrato.empleado.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Contrato no encontrado o no pertenece a esta empresa.');
        }
        if (dto.estado === create_contrato_dto_1.EstadoContrato.VIGENTE) {
            const otroContratoVigente = await this.contratoRepository.findOneBy({
                empleadoId: contrato.empleadoId,
                estado: create_contrato_dto_1.EstadoContrato.VIGENTE,
                id: (0, typeorm_2.Not)(contratoId),
            });
            if (otroContratoVigente) {
                throw new common_1.ConflictException('No se puede activar este contrato. El empleado ya tiene OTRO contrato vigente.');
            }
        }
        const contratoActualizado = this.contratoRepository.merge(contrato, dto);
        return this.contratoRepository.save(contratoActualizado);
    }
    async deleteContrato(empresaId, contratoId) {
        const contrato = await this.contratoRepository.findOne({
            where: { id: contratoId },
            relations: ['empleado'],
        });
        if (!contrato || contrato.empleado.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Contrato no encontrado o no pertenece a esta empresa.');
        }
        if (contrato.estado === create_contrato_dto_1.EstadoContrato.VIGENTE) {
            throw new common_1.BadRequestException('No se puede borrar un contrato "Vigente". Use la función "Desvincular Empleado" en el módulo de personal para finalizarlo.');
        }
        await this.contratoRepository.softRemove(contrato);
        return { message: 'Contrato eliminado (desactivado) correctamente.' };
    }
    async getBeneficios(empresaId) {
        console.log(`Microservicio NOMINA: Buscando beneficios para empresaId: ${empresaId}`);
        return this.beneficioRepository.find({
            where: { empresaId: empresaId },
            withDeleted: false,
        });
    }
    async createBeneficio(empresaId, dto) {
        const beneficioExistente = await this.beneficioRepository.findOneBy({
            nombre: dto.nombre,
            empresaId: empresaId,
        });
        if (beneficioExistente) {
            throw new common_1.ConflictException('Ya existe un beneficio con ese nombre en esta empresa.');
        }
        const nuevoBeneficio = this.beneficioRepository.create({
            ...dto,
            empresaId: empresaId,
        });
        return this.beneficioRepository.save(nuevoBeneficio);
    }
    async updateBeneficio(empresaId, beneficioId, dto) {
        const beneficio = await this.beneficioRepository.findOneBy({
            id: beneficioId,
            empresaId: empresaId,
        });
        if (!beneficio) {
            throw new common_1.NotFoundException('Beneficio no encontrado o no pertenece a esta empresa.');
        }
        if (dto.nombre && dto.nombre !== beneficio.nombre) {
            const beneficioExistente = await this.beneficioRepository.findOneBy({
                nombre: dto.nombre,
                empresaId: empresaId,
                id: (0, typeorm_2.Not)(beneficioId),
            });
            if (beneficioExistente) {
                throw new common_1.ConflictException('Ya existe un beneficio con ese nombre en esta empresa.');
            }
        }
        const beneficioActualizado = this.beneficioRepository.merge(beneficio, dto);
        return this.beneficioRepository.save(beneficioActualizado);
    }
    async deleteBeneficio(empresaId, beneficioId) {
        const beneficio = await this.beneficioRepository.findOneBy({
            id: beneficioId,
            empresaId: empresaId,
        });
        if (!beneficio) {
            throw new common_1.NotFoundException('Beneficio no encontrado o no pertenece a esta empresa.');
        }
        const asignaciones = await this.beneficioAsignadoRepository.count({
            where: { beneficioId: beneficioId },
        });
        if (asignaciones > 0) {
            throw new common_1.ConflictException(`No se puede eliminar. Este beneficio está asignado a ${asignaciones} empleado(s).`);
        }
        await this.beneficioRepository.softRemove(beneficio);
        return { message: 'Beneficio eliminado correctamente.' };
    }
    async getBeneficiosStats(empresaId) {
        const beneficios = await this.beneficioRepository.find({
            where: {
                empresaId,
                esRecurrente: true
            }
        });
        const totalEmpleados = await this.empleadoRepository.count({
            where: { empresaId, estado: 'Activo' }
        });
        const stats = await Promise.all(beneficios.map(async (beneficio) => {
            const count = await this.beneficioAsignadoRepository.count({
                where: { beneficioId: beneficio.id }
            });
            return {
                id: beneficio.id,
                nombre: beneficio.nombre,
                tipo: beneficio.indicador,
                assignedCount: count,
                totalEmployees: totalEmpleados
            };
        }));
        return stats;
    }
    async getPeriodosNomina(empresaId) {
        return this.periodoNominaRepository.find({
            where: { empresaId: empresaId },
            withDeleted: false,
            order: { fechaInicio: 'DESC' },
        });
    }
    async createPeriodoNomina(empresaId, dto) {
        const overlap = await this.periodoNominaRepository.findOne({
            where: {
                empresaId: empresaId,
                fechaInicio: (0, typeorm_2.LessThanOrEqual)(dto.fechaFin),
                fechaFin: (0, typeorm_2.MoreThanOrEqual)(dto.fechaInicio),
            },
        });
        if (overlap) {
            throw new common_1.ConflictException('Las fechas de este período se superponen con un período existente.');
        }
        const nuevoPeriodo = this.periodoNominaRepository.create({
            ...dto,
            empresaId: empresaId,
            estado: dto.estado || create_periodo_nomina_dto_1.EstadoPeriodo.ABIERTO,
        });
        return this.periodoNominaRepository.save(nuevoPeriodo);
    }
    async updatePeriodoNomina(empresaId, periodoId, dto) {
        const periodo = await this.periodoNominaRepository.findOneBy({
            id: periodoId,
            empresaId: empresaId,
        });
        if (!periodo) {
            throw new common_1.NotFoundException('Período no encontrado o no pertenece a esta empresa.');
        }
        if (dto.fechaInicio || dto.fechaFin) {
            const fechaInicioValidar = dto.fechaInicio || periodo.fechaInicio;
            const fechaFinValidar = dto.fechaFin || periodo.fechaFin;
            const overlap = await this.periodoNominaRepository.findOne({
                where: {
                    empresaId: empresaId,
                    fechaInicio: (0, typeorm_2.LessThanOrEqual)(fechaFinValidar),
                    fechaFin: (0, typeorm_2.MoreThanOrEqual)(fechaInicioValidar),
                    id: (0, typeorm_2.Not)(periodoId),
                },
            });
            if (overlap) {
                throw new common_1.ConflictException('Las nuevas fechas de este período se superponen con un período existente.');
            }
        }
        const periodoActualizado = this.periodoNominaRepository.merge(periodo, dto);
        return this.periodoNominaRepository.save(periodoActualizado);
    }
    async deletePeriodoNomina(empresaId, periodoId) {
        const periodo = await this.periodoNominaRepository.findOneBy({
            id: periodoId,
            empresaId: empresaId,
        });
        if (!periodo) {
            throw new common_1.NotFoundException('Período no encontrado o no pertenece a esta empresa.');
        }
        if (periodo.estado === create_periodo_nomina_dto_1.EstadoPeriodo.PROCESADO) {
            throw new common_1.ConflictException('No se puede eliminar un período que ya ha sido procesado.');
        }
        const nominasGeneradas = await this.nominaEmpleadoRepository.count({
            where: { periodoId: periodoId },
        });
        if (nominasGeneradas > 0) {
            throw new common_1.ConflictException(`No se puede eliminar. Este período tiene ${nominasGeneradas} nóminas de empleados asociadas.`);
        }
        await this.periodoNominaRepository.softRemove(periodo);
        return { message: 'Período de nómina eliminado correctamente.' };
    }
    async getConceptosNomina(empresaId) {
        return this.conceptoNominaRepository.find({
            where: { empresaId: empresaId },
            withDeleted: false,
            order: { tipo: 'ASC', nombre: 'ASC' },
        });
    }
    async createConceptoNomina(empresaId, dto) {
        const esRecurrente = dto.esRecurrente || dto.esFijo;
        const esBeneficioAsignable = esRecurrente && !dto.esAutomatico;
        if (esBeneficioAsignable) {
            console.log('🔀 Guardando como BENEFICIO ASIGNABLE...');
            const nuevoBeneficio = this.beneficioRepository.create({
                empresaId: empresaId,
                nombre: dto.nombre,
                descripcion: 'Creado desde configuración',
                tipo: database_1.TipoBeneficio.MONETARIO,
                indicador: dto.indicador || database_1.IndicadorNomina.INGRESO,
                esRecurrente: true,
                montoEstimado: dto.montoEstimado ?? 0
            });
            return this.beneficioRepository.save(nuevoBeneficio);
        }
        console.log('🔀 Guardando como CONCEPTO GLOBAL...');
        let tipoRubro = conceptoNomina_entity_1.TipoRubro.INGRESO;
        if (dto.indicador === database_1.IndicadorNomina.DESCUENTO ||
            dto.tipo === create_concepto_nomina_dto_1.TipoRubroExtendido.EGRESO ||
            dto.tipo?.toString() === 'Egreso') {
            tipoRubro = conceptoNomina_entity_1.TipoRubro.EGRESO;
        }
        const nuevoConcepto = this.conceptoNominaRepository.create({
            empresaId: empresaId,
            nombre: dto.nombre,
            tipo: tipoRubro,
            esFijo: dto.esRecurrente || dto.esFijo || false,
            esAutomatico: dto.esAutomatico || false,
            montoEstimado: dto.montoEstimado ?? undefined,
            formula: dto.formula ?? undefined
        });
        return this.conceptoNominaRepository.save(nuevoConcepto);
    }
    async updateConceptoNomina(empresaId, id, dto) {
        const concepto = await this.conceptoNominaRepository.findOneBy({ id, empresaId });
        if (concepto) {
            console.log('🔄 Actualizando CONCEPTO NOMINA...');
            if (dto.nombre && dto.nombre !== concepto.nombre) {
                const existe = await this.conceptoNominaRepository.findOneBy({
                    nombre: dto.nombre, empresaId, id: (0, typeorm_2.Not)(id)
                });
                if (existe)
                    throw new common_1.ConflictException('Ya existe un concepto con ese nombre.');
                concepto.nombre = dto.nombre;
            }
            if (dto.indicador || dto.tipo) {
                const esEgreso = dto.indicador === database_1.IndicadorNomina.DESCUENTO ||
                    dto.tipo === 'Egreso' ||
                    dto.tipo === conceptoNomina_entity_1.TipoRubro.EGRESO;
                concepto.tipo = esEgreso ? conceptoNomina_entity_1.TipoRubro.EGRESO : conceptoNomina_entity_1.TipoRubro.INGRESO;
            }
            if (dto.esRecurrente !== undefined)
                concepto.esFijo = dto.esRecurrente;
            if (dto.esAutomatico !== undefined)
                concepto.esAutomatico = dto.esAutomatico;
            if (dto.montoEstimado !== undefined)
                concepto.montoEstimado = dto.montoEstimado;
            if (dto.formula !== undefined)
                concepto.formula = dto.formula;
            return this.conceptoNominaRepository.save(concepto);
        }
        const beneficio = await this.beneficioRepository.findOneBy({ id, empresaId });
        if (beneficio) {
            console.log('🔄 Actualizando BENEFICIO...');
            if (dto.nombre && dto.nombre !== beneficio.nombre) {
                const existe = await this.beneficioRepository.findOneBy({
                    nombre: dto.nombre, empresaId, id: (0, typeorm_2.Not)(id)
                });
                if (existe)
                    throw new common_1.ConflictException('Ya existe un beneficio con ese nombre.');
                beneficio.nombre = dto.nombre;
            }
            if (dto.indicador) {
                beneficio.indicador = dto.indicador;
            }
            else if (dto.tipo) {
                beneficio.indicador = (dto.tipo === 'Egreso' || dto.tipo === conceptoNomina_entity_1.TipoRubro.EGRESO)
                    ? database_1.IndicadorNomina.DESCUENTO
                    : database_1.IndicadorNomina.INGRESO;
            }
            if (dto.descripcion !== undefined)
                beneficio.descripcion = dto.descripcion;
            if (dto.esRecurrente !== undefined)
                beneficio.esRecurrente = dto.esRecurrente;
            if (dto.montoEstimado !== undefined)
                beneficio.montoEstimado = dto.montoEstimado;
            return this.beneficioRepository.save(beneficio);
        }
        throw new common_1.NotFoundException('El concepto o beneficio no fue encontrado.');
    }
    async deleteConceptoNomina(empresaId, conceptoId) {
        const concepto = await this.conceptoNominaRepository.findOneBy({
            id: conceptoId,
            empresaId: empresaId,
        });
        if (!concepto) {
            throw new common_1.NotFoundException('Concepto no encontrado o no pertenece a esta empresa.');
        }
        const query = this.rubroNominaRepository
            .createQueryBuilder('rubro')
            .innerJoin('rubro.nominaEmpleado', 'nominaEmpleado')
            .innerJoin('nominaEmpleado.empleado', 'empleado')
            .where('empleado.empresaId = :empresaId', { empresaId })
            .andWhere('rubro.concepto = :concepto', { concepto: concepto.nombre });
        const usos = await query.getCount();
        if (usos > 0) {
            throw new common_1.ConflictException(`No se puede eliminar. Este concepto ya ha sido utilizado en ${usos} nóminas procesadas.`);
        }
        await this.conceptoNominaRepository.softRemove(concepto);
        return { message: 'Concepto de nómina eliminado correctamente.' };
    }
    async obtenerNovedadesPorEmpleado(empleadoId) {
        return this.novedadNominaRepo.find({
            where: { empleadoId },
            relations: ['concepto'],
            order: { fecha: 'DESC' }
        });
    }
    async procesarNomina(empresaId, periodoId) {
        return this.entityManager.transaction('SERIALIZABLE', async (manager) => {
            console.log('🔄 INICIANDO PROCESO DE NÓMINA - PERIODO:', periodoId);
            const periodo = await manager.findOneBy(database_1.PeriodoNomina, { id: periodoId, empresaId });
            if (!periodo || periodo.estado !== create_periodo_nomina_dto_1.EstadoPeriodo.ABIERTO) {
                throw new common_1.ConflictException('Período cerrado o no válido.');
            }
            const rubrosAutomaticos = await manager.find(database_1.Beneficio, {
                where: { empresaId, esAutomatico: true }
            });
            const contratos = await manager.find(database_1.Contrato, {
                where: { estado: 'Vigente', empleado: { empresaId } },
                relations: ['empleado']
            });
            for (const contrato of contratos) {
                const emp = contrato.empleado;
                const salarioBase = Number(contrato.salario) || 0;
                console.log(`\n👤 Procesando: ${emp.nombre} ${emp.apellido} | Base: $${salarioBase}`);
                let totalIngresos = 0;
                let totalEgresos = 0;
                const rolPago = manager.create(database_1.NominaEmpleado, {
                    empleadoId: emp.id,
                    periodoId: periodo.id,
                    fechaGeneracion: new Date()
                });
                await manager.save(rolPago);
                const rubroSalario = manager.create(database_1.RubroNomina, {
                    nominaEmpleadoId: rolPago.id,
                    tipo: 'Ingreso',
                    concepto: 'Salario Base',
                    valor: salarioBase
                });
                await manager.save(rubroSalario);
                totalIngresos += salarioBase;
                for (const auto of rubrosAutomaticos) {
                    if (auto.montoEstimado && auto.montoEstimado > 0) {
                        const valorCalculado = salarioBase * Number(auto.montoEstimado);
                        const rubroAuto = manager.create(database_1.RubroNomina, {
                            nominaEmpleadoId: rolPago.id,
                            tipo: auto.indicador === 'Ingreso' ? 'Ingreso' : 'Egreso',
                            concepto: auto.nombre,
                            valor: Number(valorCalculado.toFixed(2))
                        });
                        await manager.save(rubroAuto);
                        if (rubroAuto.tipo === 'Ingreso')
                            totalIngresos += rubroAuto.valor;
                        else
                            totalEgresos += rubroAuto.valor;
                    }
                }
                const asignaciones = await manager.find(database_1.BeneficioAsignado, {
                    where: { empleadoId: emp.id, activo: true },
                    relations: ['beneficio']
                });
                for (const asignacion of asignaciones) {
                    const ben = asignacion.beneficio;
                    const valor = Number(asignacion.montoPersonalizado || ben.montoEstimado || 0);
                    if (valor > 0) {
                        const rubroRecurrente = manager.create(database_1.RubroNomina, {
                            nominaEmpleadoId: rolPago.id,
                            tipo: ben.indicador === 'Ingreso' ? 'Ingreso' : 'Egreso',
                            concepto: ben.nombre,
                            valor: Number(valor.toFixed(2))
                        });
                        await manager.save(rubroRecurrente);
                        if (rubroRecurrente.tipo === 'Ingreso')
                            totalIngresos += rubroRecurrente.valor;
                        else
                            totalEgresos += rubroRecurrente.valor;
                    }
                }
                rolPago.totalIngresos = Number(totalIngresos.toFixed(2));
                rolPago.totalEgresos = Number(totalEgresos.toFixed(2));
                rolPago.netoAPagar = Number((totalIngresos - totalEgresos).toFixed(2));
                await manager.save(rolPago);
            }
            periodo.estado = create_periodo_nomina_dto_1.EstadoPeriodo.PROCESADO;
            await manager.save(periodo);
            return { message: 'Nómina procesada correctamente', count: contratos.length };
        });
    }
    async solicitarVacaciones(empresaId, dto) {
        const empleado = await this.empleadoRepository.findOne({
            where: { id: dto.empleadoId, empresaId },
            relations: ['empresa']
        });
        if (!empleado)
            throw new common_1.NotFoundException('Empleado no válido.');
        const inicio = new Date(dto.fechaInicio);
        const fin = new Date(dto.fechaFin);
        if (fin < inicio)
            throw new common_1.BadRequestException('La fecha fin debe ser posterior al inicio.');
        const diasSolicitados = this.calcularDiasHabiles(inicio, fin);
        if (diasSolicitados <= 0)
            throw new common_1.BadRequestException('Debes seleccionar al menos un día hábil.');
        const anioActual = inicio.getFullYear();
        let saldo = await this.saldoRepo.findOneBy({
            empleadoId: dto.empleadoId,
            anio: anioActual
        });
        if (!saldo) {
            const diasPolitica = empleado.empresa?.configuracion?.vacaciones?.diasPorAnio || 15;
            saldo = this.saldoRepo.create({
                empleadoId: dto.empleadoId,
                anio: anioActual,
                diasTotales: diasPolitica,
                diasUsados: 0
            });
            await this.saldoRepo.save(saldo);
        }
        const diasDisponibles = saldo.diasTotales - saldo.diasUsados;
        if (diasDisponibles < diasSolicitados) {
            throw new common_1.BadRequestException(`Saldo insuficiente. Tienes ${diasDisponibles} días disponibles y solicitaste ${diasSolicitados}.`);
        }
        const solicitud = this.solicitudRepo.create({
            empleadoId: dto.empleadoId,
            fechaInicio: inicio,
            fechaFin: fin,
            diasSolicitados,
            comentario: dto.comentario,
            estado: database_1.EstadoSolicitud.PENDIENTE
        });
        return this.solicitudRepo.save(solicitud);
    }
    async getSolicitudes(empresaId) {
        return this.solicitudRepo.find({
            where: { empleado: { empresaId } },
            relations: ['empleado'],
            order: { createdAt: 'DESC' }
        });
    }
    async registrarNovedad(data) {
        console.log('💰 Registering novelty:', data);
        let conceptoId = data.conceptoId;
        if (!conceptoId && data.concepto) {
            const concepto = await this.conceptoNominaRepository.findOne({
                where: { nombre: data.concepto, empresaId: data.empresaId }
            });
            if (concepto)
                conceptoId = concepto.id;
        }
        const nuevaNovedad = this.novedadNominaRepo.create({
            empleadoId: data.empleadoId,
            conceptoId: conceptoId,
            valor: data.monto,
            fecha: new Date(data.fecha),
            observacion: data.observacion,
            estado: database_1.EstadoNovedad.PENDIENTE,
            empresaId: data.empresaId
        });
        return this.novedadNominaRepo.save(nuevaNovedad);
    }
    async obtenerConfiguracion(empresaId) {
        const empresa = await this.empresaRepository.findOne({
            where: { id: empresaId },
            select: ['configuracion']
        });
        return empresa?.configuracion?.nomina || { frecuenciaPago: 'mensual', multiplicadorHorasExtra: 1.5 };
    }
    async actualizarConfiguracion(empresaId, datosNomina) {
        const empresa = await this.empresaRepository.findOneBy({ id: empresaId });
        if (!empresa)
            throw new common_1.NotFoundException('Empresa no encontrada');
        if (!empresa.configuracion)
            empresa.configuracion = {};
        empresa.configuracion.nomina = {
            ...empresa.configuracion.nomina,
            ...datosNomina
        };
        await this.empresaRepository.save(empresa);
        return empresa.configuracion.nomina;
    }
    async obtenerReporteNomina(empresaId, periodoId) {
        const nominas = await this.entityManager.find(database_1.NominaEmpleado, {
            where: {
                periodoId: periodoId,
                empleado: { empresaId: empresaId }
            },
            relations: ['empleado', 'empleado.cargo', 'rubros'],
            order: { empleado: { apellido: 'ASC' } }
        });
        return nominas.map(n => {
            const ingresos = n.rubros.filter(r => r.tipo === 'Ingreso');
            const egresos = n.rubros.filter(r => r.tipo === 'Egreso');
            return {
                id: n.id,
                empleado: {
                    nombre: n.empleado.nombre,
                    apellido: n.empleado.apellido,
                    cedula: n.empleado.nroIdentificacion || 'S/N',
                    cargo: n.empleado.cargo?.nombre || 'General'
                },
                totales: {
                    ingresos: n.totalIngresos,
                    egresos: n.totalEgresos,
                    neto: n.netoAPagar
                },
                detalles: {
                    ingresos: ingresos.map(i => ({ concepto: i.concepto, valor: i.valor })),
                    egresos: egresos.map(e => ({ concepto: e.concepto, valor: e.valor }))
                }
            };
        });
    }
    async getUnifiedCatalog(empresaId) {
        const conceptos = await this.conceptoNominaRepository.find({ where: { empresaId } });
        const beneficios = await this.beneficioRepository.find({ where: { empresaId } });
        const unificados = [
            ...conceptos.map(c => ({
                id: c.id,
                nombre: c.nombre,
                tipo: c.tipo,
                esFijo: c.esAutomatico,
                origen: 'concepto',
                formula: c.montoEstimado ? `${c.montoEstimado * 100}%` : null
            })),
            ...beneficios.map(b => ({
                id: b.id,
                nombre: b.nombre,
                tipo: b.indicador === 'Descuento' ? 'Egreso' : 'Ingreso',
                esFijo: true,
                origen: 'beneficio',
                formula: b.montoEstimado ? `$${b.montoEstimado}` : null
            }))
        ];
        return unificados;
    }
    async getBeneficioById(empresaId, id) {
        const beneficio = await this.beneficioRepository.findOneBy({ id, empresaId });
        if (!beneficio)
            throw new common_1.NotFoundException('Beneficio no encontrado');
        return beneficio;
    }
    async getAssignments(empresaId, beneficioId) {
        const beneficio = await this.beneficioRepository.findOneBy({ id: beneficioId, empresaId });
        if (!beneficio)
            throw new common_1.NotFoundException('Beneficio no encontrado');
        const assignments = await this.beneficioAsignadoRepository.find({
            where: { beneficioId, activo: true },
            select: ['empleadoId']
        });
        return assignments.map(a => a.empleadoId);
    }
    async updateAssignments(empresaId, beneficioId, employeeIds) {
        return this.entityManager.transaction(async (manager) => {
            const beneficio = await manager.findOne(database_1.Beneficio, { where: { id: beneficioId, empresaId } });
            if (!beneficio)
                throw new common_1.NotFoundException('Beneficio no válido');
            const currentAssignments = await manager.find(database_1.BeneficioAsignado, {
                where: { beneficioId }
            });
            const newIdsSet = new Set(employeeIds);
            for (const assignment of currentAssignments) {
                if (newIdsSet.has(assignment.empleadoId)) {
                    if (!assignment.activo) {
                        assignment.activo = true;
                        await manager.save(assignment);
                    }
                    newIdsSet.delete(assignment.empleadoId);
                }
                else {
                    if (assignment.activo) {
                        assignment.activo = false;
                        await manager.save(assignment);
                    }
                }
            }
            for (const newId of newIdsSet) {
                const newAssignment = manager.create(database_1.BeneficioAsignado, {
                    beneficioId,
                    empleadoId: newId,
                    activo: true,
                });
                await manager.save(newAssignment);
            }
            return { success: true, count: employeeIds.length };
        });
    }
    async responderSolicitud(data) {
        const { empresaId, solicitudId, dto, usuario } = data;
        const solicitud = await this.solicitudRepo.findOne({
            where: { id: solicitudId, empleado: { empresaId } },
            relations: ['empleado']
        });
        if (!solicitud)
            throw new common_1.NotFoundException('Solicitud no encontrada.');
        if (solicitud.estado !== database_1.EstadoSolicitud.PENDIENTE) {
            throw new common_1.BadRequestException(`Esta solicitud ya fue procesada. Estado actual: ${solicitud.estado}`);
        }
        const rol = usuario.role ? usuario.role.toLowerCase() : '';
        const esSuperAdmin = rol.includes('admin') || rol.includes('root');
        if (!esSuperAdmin) {
            if (usuario.sucursalId && solicitud.empleado.sucursalId) {
                if (usuario.sucursalId !== solicitud.empleado.sucursalId) {
                    throw new common_1.UnauthorizedException('No puedes gestionar solicitudes de otra sucursal.');
                }
            }
        }
        if (dto.estado === database_1.EstadoSolicitud.APROBADA) {
            const fechaObj = new Date(solicitud.fechaInicio);
            const anio = fechaObj.getFullYear();
            const saldo = await this.saldoRepo.findOneBy({
                empleadoId: solicitud.empleadoId,
                anio
            });
            if (!saldo)
                throw new common_1.NotFoundException(`Error crítico: No existe saldo para el año ${anio}.`);
            const diasTotales = Number(saldo.diasTotales);
            const diasUsados = Number(saldo.diasUsados);
            const diasSolicitados = Number(solicitud.diasSolicitados);
            const disponibles = diasTotales - diasUsados;
            if (disponibles < diasSolicitados) {
                throw new common_1.ConflictException(`Saldo insuficiente. Tiene ${disponibles}, pide ${diasSolicitados}.`);
            }
            saldo.diasUsados = diasUsados + diasSolicitados;
            await this.saldoRepo.save(saldo);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            const inicioVac = new Date(solicitud.fechaInicio);
            inicioVac.setHours(0, 0, 0, 0);
            const finVac = new Date(solicitud.fechaFin);
            finVac.setHours(23, 59, 59, 999);
            if (hoy >= inicioVac && hoy <= finVac) {
                console.log(`--- ACTUALIZANDO ESTADO DE EMPLEADO A VACACIONES ---`);
                solicitud.empleado.estado = 'De Vacaciones';
                await this.empleadoRepository.save(solicitud.empleado);
            }
        }
        solicitud.estado = dto.estado;
        solicitud.comentariosRespuesta = dto.comentarios || null;
        solicitud.fechaRespuesta = new Date();
        return this.solicitudRepo.save(solicitud);
    }
    async consultarSaldo(empleadoId) {
        const anioActual = new Date().getFullYear();
        let saldo = await this.saldoRepo.findOneBy({ empleadoId, anio: anioActual });
        if (!saldo) {
            const empleado = await this.empleadoRepository.findOne({
                where: { id: empleadoId },
                relations: ['empresa']
            });
            if (!empleado)
                throw new common_1.NotFoundException('Empleado no encontrado');
            const diasPolitica = Number(empleado.empresa?.configuracion?.vacaciones?.diasPorAnio) || 15;
            saldo = this.saldoRepo.create({
                empleadoId,
                anio: anioActual,
                diasTotales: diasPolitica,
                diasUsados: 0
            });
            await this.saldoRepo.save(saldo);
        }
        const totales = Number(saldo.diasTotales);
        const usados = Number(saldo.diasUsados);
        return {
            anio: saldo.anio,
            diasTotales: totales,
            diasUsados: usados,
            diasDisponibles: totales - usados
        };
    }
    calcularDiasHabiles(inicio, fin) {
        let count = 0;
        let current = new Date(inicio);
        current.setHours(0, 0, 0, 0);
        const endDate = new Date(fin);
        endDate.setHours(0, 0, 0, 0);
        while (current <= endDate) {
            const dayOfWeek = current.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                count++;
            }
            current.setDate(current.getDate() + 1);
        }
        return count;
    }
};
exports.NominaService = NominaService;
exports.NominaService = NominaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.Contrato)),
    __param(1, (0, typeorm_1.InjectRepository)(database_1.Empleado)),
    __param(2, (0, typeorm_1.InjectRepository)(database_1.Beneficio)),
    __param(3, (0, typeorm_1.InjectRepository)(database_1.BeneficioAsignado)),
    __param(4, (0, typeorm_1.InjectRepository)(database_1.PeriodoNomina)),
    __param(5, (0, typeorm_1.InjectRepository)(database_1.NominaEmpleado)),
    __param(6, (0, typeorm_1.InjectRepository)(database_1.RubroNomina)),
    __param(7, (0, typeorm_1.InjectRepository)(database_1.ConceptoNomina)),
    __param(9, (0, typeorm_1.InjectRepository)(database_1.SolicitudVacaciones)),
    __param(10, (0, typeorm_1.InjectRepository)(database_1.NovedadNomina)),
    __param(11, (0, typeorm_1.InjectRepository)(database_1.Empresa)),
    __param(12, (0, typeorm_1.InjectRepository)(database_1.SaldoVacaciones)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.EntityManager,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NominaService);


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
const sucursal_entity_1 = __webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts");
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
    descripcion;
    serial;
    tipo;
    estado;
    valor;
    imageUrl;
    fechaAdquisicion;
    empresa;
    empresaId;
    sucursal;
    sucursalId;
    asignaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, serial: { required: true, type: () => String }, tipo: { required: true, type: () => String }, estado: { required: true, enum: (__webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts").EstadoActivo) }, valor: { required: true, type: () => Number }, imageUrl: { required: true, type: () => String }, fechaAdquisicion: { required: true, type: () => Date }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, sucursal: { required: true, type: () => (__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts").Sucursal) }, sucursalId: { required: true, type: () => String }, asignaciones: { required: true, type: () => [(__webpack_require__(/*! ./activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts").ActivoAsignado)] } };
    }
};
exports.Activo = Activo;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre del activo (Laptop Dell XPS)',
    }),
    __metadata("design:type", String)
], Activo.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'Descripción detallada o notas',
    }),
    __metadata("design:type", String)
], Activo.prototype, "descripcion", void 0);
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
        comment: 'Categoría (Computación, Mobiliario)',
    }),
    __metadata("design:type", String)
], Activo.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoActivo.DISPONIBLE,
    }),
    __metadata("design:type", String)
], Activo.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: true,
        comment: 'Costo de compra',
    }),
    __metadata("design:type", Number)
], Activo.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        comment: 'URL de la foto del activo',
    }),
    __metadata("design:type", String)
], Activo.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
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
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Activo.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sucursal_entity_1.Sucursal, {
        nullable: true,
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sucursalId' }),
    __metadata("design:type", sucursal_entity_1.Sucursal)
], Activo.prototype, "sucursal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Activo.prototype, "sucursalId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activoAsignado_entity_1.ActivoAsignado, (asignacion) => asignacion.activo),
    __metadata("design:type", Array)
], Activo.prototype, "asignaciones", void 0);
exports.Activo = Activo = __decorate([
    (0, typeorm_1.Entity)({ name: 'activos' }),
    (0, typeorm_1.Index)(['empresaId']),
    (0, typeorm_1.Index)(['sucursalId']),
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

/***/ "./libs/database/src/entities/anuncio.entity.ts":
/*!******************************************************!*\
  !*** ./libs/database/src/entities/anuncio.entity.ts ***!
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
exports.Anuncio = exports.PrioridadAnuncio = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const sucursal_entity_1 = __webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts");
var PrioridadAnuncio;
(function (PrioridadAnuncio) {
    PrioridadAnuncio["BAJA"] = "BAJA";
    PrioridadAnuncio["MEDIA"] = "MEDIA";
    PrioridadAnuncio["ALTA"] = "ALTA";
})(PrioridadAnuncio || (exports.PrioridadAnuncio = PrioridadAnuncio = {}));
let Anuncio = class Anuncio extends base_entity_1.BaseEntity {
    titulo;
    contenido;
    prioridad;
    fechaExpiracion;
    empresaId;
    sucursal;
    sucursalId;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, contenido: { required: true, type: () => String }, prioridad: { required: true, enum: (__webpack_require__(/*! ./anuncio.entity */ "./libs/database/src/entities/anuncio.entity.ts").PrioridadAnuncio) }, fechaExpiracion: { required: true, type: () => Date }, empresaId: { required: true, type: () => String }, sucursal: { required: true, type: () => (__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts").Sucursal) }, sucursalId: { required: true, type: () => String, nullable: true } };
    }
};
exports.Anuncio = Anuncio;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Anuncio.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Anuncio.prototype, "contenido", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PrioridadAnuncio,
        default: PrioridadAnuncio.MEDIA
    }),
    __metadata("design:type", String)
], Anuncio.prototype, "prioridad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Anuncio.prototype, "fechaExpiracion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Anuncio.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sucursal_entity_1.Sucursal, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sucursalId' }),
    __metadata("design:type", sucursal_entity_1.Sucursal)
], Anuncio.prototype, "sucursal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], Anuncio.prototype, "sucursalId", void 0);
exports.Anuncio = Anuncio = __decorate([
    (0, typeorm_1.Entity)({ name: 'anuncios' })
], Anuncio);


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
exports.Beneficio = exports.IndicadorNomina = exports.TipoBeneficio = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const beneficioAsignado_entity_1 = __webpack_require__(/*! ./beneficioAsignado.entity */ "./libs/database/src/entities/beneficioAsignado.entity.ts");
var TipoBeneficio;
(function (TipoBeneficio) {
    TipoBeneficio["MONETARIO"] = "Monetario";
    TipoBeneficio["NO_MONETARIO"] = "No Monetario";
})(TipoBeneficio || (exports.TipoBeneficio = TipoBeneficio = {}));
var IndicadorNomina;
(function (IndicadorNomina) {
    IndicadorNomina["INGRESO"] = "Ingreso";
    IndicadorNomina["DESCUENTO"] = "Descuento";
    IndicadorNomina["INFORMATIVO"] = "Informativo";
})(IndicadorNomina || (exports.IndicadorNomina = IndicadorNomina = {}));
let Beneficio = class Beneficio extends base_entity_1.BaseEntity {
    nombre;
    descripcion;
    tipo;
    esAutomatico;
    porcentajeCalculo;
    indicador;
    esRecurrente;
    montoEstimado;
    empresa;
    empresaId;
    asignaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, tipo: { required: true, enum: (__webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").TipoBeneficio) }, esAutomatico: { required: true, type: () => Boolean }, porcentajeCalculo: { required: true, type: () => Number }, indicador: { required: true, enum: (__webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").IndicadorNomina) }, esRecurrente: { required: true, type: () => Boolean }, montoEstimado: { required: true, type: () => Number }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, asignaciones: { required: true, type: () => [(__webpack_require__(/*! ./beneficioAsignado.entity */ "./libs/database/src/entities/beneficioAsignado.entity.ts").BeneficioAsignado)] } };
    }
};
exports.Beneficio = Beneficio;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Beneficio.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Beneficio.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TipoBeneficio,
        default: TipoBeneficio.MONETARIO
    }),
    __metadata("design:type", String)
], Beneficio.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        comment: 'Si es true, se aplica a TODOS automáticamente (Ej: IESS)'
    }),
    __metadata("design:type", Boolean)
], Beneficio.prototype, "esAutomatico", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: true,
        comment: 'Porcentaje a calcular sobre el sueldo (Ej: 0.0945 para 9.45%)'
    }),
    __metadata("design:type", Number)
], Beneficio.prototype, "porcentajeCalculo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: IndicadorNomina,
        default: IndicadorNomina.INGRESO
    }),
    __metadata("design:type", String)
], Beneficio.prototype, "indicador", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Beneficio.prototype, "esRecurrente", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Beneficio.prototype, "montoEstimado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.beneficios, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Beneficio.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Beneficio.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => beneficioAsignado_entity_1.BeneficioAsignado, (ba) => ba.beneficio),
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
    montoPersonalizado;
    activo;
    empleado;
    empleadoId;
    beneficio;
    beneficioId;
    static _OPENAPI_METADATA_FACTORY() {
        return { fechaAsignacion: { required: true, type: () => Date, description: "Fecha de asignaci\u00F3n del beneficio al empleado" }, montoPersonalizado: { required: true, type: () => Number }, activo: { required: true, type: () => Boolean }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String }, beneficio: { required: true, type: () => (__webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").Beneficio) }, beneficioId: { required: true, type: () => String } };
    }
};
exports.BeneficioAsignado = BeneficioAsignado;
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        default: () => 'CURRENT_DATE',
        comment: 'Fecha de asignación del beneficio al empleado',
    }),
    __metadata("design:type", Date)
], BeneficioAsignado.prototype, "fechaAsignacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
        comment: 'Valor específico para este empleado (sobrescribe al general)'
    }),
    __metadata("design:type", Number)
], BeneficioAsignado.prototype, "montoPersonalizado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: true,
        comment: 'Si es false, el motor de nómina ignora esta asignación'
    }),
    __metadata("design:type", Boolean)
], BeneficioAsignado.prototype, "activo", void 0);
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
    descripcion;
    salarioMin;
    salarioMax;
    empresaId;
    departamento;
    departamentoId;
    empleados;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, salarioMin: { required: true, type: () => Number }, salarioMax: { required: true, type: () => Number }, empresaId: { required: true, type: () => String }, departamento: { required: true, type: () => (__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento) }, departamentoId: { required: true, type: () => String }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] } };
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
        type: 'text',
        nullable: true,
        comment: 'Descripción de las funciones del cargo',
    }),
    __metadata("design:type", String)
], Cargo.prototype, "descripcion", void 0);
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
    (0, typeorm_1.Column)({
        type: 'uuid',
        nullable: true,
        comment: 'ID de la empresa (desnormalizado para optimizar)'
    }),
    __metadata("design:type", String)
], Cargo.prototype, "empresaId", void 0);
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
    (0, typeorm_1.Index)(['departamentoId']),
    (0, typeorm_1.Index)(['empresaId'])
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
    esAutomatico;
    montoEstimado;
    empresa;
    empresaId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, tipo: { required: true, enum: (__webpack_require__(/*! ./conceptoNomina.entity */ "./libs/database/src/entities/conceptoNomina.entity.ts").TipoRubro) }, esFijo: { required: true, type: () => Boolean }, formula: { required: true, type: () => String }, esAutomatico: { required: true, type: () => Boolean }, montoEstimado: { required: true, type: () => Number, description: "Guarda el valor num\u00E9rico base.\nSi es autom\u00E1tico, aqu\u00ED va el porcentaje (ej: 0.0945).\nSi es una novedad fija, aqu\u00ED va el monto (ej: 50.00)." }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String } };
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
        comment: 'Indica si es un monto fijo o recurrente (Legacy/Compatibilidad)',
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
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        comment: 'Si es true, el motor de nómina lo calcula para todos sin asignación manual'
    }),
    __metadata("design:type", Boolean)
], ConceptoNomina.prototype, "esAutomatico", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 4,
        nullable: true,
        comment: 'Valor numérico base o porcentaje'
    }),
    __metadata("design:type", Number)
], ConceptoNomina.prototype, "montoEstimado", void 0);
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
    duration;
    instructor;
    category;
    imageUrl;
    isActive;
    empresa;
    empresaId;
    inscripciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, duration: { required: true, type: () => String }, instructor: { required: true, type: () => String }, category: { required: true, type: () => String }, imageUrl: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, inscripciones: { required: true, type: () => [(__webpack_require__(/*! ./inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").InscripcionCurso)] } };
    }
};
exports.Curso = Curso;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, comment: 'Título del curso' }),
    __metadata("design:type", String)
], Curso.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: 'Descripción del contenido' }),
    __metadata("design:type", String)
], Curso.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, comment: 'Ej: 10 horas, 30 min' }),
    __metadata("design:type", String)
], Curso.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, comment: 'Nombre del instructor' }),
    __metadata("design:type", String)
], Curso.prototype, "instructor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, comment: 'Tecnología, Ventas, etc.' }),
    __metadata("design:type", String)
], Curso.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: 'URL de la imagen' }),
    __metadata("design:type", String)
], Curso.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Curso.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.cursos, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Curso.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
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
const sucursal_entity_1 = __webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts");
let Departamento = class Departamento extends base_entity_1.BaseEntity {
    nombre;
    empresa;
    empresaId;
    sucursal;
    sucursalId;
    cargos;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, sucursal: { required: true, type: () => (__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts").Sucursal) }, sucursalId: { required: true, type: () => String }, cargos: { required: true, type: () => [(__webpack_require__(/*! ./cargo.entity */ "./libs/database/src/entities/cargo.entity.ts").Cargo)] } };
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
    (0, typeorm_1.ManyToOne)(() => sucursal_entity_1.Sucursal, (sucursal) => sucursal.departamentos, {
        nullable: true,
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'sucursalId' }),
    __metadata("design:type", sucursal_entity_1.Sucursal)
], Departamento.prototype, "sucursal", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'uuid',
        nullable: true,
        comment: 'ID de la Sucursal a la que pertenece'
    }),
    __metadata("design:type", String)
], Departamento.prototype, "sucursalId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cargo_entity_1.Cargo, (cargo) => cargo.departamento),
    __metadata("design:type", Array)
], Departamento.prototype, "cargos", void 0);
exports.Departamento = Departamento = __decorate([
    (0, typeorm_1.Entity)({ name: 'departamentos' }),
    (0, typeorm_1.Index)(['empresaId']),
    (0, typeorm_1.Index)(['sucursalId'])
], Departamento);


/***/ }),

/***/ "./libs/database/src/entities/documento-empresa.entity.ts":
/*!****************************************************************!*\
  !*** ./libs/database/src/entities/documento-empresa.entity.ts ***!
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
exports.DocumentoEmpresa = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const sucursal_entity_1 = __webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts");
let DocumentoEmpresa = class DocumentoEmpresa extends base_entity_1.BaseEntity {
    nombre;
    descripcion;
    url;
    categoria;
    fechaSubida;
    empresa;
    empresaId;
    sucursal;
    sucursalId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, url: { required: true, type: () => String }, categoria: { required: true, type: () => String }, fechaSubida: { required: true, type: () => Date }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, sucursal: { required: true, type: () => (__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts").Sucursal) }, sucursalId: { required: true, type: () => String } };
    }
};
exports.DocumentoEmpresa = DocumentoEmpresa;
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], DocumentoEmpresa.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], DocumentoEmpresa.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', comment: 'URL del archivo en S3/Cloudinary/Local' }),
    __metadata("design:type", String)
], DocumentoEmpresa.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, comment: 'Ej: LEGAL, MANUALES, FORMATOS' }),
    __metadata("design:type", String)
], DocumentoEmpresa.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', default: () => 'CURRENT_DATE' }),
    __metadata("design:type", Date)
], DocumentoEmpresa.prototype, "fechaSubida", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, { nullable: false, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], DocumentoEmpresa.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DocumentoEmpresa.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sucursal_entity_1.Sucursal, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'sucursalId' }),
    __metadata("design:type", sucursal_entity_1.Sucursal)
], DocumentoEmpresa.prototype, "sucursal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DocumentoEmpresa.prototype, "sucursalId", void 0);
exports.DocumentoEmpresa = DocumentoEmpresa = __decorate([
    (0, typeorm_1.Entity)({ name: 'documentos_empresa' }),
    (0, typeorm_1.Index)(['empresaId']),
    (0, typeorm_1.Index)(['sucursalId'])
], DocumentoEmpresa);


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
        return { nombre: { required: true, type: () => String }, planSuscripcion: { required: true, type: () => String }, branding: { required: true, type: () => ({ logoUrl: { required: false, type: () => String, nullable: true }, color: { required: false, type: () => String, nullable: true }, primaryColor: { required: false, type: () => String, nullable: true } }) }, configuracion: { required: true, type: () => Object, description: "AQU\u00CD GUARDAMOS TODA LA CONFIGURACI\u00D3N\nUsamos la interfaz 'ConfiguracionEmpresa' definida arriba" }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] }, roles: { required: true, type: () => [(__webpack_require__(/*! ./rol.entity */ "./libs/database/src/entities/rol.entity.ts").Rol)] }, departamentos: { required: true, type: () => [(__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento)] }, proyectos: { required: true, type: () => [(__webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts").Proyecto)] }, cursos: { required: true, type: () => [(__webpack_require__(/*! ./curso.entity */ "./libs/database/src/entities/curso.entity.ts").Curso)] }, activos: { required: true, type: () => [(__webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts").Activo)] }, beneficios: { required: true, type: () => [(__webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").Beneficio)] }, periodosNomina: { required: true, type: () => [(__webpack_require__(/*! ./periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts").PeriodoNomina)] }, ciclosEvaluacion: { required: true, type: () => [(__webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").CicloEvaluacion)] }, vacantes: { required: true, type: () => [(__webpack_require__(/*! ./vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").Vacante)] }, sucursales: { required: true, type: () => [(__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts").Sucursal)] } };
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
        comment: 'Configuraciones globales (Módulos, Nomina, Asistencia, etc)',
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
    (0, typeorm_1.OneToMany)(() => departamento_entity_1.Departamento, (d) => d.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "departamentos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proyecto_entity_1.Proyecto, (p) => p.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "proyectos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => curso_entity_1.Curso, (c) => c.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "cursos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activo_entity_1.Activo, (a) => a.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "activos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => beneficio_entity_1.Beneficio, (b) => b.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "beneficios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => periodoNomina_entity_1.PeriodoNomina, (p) => p.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "periodosNomina", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cicloEvaluacion_entity_1.CicloEvaluacion, (c) => c.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "ciclosEvaluacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => vacante_entity_1.Vacante, (v) => v.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "vacantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sucursal_entity_1.Sucursal, (s) => s.empresa, { cascade: true }),
    __metadata("design:type", Array)
], Empresa.prototype, "sucursales", void 0);
exports.Empresa = Empresa = __decorate([
    (0, typeorm_1.Entity)({ name: 'empresas' })
], Empresa);


/***/ }),

/***/ "./libs/database/src/entities/encuesta.entity.ts":
/*!*******************************************************!*\
  !*** ./libs/database/src/entities/encuesta.entity.ts ***!
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
exports.OpcionEncuesta = exports.Encuesta = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
let Encuesta = class Encuesta extends base_entity_1.BaseEntity {
    titulo;
    descripcion;
    fechaFin;
    esAnonima;
    activa;
    empresaId;
    sucursalId;
    opciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, fechaFin: { required: true, type: () => Date }, esAnonima: { required: true, type: () => Boolean }, activa: { required: true, type: () => Boolean }, empresaId: { required: true, type: () => String }, sucursalId: { required: true, type: () => String, nullable: true }, opciones: { required: true, type: () => [(__webpack_require__(/*! ./encuesta.entity */ "./libs/database/src/entities/encuesta.entity.ts").OpcionEncuesta)] } };
    }
};
exports.Encuesta = Encuesta;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Encuesta.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Encuesta.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Encuesta.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Encuesta.prototype, "esAnonima", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Encuesta.prototype, "activa", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Encuesta.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Encuesta.prototype, "sucursalId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => OpcionEncuesta, (opcion) => opcion.encuesta, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Encuesta.prototype, "opciones", void 0);
exports.Encuesta = Encuesta = __decorate([
    (0, typeorm_1.Entity)({ name: 'encuestas' })
], Encuesta);
let OpcionEncuesta = class OpcionEncuesta extends base_entity_1.BaseEntity {
    texto;
    votos;
    encuesta;
    encuestaId;
    miVoto;
    static _OPENAPI_METADATA_FACTORY() {
        return { texto: { required: true, type: () => String }, votos: { required: true, type: () => Number }, encuesta: { required: true, type: () => (__webpack_require__(/*! ./encuesta.entity */ "./libs/database/src/entities/encuesta.entity.ts").Encuesta) }, encuestaId: { required: true, type: () => String }, miVoto: { required: false, type: () => (__webpack_require__(/*! ./voto.entity */ "./libs/database/src/entities/voto.entity.ts").Voto) } };
    }
};
exports.OpcionEncuesta = OpcionEncuesta;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OpcionEncuesta.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], OpcionEncuesta.prototype, "votos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Encuesta, (encuesta) => encuesta.opciones, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'encuestaId' }),
    __metadata("design:type", Encuesta)
], OpcionEncuesta.prototype, "encuesta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OpcionEncuesta.prototype, "encuestaId", void 0);
exports.OpcionEncuesta = OpcionEncuesta = __decorate([
    (0, typeorm_1.Entity)({ name: 'encuesta_opciones' })
], OpcionEncuesta);


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
__exportStar(__webpack_require__(/*! ./plantilla-onboarding.entity */ "./libs/database/src/entities/plantilla-onboarding.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./tarea-plantilla.entity */ "./libs/database/src/entities/tarea-plantilla.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./tarea-empleado.entity */ "./libs/database/src/entities/tarea-empleado.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./documento-empresa.entity */ "./libs/database/src/entities/documento-empresa.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./anuncio.entity */ "./libs/database/src/entities/anuncio.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./encuesta.entity */ "./libs/database/src/entities/encuesta.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./voto.entity */ "./libs/database/src/entities/voto.entity.ts"), exports);
__exportStar(__webpack_require__(/*! ./saldo-vacaciones.entity */ "./libs/database/src/entities/saldo-vacaciones.entity.ts"), exports);


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
    EstadoInscripcion["INSCRITO"] = "Inscrito";
    EstadoInscripcion["EN_PROGRESO"] = "En Progreso";
    EstadoInscripcion["COMPLETADO"] = "Completado";
    EstadoInscripcion["CANCELADO"] = "Cancelado";
})(EstadoInscripcion || (exports.EstadoInscripcion = EstadoInscripcion = {}));
let InscripcionCurso = class InscripcionCurso extends base_entity_1.BaseEntity {
    estado;
    progreso;
    calificacion;
    fechaInscripcion;
    fechaCompletado;
    curso;
    cursoId;
    empleado;
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { estado: { required: true, description: "Estado del progreso.", enum: (__webpack_require__(/*! ./inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").EstadoInscripcion) }, progreso: { required: true, type: () => Number, description: "\uD83D\uDC47 NUEVO CAMPO IMPORTANTE:\nPorcentaje de avance (0 a 100).\nNecesario para la barra de progreso del Frontend." }, calificacion: { required: true, type: () => Number }, fechaInscripcion: { required: true, type: () => Date, description: "Fecha de inscripci\u00F3n.\nUsamos CreateDateColumn para que guarde FECHA Y HORA autom\u00E1ticamente." }, fechaCompletado: { required: true, type: () => Date, description: "Fecha en que complet\u00F3 el curso." }, curso: { required: true, type: () => (__webpack_require__(/*! ./curso.entity */ "./libs/database/src/entities/curso.entity.ts").Curso) }, cursoId: { required: true, type: () => String }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String } };
    }
};
exports.InscripcionCurso = InscripcionCurso;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: EstadoInscripcion.INSCRITO,
        comment: 'Estado del progreso (Inscrito, Completado...)',
    }),
    __metadata("design:type", String)
], InscripcionCurso.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 0,
        comment: 'Porcentaje de avance del curso (0-100)',
    }),
    __metadata("design:type", Number)
], InscripcionCurso.prototype, "progreso", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: true,
        comment: 'Nota final del curso (si aplica)',
    }),
    __metadata("design:type", Number)
], InscripcionCurso.prototype, "calificacion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        comment: 'Fecha y hora de inscripción al curso',
    }),
    __metadata("design:type", Date)
], InscripcionCurso.prototype, "fechaInscripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: true,
        comment: 'Fecha y hora de finalización del curso',
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
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InscripcionCurso.prototype, "cursoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], InscripcionCurso.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
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
    categoria;
    monto;
    fecha;
    facturaUrl;
    reporte;
    reporteId;
    static _OPENAPI_METADATA_FACTORY() {
        return { concepto: { required: true, type: () => String, description: "Concepto o descripci\u00F3n del gasto\nMapea: string concepto \"Concepto descripcion gasto\"" }, categoria: { required: true, type: () => String }, monto: { required: true, type: () => Number, description: "Monto individual del gasto\nMapea: float monto \"Monto individual gasto\"" }, fecha: { required: true, type: () => Date, description: "Fecha en que se realiz\u00F3 el gasto\nMapea: date fecha \"Fecha gasto realizado\"" }, facturaUrl: { required: true, type: () => String, description: "URL del comprobante o factura (alojado en S3/Mongo)\nMapea: string facturaUrl \"URL comprobante factura\"\n\n@fulfills RNF13 (Almacenamiento Seguro de Archivos)\n@logic Esta columna no guarda el archivo, solo el enlace a \u00E9l." }, reporte: { required: true, type: () => (__webpack_require__(/*! ./reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").ReporteGasto) }, reporteId: { required: true, type: () => String, description: "Mapea: string reporteId FK \"Reporte padre contiene\"" } };
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
        type: 'varchar',
        length: 50,
        comment: 'Categoría del gasto (Alimentación, Transporte, Hospedaje)',
    }),
    __metadata("design:type", String)
], ItemGasto.prototype, "categoria", void 0);
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

/***/ "./libs/database/src/entities/plantilla-onboarding.entity.ts":
/*!*******************************************************************!*\
  !*** ./libs/database/src/entities/plantilla-onboarding.entity.ts ***!
  \*******************************************************************/
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
exports.PlantillaOnboarding = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const tarea_plantilla_entity_1 = __webpack_require__(/*! ./tarea-plantilla.entity */ "./libs/database/src/entities/tarea-plantilla.entity.ts");
let PlantillaOnboarding = class PlantillaOnboarding extends base_entity_1.BaseEntity {
    nombre;
    empresaId;
    tareas;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, empresaId: { required: true, type: () => String }, tareas: { required: true, type: () => [(__webpack_require__(/*! ./tarea-plantilla.entity */ "./libs/database/src/entities/tarea-plantilla.entity.ts").TareaPlantilla)] } };
    }
};
exports.PlantillaOnboarding = PlantillaOnboarding;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PlantillaOnboarding.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], PlantillaOnboarding.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tarea_plantilla_entity_1.TareaPlantilla, (tarea) => tarea.plantilla, { cascade: true }),
    __metadata("design:type", Array)
], PlantillaOnboarding.prototype, "tareas", void 0);
exports.PlantillaOnboarding = PlantillaOnboarding = __decorate([
    (0, typeorm_1.Entity)('plantillas_onboarding')
], PlantillaOnboarding);


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
const sucursal_entity_1 = __webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts");
let Proyecto = class Proyecto extends base_entity_1.BaseEntity {
    nombre;
    descripcion;
    estado;
    empresa;
    empresaId;
    lider;
    liderId;
    sucursal;
    sucursalId;
    sprints;
    tareas;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre del proyecto" }, descripcion: { required: true, type: () => String, description: "Descripci\u00F3n detallada del proyecto" }, estado: { required: true, type: () => String }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, lider: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado), description: "Relaci\u00F3n: Un Proyecto tiene UN l\u00EDder (Empleado)." }, liderId: { required: true, type: () => String }, sucursal: { required: true, type: () => (__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts").Sucursal) }, sucursalId: { required: true, type: () => String }, sprints: { required: true, type: () => [(__webpack_require__(/*! ./sprint.entity */ "./libs/database/src/entities/sprint.entity.ts").Sprint)] }, tareas: { required: true, type: () => [(__webpack_require__(/*! ./tarea.entity */ "./libs/database/src/entities/tarea.entity.ts").Tarea)] } };
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
    (0, typeorm_1.ManyToOne)(() => sucursal_entity_1.Sucursal, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'sucursalId' }),
    __metadata("design:type", sucursal_entity_1.Sucursal)
], Proyecto.prototype, "sucursal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'ID de la Sucursal a la que pertenece este proyecto' }),
    __metadata("design:type", String)
], Proyecto.prototype, "sucursalId", void 0);
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
    titulo;
    descripcion;
    estado;
    total;
    fechaReporte;
    empleado;
    empleadoId;
    items;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, estado: { required: true, description: "Estado del reporte.", enum: (__webpack_require__(/*! ./reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").EstadoReporte) }, total: { required: true, type: () => Number, description: "Monto total calculado autom\u00E1ticamente." }, fechaReporte: { required: true, type: () => Date }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String }, items: { required: true, type: () => [(__webpack_require__(/*! ./itemGasto.entity */ "./libs/database/src/entities/itemGasto.entity.ts").ItemGasto)] } };
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
], ReporteGasto.prototype, "titulo", void 0);
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
    descripcion;
    permisos;
    esDefecto;
    empresa;
    empresaId;
    empleados;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre del rol\nMapea: string nombre \"Nombre rol sistema\"" }, descripcion: { required: true, type: () => String }, permisos: { required: true, type: () => [String], description: "Mapa de permisos (Role-Based Access Control - RBAC).\nAHORA ES UN ARRAY DE STRINGS" }, esDefecto: { required: true, type: () => Boolean }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String, description: "Mapea: string empresaId FK \"Empresa propietaria rol\"" }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] } };
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
        type: 'varchar',
        length: 500,
        nullable: true,
        comment: 'Descripción del rol',
    }),
    __metadata("design:type", String)
], Rol.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        comment: 'Lista de permisos activos (Array de strings)',
        default: []
    }),
    __metadata("design:type", Array)
], Rol.prototype, "permisos", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
        comment: 'Si es true, este rol se asigna automáticamente a nuevos empleados'
    }),
    __metadata("design:type", Boolean)
], Rol.prototype, "esDefecto", void 0);
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

/***/ "./libs/database/src/entities/saldo-vacaciones.entity.ts":
/*!***************************************************************!*\
  !*** ./libs/database/src/entities/saldo-vacaciones.entity.ts ***!
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
exports.SaldoVacaciones = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let SaldoVacaciones = class SaldoVacaciones extends base_entity_1.BaseEntity {
    empleado;
    empleadoId;
    anio;
    diasTotales;
    diasUsados;
    get diasDisponibles() {
        return this.diasTotales - this.diasUsados;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String }, anio: { required: true, type: () => Number }, diasTotales: { required: true, type: () => Number }, diasUsados: { required: true, type: () => Number } };
    }
};
exports.SaldoVacaciones = SaldoVacaciones;
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], SaldoVacaciones.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SaldoVacaciones.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], SaldoVacaciones.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 15 }),
    __metadata("design:type", Number)
], SaldoVacaciones.prototype, "diasTotales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SaldoVacaciones.prototype, "diasUsados", void 0);
exports.SaldoVacaciones = SaldoVacaciones = __decorate([
    (0, typeorm_1.Entity)({ name: 'saldos_vacaciones' }),
    (0, typeorm_1.Index)(['empleadoId', 'anio'], { unique: true })
], SaldoVacaciones);


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
    comentariosRespuesta;
    fechaRespuesta;
    static _OPENAPI_METADATA_FACTORY() {
        return { fechaInicio: { required: true, type: () => Date }, fechaFin: { required: true, type: () => Date }, diasSolicitados: { required: true, type: () => Number }, estado: { required: true, enum: (__webpack_require__(/*! ./solicitudVacaciones.entity */ "./libs/database/src/entities/solicitudVacaciones.entity.ts").EstadoSolicitud) }, comentario: { required: true, type: () => String }, respuestaAdmin: { required: true, type: () => String }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String }, comentariosRespuesta: { required: true, type: () => String, nullable: true }, fechaRespuesta: { required: true, type: () => Date, nullable: true } };
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
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], SolicitudVacaciones.prototype, "comentariosRespuesta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], SolicitudVacaciones.prototype, "fechaRespuesta", void 0);
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
const departamento_entity_1 = __webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts");
let Sucursal = class Sucursal extends base_entity_1.BaseEntity {
    nombre;
    direccion;
    telefono;
    activa;
    empresa;
    empresaId;
    empleados;
    departamentos;
    jefe;
    jefeId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, direccion: { required: true, type: () => String }, telefono: { required: true, type: () => String }, activa: { required: true, type: () => Boolean }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] }, departamentos: { required: true, type: () => [(__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento)] }, jefe: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, jefeId: { required: true, type: () => String } };
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
__decorate([
    (0, typeorm_1.OneToMany)(() => departamento_entity_1.Departamento, (depto) => depto.sucursal),
    __metadata("design:type", Array)
], Sucursal.prototype, "departamentos", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => empleado_entity_1.Empleado, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'jefeId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Sucursal.prototype, "jefe", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Sucursal.prototype, "jefeId", void 0);
exports.Sucursal = Sucursal = __decorate([
    (0, typeorm_1.Entity)({ name: 'sucursales' }),
    (0, typeorm_1.Index)(['empresaId'])
], Sucursal);


/***/ }),

/***/ "./libs/database/src/entities/tarea-empleado.entity.ts":
/*!*************************************************************!*\
  !*** ./libs/database/src/entities/tarea-empleado.entity.ts ***!
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
exports.TareaEmpleado = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
let TareaEmpleado = class TareaEmpleado extends base_entity_1.BaseEntity {
    empleadoId;
    titulo;
    descripcion;
    enlace;
    completado;
    plantillaOrigenId;
    static _OPENAPI_METADATA_FACTORY() {
        return { empleadoId: { required: true, type: () => String }, titulo: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, enlace: { required: true, type: () => String }, completado: { required: true, type: () => Boolean }, plantillaOrigenId: { required: true, type: () => String } };
    }
};
exports.TareaEmpleado = TareaEmpleado;
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], TareaEmpleado.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TareaEmpleado.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], TareaEmpleado.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TareaEmpleado.prototype, "enlace", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TareaEmpleado.prototype, "completado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], TareaEmpleado.prototype, "plantillaOrigenId", void 0);
exports.TareaEmpleado = TareaEmpleado = __decorate([
    (0, typeorm_1.Entity)('tareas_empleado'),
    (0, typeorm_1.Index)(['empleadoId'])
], TareaEmpleado);


/***/ }),

/***/ "./libs/database/src/entities/tarea-plantilla.entity.ts":
/*!**************************************************************!*\
  !*** ./libs/database/src/entities/tarea-plantilla.entity.ts ***!
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
exports.TareaPlantilla = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const plantilla_onboarding_entity_1 = __webpack_require__(/*! ./plantilla-onboarding.entity */ "./libs/database/src/entities/plantilla-onboarding.entity.ts");
let TareaPlantilla = class TareaPlantilla extends base_entity_1.BaseEntity {
    titulo;
    descripcion;
    enlace;
    plantilla;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, enlace: { required: true, type: () => String }, plantilla: { required: true, type: () => (__webpack_require__(/*! ./plantilla-onboarding.entity */ "./libs/database/src/entities/plantilla-onboarding.entity.ts").PlantillaOnboarding) } };
    }
};
exports.TareaPlantilla = TareaPlantilla;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TareaPlantilla.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], TareaPlantilla.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TareaPlantilla.prototype, "enlace", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plantilla_onboarding_entity_1.PlantillaOnboarding, (p) => p.tareas),
    __metadata("design:type", plantilla_onboarding_entity_1.PlantillaOnboarding)
], TareaPlantilla.prototype, "plantilla", void 0);
exports.TareaPlantilla = TareaPlantilla = __decorate([
    (0, typeorm_1.Entity)('tareas_plantilla')
], TareaPlantilla);


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
    configuracion;
    membresias;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, description: "Email de login, debe ser \u00FAnico en toda la plataforma.\nMapea: string email UK \"Email login unico global\"" }, passwordHash: { required: true, type: () => String, description: "Hash de la contrase\u00F1a (generado con bcrypt).\nMapea: string passwordHash \"Hash contrasena seguro\"\n\n@security 'select: false' es una medida de seguridad CR\u00CDTICA.\nEvita que la contrase\u00F1a hasheada sea enviada accidentalmente\nal frontend en consultas generales. (RNF7)" }, emailVerificado: { required: true, type: () => Boolean, description: "Estado de verificaci\u00F3n del email.\nMapea: boolean emailVerificado \"Estado verificacion email\"" }, twoFactorSecret: { required: true, type: () => String, description: "Secreto para la Autenticaci\u00F3n de Dos Factores (2FA) (RNF16).\nMapea: string twoFactorSecret \"Secret para 2FA\"\n\n@security 'select: false' por la misma raz\u00F3n que el passwordHash." }, configuracion: { required: true, type: () => Object, description: "Configuraci\u00F3n de preferencias del usuario (Tema, Idioma, Notificaciones).\nEs JSON y Nullable para no romper registros antiguos.\nSi es NULL, el frontend asume los valores por defecto (Light/Espa\u00F1ol)." }, membresias: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] } };
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
    (0, typeorm_1.Column)({
        type: 'json',
        nullable: true,
        comment: 'Preferencias de UI: { theme: "dark", lang: "en", ... }',
    }),
    __metadata("design:type", Object)
], Usuario.prototype, "configuracion", void 0);
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
const sucursal_entity_1 = __webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts");
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
    sucursal;
    sucursalId;
    candidatos;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, requisitos: { required: true, type: () => String }, estado: { required: true, enum: (__webpack_require__(/*! ./vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").EstadoVacante) }, ubicacion: { required: true, type: () => String }, salarioMin: { required: true, type: () => Number }, salarioMax: { required: true, type: () => Number }, fechaCierre: { required: true, type: () => Date }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, departamento: { required: true, type: () => (__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento), description: "Relaci\u00F3n con el Departamento (Marketing, TI, Ventas)." }, departamentoId: { required: true, type: () => String }, sucursal: { required: true, type: () => (__webpack_require__(/*! ./sucursal.entity */ "./libs/database/src/entities/sucursal.entity.ts").Sucursal) }, sucursalId: { required: true, type: () => String }, candidatos: { required: true, type: () => [(__webpack_require__(/*! ./candidato.entity */ "./libs/database/src/entities/candidato.entity.ts").Candidato)] } };
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
    (0, typeorm_1.ManyToOne)(() => sucursal_entity_1.Sucursal, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'sucursalId' }),
    __metadata("design:type", sucursal_entity_1.Sucursal)
], Vacante.prototype, "sucursal", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Vacante.prototype, "sucursalId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => candidato_entity_1.Candidato, (candidato) => candidato.vacante, { cascade: true }),
    __metadata("design:type", Array)
], Vacante.prototype, "candidatos", void 0);
exports.Vacante = Vacante = __decorate([
    (0, typeorm_1.Entity)({ name: 'vacantes' }),
    (0, typeorm_1.Index)(['empresaId']),
    (0, typeorm_1.Index)(['sucursalId']),
    (0, typeorm_1.Index)(['estado'])
], Vacante);


/***/ }),

/***/ "./libs/database/src/entities/voto.entity.ts":
/*!***************************************************!*\
  !*** ./libs/database/src/entities/voto.entity.ts ***!
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
exports.Voto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const encuesta_entity_1 = __webpack_require__(/*! ./encuesta.entity */ "./libs/database/src/entities/encuesta.entity.ts");
const encuesta_entity_2 = __webpack_require__(/*! ./encuesta.entity */ "./libs/database/src/entities/encuesta.entity.ts");
let Voto = class Voto extends base_entity_1.BaseEntity {
    empleadoId;
    encuestaId;
    opcionId;
    encuesta;
    opcion;
    static _OPENAPI_METADATA_FACTORY() {
        return { empleadoId: { required: true, type: () => String }, encuestaId: { required: true, type: () => String }, opcionId: { required: true, type: () => String }, encuesta: { required: true, type: () => (__webpack_require__(/*! ./encuesta.entity */ "./libs/database/src/entities/encuesta.entity.ts").Encuesta) }, opcion: { required: true, type: () => (__webpack_require__(/*! ./encuesta.entity */ "./libs/database/src/entities/encuesta.entity.ts").OpcionEncuesta) } };
    }
};
exports.Voto = Voto;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voto.prototype, "empleadoId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voto.prototype, "encuestaId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Voto.prototype, "opcionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => encuesta_entity_1.Encuesta),
    (0, typeorm_1.JoinColumn)({ name: 'encuestaId' }),
    __metadata("design:type", encuesta_entity_1.Encuesta)
], Voto.prototype, "encuesta", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => encuesta_entity_2.OpcionEncuesta),
    (0, typeorm_1.JoinColumn)({ name: 'opcionId' }),
    __metadata("design:type", encuesta_entity_2.OpcionEncuesta)
], Voto.prototype, "opcion", void 0);
exports.Voto = Voto = __decorate([
    (0, typeorm_1.Entity)({ name: 'votos' }),
    (0, typeorm_1.Unique)(['encuestaId', 'empleadoId'])
], Voto);


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
/*!*********************************!*\
  !*** ./apps/nomina/src/main.ts ***!
  \*********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const nomina_module_1 = __webpack_require__(/*! ./nomina.module */ "./apps/nomina/src/nomina.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(nomina_module_1.NominaModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('NOMINA_SERVICE_PORT') || 3003;
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: port,
        },
    });
    await app.startAllMicroservices();
    console.log(`Microservicio NOMINA está escuchando en el puerto ${port}`);
}
bootstrap();

})();

/******/ })()
;