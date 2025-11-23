/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/personal/src/dto/create-candidato.dto.ts":
/*!*******************************************************!*\
  !*** ./apps/personal/src/dto/create-candidato.dto.ts ***!
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
exports.CreateCandidatoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCandidatoDto {
    nombre;
    email;
    telefono;
    cvUrl;
    vacanteId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, email: { required: true, type: () => String, format: "email" }, telefono: { required: false, type: () => String }, cvUrl: { required: true, type: () => String }, vacanteId: { required: true, type: () => String, format: "uuid" } };
    }
}
exports.CreateCandidatoDto = CreateCandidatoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCandidatoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCandidatoDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCandidatoDto.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCandidatoDto.prototype, "cvUrl", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCandidatoDto.prototype, "vacanteId", void 0);


/***/ }),

/***/ "./apps/personal/src/personal.controller.ts":
/*!**************************************************!*\
  !*** ./apps/personal/src/personal.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const personal_service_1 = __webpack_require__(/*! ./personal.service */ "./apps/personal/src/personal.service.ts");
const create_candidato_dto_1 = __webpack_require__(/*! ./dto/create-candidato.dto */ "./apps/personal/src/dto/create-candidato.dto.ts");
let PersonalController = class PersonalController {
    personalService;
    constructor(personalService) {
        this.personalService = personalService;
    }
    getEmpleados(data) {
        return this.personalService.getEmpleados(data.empresaId);
    }
    getEmpleado(data) {
        return this.personalService.getEmpleado(data.empresaId, data.empleadoId);
    }
    createEmpleado(data) {
        console.log(`Microservicio PERSONAL: Recibido create_empleado para empresa: ${data.empresaId}`);
        return this.personalService.createEmpleado(data.empresaId, data.dto);
    }
    updateEmpleado(data) {
        console.log(`Microservicio PERSONAL: Recibido update_empleado para empleado: ${data.empleadoId}`);
        return this.personalService.updateEmpleado(data.empresaId, data.empleadoId, data.dto);
    }
    deleteEmpleado(data) {
        console.log(`Microservicio PERSONAL: Recibido delete_empleado para empleado: ${data.empleadoId}`);
        return this.personalService.deleteEmpleado(data.empresaId, data.empleadoId);
    }
    createDepartamento(data) {
        console.log(`Microservicio PERSONAL: Recibido create_departamento para empresa: ${data.empresaId}`);
        return this.personalService.createDepartamento(data.empresaId, data.dto);
    }
    getDepartamentos(data) {
        console.log(`Microservicio PERSONAL: Recibido get_departamentos para empresa: ${data.empresaId}`);
        return this.personalService.getDepartamentos(data.empresaId);
    }
    updateDepartamento(data) {
        console.log(`Microservicio PERSONAL: Recibido update_departamento para depto: ${data.deptoId}`);
        return this.personalService.updateDepartamento(data.empresaId, data.deptoId, data.dto);
    }
    deleteDepartamento(data) {
        console.log(`Microservicio PERSONAL: Recibido delete_departamento para depto: ${data.deptoId}`);
        return this.personalService.deleteDepartamento(data.empresaId, data.deptoId);
    }
    createCargo(data) {
        console.log(`Microservicio PERSONAL: Recibido create_cargo para empresa: ${data.empresaId}`);
        return this.personalService.createCargo(data.empresaId, data.dto);
    }
    getCargos(data) {
        console.log(`Microservicio PERSONAL: Recibido get_cargos para empresa: ${data.empresaId}`);
        return this.personalService.getCargos(data.empresaId);
    }
    updateCargo(data) {
        console.log(`Microservicio PERSONAL: Recibido update_cargo para cargo: ${data.cargoId}`);
        return this.personalService.updateCargo(data.empresaId, data.cargoId, data.dto);
    }
    deleteCargo(data) {
        console.log(`Microservicio PERSONAL: Recibido delete_cargo para cargo: ${data.cargoId}`);
        return this.personalService.deleteCargo(data.empresaId, data.cargoId);
    }
    createRol(data) {
        console.log(`Microservicio PERSONAL: Recibido create_rol para empresa: ${data.empresaId}`);
        return this.personalService.createRol(data.empresaId, data.dto);
    }
    getRoles(data) {
        console.log(`Microservicio PERSONAL: Recibido get_roles para empresa: ${data.empresaId}`);
        return this.personalService.getRoles(data.empresaId);
    }
    updateRol(data) {
        console.log(`Microservicio PERSONAL: Recibido update_rol para rol: ${data.rolId}`);
        return this.personalService.updateRol(data.empresaId, data.rolId, data.dto);
    }
    deleteRol(data) {
        console.log(`Microservicio PERSONAL: Recibido delete_rol para rol: ${data.rolId}`);
        return this.personalService.deleteRol(data.empresaId, data.rolId);
    }
    createVacante(data) {
        return this.personalService.createVacante(data.empresaId, data.dto);
    }
    getVacantes(data) {
        return this.personalService.getVacantes(data.empresaId, data.publicas);
    }
    updateVacante(data) {
        return this.personalService.updateVacante(data.empresaId, data.vacanteId, data.dto);
    }
    registrarCandidato(dto) {
        return this.personalService.registrarCandidato(dto);
    }
    getCandidatos(data) {
        return this.personalService.getCandidatos(data.empresaId, data.vacanteId);
    }
    reanalizarCandidato(data) {
        return this.personalService.reanalizarCandidato(data.candidatoId);
    }
    getDocumentosEmpleado(data) {
        return this.personalService.getDocumentosEmpleado(data.empresaId, data.empleadoId);
    }
    uploadDocumentoEmpleado(data) {
        return this.personalService.uploadDocumentoEmpleado(data.empresaId, data.empleadoId, data.dto);
    }
    updateFotoPerfil(data) {
        return this.personalService.updateFotoPerfil(data.empresaId, data.empleadoId, data.fileUrl);
    }
    deleteDocumento(data) {
        return this.personalService.deleteDocumento(data.empresaId, data.documentoId);
    }
};
exports.PersonalController = PersonalController;
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'get_empleados' (RF-01-02)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'get_empleados' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getEmpleados", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_empleado' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getEmpleado", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'create_empleado' (RF-01-01)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'create_empleado' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "createEmpleado", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_empleado' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateEmpleado", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'delete_empleado' (RF-01-04)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'delete_empleado' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "deleteEmpleado", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'create_departamento' (RF-02)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'create_departamento' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "createDepartamento", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'get_departamentos' (RF-02)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'get_departamentos' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getDepartamentos", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'update_departamento' (RF-02)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'update_departamento' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateDepartamento", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'delete_departamento' (RF-02)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'delete_departamento' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "deleteDepartamento", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'create_cargo' (RF-02)\n(Tu m\u00E9todo existente - sin cambios)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'create_cargo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/cargo.entity */ "./libs/database/src/entities/cargo.entity.ts").Cargo) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "createCargo", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'get_cargos' (RF-02)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'get_cargos' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/cargo.entity */ "./libs/database/src/entities/cargo.entity.ts").Cargo)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getCargos", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'update_cargo' (RF-02)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'update_cargo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/cargo.entity */ "./libs/database/src/entities/cargo.entity.ts").Cargo) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateCargo", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'delete_cargo' (RF-02)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'delete_cargo' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "deleteCargo", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'create_rol' (RF-29)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'create_rol' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/rol.entity */ "./libs/database/src/entities/rol.entity.ts").Rol) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "createRol", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'get_roles' (RF-29)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'get_roles' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/rol.entity */ "./libs/database/src/entities/rol.entity.ts").Rol)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getRoles", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'update_rol' (RF-29)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'update_rol' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/rol.entity */ "./libs/database/src/entities/rol.entity.ts").Rol) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateRol", null);
__decorate([
    openapi.ApiOperation({ summary: "Escucha el comando 'delete_rol' (RF-29)" }),
    (0, microservices_1.MessagePattern)({ cmd: 'delete_rol' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "deleteRol", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_vacante' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").Vacante) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "createVacante", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_vacantes' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").Vacante)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getVacantes", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_vacante' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").Vacante) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateVacante", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'registrar_candidato' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/candidato.entity */ "./libs/database/src/entities/candidato.entity.ts").Candidato) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_candidato_dto_1.CreateCandidatoDto]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "registrarCandidato", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_candidatos' }),
    openapi.ApiResponse({ status: 200, type: [(__webpack_require__(/*! ../../../libs/database/src/entities/candidato.entity */ "./libs/database/src/entities/candidato.entity.ts").Candidato)] }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getCandidatos", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'reanalizar_candidato' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/candidato.entity */ "./libs/database/src/entities/candidato.entity.ts").Candidato) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "reanalizarCandidato", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_documentos_empleado' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getDocumentosEmpleado", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'upload_documento_empleado' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/documentoEmpleado.entity */ "./libs/database/src/entities/documentoEmpleado.entity.ts").DocumentoEmpleado) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "uploadDocumentoEmpleado", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_foto_perfil' }),
    openapi.ApiResponse({ status: 200, type: (__webpack_require__(/*! ../../../libs/database/src/entities/empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateFotoPerfil", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_documento' }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "deleteDocumento", null);
exports.PersonalController = PersonalController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [personal_service_1.PersonalService])
], PersonalController);


/***/ }),

/***/ "./apps/personal/src/personal.module.ts":
/*!**********************************************!*\
  !*** ./apps/personal/src/personal.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const personal_controller_1 = __webpack_require__(/*! ./personal.controller */ "./apps/personal/src/personal.controller.ts");
const personal_service_1 = __webpack_require__(/*! ./personal.service */ "./apps/personal/src/personal.service.ts");
const mailer_1 = __webpack_require__(/*! @nestjs-modules/mailer */ "@nestjs-modules/mailer");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const database_1 = __webpack_require__(/*! default/database */ "./libs/database/src/index.ts");
let PersonalModule = class PersonalModule {
};
exports.PersonalModule = PersonalModule;
exports.PersonalModule = PersonalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env',
            }),
            database_1.DatabaseModule,
            typeorm_1.TypeOrmModule.forFeature([
                database_1.Empleado,
                database_1.Departamento,
                database_1.Cargo,
                database_1.Rol, database_1.Contrato,
                database_1.Vacante,
                database_1.Candidato,
                database_1.Usuario,
                database_1.DocumentoEmpleado,
            ]),
            microservices_1.ClientsModule.register([
                {
                    name: 'AUTH_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'auth_service',
                        port: 3001
                    },
                },
            ]),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'erickrodas559@gmail.com',
                        pass: 'tqhl basq ufjw vyor',
                    },
                },
                defaults: {
                    from: '"PuntoPyMES RRHH" <noreply@puntopymes.com>',
                },
            }),
        ],
        controllers: [personal_controller_1.PersonalController],
        providers: [personal_service_1.PersonalService],
    })
], PersonalModule);


