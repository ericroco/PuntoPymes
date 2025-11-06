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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDto {
    email;
    password;
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDto {
    nombreEmpresa;
    nombreAdmin;
    apellidoAdmin;
    email;
    password;
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateCargoDto {
    nombre;
    departamentoId;
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateDepartamentoDto {
    nombre;
}
exports.CreateDepartamentoDto = CreateDepartamentoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateDepartamentoDto.prototype, "nombre", void 0);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateEmpleadoDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateEmpleadoDto {
    nombre;
    apellido;
    emailPersonal;
    fechaContratacion;
    cargoId;
    rolId;
    jefeId;
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
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha de contratación es requerida.' }),
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de contratación debe ser una fecha válida.' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CreateEmpleadoDto.prototype, "fechaContratacion", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El cargo es requerido.' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "cargoId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El rol es requerido.' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "rolId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateEmpleadoDto.prototype, "jefeId", void 0);


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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateDepartamentoDto {
    nombre;
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateEmpleadoDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UpdateEmpleadoDto {
    nombre;
    apellido;
    emailPersonal;
    fechaContratacion;
    cargoId;
    rolId;
    jefeId;
    estado;
}
exports.UpdateEmpleadoDto = UpdateEmpleadoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "apellido", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: 'El email personal no es válido.' }),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "emailPersonal", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'La fecha de contratación debe ser una fecha válida.' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UpdateEmpleadoDto.prototype, "fechaContratacion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "cargoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "rolId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "jefeId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEmpleadoDto.prototype, "estado", void 0);


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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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
let AppController = class AppController {
    appService;
    authService;
    personalService;
    constructor(appService, authService, personalService) {
        this.appService = appService;
        this.authService = authService;
        this.personalService = personalService;
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
    getProfile(req) {
        console.log('Petición exitosa a ruta protegida /profile');
        return {
            message: '¡Acceso concedido a ruta protegida!',
            user: req.user,
        };
    }
    getEmpleados(req) {
        const { empresaId } = req.user;
        console.log(`Gateway: Pidiendo empleados para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'get_empleados' }, { empresaId: empresaId });
    }
    createEmpleado(req, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición POST /empleados para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'create_empleado' }, {
            empresaId: empresaId,
            dto: dto,
        });
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
    createDepartamento(req, dto) {
        const { empresaId } = req.user;
        console.log(`Gateway: Petición POST /departamentos para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'create_departamento' }, {
            empresaId: empresaId,
            dto: dto,
        });
    }
    getDepartamentos(req) {
        const { empresaId } = req.user;
        console.log(`Gateway: Pidiendo departamentos para empresaId: ${empresaId}`);
        return this.personalService.send({ cmd: 'get_departamentos' }, { empresaId: empresaId });
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
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('ping-auth'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "pingAuthService", null);
__decorate([
    (0, common_1.Post)('auth/register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('auth/login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('empleados'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getEmpleados", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('empleados'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_f = typeof create_empleado_dto_1.CreateEmpleadoDto !== "undefined" && create_empleado_dto_1.CreateEmpleadoDto) === "function" ? _f : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createEmpleado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('empleados/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_g = typeof update_empleado_dto_1.UpdateEmpleadoDto !== "undefined" && update_empleado_dto_1.UpdateEmpleadoDto) === "function" ? _g : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateEmpleado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('empleados/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteEmpleado", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('departamentos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_h = typeof create_departamento_dto_1.CreateDepartamentoDto !== "undefined" && create_departamento_dto_1.CreateDepartamentoDto) === "function" ? _h : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createDepartamento", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('departamentos'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getDepartamentos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('departamentos/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, typeof (_j = typeof update_departamento_dto_1.UpdateDepartamentoDto !== "undefined" && update_departamento_dto_1.UpdateDepartamentoDto) === "function" ? _j : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateDepartamento", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('departamentos/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteDepartamento", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('cargos'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_k = typeof create_cargo_dto_1.CreateCargoDto !== "undefined" && create_cargo_dto_1.CreateCargoDto) === "function" ? _k : Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createCargo", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('AUTH_SERVICE')),
    __param(2, (0, common_1.Inject)('PERSONAL_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object])
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
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
var _a;
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
        return payload;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


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

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

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
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

})();

/******/ })()
;