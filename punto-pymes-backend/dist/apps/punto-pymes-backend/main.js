/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth/src/dto/login.dto.ts":
/*!****************************************!*\
  !*** ./apps/auth/src/dto/login.dto.ts ***!
  \****************************************/
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
exports.LoginDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDto {
    email;
    password;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String } };
    }
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'El email no es válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email no puede estar vacío.' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña no puede estar vacía.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),

/***/ "./apps/auth/src/dto/register.dto.ts":
/*!*******************************************!*\
  !*** ./apps/auth/src/dto/register.dto.ts ***!
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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
    nombreEmpresa;
    nombreAdmin;
    apellidoAdmin;
    email;
    password;
    logoUrl;
    colorCorporativo;
    planSuscripcion;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombreEmpresa: { required: true, type: () => String }, nombreAdmin: { required: true, type: () => String }, apellidoAdmin: { required: true, type: () => String }, email: { required: true, type: () => String, format: "email" }, password: { required: true, type: () => String, minLength: 8 }, logoUrl: { required: false, type: () => String }, colorCorporativo: { required: false, type: () => String }, planSuscripcion: { required: false, type: () => String } };
    }
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de la empresa no puede estar vacío.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "nombreEmpresa", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tu nombre no puede estar vacío.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "nombreAdmin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tu apellido no puede estar vacío.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "apellidoAdmin", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'El email no es válido.' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'El email no puede estar vacío.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La contraseña no puede estar vacía.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "logoUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "colorCorporativo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "planSuscripcion", void 0);


/***/ }),

/***/ "./apps/auth/src/dto/update-configuracion.dto.ts":
/*!*******************************************************!*\
  !*** ./apps/auth/src/dto/update-configuracion.dto.ts ***!
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
exports.UpdateConfiguracionEmpresaDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class ConfigModulosDto {
    reclutamiento;
    onboarding;
    desempeno;
    proyectos;
    kpis;
    asistencia;
    hojasTiempo;
    nomina;
    beneficios;
    capacitacion;
    documentos;
    activos;
    reportes;
    comunicacion;
    static _OPENAPI_METADATA_FACTORY() {
        return { reclutamiento: { required: false, type: () => Boolean }, onboarding: { required: false, type: () => Boolean }, desempeno: { required: false, type: () => Boolean }, proyectos: { required: false, type: () => Boolean }, kpis: { required: false, type: () => Boolean }, asistencia: { required: false, type: () => Boolean }, hojasTiempo: { required: false, type: () => Boolean }, nomina: { required: false, type: () => Boolean }, beneficios: { required: false, type: () => Boolean }, capacitacion: { required: false, type: () => Boolean }, documentos: { required: false, type: () => Boolean }, activos: { required: false, type: () => Boolean }, reportes: { required: false, type: () => Boolean }, comunicacion: { required: false, type: () => Boolean } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "reclutamiento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "onboarding", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "desempeno", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "proyectos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "kpis", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "asistencia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "hojasTiempo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "nomina", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "beneficios", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "capacitacion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "documentos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "activos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "reportes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ConfigModulosDto.prototype, "comunicacion", void 0);
class ConfigAsistenciaDto {
    horaEntrada;
    horaSalida;
    toleranciaRetraso;
    static _OPENAPI_METADATA_FACTORY() {
        return { horaEntrada: { required: false, type: () => String, pattern: "/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/" }, horaSalida: { required: false, type: () => String, pattern: "/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/" }, toleranciaRetraso: { required: false, type: () => Number, minimum: 0 } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'La hora debe ser HH:mm' }),
    __metadata("design:type", String)
], ConfigAsistenciaDto.prototype, "horaEntrada", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'La hora debe ser HH:mm' }),
    __metadata("design:type", String)
], ConfigAsistenciaDto.prototype, "horaSalida", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ConfigAsistenciaDto.prototype, "toleranciaRetraso", void 0);
class ConfigNominaDto {
    frecuenciaPago;
    multiplicadorHorasExtra;
    static _OPENAPI_METADATA_FACTORY() {
        return { frecuenciaPago: { required: false, type: () => Object }, multiplicadorHorasExtra: { required: false, type: () => Number, minimum: 1 } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['mensual', 'quincenal', 'semanal']),
    __metadata("design:type", String)
], ConfigNominaDto.prototype, "frecuenciaPago", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ConfigNominaDto.prototype, "multiplicadorHorasExtra", void 0);
class ConfigVacacionesDto {
    diasPorAnio;
    static _OPENAPI_METADATA_FACTORY() {
        return { diasPorAnio: { required: false, type: () => Number, minimum: 0 } };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ConfigVacacionesDto.prototype, "diasPorAnio", void 0);
class UpdateConfiguracionEmpresaDto {
    modulos;
    asistencia;
    nomina;
    vacaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { modulos: { required: false, type: () => ConfigModulosDto }, asistencia: { required: false, type: () => ConfigAsistenciaDto }, nomina: { required: false, type: () => ConfigNominaDto }, vacaciones: { required: false, type: () => ConfigVacacionesDto } };
    }
}
exports.UpdateConfiguracionEmpresaDto = UpdateConfiguracionEmpresaDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ConfigModulosDto),
    __metadata("design:type", ConfigModulosDto)
], UpdateConfiguracionEmpresaDto.prototype, "modulos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ConfigAsistenciaDto),
    __metadata("design:type", ConfigAsistenciaDto)
], UpdateConfiguracionEmpresaDto.prototype, "asistencia", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ConfigNominaDto),
    __metadata("design:type", ConfigNominaDto)
], UpdateConfiguracionEmpresaDto.prototype, "nomina", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ConfigVacacionesDto),
    __metadata("design:type", ConfigVacacionesDto)
], UpdateConfiguracionEmpresaDto.prototype, "vacaciones", void 0);


/***/ }),

/***/ "./apps/nomina/src/dto/create-beneficio.dto.ts":
/*!*****************************************************!*\
  !*** ./apps/nomina/src/dto/create-beneficio.dto.ts ***!
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
exports.CreateBeneficioDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const database_1 = __webpack_require__(/*! default/database */ "./libs/database/src/index.ts");
class CreateBeneficioDto {
    nombre;
    descripcion;
    tipo;
    indicador;
    esRecurrente;
    esAutomatico;
    montoEstimado;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, maxLength: 255 }, descripcion: { required: false, type: () => String, maxLength: 1000 }, tipo: { required: true, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").TipoBeneficio) }, indicador: { required: false, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/beneficio.entity */ "./libs/database/src/entities/beneficio.entity.ts").IndicadorNomina) }, esRecurrente: { required: false, type: () => Boolean }, esAutomatico: { required: false, type: () => Boolean }, montoEstimado: { required: false, type: () => Number, minimum: 1 } };
    }
}
exports.CreateBeneficioDto = CreateBeneficioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateBeneficioDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], CreateBeneficioDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(database_1.TipoBeneficio),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBeneficioDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(database_1.IndicadorNomina),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBeneficioDto.prototype, "indicador", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateBeneficioDto.prototype, "esRecurrente", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateBeneficioDto.prototype, "esAutomatico", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateBeneficioDto.prototype, "montoEstimado", void 0);


/***/ }),

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

/***/ "./apps/nomina/src/dto/create-solicitud.dto.ts":
/*!*****************************************************!*\
  !*** ./apps/nomina/src/dto/create-solicitud.dto.ts ***!
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
exports.CreateSolicitudDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateSolicitudDto {
    empleadoId;
    fechaInicio;
    fechaFin;
    comentario;
    static _OPENAPI_METADATA_FACTORY() {
        return { empleadoId: { required: true, type: () => String, format: "uuid" }, fechaInicio: { required: true, type: () => String }, fechaFin: { required: true, type: () => String }, comentario: { required: false, type: () => String } };
    }
}
exports.CreateSolicitudDto = CreateSolicitudDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateSolicitudDto.prototype, "empleadoId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSolicitudDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSolicitudDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSolicitudDto.prototype, "comentario", void 0);


/***/ }),

/***/ "./apps/nomina/src/dto/procesar-nomina.dto.ts":
/*!****************************************************!*\
  !*** ./apps/nomina/src/dto/procesar-nomina.dto.ts ***!
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
exports.ProcesarNominaDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ProcesarNominaDto {
    periodoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { periodoId: { required: true, type: () => String, format: "uuid" } };
    }
}
exports.ProcesarNominaDto = ProcesarNominaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProcesarNominaDto.prototype, "periodoId", void 0);


/***/ }),

/***/ "./apps/nomina/src/dto/responder-solicitud.dto.ts":
/*!********************************************************!*\
  !*** ./apps/nomina/src/dto/responder-solicitud.dto.ts ***!
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
exports.ResponderSolicitudDto = exports.EstadoSolicitud = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
var EstadoSolicitud;
(function (EstadoSolicitud) {
    EstadoSolicitud["PENDIENTE"] = "PENDIENTE";
    EstadoSolicitud["APROBADA"] = "APROBADA";
    EstadoSolicitud["RECHAZADA"] = "RECHAZADA";
})(EstadoSolicitud || (exports.EstadoSolicitud = EstadoSolicitud = {}));
class ResponderSolicitudDto {
    estado;
    comentarios;
    static _OPENAPI_METADATA_FACTORY() {
        return { estado: { required: true, enum: (__webpack_require__(/*! ./responder-solicitud.dto */ "./apps/nomina/src/dto/responder-solicitud.dto.ts").EstadoSolicitud) }, comentarios: { required: false, type: () => String } };
    }
}
exports.ResponderSolicitudDto = ResponderSolicitudDto;
__decorate([
    (0, class_validator_1.IsEnum)(EstadoSolicitud),
    __metadata("design:type", String)
], ResponderSolicitudDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResponderSolicitudDto.prototype, "comentarios", void 0);


/***/ }),

/***/ "./apps/nomina/src/dto/update-beneficio.dto.ts":
/*!*****************************************************!*\
  !*** ./apps/nomina/src/dto/update-beneficio.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateBeneficioDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_beneficio_dto_1 = __webpack_require__(/*! ./create-beneficio.dto */ "./apps/nomina/src/dto/create-beneficio.dto.ts");
class UpdateBeneficioDto extends (0, mapped_types_1.PartialType)(create_beneficio_dto_1.CreateBeneficioDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateBeneficioDto = UpdateBeneficioDto;


/***/ }),

/***/ "./apps/nomina/src/dto/update-concepto-nomina.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/nomina/src/dto/update-concepto-nomina.dto.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateConceptoNominaDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_concepto_nomina_dto_1 = __webpack_require__(/*! ./create-concepto-nomina.dto */ "./apps/nomina/src/dto/create-concepto-nomina.dto.ts");
class UpdateConceptoNominaDto extends (0, mapped_types_1.PartialType)(create_concepto_nomina_dto_1.CreateConceptoNominaDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateConceptoNominaDto = UpdateConceptoNominaDto;


/***/ }),

/***/ "./apps/nomina/src/dto/update-contrato.dto.ts":
/*!****************************************************!*\
  !*** ./apps/nomina/src/dto/update-contrato.dto.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateContratoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_contrato_dto_1 = __webpack_require__(/*! ./create-contrato.dto */ "./apps/nomina/src/dto/create-contrato.dto.ts");
class UpdateContratoDto extends (0, mapped_types_1.PartialType)(create_contrato_dto_1.CreateContratoDto) {
    empleadoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { empleadoId: { required: false } };
    }
}
exports.UpdateContratoDto = UpdateContratoDto;


/***/ }),

/***/ "./apps/nomina/src/dto/update-periodo-nomina.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/nomina/src/dto/update-periodo-nomina.dto.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePeriodoNominaDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_periodo_nomina_dto_1 = __webpack_require__(/*! ./create-periodo-nomina.dto */ "./apps/nomina/src/dto/create-periodo-nomina.dto.ts");
class UpdatePeriodoNominaDto extends (0, mapped_types_1.PartialType)(create_periodo_nomina_dto_1.CreatePeriodoNominaDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePeriodoNominaDto = UpdatePeriodoNominaDto;


/***/ }),

/***/ "./apps/personal/src/dto/create-cargo.dto.ts":
/*!***************************************************!*\
  !*** ./apps/personal/src/dto/create-cargo.dto.ts ***!
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
exports.CreateCargoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCargoDto {
    nombre;
    departamentoId;
    salarioMin;
    salarioMax;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, maxLength: 255 }, departamentoId: { required: true, type: () => String, description: "ID del Departamento al que pertenecer\u00E1 este cargo.", format: "uuid" }, salarioMin: { required: false, type: () => Number, minimum: 0 }, salarioMax: { required: false, type: () => Number, minimum: 0 } };
    }
}
exports.CreateCargoDto = CreateCargoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateCargoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El departamento es requerido.' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCargoDto.prototype, "departamentoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCargoDto.prototype, "salarioMin", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCargoDto.prototype, "salarioMax", void 0);


/***/ }),

/***/ "./apps/personal/src/dto/create-departamento.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/personal/src/dto/create-departamento.dto.ts ***!
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
exports.CreateDepartamentoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateDepartamentoDto {
    nombre;
    estado;
    sucursalId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, maxLength: 255 }, estado: { required: true, type: () => String, maxLength: 255 }, sucursalId: { required: false, type: () => String, format: "uuid" } };
    }
}
exports.CreateDepartamentoDto = CreateDepartamentoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateDepartamentoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El estado es requerido.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateDepartamentoDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'El ID de la sucursal debe ser un UUID válido.' }),
    __metadata("design:type", String)
], CreateDepartamentoDto.prototype, "sucursalId", void 0);


/***/ }),

/***/ "./apps/personal/src/dto/create-documento-empresa.dto.ts":
/*!***************************************************************!*\
  !*** ./apps/personal/src/dto/create-documento-empresa.dto.ts ***!
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
exports.CreateDocumentoEmpresaDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateDocumentoEmpresaDto {
    nombre;
    url;
    descripcion;
    categoria;
    sucursalId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, url: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, categoria: { required: false, type: () => String }, sucursalId: { required: false, type: () => String, format: "uuid" } };
    }
}
exports.CreateDocumentoEmpresaDto = CreateDocumentoEmpresaDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentoEmpresaDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentoEmpresaDto.prototype, "url", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentoEmpresaDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDocumentoEmpresaDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDocumentoEmpresaDto.prototype, "sucursalId", void 0);


/***/ }),