/***/ }),

/***/ "./apps/personal/src/personal.service.ts":
/*!***********************************************!*\
  !*** ./apps/personal/src/personal.service.ts ***!
  \***********************************************/
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalService = void 0;
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const database_1 = __webpack_require__(/*! default/database */ "./libs/database/src/index.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const generative_ai_1 = __webpack_require__(/*! @google/generative-ai */ "@google/generative-ai");
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path_1 = __webpack_require__(/*! path */ "path");
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "axios"));
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const mailer_1 = __webpack_require__(/*! @nestjs-modules/mailer */ "@nestjs-modules/mailer");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let PersonalService = class PersonalService {
    empleadoRepository;
    rolRepository;
    cargoRepository;
    configService;
    contratoRepository;
    deptoRepository;
    vacanteRepository;
    candidatoRepository;
    documentoRepository;
    authClient;
    mailerService;
    genAI;
    constructor(empleadoRepository, rolRepository, cargoRepository, configService, contratoRepository, deptoRepository, vacanteRepository, candidatoRepository, documentoRepository, authClient, mailerService) {
        this.empleadoRepository = empleadoRepository;
        this.rolRepository = rolRepository;
        this.cargoRepository = cargoRepository;
        this.configService = configService;
        this.contratoRepository = contratoRepository;
        this.deptoRepository = deptoRepository;
        this.vacanteRepository = vacanteRepository;
        this.candidatoRepository = candidatoRepository;
        this.documentoRepository = documentoRepository;
        this.authClient = authClient;
        this.mailerService = mailerService;
        const apiKey = this.configService.getOrThrow('GEMINI_API_KEY');
        this.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
    }
    async getEmpleados(empresaId) {
        console.log(`Microservicio PERSONAL: Buscando empleados para empresaId: ${empresaId}`);
        return this.empleadoRepository.find({
            where: {
                empresaId: empresaId,
            },
            relations: ['cargo', 'rol'],
        });
    }
    async getEmpleado(empresaId, empleadoId) {
        const empleado = await this.empleadoRepository.findOne({
            where: { id: empleadoId, empresaId },
            relations: ['cargo', 'rol', 'cargo.departamento'],
        });
        if (!empleado) {
            throw new common_1.NotFoundException('Empleado no encontrado.');
        }
        return empleado;
    }
    async createEmpleado(empresaId, dto) {
        console.log(`Microservicio PERSONAL: Creando empleado para empresaId: ${empresaId}`);
        const rol = await this.rolRepository.findOneBy({
            id: dto.rolId,
            empresaId: empresaId,
        });
        if (!rol) {
            throw new common_1.BadRequestException('El Rol seleccionado no es válido o no pertenece a esta empresa.');
        }
        const cargo = await this.cargoRepository.findOne({
            where: {
                id: dto.cargoId,
                departamento: {
                    empresaId: empresaId,
                },
            },
        });
        if (!cargo) {
            throw new common_1.BadRequestException('El Cargo seleccionado no es válido o no pertenece a esta empresa.');
        }
        if (dto.jefeId) {
            const jefe = await this.empleadoRepository.findOneBy({
                id: dto.jefeId,
                empresaId: empresaId,
            });
            if (!jefe) {
                throw new common_1.BadRequestException('El Jefe seleccionado no es válido o no pertenece a esta empresa.');
            }
        }
        const nuevoEmpleado = this.empleadoRepository.create({
            ...dto,
            empresaId: empresaId,
        });
        const empleadoGuardado = await this.empleadoRepository.save(nuevoEmpleado);
        if (dto.emailPersonal) {
            try {
                console.log('🔄 Solicitando creación de usuario automático...');
                const credenciales = await (0, rxjs_1.firstValueFrom)(this.authClient.send({ cmd: 'create_user_auto' }, {
                    empleadoId: empleadoGuardado.id,
                    email: dto.emailPersonal,
                    nombre: dto.nombre,
                    empresaId: empresaId,
                }));
                await this.mailerService.sendMail({
                    to: dto.emailPersonal,
                    subject: 'Bienvenido a PuntoPyMES - Tus Credenciales de Acceso',
                    html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h1 style="color: #3f51b5;">¡Bienvenido/a ${dto.nombre}!</h1>
              <p>Has sido registrado exitosamente en la plataforma de Recursos Humanos de tu empresa.</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 5px 0;"><b>Usuario:</b> ${credenciales.email}</p>
                <p style="margin: 5px 0;"><b>Contraseña Temporal:</b> ${credenciales.password}</p>
              </div>
              <p>Por favor, ingresa al sistema y cambia tu contraseña lo antes posible.</p>
              <p>
                <a href="http://localhost:4200/auth/login" style="background-color: #3f51b5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ir al Sistema</a>
              </p>
            </div>
          `,
                });
                console.log(`📧 Credenciales enviadas a ${dto.emailPersonal}`);
            }
            catch (error) {
                console.error('❌ Error en flujo automático (Usuario/Correo):', error);
            }
        }
        return empleadoGuardado;
    }
    async updateEmpleado(empresaId, empleadoId, dto) {
        console.log(`Microservicio PERSONAL: Actualizando empleado ${empleadoId} para empresaId: ${empresaId}`);
        const empleado = await this.empleadoRepository.findOneBy({
            id: empleadoId,
            empresaId: empresaId,
        });
        if (!empleado) {
            throw new common_1.NotFoundException('Empleado no encontrado o no pertenece a esta empresa.');
        }
        if (dto.rolId) {
            const rol = await this.rolRepository.findOneBy({
                id: dto.rolId,
                empresaId: empresaId,
            });
            if (!rol) {
                throw new common_1.BadRequestException('El Rol seleccionado no es válido o no pertenece a esta empresa.');
            }
        }
        if (dto.cargoId) {
            const cargo = await this.cargoRepository.findOne({
                where: {
                    id: dto.cargoId,
                    departamento: {
                        empresaId: empresaId,
                    },
                },
            });
            if (!cargo) {
                throw new common_1.BadRequestException('El Cargo seleccionado no es válido o no pertenece a esta empresa.');
            }
        }
        const empleadoActualizado = this.empleadoRepository.merge(empleado, dto);
        return this.empleadoRepository.save(empleadoActualizado);
    }
    async deleteEmpleado(empresaId, empleadoId) {
        console.log(`Microservicio PERSONAL: Desvinculando empleado ${empleadoId} (finalizando contrato) para empresaId: ${empresaId}`);
        const contratoActivo = await this.contratoRepository.findOne({
            where: {
                empleado: { id: empleadoId, empresaId: empresaId },
                estado: 'Activo',
            },
        });
        if (!contratoActivo) {
            throw new common_1.NotFoundException('No se encontró un contrato activo para este empleado.');
        }
        contratoActivo.estado = 'Inactivo';
        await this.contratoRepository.save(contratoActivo);
        const empleado = await this.empleadoRepository.findOneBy({
            id: empleadoId,
            empresaId: empresaId,
        });
        if (empleado) {
            empleado.estado = 'Inactivo';
            await this.empleadoRepository.save(empleado);
        }
        return {
            message: 'Empleado desvinculado (contrato finalizado) correctamente.',
        };
    }
    async createDepartamento(empresaId, dto) {
        console.log(`Microservicio PERSONAL: Creando departamento para empresaId: ${empresaId}`);
        const deptoExistente = await this.deptoRepository.findOneBy({
            nombre: dto.nombre,
            empresaId: empresaId,
        });
        if (deptoExistente) {
            throw new common_1.ConflictException('Ya existe un departamento con ese nombre en esta empresa.');
        }
        const nuevoDepto = this.deptoRepository.create({
            ...dto,
            empresaId: empresaId,
        });
        return this.deptoRepository.save(nuevoDepto);
    }
    async getDepartamentos(empresaId) {
        console.log(`Microservicio PERSONAL: Buscando departamentos para empresaId: ${empresaId}`);
        return this.deptoRepository.find({
            where: {
                empresaId: empresaId,
            },
            relations: ['cargos'],
        });
    }
    async updateDepartamento(empresaId, deptoId, dto) {
        console.log(`Microservicio PERSONAL: Actualizando depto ${deptoId} para empresaId: ${empresaId}`);
        const depto = await this.deptoRepository.findOneBy({
            id: deptoId,
            empresaId: empresaId,
        });
        if (!depto) {
            throw new common_1.NotFoundException('Departamento no encontrado o no pertenece a esta empresa.');
        }
        if (dto.nombre && dto.nombre !== depto.nombre) {
            const deptoExistente = await this.deptoRepository.findOneBy({
                nombre: dto.nombre,
                empresaId: empresaId,
            });
            if (deptoExistente) {
                throw new common_1.ConflictException('Ya existe un departamento con ese nombre en esta empresa.');
            }
        }
        const deptoActualizado = this.deptoRepository.merge(depto, dto);
        return this.deptoRepository.save(deptoActualizado);
    }
    async deleteDepartamento(empresaId, deptoId) {
        console.log(`Microservicio PERSONAL: Borrando (Soft Delete) depto ${deptoId} para empresaId: ${empresaId}`);
        const depto = await this.deptoRepository.findOneBy({
            id: deptoId,
            empresaId: empresaId,
        });
        if (!depto) {
            throw new common_1.NotFoundException('Departamento no encontrado o no pertenece a esta empresa.');
        }
        await this.deptoRepository.softRemove(depto);
        return { message: 'Departamento desactivado correctamente.' };
    }
    async createCargo(empresaId, dto) {
        console.log(`Microservicio PERSONAL: Creando cargo para empresaId: ${empresaId}`);
        const depto = await this.deptoRepository.findOneBy({
            id: dto.departamentoId,
            empresaId: empresaId,
        });
        if (!depto) {
            throw new common_1.BadRequestException('El Departamento seleccionado no es válido o no pertenece a esta empresa.');
        }
        const cargoExistente = await this.cargoRepository.findOneBy({
            nombre: dto.nombre,
            departamentoId: dto.departamentoId,
        });
        if (cargoExistente) {
            throw new common_1.ConflictException('Ya existe un cargo con ese nombre en este departamento.');
        }
        const nuevoCargo = this.cargoRepository.create({
            ...dto,
        });
        return this.cargoRepository.save(nuevoCargo);
    }
    async getCargos(empresaId) {
        console.log(`Microservicio PERSONAL: Buscando cargos para empresaId: ${empresaId}`);
        return this.cargoRepository.find({
            where: {
                departamento: {
                    empresaId: empresaId,
                },
            },
            relations: ['departamento'],
            withDeleted: false,
        });
    }
    async updateCargo(empresaId, cargoId, dto) {
        console.log(`Microservicio PERSONAL: Actualizando cargo ${cargoId} para empresaId: ${empresaId}`);
        const cargo = await this.cargoRepository.findOne({
            where: { id: cargoId },
            relations: ['departamento'],
        });
        if (!cargo || cargo.departamento.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Cargo no encontrado o no pertenece a esta empresa.');
        }
        if (dto.departamentoId && dto.departamentoId !== cargo.departamentoId) {
            const nuevoDepto = await this.deptoRepository.findOneBy({
                id: dto.departamentoId,
                empresaId: empresaId,
            });
            if (!nuevoDepto) {
                throw new common_1.BadRequestException('El nuevo departamento seleccionado no es válido o no pertenece a esta empresa.');
            }
        }
        if (dto.nombre || dto.departamentoId) {
            const nombreValidar = dto.nombre || cargo.nombre;
            const deptoIdValidar = dto.departamentoId || cargo.departamentoId;
            const cargoExistente = await this.cargoRepository.findOne({
                where: {
                    nombre: nombreValidar,
                    departamentoId: deptoIdValidar,
                    id: (0, typeorm_2.Not)(cargoId),
                },
            });
            if (cargoExistente) {
                throw new common_1.ConflictException('Ya existe un cargo con ese nombre en el departamento seleccionado.');
            }
        }
        const cargoActualizado = this.cargoRepository.merge(cargo, dto);
        return this.cargoRepository.save(cargoActualizado);
    }
    async deleteCargo(empresaId, cargoId) {
        console.log(`Microservicio PERSONAL: Borrando (Soft Delete) cargo ${cargoId} para empresaId: ${empresaId}`);
        const cargo = await this.cargoRepository.findOne({
            where: { id: cargoId },
            relations: ['departamento'],
        });
        if (!cargo || cargo.departamento.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Cargo no encontrado o no pertenece a esta empresa.');
        }
        await this.cargoRepository.softRemove(cargo);
        return { message: 'Cargo desactivado correctamente.' };
    }
    async createRol(empresaId, dto) {
        console.log(`Microservicio PERSONAL: Creando Rol para empresaId: ${empresaId}`);
        const rolExistente = await this.rolRepository.findOneBy({
            nombre: dto.nombre,
            empresaId: empresaId,
        });
        if (rolExistente) {
            throw new common_1.ConflictException('Ya existe un rol con ese nombre en esta empresa.');
        }
        const nuevoRol = this.rolRepository.create({
            ...dto,
            empresaId: empresaId,
            permisos: dto.permisos || {},
        });
        return this.rolRepository.save(nuevoRol);
    }
    async getRoles(empresaId) {
        console.log(`Microservicio PERSONAL: Buscando Roles para empresaId: ${empresaId}`);
        return this.rolRepository.find({
            where: {
                empresaId: empresaId,
            },
            withDeleted: false,
        });
    }
    async updateRol(empresaId, rolId, dto) {
        console.log(`Microservicio PERSONAL: Actualizando Rol ${rolId} para empresaId: ${empresaId}`);
        const rol = await this.rolRepository.findOneBy({
            id: rolId,
            empresaId: empresaId,
        });
        if (!rol) {
            throw new common_1.NotFoundException('Rol no encontrado o no pertenece a esta empresa.');
        }
        if (dto.nombre && dto.nombre !== rol.nombre) {
            const rolExistente = await this.rolRepository.findOneBy({
                nombre: dto.nombre,
                empresaId: empresaId,
                id: (0, typeorm_2.Not)(rolId),
            });
            if (rolExistente) {
                throw new common_1.ConflictException('Ya existe un rol con ese nombre en esta empresa.');
            }
        }
        const rolActualizado = this.rolRepository.merge(rol, dto);
        return this.rolRepository.save(rolActualizado);
    }
    async deleteRol(empresaId, rolId) {
        console.log(`Microservicio PERSONAL: Borrando (Soft Delete) Rol ${rolId} para empresaId: ${empresaId}`);
        const rol = await this.rolRepository.findOneBy({
            id: rolId,
            empresaId: empresaId,
        });
        if (!rol) {
            throw new common_1.NotFoundException('Rol no encontrado o no pertenece a esta empresa.');
        }
        const empleadosConRol = await this.empleadoRepository.count({
            where: {
                rolId: rolId,
                empresaId: empresaId,
            },
        });
        if (empleadosConRol > 0) {
            throw new common_1.ConflictException(`No se puede eliminar el rol. Está asignado a ${empleadosConRol} empleado(s).`);
        }
        await this.rolRepository.softRemove(rol);
        return { message: 'Rol desactivado correctamente.' };
    }
    async createVacante(empresaId, dto) {
        if (dto.departamentoId) {
            const dep = await this.deptoRepository.findOneBy({ id: dto.departamentoId, empresaId });
            if (!dep)
                throw new common_1.BadRequestException('Departamento no válido.');
        }
        const vacante = this.vacanteRepository.create({
            ...dto,
            empresaId,
            estado: dto.estado || database_1.EstadoVacante.BORRADOR,
        });
        return this.vacanteRepository.save(vacante);
    }
    async getVacantes(empresaId, soloPublicas = false) {
        const where = { empresaId };
        if (soloPublicas) {
            where.estado = database_1.EstadoVacante.PUBLICA;
        }
        return this.vacanteRepository.find({ where, order: { createdAt: 'DESC' } });
    }
    async updateVacante(empresaId, vacanteId, dto) {
        const vacante = await this.vacanteRepository.findOneBy({ id: vacanteId, empresaId });
        if (!vacante)
            throw new common_1.NotFoundException('Vacante no encontrada.');
        this.vacanteRepository.merge(vacante, dto);
        return this.vacanteRepository.save(vacante);
    }
    async registrarCandidato(dto) {
        const vacante = await this.vacanteRepository.findOneBy({ id: dto.vacanteId });
        if (!vacante)
            throw new common_1.NotFoundException('La vacante no existe.');
        const existente = await this.candidatoRepository.findOne({
            where: { email: dto.email, vacanteId: dto.vacanteId }
        });
        if (existente)
            throw new common_1.BadRequestException('Ya has postulado a esta vacante.');
        const candidato = this.candidatoRepository.create({
            ...dto,
            estado: database_1.EstadoCandidato.ANALIZANDO_IA,
        });
        await this.candidatoRepository.save(candidato);
        this.analizarCVConIA(candidato, vacante).catch(err => {
            console.error(`Error en análisis IA para candidato ${candidato.id}:`, err);
            this.candidatoRepository.update(candidato.id, { estado: database_1.EstadoCandidato.NUEVO });
        });
        return candidato;
    }
    async analizarCVConIA(candidato, vacante) {
        try {
            console.log(`🤖 Iniciando análisis IA para: ${candidato.nombre}`);
            let pdfBuffer;
            if (candidato.cvUrl.includes('localhost')) {
                const urlParts = candidato.cvUrl.split('/uploads/');
                if (!urlParts[1]) {
                    throw new Error('Formato de URL local no reconocido');
                }
                const filePath = (0, path_1.join)(process.cwd(), 'uploads', urlParts[1]);
                console.log(`📂 Leyendo archivo local desde: ${filePath}`);
                if (!fs.existsSync(filePath)) {
                    throw new Error(`El archivo no existe en la ruta física: ${filePath}`);
                }
                pdfBuffer = fs.readFileSync(filePath);
            }
            else {
                console.log(`🌐 Descargando archivo remoto: ${candidato.cvUrl}`);
                const response = await axios_1.default.get(candidato.cvUrl, { responseType: 'arraybuffer' });
                pdfBuffer = Buffer.from(response.data);
            }
            console.log('🧠 Enviando PDF directamente a Gemini...');
            const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
            const pdfBase64 = pdfBuffer.toString('base64');
            const prompt = `
      Actúa como un Reclutador Técnico Experto.
      Analiza el siguiente Currículum Vitae (PDF adjunto) frente a la Vacante proporcionada.
      
      VACANTE:
      - Título: ${vacante.titulo}
      - Descripción: ${vacante.descripcion}
      - Requisitos: ${vacante.requisitos}

      INSTRUCCIONES:
      1. Lee TODO el contenido del CV (incluso si está en formato imagen).
      2. Evalúa la coincidencia de habilidades técnicas y blandas.
      3. Tu respuesta DEBE ser estrictamente un objeto JSON válido (sin markdown, sin bloques de código).
      4. El contenido del JSON debe estar SIEMPRE EN ESPAÑOL.

      FORMATO JSON ESPERADO:
      {
        "aiScore": (número entero 0-100),
        "aiAnalysis": (resumen de texto justificando el puntaje, máximo 300 caracteres)
      }
    `;
            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: pdfBase64,
                        mimeType: 'application/pdf'
                    }
                }
            ]);
            const responseText = result.response.text();
            console.log('✅ Gemini procesó el PDF correctamente');
            const jsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const analisis = JSON.parse(jsonString);
            await this.candidatoRepository.update(candidato.id, {
                aiScore: analisis.aiScore,
                aiAnalysis: analisis.aiAnalysis,
                estado: database_1.EstadoCandidato.NUEVO,
            });
            console.log(`✅ Análisis IA completado con éxito. Score: ${analisis.aiScore}`);
        }
        catch (error) {
            console.error('❌ Error procesando IA:', error);
            console.error('📋 Stack trace:', error.stack);
            try {
                await this.candidatoRepository.update(candidato.id, {
                    estado: database_1.EstadoCandidato.REVISION,
                    aiAnalysis: `Error en análisis automático: ${error.message}`
                });
            }
            catch (updateError) {
                console.error('❌ Error al actualizar estado de candidato:', updateError);
            }
        }
    }
    async getCandidatos(empresaId, vacanteId) {
        const vacante = await this.vacanteRepository.findOneBy({ id: vacanteId, empresaId });
        if (!vacante) {
            throw new common_1.NotFoundException('Vacante no encontrada o no tienes acceso.');
        }
        return this.candidatoRepository.find({
            where: { vacanteId },
            order: {
                aiScore: 'DESC',
                fechaPostulacion: 'DESC'
            },
        });
    }
    async reanalizarCandidato(candidatoId) {
        const candidato = await this.candidatoRepository.findOne({
            where: { id: candidatoId },
            relations: ['vacante'],
        });
        if (!candidato) {
            throw new common_1.NotFoundException('Candidato no encontrado.');
        }
        candidato.estado = database_1.EstadoCandidato.ANALIZANDO_IA;
        candidato.aiScore = null;
        candidato.aiAnalysis = null;
        await this.candidatoRepository.save(candidato);
        this.analizarCVConIA(candidato, candidato.vacante).catch(err => {
            console.error('Error en reanálisis:', err);
            this.candidatoRepository.update(candidato.id, {
                estado: database_1.EstadoCandidato.REVISION,
                aiAnalysis: 'Error al reintentar análisis.'
            });
        });
        return candidato;
    }
    async getDocumentosEmpleado(empresaId, empleadoId) {
        const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
        if (!empleado)
            throw new common_1.NotFoundException('Empleado no encontrado');
        const documentos = [];
        const candidato = await this.candidatoRepository.findOneBy({ email: empleado.emailPersonal });
        if (candidato && candidato.cvUrl) {
            documentos.push({
                name: 'Currículum Vitae (CV)',
                type: 'Reclutamiento',
                origin: 'Empleado',
                date: candidato.fechaPostulacion,
                url: candidato.cvUrl,
                canDelete: false
            });
        }
        const docsSubidos = await this.documentoRepository.find({
            where: { empleadoId },
            order: { fechaSubida: 'DESC' }
        });
        docsSubidos.forEach(doc => {
            documentos.push({
                id: doc.id,
                name: doc.nombre,
                type: doc.tipo,
                origin: 'Empresa',
                date: doc.fechaSubida,
                url: doc.url,
                canDelete: true
            });
        });
        return documentos;
    }
    async uploadDocumentoEmpleado(empresaId, empleadoId, dto) {
        console.log(`Microservicio PERSONAL: Guardando documento para empleado ${empleadoId}`);
        const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
        if (!empleado) {
            throw new common_1.NotFoundException('Empleado no encontrado o no pertenece a tu empresa.');
        }
        const nuevoDocumento = this.documentoRepository.create({
            empleadoId,
            nombre: dto.nombre,
            tipo: dto.tipo,
            url: dto.url,
            fechaSubida: new Date(),
        });
        return this.documentoRepository.save(nuevoDocumento);
    }
    async updateFotoPerfil(empresaId, empleadoId, fileUrl) {
        const empleado = await this.empleadoRepository.findOneBy({ id: empleadoId, empresaId });
        if (!empleado)
            throw new common_1.NotFoundException('Empleado no encontrado');
        empleado.fotoUrl = fileUrl;
        return this.empleadoRepository.save(empleado);
    }
    async deleteDocumento(empresaId, documentoId) {
        const documento = await this.documentoRepository.findOne({
            where: { id: documentoId },
            relations: ['empleado']
        });
        if (!documento || documento.empleado.empresaId !== empresaId) {
            throw new common_1.NotFoundException('Documento no encontrado o no tienes permiso.');
        }
        await this.documentoRepository.remove(documento);
        return { message: 'Documento eliminado correctamente.' };
    }
};
exports.PersonalService = PersonalService;
exports.PersonalService = PersonalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.Empleado)),
    __param(1, (0, typeorm_1.InjectRepository)(database_1.Rol)),
    __param(2, (0, typeorm_1.InjectRepository)(database_1.Cargo)),
    __param(4, (0, typeorm_1.InjectRepository)(database_1.Contrato)),
    __param(5, (0, typeorm_1.InjectRepository)(database_1.Departamento)),
    __param(6, (0, typeorm_1.InjectRepository)(database_1.Vacante)),
    __param(7, (0, typeorm_1.InjectRepository)(database_1.Candidato)),
    __param(8, (0, typeorm_1.InjectRepository)(database_1.DocumentoEmpleado)),
    __param(9, (0, common_2.Inject)('AUTH_SERVICE')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        microservices_1.ClientProxy,
        mailer_1.MailerService])
], PersonalService);


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
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, puntosHistoria: { required: false, type: () => Number, minimum: 0 }, estado: { required: false, enum: (__webpack_require__(/*! ./create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts").EstadoTarea) }, prioridad: { required: false, enum: (__webpack_require__(/*! ./create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts").PrioridadTarea) } };
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
    departamento;
    departamentoId;
    empleados;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre del puesto de trabajo\nMapea: string nombre \"Nombre puesto trabajo\"" }, departamento: { required: true, type: () => (__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento) }, departamentoId: { required: true, type: () => String, description: "Mapea: string departamentoId FK \"Departamento padre\"" }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)], description: "Columna para Soft Delete (Borrado L\u00F3gico)\nSi es NULL, el cargo est\u00E1 activo.\nSi tiene fecha, est\u00E1 \"borrado\" y se ocultar\u00E1." } };
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
    empleado;
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { tipo: { required: true, type: () => String, description: "Tipo de contrato laboral (Indefinido, Temporal, Servicios, etc.)\nMapea: string tipo \"Tipo contrato laboral\"" }, salario: { required: true, type: () => Number, description: "Salario mensual nominal\nMapea: float salario \"Salario mensual nominal\"" }, moneda: { required: true, type: () => String, description: "C\u00F3digo de moneda de pago (USD, EUR, etc.)\nMapea: string moneda \"Codigo moneda pago\"" }, fechaInicio: { required: true, type: () => Date, description: "Fecha de inicio de vigencia del contrato\nMapea: date fechaInicio \"Inicio vigencia contrato\"" }, fechaFin: { required: true, type: () => Date, description: "Fecha de fin de vigencia del contrato (opcional)\nMapea: date fechaFin \"Fin vigencia nullable\"" }, estado: { required: true, type: () => String }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, empleadoId: { required: true, type: () => String, description: "Mapea: string empleadoId FK \"Empleado contratado\"" } };
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
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.contratos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Contrato.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado al que pertenece el contrato' }),
    __metadata("design:type", String)
], Contrato.prototype, "empleadoId", void 0);
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
        return { nombre: { required: true, type: () => String }, apellido: { required: true, type: () => String }, tipoIdentificacion: { required: true, type: () => String }, nroIdentificacion: { required: true, type: () => String }, emailPersonal: { required: true, type: () => String }, telefono: { required: true, type: () => String }, direccion: { required: true, type: () => String }, fechaNacimiento: { required: true, type: () => Date }, estado: { required: true, type: () => String }, datosPersonalizados: { required: true, type: () => Object }, fotoUrl: { required: true, type: () => String }, empresa: { required: true, type: () => (__webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts").Empresa) }, empresaId: { required: true, type: () => String }, usuario: { required: true, type: () => (__webpack_require__(/*! ./usuario.entity */ "./libs/database/src/entities/usuario.entity.ts").Usuario) }, usuarioId: { required: true, type: () => String }, rol: { required: true, type: () => (__webpack_require__(/*! ./rol.entity */ "./libs/database/src/entities/rol.entity.ts").Rol) }, rolId: { required: true, type: () => String }, cargo: { required: true, type: () => (__webpack_require__(/*! ./cargo.entity */ "./libs/database/src/entities/cargo.entity.ts").Cargo) }, cargoId: { required: true, type: () => String }, jefe: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado) }, jefeId: { required: true, type: () => String }, contratos: { required: true, type: () => [(__webpack_require__(/*! ./contrato.entity */ "./libs/database/src/entities/contrato.entity.ts").Contrato)] }, nominas: { required: true, type: () => [(__webpack_require__(/*! ./nominaEmpleado.entity */ "./libs/database/src/entities/nominaEmpleado.entity.ts").NominaEmpleado)] }, beneficiosAsignados: { required: true, type: () => [(__webpack_require__(/*! ./beneficioAsignado.entity */ "./libs/database/src/entities/beneficioAsignado.entity.ts").BeneficioAsignado)] }, tareasAsignadas: { required: true, type: () => [(__webpack_require__(/*! ./asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts").AsignacionTarea)] }, timesheets: { required: true, type: () => [(__webpack_require__(/*! ./timesheet.entity */ "./libs/database/src/entities/timesheet.entity.ts").Timesheet)] }, objetivos: { required: true, type: () => [(__webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").Objetivo)] }, evaluacionesRecibidas: { required: true, type: () => [(__webpack_require__(/*! ./evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts").Evaluacion)] }, evaluacionesHechas: { required: true, type: () => [(__webpack_require__(/*! ./evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts").Evaluacion)] }, inscripcionesCursos: { required: true, type: () => [(__webpack_require__(/*! ./inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").InscripcionCurso)] }, registrosAsistencia: { required: true, type: () => [(__webpack_require__(/*! ./registroAsistencia.entity */ "./libs/database/src/entities/registroAsistencia.entity.ts").RegistroAsistencia)] }, activosAsignados: { required: true, type: () => [(__webpack_require__(/*! ./activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts").ActivoAsignado)] }, reportesGastos: { required: true, type: () => [(__webpack_require__(/*! ./reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").ReporteGasto)] }, asignaciones: { required: true, type: () => [(__webpack_require__(/*! ./asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts").AsignacionTarea)], description: "Relaci\u00F3n: Un Empleado puede tener MUCHAS asignaciones de tareas." }, documentos: { required: true, type: () => [(__webpack_require__(/*! ./documentoEmpleado.entity */ "./libs/database/src/entities/documentoEmpleado.entity.ts").DocumentoEmpleado)] } };
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
let Empresa = class Empresa extends base_entity_1.BaseEntity {
    nombre;
    planSuscripcion;
    branding;
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
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, description: "Nombre de la empresa cliente\nMapea: string nombre \"Nombre empresa cliente\"" }, planSuscripcion: { required: true, type: () => String, description: "Plan de suscripci\u00F3n de la empresa (RNF22)\nMapea: string planSuscripcion \"Basico Pro Enterprise\"" }, branding: { required: true, type: () => ({ logoUrl: { required: true, type: () => String }, color: { required: true, type: () => String } }), description: "Configuraci\u00F3n de branding (logo y colores) (RNF24)\nMapea: json branding \"Logo y colores personalizados\"" }, empleados: { required: true, type: () => [(__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado)] }, roles: { required: true, type: () => [(__webpack_require__(/*! ./rol.entity */ "./libs/database/src/entities/rol.entity.ts").Rol)], description: "Relaci\u00F3n: Una Empresa define muchos Roles." }, departamentos: { required: true, type: () => [(__webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts").Departamento)], description: "Relaci\u00F3n: Una Empresa organiza muchos Departamentos." }, proyectos: { required: true, type: () => [(__webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts").Proyecto)], description: "Relaci\u00F3n: Una Empresa gestiona muchos Proyectos." }, cursos: { required: true, type: () => [(__webpack_require__(/*! ./curso.entity */ "./libs/database/src/entities/curso.entity.ts").Curso)], description: "Relaci\u00F3n: Una Empresa ofrece muchos Cursos." }, activos: { required: true, type: () => [(__webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts").Activo)], description: "Relaci\u00F3n: Una Empresa posee muchos Activos." }, beneficios: { required: true, type: () => [(__webpack_require__(/*! ./beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").Beneficio)], description: "Relaci\u00F3n: Una Empresa provee muchos Beneficios." }, periodosNomina: { required: true, type: () => [(__webpack_require__(/*! ./periodoNomina.entity */ "./libs/database/src/entities/periodoNomina.entity.ts").PeriodoNomina)], description: "Relaci\u00F3n: Una Empresa procesa muchos Periodos de N\u00F3mina." }, ciclosEvaluacion: { required: true, type: () => [(__webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").CicloEvaluacion)], description: "Relaci\u00F3n: Una Empresa ejecuta muchos Ciclos de Evaluaci\u00F3n." }, vacantes: { required: true, type: () => [(__webpack_require__(/*! ./vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").Vacante)] } };
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
exports.Objetivo = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const cicloEvaluacion_entity_1 = __webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Objetivo = class Objetivo extends base_entity_1.BaseEntity {
    descripcion;
    progreso;
    ciclo;
    cicloId;
    empleado;
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { descripcion: { required: true, type: () => String, description: "Descripci\u00F3n del objetivo a medir\nMapea: string descripcion \"Descripcion objetivo medir\"" }, progreso: { required: true, type: () => Number, description: "Porcentaje de progreso del objetivo (0-100)\nMapea: float progreso \"Porcentaje progreso 0-100\"" }, ciclo: { required: true, type: () => (__webpack_require__(/*! ./cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").CicloEvaluacion) }, cicloId: { required: true, type: () => String, description: "Mapea: string cicloId FK \"Ciclo evaluacion pertenece\"" }, empleado: { required: true, type: () => (__webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts").Empleado), description: "Relaci\u00F3n: El objetivo est\u00E1 asignado a UN Empleado.\nonDelete: 'CASCADE' = Si el Empleado es borrado, sus objetivos\n(que no tienen sentido sin \u00E9l) tambi\u00E9n se borran." }, empleadoId: { required: true, type: () => String, description: "Mapea: string empleadoId FK \"Empleado objetivo asignado\"" } };
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
    (0, typeorm_1.ManyToOne)(() => cicloEvaluacion_entity_1.CicloEvaluacion, (ciclo) => ciclo.objetivos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'cicloId' }),
    __metadata("design:type", cicloEvaluacion_entity_1.CicloEvaluacion)
], Objetivo.prototype, "ciclo", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Ciclo de Evaluación al que pertenece' }),
    __metadata("design:type", String)
], Objetivo.prototype, "cicloId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.objetivos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", empleado_entity_1.Empleado)
], Objetivo.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado al que se asignó el objetivo' }),
    __metadata("design:type", String)
], Objetivo.prototype, "empleadoId", void 0);
exports.Objetivo = Objetivo = __decorate([
    (0, typeorm_1.Entity)({ name: 'objetivos' }),
    (0, typeorm_1.Index)(['cicloId']),
    (0, typeorm_1.Index)(['empleadoId'])
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
const create_tarea_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts");
let Tarea = class Tarea extends base_entity_1.BaseEntity {
    titulo;
    descripcion;
    puntosHistoria;
    estado;
    prioridad;
    proyecto;
    proyectoId;
    sprint;
    sprintId;
    asignaciones;
    timesheets;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String, description: "T\u00EDtulo de la tarea\nMapea: string titulo \"Titulo tarea\"" }, descripcion: { required: true, type: () => String, description: "Descripci\u00F3n detallada de la tarea\nMapea: string descripcion \"Descripcion detallada tarea\"" }, puntosHistoria: { required: true, type: () => Number, description: "Puntos de historia (Estimaci\u00F3n de esfuerzo)\n\u00DAtil para metodolog\u00EDas \u00E1giles." }, estado: { required: true, description: "Estado actual de la tarea\nUsa el Enum: PENDIENTE, EN_PROGRESO, COMPLETADA", enum: (__webpack_require__(/*! ../../../../apps/productividad/src/dto/create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts").EstadoTarea) }, prioridad: { required: true, description: "Nivel de prioridad de la tarea\nUsa el Enum: BAJA, MEDIA, ALTA\nIMPORTANTE: Tipo 'varchar' porque el Enum tiene valores de texto.", enum: (__webpack_require__(/*! ../../../../apps/productividad/src/dto/create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts").PrioridadTarea) }, proyecto: { required: true, type: () => (__webpack_require__(/*! ./proyecto.entity */ "./libs/database/src/entities/proyecto.entity.ts").Proyecto) }, proyectoId: { required: true, type: () => String, description: "Mapea: string proyectoId FK \"Proyecto padre tarea\"" }, sprint: { required: true, type: () => (__webpack_require__(/*! ./sprint.entity */ "./libs/database/src/entities/sprint.entity.ts").Sprint), description: "Relaci\u00F3n: Una Tarea PUEDE pertenecer a UN Sprint (opcional).\nonDelete: 'SET NULL' = Si se borra el Sprint, la tarea vuelve al Backlog (sprintId = null)" }, sprintId: { required: true, type: () => String, description: "Mapea: string sprintId FK \"Sprint pertenece nullable\"" }, asignaciones: { required: true, type: () => [(__webpack_require__(/*! ./asignacionTarea.entity */ "./libs/database/src/entities/asignacionTarea.entity.ts").AsignacionTarea)] }, timesheets: { required: true, type: () => [(__webpack_require__(/*! ./timesheet.entity */ "./libs/database/src/entities/timesheet.entity.ts").Timesheet)], description: "Relaci\u00F3n: En una Tarea se pueden registrar muchas entradas de horas (Timesheets).\n'cascade: true' = Si se borra la Tarea, sus registros de horas se borran." } };
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

/***/ "@google/generative-ai":
/*!****************************************!*\
  !*** external "@google/generative-ai" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@google/generative-ai");

/***/ }),

/***/ "@nestjs-modules/mailer":
/*!*****************************************!*\
  !*** external "@nestjs-modules/mailer" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

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

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

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
/*!***********************************!*\
  !*** ./apps/personal/src/main.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const personal_module_1 = __webpack_require__(/*! ./personal.module */ "./apps/personal/src/personal.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
async function bootstrap() {
    const tempApp = await core_1.NestFactory.createApplicationContext(personal_module_1.PersonalModule);
    const configService = tempApp.get(config_1.ConfigService);
    const port = configService.get('PERSONAL_SERVICE_PORT') || 3002;
    await tempApp.close();
    const app = await core_1.NestFactory.createMicroservice(personal_module_1.PersonalModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: '0.0.0.0',
            port: port,
        },
    });
    await app.listen();
    console.log(`🚀 Microservicio PERSONAL está escuchando en el puerto ${port}`);
}
bootstrap();

})();

/******/ })()
;