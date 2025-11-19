/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const personal_service_1 = __webpack_require__(/*! ./personal.service */ "./apps/personal/src/personal.service.ts");
let PersonalController = class PersonalController {
    personalService;
    constructor(personalService) {
        this.personalService = personalService;
    }
    getEmpleados(data) {
        return this.personalService.getEmpleados(data.empresaId);
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
};
exports.PersonalController = PersonalController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_empleados' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getEmpleados", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_empleado' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "createEmpleado", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_empleado' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateEmpleado", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_empleado' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "deleteEmpleado", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_departamento' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "createDepartamento", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_departamentos' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getDepartamentos", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_departamento' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateDepartamento", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_departamento' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "deleteDepartamento", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_cargo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "createCargo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_cargos' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getCargos", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_cargo' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateCargo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_cargo' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "deleteCargo", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create_rol' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "createRol", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get_roles' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "getRoles", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update_rol' }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "updateRol", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete_rol' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PersonalController.prototype, "deleteRol", null);
exports.PersonalController = PersonalController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof personal_service_1.PersonalService !== "undefined" && personal_service_1.PersonalService) === "function" ? _a : Object])
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
            ]),
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const database_1 = __webpack_require__(/*! default/database */ "./libs/database/src/index.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
let PersonalService = class PersonalService {
    empleadoRepository;
    rolRepository;
    cargoRepository;
    contratoRepository;
    deptoRepository;
    constructor(empleadoRepository, rolRepository, cargoRepository, contratoRepository, deptoRepository) {
        this.empleadoRepository = empleadoRepository;
        this.rolRepository = rolRepository;
        this.cargoRepository = cargoRepository;
        this.contratoRepository = contratoRepository;
        this.deptoRepository = deptoRepository;
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
        return this.empleadoRepository.save(nuevoEmpleado);
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
};
exports.PersonalService = PersonalService;
exports.PersonalService = PersonalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.Empleado)),
    __param(1, (0, typeorm_1.InjectRepository)(database_1.Rol)),
    __param(2, (0, typeorm_1.InjectRepository)(database_1.Cargo)),
    __param(3, (0, typeorm_1.InjectRepository)(database_1.Contrato)),
    __param(4, (0, typeorm_1.InjectRepository)(database_1.Departamento)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object])
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Activo = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const activoAsignado_entity_1 = __webpack_require__(/*! ./activoAsignado.entity */ "./libs/database/src/entities/activoAsignado.entity.ts");
let Activo = class Activo extends base_entity_1.BaseEntity {
    nombre;
    serial;
    tipo;
    estado;
    empresa;
    empresaId;
    asignaciones;
};
exports.Activo = Activo;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre o descripción del activo (Laptop, Silla)',
    }),
    __metadata("design:type", String)
], Activo.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: true,
        comment: 'Número de serial único (si aplica)',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], Activo.prototype, "serial", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        comment: 'Categoría o tipo de activo (Laptop, Mobiliario, Teléfono)',
    }),
    __metadata("design:type", String)
], Activo.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: 'Estado actual del activo (En Bodega, Asignado, De Baja)',
    }),
    __metadata("design:type", String)
], Activo.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.activos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", typeof (_a = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _a : Object)
], Activo.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID de la Empresa (Tenant) propietaria del activo' }),
    __metadata("design:type", String)
], Activo.prototype, "empresaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => activoAsignado_entity_1.ActivoAsignado, (asignacion) => asignacion.activo),
    __metadata("design:type", Array)
], Activo.prototype, "asignaciones", void 0);
exports.Activo = Activo = __decorate([
    (0, typeorm_1.Entity)({ name: 'activos' }),
    (0, typeorm_1.Index)(['empresaId'])
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivoAsignado = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const activo_entity_1 = __webpack_require__(/*! ./activo.entity */ "./libs/database/src/entities/activo.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let ActivoAsignado = class ActivoAsignado extends base_entity_1.BaseEntity {
    fechaAsignacion;
    fechaDevolucion;
    estado;
    activo;
    activoId;
    empleado;
    empleadoId;
};
exports.ActivoAsignado = ActivoAsignado;
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de entrega del activo al empleado',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ActivoAsignado.prototype, "fechaAsignacion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
        comment: 'Fecha de devolución del activo (si aplica)',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ActivoAsignado.prototype, "fechaDevolucion", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: 'Estado de la asignación (Activo, Devuelto)',
    }),
    __metadata("design:type", String)
], ActivoAsignado.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => activo_entity_1.Activo, (activo) => activo.asignaciones, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'activoId' }),
    __metadata("design:type", typeof (_c = typeof activo_entity_1.Activo !== "undefined" && activo_entity_1.Activo) === "function" ? _c : Object)
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
    __metadata("design:type", typeof (_d = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _d : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsignacionTarea = void 0;
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
};
exports.AsignacionTarea = AsignacionTarea;
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Fecha y hora de asignación',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_b = typeof tarea_entity_1.Tarea !== "undefined" && tarea_entity_1.Tarea) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _c : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
class BaseEntity {
    id;
    createdAt;
    updatedAt;
    deletedAt;
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        comment: 'Fecha de última actualización del registro',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamptz',
        nullable: true,
        comment: 'Fecha de borrado lógico (soft delete)',
    }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Beneficio = void 0;
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
    __metadata("design:type", typeof (_a = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _a : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BeneficioAsignado = void 0;
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
};
exports.BeneficioAsignado = BeneficioAsignado;
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de asignación del beneficio al empleado',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BeneficioAsignado.prototype, "fechaAsignacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.beneficiosAsignados, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", typeof (_b = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof beneficio_entity_1.Beneficio !== "undefined" && beneficio_entity_1.Beneficio) === "function" ? _c : Object)
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cargo = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const departamento_entity_1 = __webpack_require__(/*! ./departamento.entity */ "./libs/database/src/entities/departamento.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Cargo = class Cargo extends base_entity_1.BaseEntity {
    nombre;
    departamento;
    departamentoId;
    empleados;
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
    __metadata("design:type", typeof (_a = typeof departamento_entity_1.Departamento !== "undefined" && departamento_entity_1.Departamento) === "function" ? _a : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CicloEvaluacion = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const objetivo_entity_1 = __webpack_require__(/*! ./objetivo.entity */ "./libs/database/src/entities/objetivo.entity.ts");
const evaluacion_entity_1 = __webpack_require__(/*! ./evaluacion.entity */ "./libs/database/src/entities/evaluacion.entity.ts");
let CicloEvaluacion = class CicloEvaluacion extends base_entity_1.BaseEntity {
    nombre;
    fechaInicio;
    fechaFin;
    empresa;
    empresaId;
    objetivos;
    evaluaciones;
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CicloEvaluacion.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de fin del ciclo',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CicloEvaluacion.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.ciclosEvaluacion, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", typeof (_c = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _c : Object)
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConceptoNomina = exports.TipoRubro = void 0;
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
    __metadata("design:type", typeof (_a = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _a : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Contrato = void 0;
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Contrato.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
        comment: 'Fecha de fin de vigencia (si aplica)',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _c : Object)
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Curso = void 0;
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
    __metadata("design:type", typeof (_a = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _a : Object)
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Departamento = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empresa_entity_1 = __webpack_require__(/*! ./empresa.entity */ "./libs/database/src/entities/empresa.entity.ts");
const cargo_entity_1 = __webpack_require__(/*! ./cargo.entity */ "./libs/database/src/entities/cargo.entity.ts");
let Departamento = class Departamento extends base_entity_1.BaseEntity {
    nombre;
    empresa;
    empresaId;
    cargos;
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
    __metadata("design:type", typeof (_a = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _a : Object)
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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Empleado = void 0;
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
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
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.empleados, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", typeof (_b = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof usuario_entity_1.Usuario !== "undefined" && usuario_entity_1.Usuario) === "function" ? _c : Object)
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
    __metadata("design:type", typeof (_d = typeof rol_entity_1.Rol !== "undefined" && rol_entity_1.Rol) === "function" ? _d : Object)
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
    __metadata("design:type", typeof (_e = typeof cargo_entity_1.Cargo !== "undefined" && cargo_entity_1.Cargo) === "function" ? _e : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Evaluacion = void 0;
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
    __metadata("design:type", typeof (_a = typeof cicloEvaluacion_entity_1.CicloEvaluacion !== "undefined" && cicloEvaluacion_entity_1.CicloEvaluacion) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_b = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _c : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InscripcionCurso = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const curso_entity_1 = __webpack_require__(/*! ./curso.entity */ "./libs/database/src/entities/curso.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let InscripcionCurso = class InscripcionCurso extends base_entity_1.BaseEntity {
    estado;
    calificacion;
    fechaInscripcion;
    curso;
    cursoId;
    empleado;
    empleadoId;
};
exports.InscripcionCurso = InscripcionCurso;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: 'Estado del progreso (Inscrito, En Progreso, Completado)',
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
        comment: 'Fecha de inscripción al curso',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], InscripcionCurso.prototype, "fechaInscripcion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => curso_entity_1.Curso, (curso) => curso.inscripciones, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'cursoId' }),
    __metadata("design:type", typeof (_b = typeof curso_entity_1.Curso !== "undefined" && curso_entity_1.Curso) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _c : Object)
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ItemGasto = void 0;
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_b = typeof reporteGasto_entity_1.ReporteGasto !== "undefined" && reporteGasto_entity_1.ReporteGasto) === "function" ? _b : Object)
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NominaEmpleado = void 0;
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
    __metadata("design:type", typeof (_a = typeof periodoNomina_entity_1.PeriodoNomina !== "undefined" && periodoNomina_entity_1.PeriodoNomina) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_b = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _b : Object)
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Objetivo = void 0;
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
    __metadata("design:type", typeof (_a = typeof cicloEvaluacion_entity_1.CicloEvaluacion !== "undefined" && cicloEvaluacion_entity_1.CicloEvaluacion) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_b = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _b : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PeriodoNomina = void 0;
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
};
exports.PeriodoNomina = PeriodoNomina;
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de inicio del periodo de pago',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], PeriodoNomina.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de fin del periodo de pago',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _c : Object)
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Proyecto = void 0;
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
    __metadata("design:type", typeof (_a = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_b = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _b : Object)
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegistroAsistencia = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let RegistroAsistencia = class RegistroAsistencia extends base_entity_1.BaseEntity {
    timestamp;
    tipo;
    metodo;
    ubicacion;
    empleado;
    empleadoId;
};
exports.RegistroAsistencia = RegistroAsistencia;
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamptz',
        comment: 'Fecha y hora exactas de la marcación',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RegistroAsistencia.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: 'Tipo de marcación (Entrada, Salida)',
    }),
    __metadata("design:type", String)
], RegistroAsistencia.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: 'Método de registro (Web, Móvil)',
    }),
    __metadata("design:type", String)
], RegistroAsistencia.prototype, "metodo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
        comment: 'Datos de ubicación (GPS) si es móvil (RF-23-02)',
    }),
    __metadata("design:type", String)
], RegistroAsistencia.prototype, "ubicacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.registrosAsistencia, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", typeof (_b = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _b : Object)
], RegistroAsistencia.prototype, "empleado", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'ID del Empleado que registra la asistencia' }),
    __metadata("design:type", String)
], RegistroAsistencia.prototype, "empleadoId", void 0);
exports.RegistroAsistencia = RegistroAsistencia = __decorate([
    (0, typeorm_1.Entity)({ name: 'registros_asistencia' }),
    (0, typeorm_1.Index)(['empleadoId', 'timestamp'])
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReporteGasto = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
const itemGasto_entity_1 = __webpack_require__(/*! ./itemGasto.entity */ "./libs/database/src/entities/itemGasto.entity.ts");
let ReporteGasto = class ReporteGasto extends base_entity_1.BaseEntity {
    nombre;
    estado;
    total;
    fechaReporte;
    empleado;
    empleadoId;
    items;
};
exports.ReporteGasto = ReporteGasto;
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        comment: 'Nombre o título del reporte (Ej: Viaje a Cliente Quito)',
    }),
    __metadata("design:type", String)
], ReporteGasto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        comment: 'Estado de aprobación (Pendiente, Aprobado, Rechazado)',
    }),
    __metadata("design:type", String)
], ReporteGasto.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        comment: 'Monto total de los gastos reportados (calculado de los items)',
    }),
    __metadata("design:type", Number)
], ReporteGasto.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de creación del reporte',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ReporteGasto.prototype, "fechaReporte", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empleado_entity_1.Empleado, (empleado) => empleado.reportesGastos, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empleadoId' }),
    __metadata("design:type", typeof (_b = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _b : Object)
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rol = void 0;
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
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], Rol.prototype, "permisos", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.roles, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'empresaId' }),
    __metadata("design:type", typeof (_b = typeof empresa_entity_1.Empresa !== "undefined" && empresa_entity_1.Empresa) === "function" ? _b : Object)
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RubroNomina = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const nominaEmpleado_entity_1 = __webpack_require__(/*! ./nominaEmpleado.entity */ "./libs/database/src/entities/nominaEmpleado.entity.ts");
let RubroNomina = class RubroNomina extends base_entity_1.BaseEntity {
    tipo;
    concepto;
    valor;
    nominaEmpleado;
    nominaEmpleadoId;
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
    __metadata("design:type", typeof (_a = typeof nominaEmpleado_entity_1.NominaEmpleado !== "undefined" && nominaEmpleado_entity_1.NominaEmpleado) === "function" ? _a : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sprint = void 0;
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
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Sprint.prototype, "fechaInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha de fin del sprint',
    }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Sprint.prototype, "fechaFin", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyecto_entity_1.Proyecto, (proyecto) => proyecto.sprints, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'proyectoId' }),
    __metadata("design:type", typeof (_c = typeof proyecto_entity_1.Proyecto !== "undefined" && proyecto_entity_1.Proyecto) === "function" ? _c : Object)
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tarea = void 0;
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
    __metadata("design:type", typeof (_a = typeof create_tarea_dto_1.EstadoTarea !== "undefined" && create_tarea_dto_1.EstadoTarea) === "function" ? _a : Object)
], Tarea.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
        default: create_tarea_dto_1.PrioridadTarea.MEDIA,
        comment: 'Nivel de prioridad (BAJA, MEDIA, ALTA)',
    }),
    __metadata("design:type", typeof (_b = typeof create_tarea_dto_1.PrioridadTarea !== "undefined" && create_tarea_dto_1.PrioridadTarea) === "function" ? _b : Object)
], Tarea.prototype, "prioridad", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => proyecto_entity_1.Proyecto, (proyecto) => proyecto.tareas, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'proyectoId' }),
    __metadata("design:type", typeof (_c = typeof proyecto_entity_1.Proyecto !== "undefined" && proyecto_entity_1.Proyecto) === "function" ? _c : Object)
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
    __metadata("design:type", typeof (_d = typeof sprint_entity_1.Sprint !== "undefined" && sprint_entity_1.Sprint) === "function" ? _d : Object)
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Timesheet = void 0;
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
};
exports.Timesheet = Timesheet;
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        comment: 'Fecha del registro de horas',
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
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
    __metadata("design:type", typeof (_b = typeof empleado_entity_1.Empleado !== "undefined" && empleado_entity_1.Empleado) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof tarea_entity_1.Tarea !== "undefined" && tarea_entity_1.Tarea) === "function" ? _c : Object)
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
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const base_entity_1 = __webpack_require__(/*! ./base.entity */ "./libs/database/src/entities/base.entity.ts");
const empleado_entity_1 = __webpack_require__(/*! ./empleado.entity */ "./libs/database/src/entities/empleado.entity.ts");
let Usuario = class Usuario extends base_entity_1.BaseEntity {
    email;
    passwordHash;
    emailVerificado;
    twoFactorSecret;
    membresias;
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