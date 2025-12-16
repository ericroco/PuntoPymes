// apps/nomina/src/nomina.controller.ts
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NominaService } from './nomina.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import { CreatePeriodoNominaDto } from './dto/create-periodo-nomina.dto';
import { UpdatePeriodoNominaDto } from './dto/update-periodo-nomina.dto';
import { CreateConceptoNominaDto } from './dto/create-concepto-nomina.dto';
import { UpdateConceptoNominaDto } from './dto/update-concepto-nomina.dto';
import { ProcesarNominaDto } from './dto/procesar-nomina.dto';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';

@Controller()
export class NominaController {
  constructor(private readonly nominaService: NominaService) { }

  /**
   * Escucha el comando 'get_contratos_by_empleado' (RF-20)
   *
   */
  @MessagePattern({ cmd: 'get_contratos_by_empleado' })
  getContratosByEmpleado(
    @Payload() data: { empresaId: string; empleadoId: string },
  ) {
    console.log(
      `Microservicio NOMINA: Recibido get_contratos_by_empleado para: ${data.empleadoId}`,
    );
    return this.nominaService.getContratosByEmpleado(
      data.empresaId,
      data.empleadoId,
    );
  }

  /**
   * Escucha el comando 'create_contrato' (RF-20)
   *
   */
  @MessagePattern({ cmd: 'create_contrato' })
  @UsePipes(new ValidationPipe()) // <-- Habilita la validación del DTO
  createContrato(@Payload() data: { empresaId: string; dto: CreateContratoDto }) {
    console.log(
      `Microservicio NOMINA: Recibido create_contrato para empresa: ${data.empresaId}`,
    );
    return this.nominaService.createContrato(data.empresaId, data.dto);
  }

  /**
   * Escucha el comando 'update_contrato' (RF-20)
   *
   */
  @MessagePattern({ cmd: 'update_contrato' })
  @UsePipes(new ValidationPipe()) // <-- Habilita la validación del DTO
  updateContrato(
    @Payload()
    data: {
      empresaId: string;
      contratoId: string;
      dto: UpdateContratoDto;
    },
  ) {
    console.log(
      `Microservicio NOMINA: Recibido update_contrato para contrato: ${data.contratoId}`,
    );
    return this.nominaService.updateContrato(
      data.empresaId,
      data.contratoId,
      data.dto,
    );
  }

  /**
   * Escucha el comando 'delete_contrato' (RF-20)
   *
   */
  @MessagePattern({ cmd: 'delete_contrato' })
  deleteContrato(
    @Payload()
    data: {
      empresaId: string;
      contratoId: string;
    },
  ) {
    console.log(
      `Microservicio NOMINA: Recibido delete_contrato para contrato: ${data.contratoId}`,
    );
    return this.nominaService.deleteContrato(data.empresaId, data.contratoId);
  }
  // --- INICIO DE CRUD PARA BENEFICIO (RF-19) ---

  @MessagePattern({ cmd: 'get_beneficios' })
  getBeneficios(@Payload() data: { empresaId: string }) {
    return this.nominaService.getBeneficios(data.empresaId);
  }

  @MessagePattern({ cmd: 'create_beneficio' })
  @UsePipes(new ValidationPipe())
  createBeneficio(
    @Payload() data: { empresaId: string; dto: CreateBeneficioDto },
  ) {
    return this.nominaService.createBeneficio(data.empresaId, data.dto);
  }

  @MessagePattern({ cmd: 'update_beneficio' })
  @UsePipes(new ValidationPipe())
  updateBeneficio(
    @Payload()
    data: {
      empresaId: string;
      beneficioId: string;
      dto: UpdateBeneficioDto;
    },
  ) {
    return this.nominaService.updateBeneficio(
      data.empresaId,
      data.beneficioId,
      data.dto,
    );
  }

  @MessagePattern({ cmd: 'delete_beneficio' })
  deleteBeneficio(
    @Payload()
    data: {
      empresaId: string;
      beneficioId: string;
    },
  ) {
    return this.nominaService.deleteBeneficio(data.empresaId, data.beneficioId);
  }
  // --- INICIO DE CRUD PARA PERIODO NOMINA (RF-20) ---

  @MessagePattern({ cmd: 'get_periodos_nomina' })
  getPeriodosNomina(@Payload() data: { empresaId: string }) {
    return this.nominaService.getPeriodosNomina(data.empresaId);
  }

  @MessagePattern({ cmd: 'create_periodo_nomina' })
  @UsePipes(new ValidationPipe())
  createPeriodoNomina(
    @Payload() data: { empresaId: string; dto: CreatePeriodoNominaDto },
  ) {
    return this.nominaService.createPeriodoNomina(data.empresaId, data.dto);
  }

  @MessagePattern({ cmd: 'update_periodo_nomina' })
  @UsePipes(new ValidationPipe())
  updatePeriodoNomina(
    @Payload()
    data: {
      empresaId: string;
      periodoId: string;
      dto: UpdatePeriodoNominaDto;
    },
  ) {
    return this.nominaService.updatePeriodoNomina(
      data.empresaId,
      data.periodoId,
      data.dto,
    );
  }