/***/ "./apps/personal/src/dto/create-empleado.dto.ts":
/*!******************************************************!*\
  !*** ./apps/personal/src/dto/create-empleado.dto.ts ***!
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
exports.CreateEmpleadoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateEmpleadoDto {
    nombre;
    apellido;
    emailPersonal;
    telefono;
    fechaNacimiento;
    cargoId;
    cargoNombre;
    rolId;
    jefeId;
    sucursalId;
    salario;
    tipoContrato;
    fechaInicio;
    fechaFin;
    tipoIdentificacion;
    nroIdentificacion;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, apellido: { required: true, type: () => String }, emailPersonal: { required: false, type: () => String, format: "email" }, telefono: { required: false, type: () => String }, fechaNacimiento: { required: false, type: () => String }, cargoId: { required: false, type: () => String, format: "uuid" }, cargoNombre: { required: false, type: () => String, description: "\u2705 NUEVO CAMPO: Necesario para la IA.\nAqu\u00ED recibiremos \"Gerente de Ventas\" o \"Desarrollador\".\nSi cargoId no viene, el servicio usar\u00E1 este campo para Gemini." }, rolId: { required: false, type: () => String, description: "MODIFICADO: Ahora es Opcional.\nRaz\u00F3n: El JSON no trae rol. El servicio asignar\u00E1 el \"Rol por Defecto\" autom\u00E1ticamente.", format: "uuid" }, jefeId: { required: false, type: () => String, format: "uuid" }, sucursalId: { required: false, type: () => String, format: "uuid" }, salario: { required: false, type: () => Number, minimum: 0 }, tipoContrato: { required: false, type: () => String }, fechaInicio: { required: false, type: () => String }, fechaFin: { required: false, type: () => String }, tipoIdentificacion: { required: true, type: () => String }, nroIdentificacion: { required: true, type: () => String } };
    }
}
exports.CreateEmpleadoDto = CreateEmpleadoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El apellido es requerido.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "apellido", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'El email personal no es válido.' }),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "emailPersonal", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de nacimiento debe ser una fecha válida.' }),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'El cargoId debe ser un UUID válido.' }),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "cargoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "cargoNombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'El rolId debe ser un UUID válido.' }),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "rolId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4', { message: 'El jefeId debe ser un UUID válido.' }),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "jefeId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "sucursalId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateEmpleadoDto.prototype, "salario", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "tipoContrato", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "tipoIdentificacion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "nroIdentificacion", void 0);


/***/ }),

/***/ "./apps/personal/src/dto/create-rol.dto.ts":
/*!*************************************************!*\
  !*** ./apps/personal/src/dto/create-rol.dto.ts ***!
  \*************************************************/
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
exports.CreateRolDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateRolDto {
    nombre;
    descripcion;
    permisos;
    esDefecto;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, maxLength: 100 }, descripcion: { required: false, type: () => String, maxLength: 500 }, permisos: { required: false, type: () => [String] }, esDefecto: { required: false, type: () => Boolean } };
    }
}
exports.CreateRolDto = CreateRolDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateRolDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateRolDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateRolDto.prototype, "permisos", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateRolDto.prototype, "esDefecto", void 0);


/***/ }),

/***/ "./apps/personal/src/dto/create-sucursal.dto.ts":
/*!******************************************************!*\
  !*** ./apps/personal/src/dto/create-sucursal.dto.ts ***!
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
exports.CreateSucursalDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateSucursalDto {
    nombre;
    direccion;
    telefono;
    jefeId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, direccion: { required: false, type: () => String }, telefono: { required: false, type: () => String }, jefeId: { required: false, type: () => String } };
    }
}
exports.CreateSucursalDto = CreateSucursalDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre de la sucursal es obligatorio.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSucursalDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSucursalDto.prototype, "direccion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSucursalDto.prototype, "telefono", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSucursalDto.prototype, "jefeId", void 0);


/***/ }),

/***/ "./apps/personal/src/dto/create-vacante.dto.ts":
/*!*****************************************************!*\
  !*** ./apps/personal/src/dto/create-vacante.dto.ts ***!
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
exports.CreateVacanteDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const vacante_entity_1 = __webpack_require__(/*! default/database/entities/vacante.entity */ "./libs/database/src/entities/vacante.entity.ts");
class CreateVacanteDto {
    titulo;
    descripcion;
    requisitos;
    estado;
    ubicacion;
    salarioMin;
    salarioMax;
    fechaCierre;
    departamentoId;
    empresaId;
    sucursalId;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, requisitos: { required: false, type: () => String }, estado: { required: false, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/vacante.entity */ "./libs/database/src/entities/vacante.entity.ts").EstadoVacante) }, ubicacion: { required: false, type: () => String }, salarioMin: { required: false, type: () => Number, minimum: 0 }, salarioMax: { required: false, type: () => Number, minimum: 0 }, fechaCierre: { required: false, type: () => String }, departamentoId: { required: false, type: () => String, format: "uuid" }, empresaId: { required: false, type: () => String, format: "uuid" }, sucursalId: { required: false, type: () => String, format: "uuid" } };
    }
}
exports.CreateVacanteDto = CreateVacanteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVacanteDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVacanteDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacanteDto.prototype, "requisitos", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(vacante_entity_1.EstadoVacante),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacanteDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacanteDto.prototype, "ubicacion", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateVacanteDto.prototype, "salarioMin", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateVacanteDto.prototype, "salarioMax", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacanteDto.prototype, "fechaCierre", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacanteDto.prototype, "departamentoId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacanteDto.prototype, "empresaId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVacanteDto.prototype, "sucursalId", void 0);


/***/ }),

/***/ "./apps/personal/src/dto/update-cargo.dto.ts":
/*!***************************************************!*\
  !*** ./apps/personal/src/dto/update-cargo.dto.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCargoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_cargo_dto_1 = __webpack_require__(/*! ./create-cargo.dto */ "./apps/personal/src/dto/create-cargo.dto.ts");
class UpdateCargoDto extends (0, mapped_types_1.PartialType)(create_cargo_dto_1.CreateCargoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCargoDto = UpdateCargoDto;


/***/ }),

/***/ "./apps/personal/src/dto/update-departamento.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/personal/src/dto/update-departamento.dto.ts ***!
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
exports.UpdateDepartamentoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateDepartamentoDto {
    nombre;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: false, type: () => String, maxLength: 255 } };
    }
}
exports.UpdateDepartamentoDto = UpdateDepartamentoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateDepartamentoDto.prototype, "nombre", void 0);


/***/ }),

/***/ "./apps/personal/src/dto/update-empleado.dto.ts":
/*!******************************************************!*\
  !*** ./apps/personal/src/dto/update-empleado.dto.ts ***!
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
exports.UpdateEmpleadoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_empleado_dto_1 = __webpack_require__(/*! ./create-empleado.dto */ "./apps/personal/src/dto/create-empleado.dto.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateEmpleadoDto extends (0, mapped_types_1.PartialType)(create_empleado_dto_1.CreateEmpleadoDto) {
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { estado: { required: false, type: () => String } };
    }
}
exports.UpdateEmpleadoDto = UpdateEmpleadoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "estado", void 0);


/***/ }),

/***/ "./apps/personal/src/dto/update-rol.dto.ts":
/*!*************************************************!*\
  !*** ./apps/personal/src/dto/update-rol.dto.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateRolDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_rol_dto_1 = __webpack_require__(/*! ./create-rol.dto */ "./apps/personal/src/dto/create-rol.dto.ts");
class UpdateRolDto extends (0, mapped_types_1.PartialType)(create_rol_dto_1.CreateRolDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateRolDto = UpdateRolDto;


/***/ }),

/***/ "./apps/personal/src/dto/update-sucursal.dto.ts":
/*!******************************************************!*\
  !*** ./apps/personal/src/dto/update-sucursal.dto.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSucursalDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_sucursal_dto_1 = __webpack_require__(/*! ./create-sucursal.dto */ "./apps/personal/src/dto/create-sucursal.dto.ts");
class UpdateSucursalDto extends (0, mapped_types_1.PartialType)(create_sucursal_dto_1.CreateSucursalDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSucursalDto = UpdateSucursalDto;


/***/ }),

/***/ "./apps/personal/src/dto/update-vacante.dto.ts":
/*!*****************************************************!*\
  !*** ./apps/personal/src/dto/update-vacante.dto.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateVacanteDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_vacante_dto_1 = __webpack_require__(/*! ./create-vacante.dto */ "./apps/personal/src/dto/create-vacante.dto.ts");
class UpdateVacanteDto extends (0, mapped_types_1.PartialType)(create_vacante_dto_1.CreateVacanteDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateVacanteDto = UpdateVacanteDto;


/***/ }),

