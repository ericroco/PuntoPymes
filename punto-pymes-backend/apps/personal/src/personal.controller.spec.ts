import { Test, TestingModule } from '@nestjs/testing';
import { PersonalService } from './personal.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  Empleado, Rol, Cargo, Departamento, Contrato, Candidato,
  Vacante, Sucursal, DocumentoEmpleado, DocumentoEmpresa
} from '../../../libs/database/src';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { DataSource } from 'typeorm';
import { of } from 'rxjs';
import { BadRequestException } from '@nestjs/common';
import { EstadoVacante } from '../../../libs/database/src';

describe('PersonalService', () => {
  let service: PersonalService;

  // Mocks de Repositorios (simuladores de base de datos)
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    merge: jest.fn(),
    update: jest.fn(),
  };

  const mockAuthClient = {
    send: jest.fn(),
  };

  const mockMailerService = {
    sendMail: jest.fn(),
  };

  const mockConfigService = {
    getOrThrow: jest.fn((key) => {
      if (key === 'GEMINI_API_KEY') return 'fake-api-key'; // Necesario para el constructor [cite: 18]
      return null;
    }),
  };

  const mockDataSource = {
    transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonalService,
        { provide: getRepositoryToken(Empleado), useValue: mockRepository },
        { provide: getRepositoryToken(Rol), useValue: mockRepository },
        { provide: getRepositoryToken(Cargo), useValue: mockRepository },
        { provide: getRepositoryToken(Contrato), useValue: mockRepository },
        { provide: getRepositoryToken(Departamento), useValue: mockRepository },
        { provide: getRepositoryToken(Vacante), useValue: mockRepository },
        { provide: getRepositoryToken(Candidato), useValue: mockRepository },
        { provide: getRepositoryToken(DocumentoEmpleado), useValue: mockRepository },
        { provide: getRepositoryToken(Sucursal), useValue: mockRepository },
        { provide: getRepositoryToken(DocumentoEmpresa), useValue: mockRepository },
        { provide: 'AUTH_SERVICE', useValue: mockAuthClient },
        { provide: MailerService, useValue: mockMailerService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    service = module.get<PersonalService>(PersonalService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // =================================================================
  // TEST 1: Creación de Empleado (Happy Path) [cite: 30]
  // =================================================================
  describe('createEmpleado', () => {
    it('debe crear un empleado, generar contrato y llamar a Auth Service', async () => {
      // 1. Datos de prueba
      const empresaId = 'emp-123';
      const dto = {
        nombre: 'Juan',
        apellido: 'Perez',
        emailPersonal: 'juan@test.com',
        nroIdentificacion: '0999999999',
        rolId: 'rol-1',
        cargoId: 'cargo-1',
        sucursalId: 'suc-1',
        salario: 500,
        fechaInicio: new Date(),
      };

      // 2. Simulamos que las validaciones previas pasan (Sucursal, Rol, Cargo existen)
      mockRepository.findOneBy.mockResolvedValueOnce({ id: 'suc-1' }); // Sucursal check [cite: 33]
      mockRepository.findOneBy.mockResolvedValueOnce({ id: 'rol-1' }); // Rol check [cite: 35]
      mockRepository.findOne.mockResolvedValueOnce({ id: 'cargo-1' }); // Cargo check [cite: 37]

      // Simulamos que NO existe empleado previo (ni por ID ni por Email) [cite: 39, 41]
      mockRepository.findOne.mockResolvedValueOnce(null);
      mockRepository.findOne.mockResolvedValueOnce(null);

      // Simulamos la creación y guardado del empleado
      const empleadoGuardado = { id: 'new-emp-1', ...dto, estado: 'Activo' };
      mockRepository.create.mockReturnValue(empleadoGuardado);
      mockRepository.save.mockResolvedValue(empleadoGuardado); // Se llama 2 veces (empleado y contrato)

      // Simulamos respuesta exitosa del Auth Service [cite: 52]
      mockAuthClient.send.mockReturnValue(of({ isNew: true, email: dto.emailPersonal, password: 'temp' }));

      // 3. Ejecución
      const result = await service.createEmpleado(empresaId, dto as any);

      // 4. Verificaciones
      expect(mockRepository.save).toHaveBeenCalled();
      expect(mockAuthClient.send).toHaveBeenCalledWith(
        { cmd: 'create_user_auto' },
        expect.objectContaining({ email: dto.emailPersonal })
      );
      expect(mockMailerService.sendMail).toHaveBeenCalled(); // Verifica envío de credenciales [cite: 53]
      expect(result).toEqual(empleadoGuardado);
    });
  });

  // =================================================================
  // TEST 2: Obtener Empleados con Filtro de Sucursal [cite: 18]
  // =================================================================
  describe('getEmpleados', () => {
    it('debe filtrar empleados por sucursal si se provee filtroSucursalId', async () => {
      const empresaId = 'emp-123';
      const filtroSucursalId = 'suc-A';

      mockRepository.find.mockResolvedValue([]);

      await service.getEmpleados(empresaId, filtroSucursalId);

      // Verificamos que el objeto "where" incluya la sucursal [cite: 20, 21]
      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            empresaId,
            sucursal: { id: filtroSucursalId } // <--- Esta es la clave
          })
        })
      );
    });
  });

  // =================================================================
  // TEST 3: Crear Vacante (Validación de Estado Inválido) [cite: 165]
  // =================================================================
  describe('createVacante', () => {
    it('debe lanzar BadRequestException si se intenta crear una vacante CERRADA', async () => {
      const empresaId = 'emp-123';
      const dto = {
        titulo: 'Dev Senior',
        estado: EstadoVacante.CERRADA, // Caso prohibido [cite: 166]
      };

      // Esperamos que la promesa sea rechazada con la excepción específica
      await expect(service.createVacante(empresaId, dto as any))
        .rejects
        .toThrow(BadRequestException);
    });
  });

});