  @MessagePattern({ cmd: 'delete_periodo_nomina' })
  deletePeriodoNomina(
    @Payload()
    data: {
      empresaId: string;
      periodoId: string;
    },
  ) {
    return this.nominaService.deletePeriodoNomina(data.empresaId, data.periodoId);
  }
  // --- INICIO DE CRUD PARA CONCEPTO NOMINA (Semana 9) ---

  @MessagePattern({ cmd: 'get_conceptos_nomina' })
  getConceptosNomina(@Payload() data: { empresaId: string }) {
    return this.nominaService.getConceptosNomina(data.empresaId);
  }

  @MessagePattern({ cmd: 'create_concepto_nomina' })
  @UsePipes(new ValidationPipe())
  createConceptoNomina(
    @Payload() data: { empresaId: string; dto: CreateConceptoNominaDto },
  ) {
    return this.nominaService.createConceptoNomina(data.empresaId, data.dto);
  }

  @MessagePattern({ cmd: 'update_concepto_nomina' })
  @UsePipes(new ValidationPipe())
  updateConceptoNomina(
    @Payload()
    data: {
      empresaId: string;
      conceptoId: string;
      dto: UpdateConceptoNominaDto;
    },
  ) {
    return this.nominaService.updateConceptoNomina(
      data.empresaId,
      data.conceptoId,
      data.dto,
    );
  }

  @MessagePattern({ cmd: 'delete_concepto_nomina' })
  deleteConceptoNomina(
    @Payload()
    data: {
      empresaId: string;
      conceptoId: string;
    },
  ) {
    return this.nominaService.deleteConceptoNomina(
      data.empresaId,
      data.conceptoId,
    );
  }
  // --- INICIO DE LÓGICA DE PROCESAMIENTO (Semana 9) ---

  @MessagePattern({ cmd: 'procesar_nomina' })
  @UsePipes(new ValidationPipe())
  procesarNomina(
    @Payload() data: { empresaId: string; dto: ProcesarNominaDto },
  ) {
    console.log(
      `Microservicio NOMINA: Recibido procesar_nomina para período: ${data.dto.periodoId}`,
    );
    return this.nominaService.procesarNomina(data.empresaId, data.dto.periodoId);
  }
  @MessagePattern({ cmd: 'crear_solicitud_vacaciones' })
  crearSolicitud(@Payload() data: { empresaId: string, dto: CreateSolicitudDto }) {
    return this.nominaService.solicitarVacaciones(data.empresaId, data.dto);
  }

  @MessagePattern({ cmd: 'get_solicitudes_vacaciones' })
  getSolicitudes(@Payload() data: { empresaId: string }) {
    return this.nominaService.getSolicitudes(data.empresaId);
  }

  @MessagePattern({ cmd: 'crear_novedad' })
  crearNovedad(@Payload() data: any) {
    return this.nominaService.registrarNovedad(data);
  }
  @MessagePattern({ cmd: 'obtener_novedades_empleado' })
  obtenerNovedadesPorEmpleado(@Payload() data: { empleadoId: string }) {
    return this.nominaService.obtenerNovedadesPorEmpleado(data.empleadoId);
  }

  @MessagePattern({ cmd: 'get_configuracion_nomina' })
  getConfig(@Payload() data: { empresaId: string }) {
    return this.nominaService.obtenerConfiguracion(data.empresaId);
  }

  @MessagePattern({ cmd: 'update_configuracion_nomina' })
  updateConfig(@Payload() data: { empresaId: string; config: any }) {
    return this.nominaService.actualizarConfiguracion(data.empresaId, data.config);
  }
  @MessagePattern({ cmd: 'obtener_reporte_nomina' })
  obtenerReporte(@Payload() data: { empresaId: string, periodoId: string }) {
    return this.nominaService.obtenerReporteNomina(data.empresaId, data.periodoId);
  }

  @MessagePattern({ cmd: 'get_beneficios_stats' })
  getBeneficiosStats(@Payload() data: { empresaId: string }) {
    return this.nominaService.getBeneficiosStats(data.empresaId);
  }

  @MessagePattern({ cmd: 'get_beneficio_by_id' })
  async getBeneficioById(@Payload() data: { id: string, empresaId: string }) {
    return this.nominaService.getBeneficioById(data.empresaId, data.id);
  }

  // 2. Obtener lista de asignados
  @MessagePattern({ cmd: 'get_beneficio_assignments' })
  async getBeneficioAssignments(@Payload() data: { beneficioId: string, empresaId: string }) {
    return this.nominaService.getAssignments(data.empresaId, data.beneficioId);
  }

  // 3. Guardar asignaciones
  @MessagePattern({ cmd: 'update_beneficio_assignments' })
  async updateBeneficioAssignments(@Payload() data: { beneficioId: string, empresaId: string, employeeIds: string[] }) {
    return this.nominaService.updateAssignments(data.empresaId, data.beneficioId, data.employeeIds);
  }
}