/***/ "./apps/productividad/src/dto/assign-activo.dto.ts":
/*!*********************************************************!*\
  !*** ./apps/productividad/src/dto/assign-activo.dto.ts ***!
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
exports.AssignActivoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class AssignActivoDto {
    empleadoId;
    observaciones;
    fechaAsignacion;
    static _OPENAPI_METADATA_FACTORY() {
        return { empleadoId: { required: true, type: () => String, format: "uuid" }, observaciones: { required: false, type: () => String }, fechaAsignacion: { required: false, type: () => Date } };
    }
}
exports.AssignActivoDto = AssignActivoDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AssignActivoDto.prototype, "empleadoId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AssignActivoDto.prototype, "observaciones", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AssignActivoDto.prototype, "fechaAsignacion", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/check-in.dto.ts":
/*!****************************************************!*\
  !*** ./apps/productividad/src/dto/check-in.dto.ts ***!
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
exports.CheckInDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CheckInDto {
    empleadoId;
    observaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { empleadoId: { required: true, type: () => String, format: "uuid" }, observaciones: { required: false, type: () => String } };
    }
}
exports.CheckInDto = CheckInDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CheckInDto.prototype, "empleadoId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CheckInDto.prototype, "observaciones", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/check-out.dto.ts":
/*!*****************************************************!*\
  !*** ./apps/productividad/src/dto/check-out.dto.ts ***!
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
exports.CheckOutDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CheckOutDto {
    observaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { observaciones: { required: false, type: () => String } };
    }
}
exports.CheckOutDto = CheckOutDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CheckOutDto.prototype, "observaciones", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-activo.dto.ts":
/*!*********************************************************!*\
  !*** ./apps/productividad/src/dto/create-activo.dto.ts ***!
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
exports.CreateActivoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const activo_entity_1 = __webpack_require__(/*! default/database/entities/activo.entity */ "./libs/database/src/entities/activo.entity.ts");
class CreateActivoDto {
    nombre;
    serial;
    tipo;
    estado;
    valor;
    fechaAdquisicion;
    descripcion;
    imageUrl;
    sucursalId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, serial: { required: false, type: () => String }, tipo: { required: true, type: () => String }, estado: { required: false, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/activo.entity */ "./libs/database/src/entities/activo.entity.ts").EstadoActivo) }, valor: { required: false, type: () => Number, minimum: 0 }, fechaAdquisicion: { required: false, type: () => String }, descripcion: { required: false, type: () => String }, imageUrl: { required: false, type: () => String }, sucursalId: { required: false, type: () => String } };
    }
}
exports.CreateActivoDto = CreateActivoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateActivoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivoDto.prototype, "serial", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateActivoDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(activo_entity_1.EstadoActivo),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivoDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateActivoDto.prototype, "valor", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivoDto.prototype, "fechaAdquisicion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivoDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivoDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateActivoDto.prototype, "sucursalId", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-anuncio.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/productividad/src/dto/create-anuncio.dto.ts ***!
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
exports.CreateAnuncioDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const anuncio_entity_1 = __webpack_require__(/*! default/database/entities/anuncio.entity */ "./libs/database/src/entities/anuncio.entity.ts");
class CreateAnuncioDto {
    titulo;
    contenido;
    prioridad;
    fechaExpiracion;
    sucursalId;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, contenido: { required: true, type: () => String }, prioridad: { required: false, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/anuncio.entity */ "./libs/database/src/entities/anuncio.entity.ts").PrioridadAnuncio) }, fechaExpiracion: { required: false, type: () => String }, sucursalId: { required: false, type: () => String, format: "uuid" } };
    }
}
exports.CreateAnuncioDto = CreateAnuncioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAnuncioDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAnuncioDto.prototype, "contenido", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(anuncio_entity_1.PrioridadAnuncio),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAnuncioDto.prototype, "prioridad", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAnuncioDto.prototype, "fechaExpiracion", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAnuncioDto.prototype, "sucursalId", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-asignacion.dto.ts":
/*!*************************************************************!*\
  !*** ./apps/productividad/src/dto/create-asignacion.dto.ts ***!
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
exports.CreateAsignacionDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateAsignacionDto {
    empleadoId;
    observaciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { empleadoId: { required: true, type: () => String }, observaciones: { required: false, type: () => String } };
    }
}
exports.CreateAsignacionDto = CreateAsignacionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAsignacionDto.prototype, "empleadoId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAsignacionDto.prototype, "observaciones", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-ciclo.dto.ts":
/*!********************************************************!*\
  !*** ./apps/productividad/src/dto/create-ciclo.dto.ts ***!
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
exports.CreateCicloDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const cicloEvaluacion_entity_1 = __webpack_require__(/*! default/database/entities/cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts");
class CreateCicloDto {
    nombre;
    fechaInicio;
    fechaFin;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, fechaInicio: { required: true, type: () => Date }, fechaFin: { required: true, type: () => Date }, estado: { required: false, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/cicloEvaluacion.entity */ "./libs/database/src/entities/cicloEvaluacion.entity.ts").EstadoCiclo) } };
    }
}
exports.CreateCicloDto = CreateCicloDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCicloDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateCicloDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateCicloDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(cicloEvaluacion_entity_1.EstadoCiclo),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCicloDto.prototype, "estado", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-curso.dto.ts":
/*!********************************************************!*\
  !*** ./apps/productividad/src/dto/create-curso.dto.ts ***!
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
exports.CreateCursoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCursoDto {
    titulo;
    descripcion;
    duration;
    instructor;
    category;
    imageUrl;
    isActive;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, duration: { required: true, type: () => String }, instructor: { required: true, type: () => String }, category: { required: true, type: () => String }, imageUrl: { required: false, type: () => String }, isActive: { required: false, type: () => Boolean } };
    }
}
exports.CreateCursoDto = CreateCursoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El título es obligatorio' }),
    __metadata("design:type", String)
], CreateCursoDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La descripción es obligatoria' }),
    __metadata("design:type", String)
], CreateCursoDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La duración es obligatoria' }),
    __metadata("design:type", String)
], CreateCursoDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El instructor es obligatorio' }),
    __metadata("design:type", String)
], CreateCursoDto.prototype, "instructor", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La categoría es obligatoria' }),
    __metadata("design:type", String)
], CreateCursoDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCursoDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCursoDto.prototype, "isActive", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-encuesta.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/productividad/src/dto/create-encuesta.dto.ts ***!
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
exports.CreateEncuestaDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class OpcionDto {
    texto;
    static _OPENAPI_METADATA_FACTORY() {
        return { texto: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OpcionDto.prototype, "texto", void 0);
class CreateEncuestaDto {
    titulo;
    descripcion;
    fechaFin;
    esAnonima;
    sucursalId;
    opciones;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: false, type: () => String }, fechaFin: { required: true, type: () => String }, esAnonima: { required: false, type: () => Boolean }, sucursalId: { required: false, type: () => String, format: "uuid" }, opciones: { required: true, type: () => [OpcionDto], minItems: 2 } };
    }
}
exports.CreateEncuestaDto = CreateEncuestaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEncuestaDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEncuestaDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateEncuestaDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateEncuestaDto.prototype, "esAnonima", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEncuestaDto.prototype, "sucursalId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(2, { message: 'La encuesta debe tener al menos 2 opciones' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OpcionDto),
    __metadata("design:type", Array)
], CreateEncuestaDto.prototype, "opciones", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-evaluacion.dto.ts":
/*!*************************************************************!*\
  !*** ./apps/productividad/src/dto/create-evaluacion.dto.ts ***!
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
exports.CreateEvaluacionDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateEvaluacionDto {
    evaluadoId;
    evaluadorId;
    calificacionPotencial;
    calificacionDesempeno;
    feedback;
    static _OPENAPI_METADATA_FACTORY() {
        return { evaluadoId: { required: true, type: () => String, format: "uuid" }, evaluadorId: { required: true, type: () => String, format: "uuid" }, calificacionPotencial: { required: true, type: () => Number, minimum: 1, maximum: 9 }, calificacionDesempeno: { required: true, type: () => Number, minimum: 1, maximum: 9 }, feedback: { required: false, type: () => String } };
    }
}
exports.CreateEvaluacionDto = CreateEvaluacionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEvaluacionDto.prototype, "evaluadoId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateEvaluacionDto.prototype, "evaluadorId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(9),
    __metadata("design:type", Number)
], CreateEvaluacionDto.prototype, "calificacionPotencial", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(9),
    __metadata("design:type", Number)
], CreateEvaluacionDto.prototype, "calificacionDesempeno", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEvaluacionDto.prototype, "feedback", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-inscripcion.dto.ts":
/*!**************************************************************!*\
  !*** ./apps/productividad/src/dto/create-inscripcion.dto.ts ***!
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
exports.CreateInscripcionDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const inscripcionCurso_entity_1 = __webpack_require__(/*! default/database/entities/inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts");
class CreateInscripcionDto {
    empleadoId;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { empleadoId: { required: true, type: () => String, format: "uuid" }, estado: { required: false, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/inscripcionCurso.entity */ "./libs/database/src/entities/inscripcionCurso.entity.ts").EstadoInscripcion) } };
    }
}
exports.CreateInscripcionDto = CreateInscripcionDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInscripcionDto.prototype, "empleadoId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(inscripcionCurso_entity_1.EstadoInscripcion),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInscripcionDto.prototype, "estado", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-item-gasto.dto.ts":
/*!*************************************************************!*\
  !*** ./apps/productividad/src/dto/create-item-gasto.dto.ts ***!
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
exports.CreateItemGastoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class CreateItemGastoDto {
    fecha;
    concepto;
    monto;
    categoria;
    facturaUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { fecha: { required: true, type: () => Date }, concepto: { required: true, type: () => String }, monto: { required: true, type: () => Number, minimum: 0.01 }, categoria: { required: true, type: () => String }, facturaUrl: { required: false, type: () => String } };
    }
}
exports.CreateItemGastoDto = CreateItemGastoDto;
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateItemGastoDto.prototype, "fecha", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemGastoDto.prototype, "concepto", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], CreateItemGastoDto.prototype, "monto", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateItemGastoDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateItemGastoDto.prototype, "facturaUrl", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-objetivo.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/productividad/src/dto/create-objetivo.dto.ts ***!
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
exports.CreateObjetivoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const objetivo_entity_1 = __webpack_require__(/*! ../../../../libs/database/src/entities/objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts");
class CreateObjetivoDto {
    descripcion;
    empleadoId;
    progreso;
    tipo;
    departamentoId;
    parentObjetivoId;
    static _OPENAPI_METADATA_FACTORY() {
        return { descripcion: { required: true, type: () => String }, empleadoId: { required: false, type: () => String, format: "uuid" }, progreso: { required: false, type: () => Number, minimum: 0, maximum: 100 }, tipo: { required: false, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts").TipoObjetivo) }, departamentoId: { required: false, type: () => String, format: "uuid" }, parentObjetivoId: { required: false, type: () => String, format: "uuid" } };
    }
}
exports.CreateObjetivoDto = CreateObjetivoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateObjetivoDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateObjetivoDto.prototype, "empleadoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateObjetivoDto.prototype, "progreso", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(objetivo_entity_1.TipoObjetivo),
    __metadata("design:type", String)
], CreateObjetivoDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateObjetivoDto.prototype, "departamentoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateObjetivoDto.prototype, "parentObjetivoId", void 0);


/***/ }),

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
    sucursalId;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String, maxLength: 255 }, descripcion: { required: false, type: () => String }, liderId: { required: false, type: () => String, format: "uuid" }, fechaInicio: { required: false, type: () => Date }, fechaFin: { required: false, type: () => Date }, estado: { required: false, enum: (__webpack_require__(/*! ./create-proyecto.dto */ "./apps/productividad/src/dto/create-proyecto.dto.ts").EstadoProyecto) }, sucursalId: { required: false, type: () => String, format: "uuid" } };
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
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProyectoDto.prototype, "sucursalId", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-reporte.dto.ts":
/*!**********************************************************!*\
  !*** ./apps/productividad/src/dto/create-reporte.dto.ts ***!
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
exports.CreateReporteDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateReporteDto {
    titulo;
    descripcion;
    static _OPENAPI_METADATA_FACTORY() {
        return { titulo: { required: true, type: () => String }, descripcion: { required: false, type: () => String } };
    }
}
exports.CreateReporteDto = CreateReporteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReporteDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReporteDto.prototype, "descripcion", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/create-sprint.dto.ts":
/*!*********************************************************!*\
  !*** ./apps/productividad/src/dto/create-sprint.dto.ts ***!
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
exports.CreateSprintDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class CreateSprintDto {
    nombre;
    fechaInicio;
    fechaFin;
    objetivo;
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, fechaInicio: { required: true, type: () => Date }, fechaFin: { required: true, type: () => Date }, objetivo: { required: false, type: () => String } };
    }
}
exports.CreateSprintDto = CreateSprintDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSprintDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateSprintDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateSprintDto.prototype, "fechaFin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSprintDto.prototype, "objetivo", void 0);


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

/***/ "./apps/productividad/src/dto/return-activo.dto.ts":
/*!*********************************************************!*\
  !*** ./apps/productividad/src/dto/return-activo.dto.ts ***!
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
exports.ReturnActivoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const database_1 = __webpack_require__(/*! default/database */ "./libs/database/src/index.ts");
class ReturnActivoDto {
    fechaDevolucion;
    observaciones;
    estado;
    static _OPENAPI_METADATA_FACTORY() {
        return { fechaDevolucion: { required: false, type: () => Date }, observaciones: { required: false, type: () => String }, estado: { required: false, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/activo.entity */ "./libs/database/src/entities/activo.entity.ts").EstadoActivo) } };
    }
}
exports.ReturnActivoDto = ReturnActivoDto;
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ReturnActivoDto.prototype, "fechaDevolucion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReturnActivoDto.prototype, "observaciones", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ReturnActivoDto.prototype, "estado", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/update-activo.dto.ts":
/*!*********************************************************!*\
  !*** ./apps/productividad/src/dto/update-activo.dto.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateActivoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_activo_dto_1 = __webpack_require__(/*! ./create-activo.dto */ "./apps/productividad/src/dto/create-activo.dto.ts");
class UpdateActivoDto extends (0, mapped_types_1.PartialType)(create_activo_dto_1.CreateActivoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateActivoDto = UpdateActivoDto;


/***/ }),

/***/ "./apps/productividad/src/dto/update-asignacion.dto.ts":
/*!*************************************************************!*\
  !*** ./apps/productividad/src/dto/update-asignacion.dto.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAsignacionDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_asignacion_dto_1 = __webpack_require__(/*! ./create-asignacion.dto */ "./apps/productividad/src/dto/create-asignacion.dto.ts");
class UpdateAsignacionDto extends (0, mapped_types_1.PartialType)(create_asignacion_dto_1.CreateAsignacionDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAsignacionDto = UpdateAsignacionDto;


/***/ }),

/***/ "./apps/productividad/src/dto/update-ciclo.dto.ts":
/*!********************************************************!*\
  !*** ./apps/productividad/src/dto/update-ciclo.dto.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCicloDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_ciclo_dto_1 = __webpack_require__(/*! ./create-ciclo.dto */ "./apps/productividad/src/dto/create-ciclo.dto.ts");
class UpdateCicloDto extends (0, mapped_types_1.PartialType)(create_ciclo_dto_1.CreateCicloDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCicloDto = UpdateCicloDto;


/***/ }),

/***/ "./apps/productividad/src/dto/update-curso.dto.ts":
/*!********************************************************!*\
  !*** ./apps/productividad/src/dto/update-curso.dto.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateCursoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_curso_dto_1 = __webpack_require__(/*! ./create-curso.dto */ "./apps/productividad/src/dto/create-curso.dto.ts");
class UpdateCursoDto extends (0, mapped_types_1.PartialType)(create_curso_dto_1.CreateCursoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCursoDto = UpdateCursoDto;


/***/ }),

/***/ "./apps/productividad/src/dto/update-evaluacion.dto.ts":
/*!*************************************************************!*\
  !*** ./apps/productividad/src/dto/update-evaluacion.dto.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateEvaluacionDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_evaluacion_dto_1 = __webpack_require__(/*! ./create-evaluacion.dto */ "./apps/productividad/src/dto/create-evaluacion.dto.ts");
class UpdateEvaluacionDto extends (0, mapped_types_1.PartialType)(create_evaluacion_dto_1.CreateEvaluacionDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateEvaluacionDto = UpdateEvaluacionDto;


/***/ }),

/***/ "./apps/productividad/src/dto/update-inscripcion.dto.ts":
/*!**************************************************************!*\
  !*** ./apps/productividad/src/dto/update-inscripcion.dto.ts ***!
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
exports.UpdateInscripcionDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_inscripcion_dto_1 = __webpack_require__(/*! ./create-inscripcion.dto */ "./apps/productividad/src/dto/create-inscripcion.dto.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
class UpdateInscripcionDto extends (0, mapped_types_1.PartialType)(create_inscripcion_dto_1.CreateInscripcionDto) {
    calificacion;
    fechaCompletado;
    static _OPENAPI_METADATA_FACTORY() {
        return { calificacion: { required: false, type: () => Number, minimum: 0, maximum: 100 }, fechaCompletado: { required: false, type: () => Date } };
    }
}
exports.UpdateInscripcionDto = UpdateInscripcionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateInscripcionDto.prototype, "calificacion", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], UpdateInscripcionDto.prototype, "fechaCompletado", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/update-objetivo.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/productividad/src/dto/update-objetivo.dto.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateObjetivoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_objetivo_dto_1 = __webpack_require__(/*! ./create-objetivo.dto */ "./apps/productividad/src/dto/create-objetivo.dto.ts");
class UpdateObjetivoDto extends (0, mapped_types_1.PartialType)(create_objetivo_dto_1.CreateObjetivoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateObjetivoDto = UpdateObjetivoDto;


/***/ }),

/***/ "./apps/productividad/src/dto/update-proyecto.dto.ts":
/*!***********************************************************!*\
  !*** ./apps/productividad/src/dto/update-proyecto.dto.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateProyectoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_proyecto_dto_1 = __webpack_require__(/*! ./create-proyecto.dto */ "./apps/productividad/src/dto/create-proyecto.dto.ts");
class UpdateProyectoDto extends (0, mapped_types_1.PartialType)(create_proyecto_dto_1.CreateProyectoDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateProyectoDto = UpdateProyectoDto;


/***/ }),

/***/ "./apps/productividad/src/dto/update-reporte-estado.dto.ts":
/*!*****************************************************************!*\
  !*** ./apps/productividad/src/dto/update-reporte-estado.dto.ts ***!
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
exports.UpdateReporteEstadoDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const reporteGasto_entity_1 = __webpack_require__(/*! default/database/entities/reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts");
class UpdateReporteEstadoDto {
    estado;
    comentarios;
    static _OPENAPI_METADATA_FACTORY() {
        return { estado: { required: true, enum: (__webpack_require__(/*! ../../../../libs/database/src/entities/reporteGasto.entity */ "./libs/database/src/entities/reporteGasto.entity.ts").EstadoReporte) }, comentarios: { required: false, type: () => String } };
    }
}
exports.UpdateReporteEstadoDto = UpdateReporteEstadoDto;
__decorate([
    (0, class_validator_1.IsEnum)(reporteGasto_entity_1.EstadoReporte),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateReporteEstadoDto.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReporteEstadoDto.prototype, "comentarios", void 0);


/***/ }),

/***/ "./apps/productividad/src/dto/update-sprint.dto.ts":
/*!*********************************************************!*\
  !*** ./apps/productividad/src/dto/update-sprint.dto.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSprintDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_sprint_dto_1 = __webpack_require__(/*! ./create-sprint.dto */ "./apps/productividad/src/dto/create-sprint.dto.ts");
class UpdateSprintDto extends (0, mapped_types_1.PartialType)(create_sprint_dto_1.CreateSprintDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateSprintDto = UpdateSprintDto;


/***/ }),

/***/ "./apps/productividad/src/dto/update-tarea.dto.ts":
/*!********************************************************!*\
  !*** ./apps/productividad/src/dto/update-tarea.dto.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTareaDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_tarea_dto_1 = __webpack_require__(/*! ./create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts");
class UpdateTareaDto extends (0, mapped_types_1.PartialType)(create_tarea_dto_1.CreateTareaDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateTareaDto = UpdateTareaDto;


/***/ }),

/***/ "./apps/productividad/src/dto/vote.dto.ts":
/*!************************************************!*\
  !*** ./apps/productividad/src/dto/vote.dto.ts ***!
  \************************************************/
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
exports.VoteDto = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class VoteDto {
    opcionId;
    static _OPENAPI_METADATA_FACTORY() {
        return { opcionId: { required: true, type: () => String, format: "uuid" } };
    }
}
exports.VoteDto = VoteDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VoteDto.prototype, "opcionId", void 0);


/***/ }),

