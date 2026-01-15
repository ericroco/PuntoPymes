// apps/personal/src/personal.service.int.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { PersonalService } from './personal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { DataSource } from 'typeorm';
import { of } from 'rxjs';

// 👇 Importamos las entidades necesarias
import {
    Empleado, Rol, Cargo, Departamento, Contrato, Empresa, Sucursal,
    Usuario, PeriodoNomina, NominaEmpleado, RubroNomina, Beneficio,
    BeneficioAsignado, Proyecto, Sprint, Tarea, AsignacionTarea,
    Timesheet, CicloEvaluacion, Objetivo, Evaluacion, Curso,
    InscripcionCurso, RegistroAsistencia, Activo, ActivoAsignado,
    ReporteGasto, ItemGasto, ConceptoNomina, Candidato, Vacante,
    DocumentoEmpleado, SolicitudVacaciones, NovedadNomina,
    PlantillaOnboarding, TareaPlantilla, TareaEmpleado, DocumentoEmpresa,
    Anuncio, Encuesta, OpcionEncuesta, Voto, SaldoVacaciones
} from '../../../libs/database/src';

// 👇 Timeout para tests de integración
jest.setTimeout(30000);

describe('PersonalService (Integración DB)', () => {
    let service: PersonalService;
    let dataSource: DataSource;

    // Mocks
    const mockAuthClient = { send: jest.fn(() => of({ isNew: true, email: 'test@test.com', password: '123' })) };
    const mockMailer = { sendMail: jest.fn() };
    const mockConfig = { getOrThrow: jest.fn(() => 'fake-api-key') };

    // Variables para datos base
    let empresaId: string;
    let rolId: string;
    let sucursalId: string;
    let cargoId: string;

    beforeAll(async () => {
        // 👇 Lista completa de entidades
        const entityList = [
            Empleado, Rol, Cargo, Departamento, Contrato, Empresa, Sucursal,
            Usuario, PeriodoNomina, NominaEmpleado, RubroNomina, Beneficio,
            BeneficioAsignado, Proyecto, Sprint, Tarea, AsignacionTarea,
            Timesheet, CicloEvaluacion, Objetivo, Evaluacion, Curso,
            InscripcionCurso, RegistroAsistencia, Activo, ActivoAsignado,
            ReporteGasto, ItemGasto, ConceptoNomina, Candidato, Vacante,
            DocumentoEmpleado, SolicitudVacaciones, NovedadNomina,
            PlantillaOnboarding, TareaPlantilla, TareaEmpleado, DocumentoEmpresa,
            Anuncio, Encuesta, OpcionEncuesta, Voto, SaldoVacaciones
        ];

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'puntopymes',
                    password: 'mi_password_secreto', // 👈 Ajusta si es diferente
                    database: 'puntopymes_core', // 👈 Base de datos de TEST
                    entities: entityList,
                    synchronize: true, // 👈 Crea las tablas automáticamente
                    dropSchema: true, // 👈 Limpia la BD al iniciar
                    logging: false,
                }),
                TypeOrmModule.forFeature(entityList),
            ],
            providers: [
                PersonalService,
                { provide: 'AUTH_SERVICE', useValue: mockAuthClient },
                { provide: MailerService, useValue: mockMailer },
                { provide: ConfigService, useValue: mockConfig },
            ],
        }).compile();

        service = module.get<PersonalService>(PersonalService);
        dataSource = module.get<DataSource>(DataSource);

        // --- SEEDING INICIAL ---
        const empresa = await dataSource.getRepository(Empresa).save({
            nombre: 'PuntoPymes Test',
            ruc: '9999999999',
            planSuscripcion: 'basico', // 👈 Agregado
            fechaRegistro: new Date() // 👈 Por si también es obligatorio
        });
        empresaId = empresa.id;

        const sucursal = await dataSource.getRepository(Sucursal).save({
            nombre: 'Sede Central',
            empresaId
        });
        sucursalId = sucursal.id;

        const rol = await dataSource.getRepository(Rol).save({
            nombre: 'Desarrollador',
            empresaId
        });
        rolId = rol.id;

        const depto = await dataSource.getRepository(Departamento).save({
            nombre: 'Tecnología',
            empresaId,
            sucursal
        });

        const cargo = await dataSource.getRepository(Cargo).save({
            nombre: 'Backend Dev',
            departamento: depto,
            salarioMin: 500,
            salarioMax: 1000
        });
        cargoId = cargo.id;
    }, 30000);

    afterAll(async () => {
        if (dataSource?.isInitialized) {
            await dataSource.destroy();
        }
    }, 10000);

    // =================================================================
    // TEST 1: Crear empleado
    // =================================================================
    it('Debe crear un empleado con su contrato', async () => {
        const dto = {
            nombre: 'Juan',
            apellido: 'Pérez',
            nroIdentificacion: '11111',
            emailPersonal: 'juan@test.com',
            rolId,
            cargoId,
            sucursalId,
            salario: 1200
        };

        const empleado = await service.createEmpleado(empresaId, dto as any);

        expect(empleado).toBeDefined();
        expect(empleado.emailPersonal).toBe('juan@test.com');
        // Acceder al primer contrato del array de relaciones
        expect(empleado.contratos[0].salario).toBe(1200);
    });

    // =================================================================
    // TEST 2: Listar empleados
    // =================================================================
    it('Debe listar todos los empleados de la empresa', async () => {
        const lista = await service.getEmpleados(empresaId);

        expect(lista).toBeDefined();
        expect(Array.isArray(lista)).toBe(true);
        expect(lista.length).toBeGreaterThan(0);
    });

    // =================================================================
    // TEST 3: Desvincular empleado
    // =================================================================
    it('Debe marcar empleado como Inactivo al desvincularlo', async () => {
        const dto = {
            nombre: 'María',
            apellido: 'López',
            nroIdentificacion: '22222',
            emailPersonal: 'maria@test.com',
            rolId,
            cargoId,
            sucursalId,
            salario: 1000
        };

        const empleado = await service.createEmpleado(empresaId, dto as any);
        await service.deleteEmpleado(empresaId, empleado.id);

        const empleadoActualizado = await dataSource
            .getRepository(Empleado)
            .findOneBy({ id: empleado.id });

        expect(empleadoActualizado?.estado).toBe('Inactivo');
    });

});