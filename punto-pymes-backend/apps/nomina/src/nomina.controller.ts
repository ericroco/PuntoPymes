// apps/nomina/src/nomina.controller.ts
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NominaService } from './nomina.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { CreateBeneficioDto } from './dto/create-beneficio.dto'; // <-- NUEVO
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';

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
}