/***/ "./apps/punto-pymes-backend/src/app.controller.ts":
/*!********************************************************!*\
  !*** ./apps/punto-pymes-backend/src/app.controller.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const openapi = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/punto-pymes-backend/src/app.service.ts");
const register_dto_1 = __webpack_require__(/*! ../../auth/src/dto/register.dto */ "./apps/auth/src/dto/register.dto.ts");
const login_dto_1 = __webpack_require__(/*! ../../auth/src/dto/login.dto */ "./apps/auth/src/dto/login.dto.ts");
const jwt_auth_guard_1 = __webpack_require__(/*! ./auth/jwt-auth.guard */ "./apps/punto-pymes-backend/src/auth/jwt-auth.guard.ts");
const create_empleado_dto_1 = __webpack_require__(/*! ../../personal/src/dto/create-empleado.dto */ "./apps/personal/src/dto/create-empleado.dto.ts");
const update_empleado_dto_1 = __webpack_require__(/*! ../../personal/src/dto/update-empleado.dto */ "./apps/personal/src/dto/update-empleado.dto.ts");
const create_departamento_dto_1 = __webpack_require__(/*! ../../personal/src/dto/create-departamento.dto */ "./apps/personal/src/dto/create-departamento.dto.ts");
const update_departamento_dto_1 = __webpack_require__(/*! ../../personal/src/dto/update-departamento.dto */ "./apps/personal/src/dto/update-departamento.dto.ts");
const create_cargo_dto_1 = __webpack_require__(/*! ../../personal/src/dto/create-cargo.dto */ "./apps/personal/src/dto/create-cargo.dto.ts");
const update_cargo_dto_1 = __webpack_require__(/*! ../../personal/src/dto/update-cargo.dto */ "./apps/personal/src/dto/update-cargo.dto.ts");
const create_rol_dto_1 = __webpack_require__(/*! ../../personal/src/dto/create-rol.dto */ "./apps/personal/src/dto/create-rol.dto.ts");
const update_rol_dto_1 = __webpack_require__(/*! ../../personal/src/dto/update-rol.dto */ "./apps/personal/src/dto/update-rol.dto.ts");
const permission_decorator_1 = __webpack_require__(/*! ./auth/decorators/permission.decorator */ "./apps/punto-pymes-backend/src/auth/decorators/permission.decorator.ts");
const permission_guard_1 = __webpack_require__(/*! ./auth/guards/permission.guard */ "./apps/punto-pymes-backend/src/auth/guards/permission.guard.ts");
const create_contrato_dto_1 = __webpack_require__(/*! ../../nomina/src/dto/create-contrato.dto */ "./apps/nomina/src/dto/create-contrato.dto.ts");
const update_contrato_dto_1 = __webpack_require__(/*! ../../nomina/src/dto/update-contrato.dto */ "./apps/nomina/src/dto/update-contrato.dto.ts");
const create_beneficio_dto_1 = __webpack_require__(/*! ../../nomina/src/dto/create-beneficio.dto */ "./apps/nomina/src/dto/create-beneficio.dto.ts");
const update_beneficio_dto_1 = __webpack_require__(/*! ../../nomina/src/dto/update-beneficio.dto */ "./apps/nomina/src/dto/update-beneficio.dto.ts");
const create_periodo_nomina_dto_1 = __webpack_require__(/*! ../../nomina/src/dto/create-periodo-nomina.dto */ "./apps/nomina/src/dto/create-periodo-nomina.dto.ts");
const update_periodo_nomina_dto_1 = __webpack_require__(/*! ../../nomina/src/dto/update-periodo-nomina.dto */ "./apps/nomina/src/dto/update-periodo-nomina.dto.ts");
const create_concepto_nomina_dto_1 = __webpack_require__(/*! ../../nomina/src/dto/create-concepto-nomina.dto */ "./apps/nomina/src/dto/create-concepto-nomina.dto.ts");
const update_concepto_nomina_dto_1 = __webpack_require__(/*! ../../nomina/src/dto/update-concepto-nomina.dto */ "./apps/nomina/src/dto/update-concepto-nomina.dto.ts");
const procesar_nomina_dto_1 = __webpack_require__(/*! ../../nomina/src/dto/procesar-nomina.dto */ "./apps/nomina/src/dto/procesar-nomina.dto.ts");
const create_proyecto_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-proyecto.dto */ "./apps/productividad/src/dto/create-proyecto.dto.ts");
const update_proyecto_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-proyecto.dto */ "./apps/productividad/src/dto/update-proyecto.dto.ts");
const create_sprint_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-sprint.dto */ "./apps/productividad/src/dto/create-sprint.dto.ts");
const update_sprint_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-sprint.dto */ "./apps/productividad/src/dto/update-sprint.dto.ts");
const create_tarea_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-tarea.dto */ "./apps/productividad/src/dto/create-tarea.dto.ts");
const update_tarea_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-tarea.dto */ "./apps/productividad/src/dto/update-tarea.dto.ts");
const create_asignacion_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-asignacion.dto */ "./apps/productividad/src/dto/create-asignacion.dto.ts");
const update_asignacion_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-asignacion.dto */ "./apps/productividad/src/dto/update-asignacion.dto.ts");
const create_ciclo_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-ciclo.dto */ "./apps/productividad/src/dto/create-ciclo.dto.ts");
const update_ciclo_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-ciclo.dto */ "./apps/productividad/src/dto/update-ciclo.dto.ts");
const create_objetivo_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-objetivo.dto */ "./apps/productividad/src/dto/create-objetivo.dto.ts");
const update_objetivo_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-objetivo.dto */ "./apps/productividad/src/dto/update-objetivo.dto.ts");
const create_evaluacion_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-evaluacion.dto */ "./apps/productividad/src/dto/create-evaluacion.dto.ts");
const update_evaluacion_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-evaluacion.dto */ "./apps/productividad/src/dto/update-evaluacion.dto.ts");
const create_curso_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-curso.dto */ "./apps/productividad/src/dto/create-curso.dto.ts");
const update_curso_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-curso.dto */ "./apps/productividad/src/dto/update-curso.dto.ts");
const create_inscripcion_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-inscripcion.dto */ "./apps/productividad/src/dto/create-inscripcion.dto.ts");
const update_inscripcion_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-inscripcion.dto */ "./apps/productividad/src/dto/update-inscripcion.dto.ts");
const check_in_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/check-in.dto */ "./apps/productividad/src/dto/check-in.dto.ts");
const check_out_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/check-out.dto */ "./apps/productividad/src/dto/check-out.dto.ts");
const create_activo_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-activo.dto */ "./apps/productividad/src/dto/create-activo.dto.ts");
const update_activo_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-activo.dto */ "./apps/productividad/src/dto/update-activo.dto.ts");
const assign_activo_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/assign-activo.dto */ "./apps/productividad/src/dto/assign-activo.dto.ts");
const return_activo_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/return-activo.dto */ "./apps/productividad/src/dto/return-activo.dto.ts");
const create_reporte_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-reporte.dto */ "./apps/productividad/src/dto/create-reporte.dto.ts");
const create_item_gasto_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-item-gasto.dto */ "./apps/productividad/src/dto/create-item-gasto.dto.ts");
const update_reporte_estado_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/update-reporte-estado.dto */ "./apps/productividad/src/dto/update-reporte-estado.dto.ts");
const multer_config_util_1 = __webpack_require__(/*! ./shared/utils/multer-config.util */ "./apps/punto-pymes-backend/src/shared/utils/multer-config.util.ts");
const create_vacante_dto_1 = __webpack_require__(/*! apps/personal/src/dto/create-vacante.dto */ "./apps/personal/src/dto/create-vacante.dto.ts");
const create_solicitud_dto_1 = __webpack_require__(/*! apps/nomina/src/dto/create-solicitud.dto */ "./apps/nomina/src/dto/create-solicitud.dto.ts");
const create_sucursal_dto_1 = __webpack_require__(/*! ../../personal/src/dto/create-sucursal.dto */ "./apps/personal/src/dto/create-sucursal.dto.ts");
const update_sucursal_dto_1 = __webpack_require__(/*! ../../personal/src/dto/update-sucursal.dto */ "./apps/personal/src/dto/update-sucursal.dto.ts");
const create_documento_empresa_dto_1 = __webpack_require__(/*! apps/personal/src/dto/create-documento-empresa.dto */ "./apps/personal/src/dto/create-documento-empresa.dto.ts");
const update_vacante_dto_1 = __webpack_require__(/*! apps/personal/src/dto/update-vacante.dto */ "./apps/personal/src/dto/update-vacante.dto.ts");
const create_anuncio_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-anuncio.dto */ "./apps/productividad/src/dto/create-anuncio.dto.ts");
const create_encuesta_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/create-encuesta.dto */ "./apps/productividad/src/dto/create-encuesta.dto.ts");
const vote_dto_1 = __webpack_require__(/*! apps/productividad/src/dto/vote.dto */ "./apps/productividad/src/dto/vote.dto.ts");
const responder_solicitud_dto_1 = __webpack_require__(/*! apps/nomina/src/dto/responder-solicitud.dto */ "./apps/nomina/src/dto/responder-solicitud.dto.ts");
const update_configuracion_dto_1 = __webpack_require__(/*! apps/auth/src/dto/update-configuracion.dto */ "./apps/auth/src/dto/update-configuracion.dto.ts");
const permissions_1 = __webpack_require__(/*! ../../../libs/common/src/constants/permissions */ "./libs/common/src/constants/permissions.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let AppController = class AppController {
    appService;
    authService;
    personalService;
    nominaService;
    productividadService;
    constructor(appService, authService, personalService, nominaService, productividadService) {
        this.appService = appService;
        this.authService = authService;
        this.personalService = personalService;
        this.nominaService = nominaService;
        this.productividadService = productividadService;
    }
    getHello() {
        return this.appService.getHello();
    }
    pingAuthService() {
        console.log('Enviando PING al microservicio Auth...');
        return this.authService.send({ cmd: 'ping' }, {});
    }
    register(registerDto) {
        console.log('API Gateway recibió solicitud de registro');
        return this.authService.send({ cmd: 'register' }, registerDto);
    }
    login(loginDto) {
        console.log('API Gateway recibió solicitud de login');
        return this.authService.send({ cmd: 'login' }, loginDto);
    }
    uploadLogo(file) {
        if (!file)
            throw new common_1.BadRequestException('Archivo requerido');
        const url = `http://localhost:3000/uploads/logos-empresa/${file.filename}`;
        return { url };
    }
    async getMyCompany(req) {
        const { empresaId, userId } = req.user;
        return this.authService.send({ cmd: 'get_company_detail' }, { empresaId, userId });
    }
    async updateBranding(req, body) {
        const { empresaId } = req.user;
        return this.authService.send({ cmd: 'update_company_branding' }, {
            empresaId,
            branding: body.branding
        });
    }
    getProfile(req) {
        console.log('Petición exitosa a ruta protegida /profile');
        return {
            message: '¡Acceso concedido a ruta protegida!',
            user: req.user,
        };
    }
    createCompany(req, data) {
        console.log('═══════════════════════════════════════');
        console.log('🎯 GATEWAY - CREATE COMPANY');
        console.log('👤 req.user completo:', req.user);
        console.log('📦 Body recibido:', data);
        const usuarioId = req.user?.userId || req.user?.sub || req.user?.id;
        console.log('✅ UsuarioId extraído:', usuarioId);
        console.log('═══════════════════════════════════════');
        if (!usuarioId) {
            throw new common_1.UnauthorizedException('Token inválido: no se pudo identificar al usuario');
        }
        console.log('📡 Gateway: Enviando solicitud al microservicio AUTH');
        return this.authService.send({ cmd: 'create_company_existing' }, { usuarioId, ...data });
    }
    getEmpleados(req, headerSucursalId) {
        const { empresaId, sucursalId, permisos } = req.user;
        const idParaFiltrar = (sucursalId) ? sucursalId : headerSucursalId;
        console.log(`Gateway: Pidiendo empleados. Filtro final: ${idParaFiltrar || 'TODOS'}`);
        return this.personalService.send({ cmd: 'get_empleados' }, {
            empresaId: empresaId,
            filtroSucursalId: idParaFiltrar
        });
    }
    createEmpleado(req, dto, headerSucursalId) {
        const { empresaId, sucursalId, permisos } = req.user;
        if (sucursalId) {
            dto.sucursalId = sucursalId;
        }
        else if (headerSucursalId) {
            dto.sucursalId = headerSucursalId;
        }
        console.log(`Gateway: Creando empleado en sucursal: ${dto.sucursalId || 'Global'}`);
        return this.personalService.send({ cmd: 'create_empleado' }, {
            empresaId: empresaId,
            dto: dto,
        });
    }
    getDirectorio(req) {
        return this.personalService.send({ cmd: 'get_directorio' }, { empresaId: req.user.empresaId });
    }
    async getOrganigrama(req) {
        return this.personalService.send({ cmd: 'get_organigrama_data' }, { empresaId: req.user.empresaId });
    }
    getEmpleado(req, empleadoId) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'get_empleado' }, { empresaId, empleadoId });
    }
    updateEmpleado(req, empleadoId, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición PATCH /empleados/${empleadoId} para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'update_empleado' }, {
            empresaId: empresaId,
            empleadoId: empleadoId,
            dto: dto,
        });
    }
    deleteEmpleado(req, empleadoId) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición DELETE /empleados/${empleadoId} para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'delete_empleado' }, {
            empresaId: empresaId,
            empleadoId: empleadoId,
        });
    }
    async uploadFotoPerfil(req, empleadoId, file) {
        if (!file)
            throw new common_1.BadRequestException('Imagen requerida');
        const { empresaId } = req.user;
        const empresaFolder = empresaId;
        const fileUrl = `http://localhost:3000/uploads/${empresaFolder}/empleados/${empleadoId}/foto/${file.filename}`;
        return this.personalService.send({ cmd: 'update_foto_perfil' }, { empresaId, empleadoId, fileUrl });
    }
    getDocumentosEmpleado(req, empleadoId) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'get_documentos_empleado' }, { empresaId, empleadoId });
    }
    createDepartamento(req, dto, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        if (sucursalId) {
            dto.sucursalId = sucursalId;
        }
        else if (headerSucursalId) {
            dto.sucursalId = headerSucursalId;
        }
        console.log(`Gateway: Creando departamento en sucursal: ${dto.sucursalId || 'Global'}`);
        return this.personalService.send({ cmd: 'create_departamento' }, {
            empresaId: empresaId,
            dto: dto,
        });
    }
    getDepartamentos(req, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        const filtroFinal = sucursalId ? sucursalId : headerSucursalId;
        console.log(`Gateway: Pidiendo departamentos. Filtro: ${filtroFinal || 'Todos'}`);
        return this.personalService.send({ cmd: 'get_departamentos' }, {
            empresaId: empresaId,
            filtroSucursalId: filtroFinal
        });
    }
    updateDepartamento(req, deptoId, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición PATCH /departamentos/${deptoId} para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'update_departamento' }, {
            empresaId: empresaId,
            deptoId: deptoId,
            dto: dto,
        });
    }
    deleteDepartamento(req, deptoId) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición DELETE /departamentos/${deptoId} para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'delete_departamento' }, {
            empresaId: empresaId,
            deptoId: deptoId,
        });
    }
    createCargo(req, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición POST /cargos para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'create_cargo' }, {
            empresaId: empresaId,
            dto: dto,
        });
    }
    getCargos(req, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        const filtroFinal = sucursalId ? sucursalId : headerSucursalId;
        return this.personalService.send({ cmd: 'get_cargos' }, { empresaId, filtroSucursalId: filtroFinal });
    }
    updateCargo(req, cargoId, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición PATCH /cargos/${cargoId} para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'update_cargo' }, {
            empresaId: empresaId,
            cargoId: cargoId,
            dto: dto,
        });
    }
    deleteCargo(req, cargoId) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición DELETE /cargos/${cargoId} para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'delete_cargo' }, {
            empresaId: empresaId,
            cargoId: cargoId,
        });
    }
    createRol(req, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición POST /roles para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'create_rol' }, { empresaId: empresaId, dto: dto });
    }
    getRoles(req) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición GET /roles para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'get_roles' }, { empresaId: empresaId });
    }
    updateRol(req, rolId, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición PATCH /roles/${rolId} para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'update_rol' }, { empresaId: empresaId, rolId: rolId, dto: dto });
    }
    deleteRol(req, rolId) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición DELETE /roles/${rolId} para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'delete_rol' }, { empresaId: empresaId, rolId: rolId });
    }
    createContrato(req, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición POST /contratos para empresaId: ${empresaId}`);
        return this.nominaService.send({ cmd: 'create_contrato' }, { empresaId: empresaId, dto: dto });
    }
    getContratosByEmpleado(req, empleadoId) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición GET /empleados/${empleadoId}/contratos para empresaId: ${empresaId}`);
        return this.nominaService.send({ cmd: 'get_contratos_by_empleado' }, { empresaId: empresaId, empleadoId: empleadoId });
    }
    updateContrato(req, contratoId, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición PATCH /contratos/${contratoId} para empresaId: ${empresaId}`);
        return this.nominaService.send({ cmd: 'update_contrato' }, { empresaId: empresaId, contratoId: contratoId, dto: dto });
    }
    deleteContrato(req, contratoId) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición DELETE /contratos/${contratoId} para empresaId: ${empresaId}`);
        return this.nominaService.send({ cmd: 'delete_contrato' }, { empresaId: empresaId, contratoId: contratoId });
    }
    getBeneficios(req) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'get_beneficios' }, { empresaId: empresaId });
    }
    createBeneficio(req, dto) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'create_beneficio' }, { empresaId: empresaId, dto: dto });
    }
    updateBeneficio(req, beneficioId, dto) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'update_beneficio' }, { empresaId: empresaId, beneficioId: beneficioId, dto: dto });
    }
    deleteBeneficio(req, beneficioId) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'delete_beneficio' }, { empresaId: empresaId, beneficioId: beneficioId });
    }
    getBeneficiosStats(req) {
        return this.nominaService.send({ cmd: 'get_beneficios_stats' }, { empresaId: req.user.empresaId });
    }
    getBeneficioById(req, id) {
        return this.nominaService.send({ cmd: 'get_beneficio_by_id' }, { id, empresaId: req.user.empresaId });
    }
    getBeneficioAssignments(req, id) {
        return this.nominaService.send({ cmd: 'get_beneficio_assignments' }, { beneficioId: id, empresaId: req.user.empresaId });
    }
    updateBeneficioAssignments(req, id, body) {
        return this.nominaService.send({ cmd: 'update_beneficio_assignments' }, {
            beneficioId: id,
            empresaId: req.user.empresaId,
            employeeIds: body.employeeIds
        });
    }
    getPeriodosNomina(req) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'get_periodos_nomina' }, { empresaId: empresaId });
    }
    createPeriodoNomina(req, dto) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'create_periodo_nomina' }, { empresaId: empresaId, dto: dto });
    }
    updatePeriodoNomina(req, periodoId, dto) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'update_periodo_nomina' }, { empresaId: empresaId, periodoId: periodoId, dto: dto });
    }
    deletePeriodoNomina(req, periodoId) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'delete_periodo_nomina' }, { empresaId: empresaId, periodoId: periodoId });
    }
    getConceptosNomina(req) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'get_conceptos_nomina' }, { empresaId: empresaId });
    }
    createConceptoNomina(req, dto) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'create_concepto_nomina' }, { empresaId: empresaId, dto: dto });
    }
    updateConceptoNomina(req, conceptoId, dto) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'update_concepto_nomina' }, { empresaId: empresaId, conceptoId: conceptoId, dto: dto });
    }
    deleteConceptoNomina(req, conceptoId) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'delete_concepto_nomina' }, { empresaId: empresaId, conceptoId: conceptoId });
    }
    procesarNomina(req, dto) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'procesar_nomina' }, { empresaId: empresaId, dto: dto });
    }
    getProyectos(req, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        const filtroFinal = sucursalId ? sucursalId : headerSucursalId;
        return this.productividadService.send({ cmd: 'get_proyectos' }, {
            empresaId: empresaId,
            filtroSucursalId: filtroFinal
        });
    }
    createProyecto(req, dto, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        if (sucursalId) {
            dto.sucursalId = sucursalId;
        }
        else if (headerSucursalId) {
            dto.sucursalId = headerSucursalId;
        }
        return this.productividadService.send({ cmd: 'create_proyecto' }, { empresaId: empresaId, dto: dto });
    }
    updateProyecto(req, proyectoId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_proyecto' }, { empresaId: empresaId, proyectoId: proyectoId, dto: dto });
    }
    deleteProyecto(req, proyectoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_proyecto' }, { empresaId: empresaId, proyectoId: proyectoId });
    }
    createSprint(req, proyectoId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'create_sprint' }, { empresaId, proyectoId, dto });
    }
    getSprints(req, proyectoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_sprints_by_proyecto' }, { empresaId, proyectoId });
    }
    updateSprint(req, sprintId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_sprint' }, { empresaId, sprintId, dto });
    }
    deleteSprint(req, sprintId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_sprint' }, { empresaId, sprintId });
    }
    createTarea(req, sprintId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'create_tarea' }, { empresaId, sprintId, dto });
    }
    getTareasBySprint(req, sprintId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_tareas_by_sprint' }, { empresaId, sprintId });
    }
    updateTarea(req, tareaId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_tarea' }, { empresaId, tareaId, dto });
    }
    deleteTarea(req, tareaId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_tarea' }, { empresaId, tareaId });
    }
    assignTarea(req, tareaId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'assign_tarea' }, { empresaId, tareaId, dto });
    }
    getAsignaciones(req, tareaId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_asignaciones' }, { empresaId, tareaId });
    }
    removeAsignacion(req, asignacionId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'remove_asignacion' }, { empresaId, asignacionId });
    }
    updateAsignacion(req, asignacionId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_asignacion' }, { empresaId, asignacionId, dto });
    }
    createCiclo(req, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'create_ciclo' }, { empresaId, dto });
    }
    getCiclos(req) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_ciclos' }, { empresaId });
    }
    updateCiclo(req, cicloId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_ciclo' }, { empresaId, cicloId, dto });
    }
    deleteCiclo(req, cicloId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_ciclo' }, { empresaId, cicloId });
    }
    createObjetivo(req, cicloId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'create_objetivo' }, { empresaId, cicloId, dto });
    }
    getObjetivos(req, cicloId, empleadoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_objetivos' }, { empresaId, cicloId, empleadoId });
    }
    updateObjetivo(req, objetivoId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_objetivo' }, { empresaId, objetivoId, dto });
    }
    createEvaluacion(req, cicloId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'create_evaluacion' }, { empresaId, cicloId, dto });
    }
    getEvaluaciones(req, cicloId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_evaluaciones' }, { empresaId, cicloId });
    }
    updateEvaluacion(req, evaluacionId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_evaluacion' }, { empresaId, evaluacionId, dto });
    }
    deleteEvaluacion(req, evaluacionId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_evaluacion' }, { empresaId, evaluacionId });
    }
    createCurso(req, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'create_curso' }, { empresaId, dto });
    }
    getCursos(req) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_cursos' }, { empresaId });
    }
    updateCurso(req, cursoId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_curso' }, { empresaId, cursoId, dto });
    }
    deleteCurso(req, cursoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_curso' }, { empresaId, cursoId });
    }
    createInscripcion(req, cursoId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'create_inscripcion' }, { empresaId, cursoId, dto });
    }
    getInscripciones(req, cursoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_inscripciones_curso' }, { empresaId, cursoId });
    }
    updateInscripcion(req, inscripcionId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_inscripcion' }, { empresaId, inscripcionId, dto });
    }
    deleteInscripcion(req, inscripcionId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_inscripcion' }, { empresaId, inscripcionId });
    }
    getMisCursos(req) {
        const { empresaId, empleadoId } = req.user;
        return this.productividadService.send({ cmd: 'get_mis_cursos' }, { empresaId, empleadoId });
    }
    checkIn(req, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'check_in' }, { empresaId, dto });
    }
    checkOut(req, dto, empleadoId) {
        const { empresaId } = req.user;
        if (!empleadoId) {
        }
        return this.productividadService.send({ cmd: 'check_out' }, { empresaId, empleadoId, dto });
    }
    getHistorialAsistencia(req, empleadoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_asistencia' }, { empresaId, empleadoId });
    }
    createActivo(req, dto, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        if (sucursalId) {
            dto.sucursalId = sucursalId;
        }
        else if (headerSucursalId) {
            dto.sucursalId = headerSucursalId;
        }
        return this.productividadService.send({ cmd: 'create_activo' }, { empresaId, dto });
    }
    getActivos(req, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        const filtroFinal = sucursalId ? sucursalId : headerSucursalId;
        return this.productividadService.send({ cmd: 'get_activos' }, {
            empresaId,
            filtroSucursalId: filtroFinal
        });
    }
    updateActivo(req, activoId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'update_activo' }, { empresaId, activoId, dto });
    }
    deleteActivo(req, activoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_activo' }, { empresaId, activoId });
    }
    assignActivo(req, activoId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'assign_activo' }, { empresaId, activoId, dto });
    }
    returnActivo(req, asignacionId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'return_activo' }, { empresaId, asignacionId, dto });
    }
    getActivosEmpleado(req, empleadoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_activos_empleado' }, { empresaId, empleadoId });
    }
    getHistorialActivo(req, activoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_historial_activo' }, { empresaId, activoId });
    }
    createReporte(req, dto, empleadoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'create_reporte' }, { empresaId, empleadoId, dto });
    }
    uploadFactura(req, file) {
        if (!file)
            throw new common_1.BadRequestException('Factura requerida');
        const { empresaId } = req.user;
        const fileUrl = `http://localhost:3000/uploads/${empresaId}/gastos-facturas/${file.filename}`;
        return { url: fileUrl };
    }
    addItemGasto(req, reporteId, dto) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'add_item_gasto' }, { empresaId, reporteId, dto });
    }
    getReportes(req, empleadoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_reportes' }, { empresaId, empleadoId });
    }
    updateReporteEstado(req, reporteId, dto) {
        const { empresaId, sucursalId, role } = req.user;
        return this.productividadService.send({ cmd: 'update_reporte_estado' }, {
            empresaId,
            reporteId,
            dto,
            usuario: { role, sucursalId }
        });
    }
    getReporteById(req, reporteId) {
        const { empresaId, sucursalId, role } = req.user;
        return this.productividadService.send({ cmd: 'get_reporte_by_id' }, {
            empresaId,
            reporteId,
            usuario: { role, sucursalId }
        });
    }
    deleteItemGasto(req, reporteId, itemId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_item_gasto' }, { empresaId, reporteId, itemId });
    }
    getDashboard(req, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        const filtroFinal = sucursalId ? sucursalId : headerSucursalId;
        return this.productividadService.send({ cmd: 'get_dashboard_kpis' }, {
            empresaId,
            filtroSucursalId: filtroFinal
        });
    }
    ploadCertificado(req, inscripcionId, file) {
        if (!file)
            throw new common_1.BadRequestException('Archivo requerido');
        const { empresaId } = req.user;
        const fileUrl = `http://localhost:3000/uploads/${empresaId}/certificados/${file.filename}`;
        return this.productividadService.send({ cmd: 'upload_certificado' }, { empresaId, inscripcionId, fileUrl });
    }
    createVacante(req, dto, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        if (sucursalId) {
            dto.sucursalId = sucursalId;
        }
        else if (headerSucursalId) {
            dto.sucursalId = headerSucursalId;
        }
        return this.personalService.send({ cmd: 'create_vacante' }, { empresaId, dto });
    }
    updateVacante(req, vacanteId, dto) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'update_vacante' }, {
            empresaId,
            vacanteId,
            dto
        });
    }
    getVacantesAdmin(req, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        const filtroFinal = sucursalId ? sucursalId : headerSucursalId;
        return this.personalService.send({ cmd: 'get_vacantes' }, {
            empresaId,
            publicas: false,
            filtroSucursalId: filtroFinal
        });
    }
    async postularCandidato(req, vacanteId, body, file) {
        if (!file)
            throw new common_1.BadRequestException('El CV (PDF) es obligatorio');
        const empresaFolder = req.user?.empresaId || 'public';
        const fileUrl = `http://localhost:3000/uploads/${empresaFolder}/vacantes/${vacanteId}/candidatos/${file.filename}`;
        const candidatoDto = {
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono,
            vacanteId: vacanteId,
            cvUrl: fileUrl,
        };
        return this.personalService.send({ cmd: 'registrar_candidato' }, candidatoDto);
    }
    getCandidatos(req, vacanteId) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'get_candidatos' }, { empresaId, vacanteId });
    }
    reanalizarCandidato(candidatoId) {
        return this.personalService.send({ cmd: 'reanalizar_candidato' }, { candidatoId });
    }
    async uploadDocumentoEmpleado(req, empleadoId, nombre, tipo, file) {
        if (!file)
            throw new common_1.BadRequestException('Archivo requerido');
        const { empresaId } = req.user;
        const empresaFolder = empresaId;
        const fileUrl = `http://localhost:3000/uploads/${empresaFolder}/empleados/${empleadoId}/documentos/${file.filename}`;
        return this.personalService.send({ cmd: 'upload_documento_empleado' }, {
            empresaId,
            empleadoId,
            dto: { nombre, tipo, url: fileUrl }
        });
    }
    getCicloActivo(req) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_ciclo_activo' }, { empresaId });
    }
    getAsistenciaSummary(req, empleadoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_asistencia_summary' }, { empresaId, empleadoId });
    }
    deleteDocumento(req, documentoId) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'delete_documento' }, { empresaId, documentoId });
    }
    solicitarVacaciones(req, dto) {
        const { empresaId, empleadoId } = req.user;
        dto.empleadoId = empleadoId;
        return this.nominaService.send({ cmd: 'crear_solicitud_vacaciones' }, { empresaId, dto });
    }
    getSolicitudes(req) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'get_solicitudes_vacaciones' }, { empresaId });
    }
    async seedData(req) {
        const { empresaId } = req.user;
        if (!empresaId) {
            throw new common_1.BadRequestException('Necesitas estar logueado para ejecutar el seed.');
        }
        return this.productividadService.send({ cmd: 'seed_data' }, { empresaId });
    }
    uploadCompanyLogo(file) {
        if (!file)
            throw new common_1.BadRequestException('Archivo requerido');
        const fileUrl = `http://localhost:3000/uploads/public/temp/logos/${file.filename}`;
        return { url: fileUrl };
    }
    async fixPermissions(req) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'fix_permissions' }, { empresaId });
    }
    createSucursal(req, dto) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'create_sucursal' }, { empresaId, dto });
    }
    getSucursales(req) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'get_sucursales' }, { empresaId });
    }
    updateSucursal(req, sucursalId, dto) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'update_sucursal' }, { empresaId, sucursalId, dto });
    }
    deleteSucursal(req, sucursalId) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'delete_sucursal' }, { empresaId, sucursalId });
    }
    switchCompany(req, empresaId) {
        console.log('🔍 req.user:', req.user);
        const usuarioId = req.user?.userId;
        if (!usuarioId) {
            throw new common_1.UnauthorizedException('No se pudo obtener el usuario del token');
        }
        console.log('📤 Enviando al microservicio:', { usuarioId, empresaId });
        return this.authService.send({ cmd: 'switch_company' }, { usuarioId, empresaId });
    }
    createCompanyUser(req, body) {
        const usuarioId = req.user.sub;
        return this.authService.send({ cmd: 'create_company_user' }, { usuarioId, ...body });
    }
    getObjetivosDepto(req, cicloId, deptoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_objetivos_departamento' }, { empresaId, cicloId, departamentoId: deptoId });
    }
    getAllObjetivos(req, cicloId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'get_all_objetivos' }, { empresaId, cicloId });
    }
    deleteObjetivo(req, objetivoId) {
        const { empresaId } = req.user;
        return this.productividadService.send({ cmd: 'delete_objetivo' }, { empresaId, objetivoId });
    }
    getPublicVacancy(id) {
        console.log(`Gateway: Petición pública vacante ${id}`);
        return this.personalService.send({ cmd: 'get_public_vacancy' }, { vacanteId: id });
    }
    async crearNovedad(req, body) {
        const { empresaId } = req.user;
        return this.nominaService.send({ cmd: 'crear_novedad' }, { ...body, empresaId });
    }
    async getNovedadesEmpleado(id) {
        return this.nominaService.send({ cmd: 'obtener_novedades_empleado' }, { empleadoId: id });
    }
    async getNominaConfig(req) {
        return this.nominaService.send({ cmd: 'get_configuracion_nomina' }, { empresaId: req.user.empresaId });
    }
    async updateNominaConfig(req, config) {
        return this.nominaService.send({ cmd: 'update_configuracion_nomina' }, { empresaId: req.user.empresaId, config });
    }
    async getReporteNomina(req, periodoId) {
        return this.nominaService.send({ cmd: 'obtener_reporte_nomina' }, { empresaId: req.user.empresaId, periodoId });
    }
    importarMasivoEmpleados(req, body) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'import_bulk_empleados' }, {
            empresaId,
            empleados: body.employees
        });
    }
    crearPlantillaOnboarding(req, dto) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'create_onboarding_template' }, { empresaId, dto });
    }
    asignarOnboarding(body) {
        return this.personalService.send({ cmd: 'assign_onboarding' }, {
            empleadoId: body.empleadoId,
            plantillaId: body.plantillaId
        });
    }
    getMisTareasOnboarding(req) {
        const { empleadoId } = req.user;
        return this.personalService.send({ cmd: 'get_my_onboarding' }, { empleadoId });
    }
    toggleTareaOnboarding(tareaId, body) {
        return this.personalService.send({ cmd: 'toggle_onboarding_task' }, {
            tareaId,
            isComplete: body.isComplete
        });
    }
    runSeedTest(req) {
        const { empresaId, empleadoId } = req.user;
        return this.personalService.send({ cmd: 'seed_onboarding_test' }, { empresaId, empleadoId });
    }
    seedRolesDefault(req) {
        const { empresaId } = req.user;
        console.log(`📡 Gateway: Solicitando roles por defecto para empresa ${empresaId}`);
        return this.personalService.send({ cmd: 'seed_roles_default' }, { empresaId });
    }
    createDocEmpresa(req, dto, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        if (sucursalId) {
            dto.sucursalId = sucursalId;
        }
        else if (headerSucursalId) {
            dto.sucursalId = headerSucursalId;
        }
        return this.personalService.send({ cmd: 'create_doc_empresa' }, { empresaId, dto });
    }
    getDocsEmpresa(req, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        const filtroFinal = sucursalId ? sucursalId : headerSucursalId;
        return this.personalService.send({ cmd: 'get_docs_empresa' }, { empresaId, filtroSucursalId: filtroFinal });
    }
    uploadDocumentoFisico(req, file) {
        if (!file)
            throw new common_1.BadRequestException('Archivo requerido');
        const { empresaId } = req.user;
        const fileUrl = `http://localhost:3000/uploads/${empresaId}/documentos-empresa/${file.filename}`;
        return { url: fileUrl };
    }
    createAnuncio(req, dto, headerSucursalId) {
        const { empresaId, sucursalId } = req.user;
        if (sucursalId) {
            dto.sucursalId = sucursalId;
        }
        else if (headerSucursalId) {
            dto.sucursalId = headerSucursalId;
        }
        return this.productividadService.send({ cmd: 'create_anuncio' }, { empresaId, dto });
    }
    getMyAnuncios(req, headerSucursalId) {
        const { empresaId, sucursalId, role } = req.user;
        console.log('--- DEBUG ANUNCIOS GATEWAY ---');
        console.log('Usuario:', req.user.email);
        console.log('Rol:', role);
        console.log('Sucursal en Token:', sucursalId);
        const filtroFinal = sucursalId ? sucursalId : headerSucursalId;
        return this.productividadService.send({ cmd: 'get_anuncios' }, {
            empresaId,
            filtroSucursalId: filtroFinal
        });
    }
    createEncuesta(req, dto) {
        return this.productividadService.send({ cmd: 'create_encuesta' }, {
            empresaId: req.user.empresaId,
            user: req.user,
            dto
        });
    }
    getMyEncuestas(req) {
        return this.productividadService.send({ cmd: 'get_encuestas' }, {
            empresaId: req.user.empresaId,
            sucursalId: req.user.sucursalId,
            empleadoId: req.user.sub
        });
    }
    getAllSurveysAdmin(req) {
        return this.productividadService.send({ cmd: 'get_all_encuestas_admin' }, { empresaId: req.user.empresaId });
    }
    votarEncuesta(req, encuestaId, dto) {
        return this.productividadService.send({ cmd: 'registrar_voto' }, {
            encuestaId,
            opcionId: dto.opcionId,
            empleadoId: req.user.sub
        });
    }
    async responderSolicitudVacaciones(req, solicitudId, dto) {
        const { empresaId, sucursalId, role } = req.user;
        const solicitud = await (0, rxjs_1.lastValueFrom)(this.nominaService.send({ cmd: 'responder_solicitud_vacaciones' }, {
            empresaId,
            solicitudId,
            dto,
            usuario: { role, sucursalId }
        }));
        return solicitud;
    }
    rechazarCandidato(req, vacanteId, candidatoId, body) {
        const { empresaId } = req.user;
        return this.personalService.send({ cmd: 'rechazar_candidato' }, {
            empresaId,
            vacanteId,
            candidatoId,
            motivo: body.motivo
        });
    }
    async getEmpresaConfig(req) {
        const { empresaId } = req.user;
        return this.authService.send({ cmd: 'get_company_config' }, { empresaId });
    }
    async updateEmpresaConfig(req, dto) {
        const { empresaId } = req.user;
        return this.authService.send({ cmd: 'update_company_config' }, {
            empresaId,
            config: dto
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('ping-auth'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "pingAuthService", null);
__decorate([
    (0, common_1.Post)('auth/register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('auth/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('empresa/upload-logo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_config_util_1.createMulterOptions)('logos-empresa', 2))),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadLogo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('empresa/me'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getMyCompany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('empresa/me/branding'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateBranding", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('auth/create-company'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCompany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('empleados'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getEmpleados", null);
__decorate([
    openapi.ApiOperation({ summary: "Crea un nuevo empleado (RF-01-01)" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('empleados'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_empleado_dto_1.CreateEmpleadoDto, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createEmpleado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('empleados/lista-directorio'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDirectorio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('empleados/organigrama'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getOrganigrama", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('empleados/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getEmpleado", null);
__decorate([
    openapi.ApiOperation({ summary: "Actualiza un empleado (RF-01-03)" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('empleados/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_empleado_dto_1.UpdateEmpleadoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateEmpleado", null);
__decorate([
    openapi.ApiOperation({ summary: "Desactiva (Soft Delete) un empleado (RF-01-04)" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('empleados/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteEmpleado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('empleados/:id/foto'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_config_util_1.createMulterOptions)((req) => `empleados/${req.params.id}/foto`, 2, /\/(jpg|jpeg|png)$/))),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadFotoPerfil", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('empleados/:id/documentos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDocumentosEmpleado", null);
__decorate([
    openapi.ApiOperation({ summary: "Crea un nuevo departamento (RF-02)" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('departamentos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_departamento_dto_1.CreateDepartamentoDto, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createDepartamento", null);
__decorate([
    openapi.ApiOperation({ summary: "Obtiene la lista de departamentos (Con Filtro de Sede)" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('departamentos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDepartamentos", null);
__decorate([
    openapi.ApiOperation({ summary: "Actualiza un departamento (RF-02)" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('departamentos/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_departamento_dto_1.UpdateDepartamentoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateDepartamento", null);
__decorate([
    openapi.ApiOperation({ summary: "Desactiva (Soft Delete) un departamento (RF-02)" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('departamentos/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteDepartamento", null);
__decorate([
    openapi.ApiOperation({ summary: "Endpoint del Gateway para CREAR un Cargo.\n(Este es el que t\u00FA ya ten\u00EDas)" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('cargos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_cargo_dto_1.CreateCargoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCargo", null);
__decorate([
    openapi.ApiOperation({ summary: "Endpoint del Gateway para OBTENER TODOS los Cargos." }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('cargos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCargos", null);
__decorate([
    openapi.ApiOperation({ summary: "Endpoint del Gateway para ACTUALIZAR un Cargo." }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('cargos/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_cargo_dto_1.UpdateCargoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateCargo", null);
__decorate([
    openapi.ApiOperation({ summary: "Endpoint del Gateway para ELIMINAR (Soft Delete) un Cargo." }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('cargos/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteCargo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('roles.create'),
    (0, common_1.Post)('roles'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_rol_dto_1.CreateRolDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createRol", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('roles.read'),
    (0, common_1.Get)('roles'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getRoles", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('roles.update'),
    (0, common_1.Patch)('roles/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_rol_dto_1.UpdateRolDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateRol", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('roles.delete'),
    (0, common_1.Delete)('roles/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteRol", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('contratos.create'),
    (0, common_1.Post)('contratos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_contrato_dto_1.CreateContratoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createContrato", null);
__decorate([
    openapi.ApiOperation({ summary: "Endpoint del Gateway para OBTENER todos los contratos DE UN EMPLEADO\n(Ruta REST anidada para mejor sem\u00E1ntica)" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('contratos.read'),
    (0, common_1.Get)('empleados/:empleadoId/contratos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getContratosByEmpleado", null);
__decorate([
    openapi.ApiOperation({ summary: "Endpoint del Gateway para ACTUALIZAR un Contrato" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('contratos.update'),
    (0, common_1.Patch)('contratos/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_contrato_dto_1.UpdateContratoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateContrato", null);
__decorate([
    openapi.ApiOperation({ summary: "Endpoint del Gateway para ELIMINAR (Soft Delete) un Contrato" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('contratos.delete'),
    (0, common_1.Delete)('contratos/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteContrato", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('beneficios.read'),
    (0, common_1.Get)('beneficios'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBeneficios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('beneficios.create'),
    (0, common_1.Post)('beneficios'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_beneficio_dto_1.CreateBeneficioDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createBeneficio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('beneficios.update'),
    (0, common_1.Patch)('beneficios/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_beneficio_dto_1.UpdateBeneficioDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateBeneficio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('beneficios.delete'),
    (0, common_1.Delete)('beneficios/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteBeneficio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('beneficios.read'),
    (0, common_1.Get)('concepts/recurring-stats'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBeneficiosStats", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('beneficios.read'),
    (0, common_1.Get)('beneficios/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBeneficioById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('beneficios.read'),
    (0, common_1.Get)('beneficios/:id/asignaciones'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getBeneficioAssignments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('beneficios.update'),
    (0, common_1.Post)('beneficios/:id/asignaciones'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateBeneficioAssignments", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.periodos.read'),
    (0, common_1.Get)('periodos-nomina'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getPeriodosNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.periodos.create'),
    (0, common_1.Post)('periodos-nomina'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_periodo_nomina_dto_1.CreatePeriodoNominaDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createPeriodoNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.periodos.update'),
    (0, common_1.Patch)('periodos-nomina/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_periodo_nomina_dto_1.UpdatePeriodoNominaDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updatePeriodoNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.periodos.delete'),
    (0, common_1.Delete)('periodos-nomina/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deletePeriodoNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.conceptos.read'),
    (0, common_1.Get)('conceptos-nomina'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getConceptosNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.conceptos.create'),
    (0, common_1.Post)('conceptos-nomina'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_concepto_nomina_dto_1.CreateConceptoNominaDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createConceptoNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.conceptos.update'),
    (0, common_1.Patch)('conceptos-nomina/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_concepto_nomina_dto_1.UpdateConceptoNominaDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateConceptoNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.conceptos.delete'),
    (0, common_1.Delete)('conceptos-nomina/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteConceptoNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.procesar'),
    (0, common_1.Post)('nomina/procesar'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, procesar_nomina_dto_1.ProcesarNominaDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "procesarNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.proyectos.read'),
    (0, common_1.Get)('proyectos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getProyectos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.proyectos.create'),
    (0, common_1.Post)('proyectos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_proyecto_dto_1.CreateProyectoDto, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createProyecto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.proyectos.update'),
    (0, common_1.Patch)('proyectos/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_proyecto_dto_1.UpdateProyectoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateProyecto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.proyectos.delete'),
    (0, common_1.Delete)('proyectos/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteProyecto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.sprints.create'),
    (0, common_1.Post)('proyectos/:proyectoId/sprints'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('proyectoId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_sprint_dto_1.CreateSprintDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createSprint", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.sprints.read'),
    (0, common_1.Get)('proyectos/:proyectoId/sprints'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('proyectoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getSprints", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.sprints.update'),
    (0, common_1.Patch)('sprints/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_sprint_dto_1.UpdateSprintDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateSprint", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.sprints.delete'),
    (0, common_1.Delete)('sprints/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteSprint", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.tareas.create'),
    (0, common_1.Post)('sprints/:sprintId/tareas'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('sprintId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_tarea_dto_1.CreateTareaDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createTarea", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.tareas.read'),
    (0, common_1.Get)('sprints/:sprintId/tareas'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('sprintId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getTareasBySprint", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.tareas.update'),
    (0, common_1.Patch)('tareas/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_tarea_dto_1.UpdateTareaDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateTarea", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.tareas.delete'),
    (0, common_1.Delete)('tareas/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteTarea", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.tareas.assign'),
    (0, common_1.Post)('tareas/:tareaId/asignaciones'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('tareaId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_asignacion_dto_1.CreateAsignacionDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "assignTarea", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.tareas.read'),
    (0, common_1.Get)('tareas/:tareaId/asignaciones'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('tareaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAsignaciones", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.tareas.assign'),
    (0, common_1.Delete)('asignaciones/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "removeAsignacion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('productividad.tareas.assign'),
    (0, common_1.Patch)('asignaciones/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_asignacion_dto_1.UpdateAsignacionDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateAsignacion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.ciclos.create'),
    (0, common_1.Post)('desempeno/ciclos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_ciclo_dto_1.CreateCicloDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCiclo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.ciclos.read'),
    (0, common_1.Get)('desempeno/ciclos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCiclos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.ciclos.update'),
    (0, common_1.Patch)('desempeno/ciclos/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_ciclo_dto_1.UpdateCicloDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateCiclo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.ciclos.delete'),
    (0, common_1.Delete)('desempeno/ciclos/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteCiclo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.objetivos.create'),
    (0, common_1.Post)('desempeno/ciclos/:cicloId/objetivos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cicloId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_objetivo_dto_1.CreateObjetivoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createObjetivo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.objetivos.read'),
    (0, common_1.Get)('desempeno/ciclos/:cicloId/objetivos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cicloId')),
    __param(2, (0, common_1.Query)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getObjetivos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.objetivos.update'),
    (0, common_1.Patch)('desempeno/objetivos/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_objetivo_dto_1.UpdateObjetivoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateObjetivo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.evaluaciones.create'),
    (0, common_1.Post)('desempeno/ciclos/:cicloId/evaluaciones'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cicloId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_evaluacion_dto_1.CreateEvaluacionDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createEvaluacion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.evaluaciones.read'),
    (0, common_1.Get)('desempeno/ciclos/:cicloId/evaluaciones'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cicloId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getEvaluaciones", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.evaluaciones.update'),
    (0, common_1.Patch)('desempeno/evaluaciones/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_evaluacion_dto_1.UpdateEvaluacionDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateEvaluacion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.evaluaciones.delete'),
    (0, common_1.Delete)('desempeno/evaluaciones/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteEvaluacion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('capacitacion.cursos.create'),
    (0, common_1.Post)('capacitacion/cursos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_curso_dto_1.CreateCursoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCurso", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('capacitacion.cursos.read'),
    (0, common_1.Get)('capacitacion/cursos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCursos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('capacitacion.cursos.update'),
    (0, common_1.Patch)('capacitacion/cursos/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_curso_dto_1.UpdateCursoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateCurso", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('capacitacion.cursos.delete'),
    (0, common_1.Delete)('capacitacion/cursos/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteCurso", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('capacitacion.inscripciones.create'),
    (0, common_1.Post)('capacitacion/cursos/:cursoId/inscripciones'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cursoId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_inscripcion_dto_1.CreateInscripcionDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createInscripcion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('capacitacion.inscripciones.read'),
    (0, common_1.Get)('capacitacion/cursos/:cursoId/inscripciones'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cursoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getInscripciones", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('capacitacion.inscripciones.update'),
    (0, common_1.Patch)('capacitacion/inscripciones/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_inscripcion_dto_1.UpdateInscripcionDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateInscripcion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('capacitacion.inscripciones.delete'),
    (0, common_1.Delete)('capacitacion/inscripciones/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteInscripcion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('capacitacion/mis-cursos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMisCursos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('asistencia.registro'),
    (0, common_1.Post)('asistencia/check-in'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, check_in_dto_1.CheckInDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "checkIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('asistencia.registro'),
    (0, common_1.Post)('asistencia/check-out'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, check_out_dto_1.CheckOutDto, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "checkOut", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('asistencia.reportes'),
    (0, common_1.Get)('asistencia/empleados/:empleadoId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHistorialAsistencia", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('activos.gestion'),
    (0, common_1.Post)('activos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_activo_dto_1.CreateActivoDto, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createActivo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('activos.gestion'),
    (0, common_1.Get)('activos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getActivos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('activos.gestion'),
    (0, common_1.Patch)('activos/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_activo_dto_1.UpdateActivoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateActivo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('activos.gestion'),
    (0, common_1.Delete)('activos/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteActivo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('activos.asignar'),
    (0, common_1.Post)('activos/:activoId/asignaciones'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('activoId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, assign_activo_dto_1.AssignActivoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "assignActivo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('activos.asignar'),
    (0, common_1.Post)('activos/asignaciones/:id/devolver'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, return_activo_dto_1.ReturnActivoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "returnActivo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('activos.gestion'),
    (0, common_1.Get)('activos/empleados/:empleadoId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getActivosEmpleado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('activos.gestion'),
    (0, common_1.Get)('activos/:activoId/historial'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('activoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHistorialActivo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('gastos.reportar'),
    (0, common_1.Post)('gastos/reportes'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_reporte_dto_1.CreateReporteDto, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createReporte", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('gastos/upload-factura'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_config_util_1.createMulterOptions)('gastos-facturas', 5))),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFactura", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('gastos.reportar'),
    (0, common_1.Post)('gastos/reportes/:reporteId/items'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('reporteId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_item_gasto_dto_1.CreateItemGastoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "addItemGasto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('gastos.ver'),
    (0, common_1.Get)('gastos/reportes'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('empleadoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getReportes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('gastos.aprobar'),
    (0, common_1.Patch)('gastos/reportes/:id/estado'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_reporte_estado_dto_1.UpdateReporteEstadoDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateReporteEstado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('gastos.ver'),
    (0, common_1.Get)('gastos/reportes/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getReporteById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('gastos.reportar'),
    (0, common_1.Delete)('gastos/reportes/:reporteId/items/:itemId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('reporteId')),
    __param(2, (0, common_1.Param)('itemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteItemGasto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('analiticas.ver'),
    (0, common_1.Get)('analiticas/dashboard'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, common_1.Post)('capacitacion/inscripciones/:id/certificado'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_config_util_1.createMulterOptions)('certificados', 5))),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "ploadCertificado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('reclutamiento.gestion'),
    (0, common_1.Post)('reclutamiento/vacantes'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_vacante_dto_1.CreateVacanteDto, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createVacante", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('reclutamiento.gestion'),
    (0, common_1.Patch)('reclutamiento/vacantes/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_vacante_dto_1.UpdateVacanteDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateVacante", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('reclutamiento.gestion'),
    (0, common_1.Get)('reclutamiento/vacantes'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getVacantesAdmin", null);
__decorate([
    (0, common_1.Post)('reclutamiento/vacantes/:vacanteId/postular'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_config_util_1.createMulterOptions)((req) => `vacantes/${req.params.vacanteId}/candidatos`, 10, /\/(pdf)$/))),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('vacanteId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "postularCandidato", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('reclutamiento.gestion'),
    (0, common_1.Get)('reclutamiento/vacantes/:vacanteId/candidatos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('vacanteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCandidatos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('reclutamiento.gestion'),
    (0, common_1.Post)('reclutamiento/candidatos/:candidatoId/reanalizar'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Param)('candidatoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "reanalizarCandidato", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('empleados/:id/documentos'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_config_util_1.createMulterOptions)((req) => `empleados/${req.params.id}/documentos`, 10))),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('nombre')),
    __param(3, (0, common_1.Body)('tipo')),
    __param(4, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uploadDocumentoEmpleado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('desempeno/ciclos/activo'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getCicloActivo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('asistencia/empleados/:id/resumen'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAsistenciaSummary", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('empleados/documentos/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteDocumento", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('nomina/vacaciones'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_solicitud_dto_1.CreateSolicitudDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "solicitarVacaciones", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('nomina/vacaciones'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getSolicitudes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('admin/seed-data'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "seedData", null);
__decorate([
    (0, common_1.Post)('auth/upload-logo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_config_util_1.createMulterOptions)('temp/logos', 2, /\/(jpg|jpeg|png)$/))),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadCompanyLogo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('admin/fix-permissions'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "fixPermissions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('sucursales.gestion'),
    (0, common_1.Post)('sucursales'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_sucursal_dto_1.CreateSucursalDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createSucursal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('sucursales.gestion'),
    (0, common_1.Get)('sucursales'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getSucursales", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('sucursales.gestion'),
    (0, common_1.Patch)('sucursales/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_sucursal_dto_1.UpdateSucursalDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateSucursal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('sucursales.gestion'),
    (0, common_1.Delete)('sucursales/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteSucursal", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('auth/switch-company'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('empresaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "switchCompany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('auth/create-company-user'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCompanyUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('desempeno/ciclos/:cicloId/departamentos/:deptoId/objetivos'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cicloId')),
    __param(2, (0, common_1.Param)('deptoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getObjetivosDepto", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.objetivos.read'),
    (0, common_1.Get)('desempeno/ciclos/:cicloId/objetivos-globales'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('cicloId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllObjetivos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('desempeno.objetivos.delete'),
    (0, common_1.Delete)('desempeno/objetivos/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteObjetivo", null);
__decorate([
    (0, common_1.Get)('public/vacantes/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getPublicVacancy", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('nomina/novedades'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "crearNovedad", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('nomina/novedades/empleado/:id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getNovedadesEmpleado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('nomina/configuracion'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getNominaConfig", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('nomina/configuracion'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateNominaConfig", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('nomina.reportes'),
    (0, common_1.Get)('nomina/reportes/:periodoId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('periodoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getReporteNomina", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('empleados.crear'),
    (0, common_1.Post)('empleados/importar-masivo'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "importarMasivoEmpleados", null);
__decorate([
    openapi.ApiOperation({ summary: "1. CREAR PLANTILLA (Para RRHH)\nRuta: POST /onboarding/plantillas" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('onboarding.gestion'),
    (0, common_1.Post)('onboarding/plantillas'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearPlantillaOnboarding", null);
__decorate([
    openapi.ApiOperation({ summary: "2. ASIGNAR PLANTILLA A EMPLEADO\nRuta: POST /onboarding/asignar" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('empleados.editar'),
    (0, common_1.Post)('onboarding/asignar'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "asignarOnboarding", null);
__decorate([
    openapi.ApiOperation({ summary: "3. VER MIS TAREAS (Para el Empleado - Dashboard)\nRuta: GET /empleados/me/onboarding" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('empleados/me/onboarding'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMisTareasOnboarding", null);
__decorate([
    openapi.ApiOperation({ summary: "4. MARCAR TAREA COMO COMPLETADA/PENDIENTE\nRuta: PATCH /empleados/me/onboarding/:tareaId" }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('empleados/me/onboarding/:tareaId'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('tareaId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "toggleTareaOnboarding", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('onboarding/seed-test'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "runSeedTest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)(permissions_1.PERMISSIONS.ROLES_MANAGE),
    (0, common_1.Post)('roles/seed-defaults'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "seedRolesDefault", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('documentos.gestion'),
    (0, common_1.Post)('documentos-empresa'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_documento_empresa_dto_1.CreateDocumentoEmpresaDto, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createDocEmpresa", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('documentos-empresa'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDocsEmpresa", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('documentos-empresa/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_config_util_1.createMulterOptions)('documentos-empresa', 10))),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadDocumentoFisico", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('anuncios'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_anuncio_dto_1.CreateAnuncioDto, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createAnuncio", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('anuncios'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Headers)('x-sucursal-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMyAnuncios", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('encuestas'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_encuesta_dto_1.CreateEncuestaDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createEncuesta", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('encuestas'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getMyEncuestas", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('productividad/admin/encuestas'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getAllSurveysAdmin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('encuestas/:id/votar'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, vote_dto_1.VoteDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "votarEncuesta", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('nomina/vacaciones/:id/responder'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, responder_solicitud_dto_1.ResponderSolicitudDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "responderSolicitudVacaciones", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, permission_decorator_1.RequirePermission)('reclutamiento.gestion'),
    (0, common_1.Patch)('reclutamiento/vacantes/:vacanteId/candidatos/:candidatoId/rechazar'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('vacanteId')),
    __param(2, (0, common_1.Param)('candidatoId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "rechazarCandidato", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('empresas/configuracion'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getEmpresaConfig", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('empresas/configuracion'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_configuracion_dto_1.UpdateConfiguracionEmpresaDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateEmpresaConfig", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(2, (0, common_1.Inject)('PERSONAL_SERVICE')),
    __param(3, (0, common_1.Inject)('NOMINA_SERVICE')),
    __param(4, (0, common_1.Inject)('PRODUCTIVIDAD_SERVICE')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], AppController);


/***/ }),

/***/ "./apps/punto-pymes-backend/src/app.module.ts":
/*!****************************************************!*\
  !*** ./apps/punto-pymes-backend/src/app.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/punto-pymes-backend/src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/punto-pymes-backend/src/app.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwt_strategy_1 = __webpack_require__(/*! ./auth/jwt.strategy */ "./apps/punto-pymes-backend/src/auth/jwt.strategy.ts");
const serve_static_1 = __webpack_require__(/*! @nestjs/serve-static */ "@nestjs/serve-static");
const path_1 = __webpack_require__(/*! path */ "path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../..', 'uploads'),
                serveRoot: '/uploads',
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: './.env',
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'AUTH_SERVICE',
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: 'auth_service',
                            port: +configService.get('AUTH_SERVICE_PORT'),
                        },
                    }),
                },
                {
                    name: 'PERSONAL_SERVICE',
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: 'personal_service',
                            port: +configService.get('PERSONAL_SERVICE_PORT'),
                        },
                    }),
                },
                {
                    name: 'NOMINA_SERVICE',
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: 'nomina_service',
                            port: +configService.get('NOMINA_SERVICE_PORT'),
                        },
                    }),
                },
                {
                    name: 'PRODUCTIVIDAD_SERVICE',
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.TCP,
                        options: {
                            host: 'productividad_service',
                            port: +configService.get('PRODUCTIVIDAD_SERVICE_PORT'),
                        },
                    }),
                },
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: +configService.get('JWT_EXPIRES_IN'),
                    },
                }),
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_strategy_1.JwtStrategy],
    })
], AppModule);


/***/ }),

/***/ "./apps/punto-pymes-backend/src/app.service.ts":
/*!*****************************************************!*\
  !*** ./apps/punto-pymes-backend/src/app.service.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),

/***/ "./apps/punto-pymes-backend/src/auth/decorators/permission.decorator.ts":
/*!******************************************************************************!*\
  !*** ./apps/punto-pymes-backend/src/auth/decorators/permission.decorator.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequirePermission = exports.PERMISSION_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.PERMISSION_KEY = 'require_permission';
const RequirePermission = (permission) => (0, common_1.SetMetadata)(exports.PERMISSION_KEY, permission);
exports.RequirePermission = RequirePermission;


/***/ }),

/***/ "./apps/punto-pymes-backend/src/auth/guards/permission.guard.ts":
/*!**********************************************************************!*\
  !*** ./apps/punto-pymes-backend/src/auth/guards/permission.guard.ts ***!
  \**********************************************************************/
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
exports.PermissionGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
let PermissionGuard = class PermissionGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredPermission = this.reflector.get('permission', context.getHandler());
        if (!requiredPermission) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const permisos = user?.permisos;
        console.log('🛡️ PermissionGuard Check:');
        console.log(`   - Usuario: ${user?.email}`);
        console.log(`   - Pide: "${requiredPermission}"`);
        if (!user || !permisos) {
            console.warn('   ⛔ Rechazado: Usuario sin datos de permisos.');
            return false;
        }
        if (permisos.esAdmin === true) {
            console.log('   ✅ Aprobado (SuperAdmin Flag)');
            return true;
        }
        if (Array.isArray(permisos) && permisos.includes('*')) {
            console.log('   ✅ Aprobado (SuperAdmin Wildcard)');
            return true;
        }
        if (Array.isArray(permisos)) {
            const tienePermiso = permisos.includes(requiredPermission);
            if (tienePermiso) {
                console.log(`   ✅ Aprobado (Array: Encontrado)`);
                return true;
            }
            else {
                console.warn(`   ⛔ Rechazado (Array: No encontrado)`);
                return false;
            }
        }
        if (permisos[requiredPermission] === true) {
            console.log(`   ✅ Aprobado (Objeto Directo)`);
            return true;
        }
        if (this.checkNestedPermission(permisos, requiredPermission)) {
            console.log(`   ✅ Aprobado (Objeto Anidado)`);
            return true;
        }
        console.warn(`   ⛔ Rechazado (No se encontró en ninguna estructura)`);
        return false;
    }
    checkNestedPermission(permisos, path) {
        if (!permisos || typeof permisos !== 'object')
            return false;
        const keys = path.split('.');
        let current = permisos;
        for (const key of keys) {
            if (current[key] === undefined || current[key] === null) {
                return false;
            }
            current = current[key];
        }
        return current === true;
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionGuard);


/***/ }),

/***/ "./apps/punto-pymes-backend/src/auth/jwt-auth.guard.ts":
/*!*************************************************************!*\
  !*** ./apps/punto-pymes-backend/src/auth/jwt-auth.guard.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),

/***/ "./apps/punto-pymes-backend/src/auth/jwt.strategy.ts":
/*!***********************************************************!*\
  !*** ./apps/punto-pymes-backend/src/auth/jwt.strategy.ts ***!
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
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        const secret = configService.get('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }
    async validate(payload) {
        console.log('🔑 JWT Strategy - Payload recibido:', payload);
        const user = {
            userId: payload.sub,
            email: payload.email,
            empresaId: payload.empresaId,
            empleadoId: payload.empleadoId,
            rolId: payload.rolId,
            role: payload.role,
            permisos: payload.permisos,
            sucursalId: payload.sucursalId,
            sub: payload.sub,
            id: payload.sub,
            rol: payload.rol,
        };
        console.log('✅ JWT Strategy - Usuario validado (compatible con todo):', user);
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], JwtStrategy);


/***/ }),

/***/ "./apps/punto-pymes-backend/src/shared/utils/multer-config.util.ts":
/*!*************************************************************************!*\
  !*** ./apps/punto-pymes-backend/src/shared/utils/multer-config.util.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMulterOptions = void 0;
const multer_1 = __webpack_require__(/*! multer */ "multer");
const path_1 = __webpack_require__(/*! path */ "path");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const createMulterOptions = (folderPath, maxFileSizeMB = 5, allowedTypes = /\/(jpg|jpeg|png|pdf)$/) => {
    return {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const empresaId = req.user?.empresaId || 'public';
                let subFolder = '';
                if (typeof folderPath === 'function') {
                    subFolder = folderPath(req);
                }
                else {
                    subFolder = folderPath;
                }
                const uploadPath = (0, path_1.join)(process.cwd(), 'uploads', empresaId, subFolder);
                if (!(0, fs_1.existsSync)(uploadPath)) {
                    (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
        limits: { fileSize: maxFileSizeMB * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(allowedTypes)) {
                return cb(new common_1.BadRequestException(`Tipo inválido. Se permite: ${allowedTypes}`), false);
            }
            cb(null, true);
        },
    };
};
exports.createMulterOptions = createMulterOptions;


/***/ }),

/***/ "./libs/common/src/constants/permissions.ts":
/*!**************************************************!*\
  !*** ./libs/common/src/constants/permissions.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PERMISSION_GROUPS = exports.PERMISSIONS = void 0;
exports.PERMISSIONS = {
    PERFIL_ME: 'perfil.me',
    PAYROLL_MY_READ: 'nomina.leer_propia',
    ATTENDANCE_MY_READ: 'asistencia.leer_propia',
    VACATIONS_REQUEST: 'vacaciones.solicitar',
    LOANS_REQUEST: 'prestamos.solicitar',
    ONBOARDING_MY_PROGRESS: 'onboarding.mi_progreso',
    TASKS_MY_READ: 'tareas.leer_propias',
    EXPENSES_REPORT: 'gastos.reportar',
    EMPLOYEES_READ_BASIC: 'empleados.leer_basico',
    EMPLOYEES_READ_SENSITIVE: 'empleados.leer_sensible',
    EMPLOYEES_READ: 'empleados.leer',
    EMPLOYEES_CREATE: 'empleados.crear',
    EMPLOYEES_EDIT: 'empleados.editar',
    EMPLOYEES_MANAGE: 'empleados.gestion',
    EMPLOYEES_DELETE: 'empleados.borrar',
    EMPLOYEES_EXPORT: 'empleados.exportar',
    BRANCHES_MANAGE: 'sucursales.gestion',
    DEPARTMENTS_MANAGE: 'departamentos.gestion',
    POSITIONS_MANAGE: 'cargos.gestion',
    PROJECTS_READ: 'proyectos.leer',
    PROJECTS_MANAGE: 'proyectos.gestion',
    TASKS_MANAGE: 'tareas.gestion',
    TASKS_EXECUTE: 'tareas.ejecutar',
    SALARIES_READ: 'salarios.leer',
    PAYROLL_READ_ALL: 'nomina.leer_todo',
    PAYROLL_READ: 'nomina.leer',
    PAYROLL_PROCESS: 'nomina.procesar',
    PAYROLL_CONFIG: 'nomina.configurar',
    PAYROLL_EXPORT: 'nomina.exportar',
    BENEFITS_MANAGE: 'beneficios.gestionar',
    LOANS_APPROVE: 'prestamos.aprobar',
    ATTENDANCE_READ_ALL: 'asistencia.leer_todo',
    ATTENDANCE_APPROVE: 'asistencia.aprobar',
    ATTENDANCE_MODIFY: 'asistencia.modificar',
    SHIFTS_MANAGE: 'turnos.gestion',
    VACATIONS_APPROVE: 'vacaciones.aprobar',
    RECRUITMENT_MANAGE: 'reclutamiento.gestion',
    ONBOARDING_MANAGE: 'onboarding.gestion',
    ONBOARDING_VIEW_PROGRESS: 'onboarding.ver_progreso',
    PERFORMANCE_MANAGE: 'desempeno.gestionar',
    TRAINING_MANAGE: 'capacitacion.gestionar',
    ASSETS_MANAGE: 'activos.gestionar',
    DOCUMENTS_MANAGE: 'documentos.gestionar',
    ROLES_MANAGE: 'roles.gestion',
    USERS_MANAGE: 'usuarios.gestion',
    COMPANY_CONFIG: 'empresa.configurar',
    REPORTS_VIEW: 'reportes.ver',
    AUDIT_LOG_VIEW: 'auditoria.ver',
    COMPANY_POLICIES_MANAGE: 'politicas.gestion',
};
exports.PERMISSION_GROUPS = [
    {
        name: 'Portal del Colaborador (Autoservicio)',
        permissions: [
            { key: exports.PERMISSIONS.PERFIL_ME, label: 'Ver/Editar mi Perfil' },
            { key: exports.PERMISSIONS.PAYROLL_MY_READ, label: 'Ver mis Roles de Pago' },
            { key: exports.PERMISSIONS.ATTENDANCE_MY_READ, label: 'Ver mi Asistencia' },
            { key: exports.PERMISSIONS.VACATIONS_REQUEST, label: 'Solicitar Vacaciones' },
            { key: exports.PERMISSIONS.LOANS_REQUEST, label: 'Solicitar Préstamos' },
            { key: exports.PERMISSIONS.TASKS_MY_READ, label: 'Ver mis Tareas (Proyectos)' },
            { key: exports.PERMISSIONS.EXPENSES_REPORT, label: 'Reportar Gastos' },
        ]
    },
    {
        name: 'Gestión de Talento Humano',
        permissions: [
            { key: exports.PERMISSIONS.EMPLOYEES_READ_BASIC, label: 'Ver Directorio (Público)' },
            { key: exports.PERMISSIONS.EMPLOYEES_READ_SENSITIVE, label: 'Ver Datos Sensibles (RRHH)' },
            { key: exports.PERMISSIONS.EMPLOYEES_CREATE, label: 'Contratar Empleados' },
            { key: exports.PERMISSIONS.EMPLOYEES_EDIT, label: 'Editar Datos Personales' },
            { key: exports.PERMISSIONS.EMPLOYEES_DELETE, label: 'Desvincular Personal' },
            { key: exports.PERMISSIONS.EMPLOYEES_EXPORT, label: 'Exportar Excel' },
            { key: exports.PERMISSIONS.SALARIES_READ, label: 'Ver Salarios' },
        ]
    },
    {
        name: 'Nómina y Pagos',
        permissions: [
            { key: exports.PERMISSIONS.PAYROLL_READ, label: 'Ver Historial de Nóminas' },
            { key: exports.PERMISSIONS.PAYROLL_PROCESS, label: 'Procesar/Calcular Rol' },
            { key: exports.PERMISSIONS.PAYROLL_EXPORT, label: 'Archivos Bancarios' },
            { key: exports.PERMISSIONS.PAYROLL_CONFIG, label: 'Configurar Fórmulas' },
            { key: exports.PERMISSIONS.BENEFITS_MANAGE, label: 'Gestionar Beneficios' },
        ]
    },
    {
        name: 'Operaciones y Desempeño',
        permissions: [
            { key: exports.PERMISSIONS.ATTENDANCE_READ_ALL, label: 'Ver Asistencias' },
            { key: exports.PERMISSIONS.ATTENDANCE_APPROVE, label: 'Aprobar Asistencias' },
            { key: exports.PERMISSIONS.SHIFTS_MANAGE, label: 'Gestionar Turnos' },
            { key: exports.PERMISSIONS.VACATIONS_APPROVE, label: 'Aprobar Vacaciones' },
            { key: exports.PERMISSIONS.PERFORMANCE_MANAGE, label: 'Gestionar Evaluaciones' },
        ]
    },
    {
        name: 'Proyectos y Productividad (Agile)',
        permissions: [
            { key: exports.PERMISSIONS.PROJECTS_READ, label: 'Ver Tableros' },
            { key: exports.PERMISSIONS.TASKS_EXECUTE, label: 'Colaborador: Ejecutar Tareas' },
            { key: exports.PERMISSIONS.PROJECTS_MANAGE, label: 'Manager: Crear Proyectos' },
            { key: exports.PERMISSIONS.TASKS_MANAGE, label: 'Manager: Gestionar Tareas' },
        ]
    },
    {
        name: 'Estructura y Reclutamiento',
        permissions: [
            { key: exports.PERMISSIONS.BRANCHES_MANAGE, label: 'Gestionar Sucursales' },
            { key: exports.PERMISSIONS.DEPARTMENTS_MANAGE, label: 'Gestionar Departamentos' },
            { key: exports.PERMISSIONS.POSITIONS_MANAGE, label: 'Gestionar Cargos' },
            { key: exports.PERMISSIONS.RECRUITMENT_MANAGE, label: 'Gestionar Reclutamiento' },
            { key: exports.PERMISSIONS.ONBOARDING_MANAGE, label: 'Gestionar Onboarding' },
        ]
    },
    {
        name: 'Recursos y Admin',
        permissions: [
            { key: exports.PERMISSIONS.ASSETS_MANAGE, label: 'Activos e Inventario' },
            { key: exports.PERMISSIONS.DOCUMENTS_MANAGE, label: 'Documentos Legales' },
            { key: exports.PERMISSIONS.TRAINING_MANAGE, label: 'Capacitación' },
            { key: exports.PERMISSIONS.ROLES_MANAGE, label: 'Gestionar Roles' },
            { key: exports.PERMISSIONS.USERS_MANAGE, label: 'Gestionar Usuarios' },
            { key: exports.PERMISSIONS.COMPANY_CONFIG, label: 'Configuración Empresa' },
            { key: exports.PERMISSIONS.REPORTS_VIEW, label: 'Ver Reportes' },
            { key: exports.PERMISSIONS.COMPANY_POLICIES_MANAGE, label: 'Gestionar Políticas' },
        ]
    }
];


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

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mapped-types":
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/mapped-types");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/serve-static":
/*!***************************************!*\
  !*** external "@nestjs/serve-static" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

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

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "multer":
/*!*************************!*\
  !*** external "multer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

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
/*!**********************************************!*\
  !*** ./apps/punto-pymes-backend/src/main.ts ***!
  \**********************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/punto-pymes-backend/src/app.module.ts");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const express_1 = __webpack_require__(/*! express */ "express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('PuntoPyMES API')
        .setDescription('Documentación de la API del Sistema de RRHH')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`🚀 Gateway corriendo en: http://localhost:3000`);
    console.log(`📚 Swagger Docs en: http://localhost:3000/api/docs`);
}
bootstrap();

})();

/******/ })()
;