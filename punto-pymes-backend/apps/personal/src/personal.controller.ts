// apps/personal/src/personal.controller.ts
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PersonalService } from './personal.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { CreateCargoDto } from './dto/create-cargo.dto';

@Controller()
export class PersonalController {
  constructor(private readonly personalService: PersonalService) { }

  /**
   * Escucha el comando 'get_empleados' (RF-01-02)
   */
  @MessagePattern({ cmd: 'get_empleados' })
  getEmpleados(@Payload() data: { empresaId: string }) {
    return this.personalService.getEmpleados(data.empresaId);
  }

  /**
   * Escucha el comando 'create_empleado' (RF-01-01)
   */
  @MessagePattern({ cmd: 'create_empleado' })
  @UsePipes(new ValidationPipe())
  createEmpleado(@Payload() data: { empresaId: string; dto: CreateEmpleadoDto }) {
    console.log(
      `Microservicio PERSONAL: Recibido create_empleado para empresa: ${data.empresaId}`,
    );
    return this.personalService.createEmpleado(data.empresaId, data.dto);
  }

  // --- (INICIO DE CAMBIOS) ---

  /**
   * Escucha el comando 'update_empleado' (RF-01-03)
   * @param data El payload que envía el Gateway, que contiene
   * el empresaId (del JWT), el empleadoId (de la URL) y el dto (del body).
   */
  @MessagePattern({ cmd: 'update_empleado' })
  // 2. Usamos ValidationPipe para asegurar que la parte 'dto' del payload
  //    cumpla con las reglas que definimos (IsOptional, IsUUID, etc.)
  @UsePipes(new ValidationPipe())
  updateEmpleado(
    @Payload()
    data: {
      empresaId: string;
      empleadoId: string;
      dto: UpdateEmpleadoDto;
    },
  ) {
    console.log(
      `Microservicio PERSONAL: Recibido update_empleado para empleado: ${data.empleadoId}`,
    );

    // 3. Llama a la lógica del servicio que ya creamos en 12.B
    return this.personalService.updateEmpleado(
      data.empresaId,
      data.empleadoId,
      data.dto,
    );
  }
  /**
   * Escucha el comando 'delete_empleado' (RF-01-04)
   */
  @MessagePattern({ cmd: 'delete_empleado' })
  deleteEmpleado(
    @Payload()
    data: {
      empresaId: string;
      empleadoId: string;
    },
  ) {
    console.log(
      `Microservicio PERSONAL: Recibido delete_empleado para empleado: ${data.empleadoId}`,
    );
    return this.personalService.deleteEmpleado(
      data.empresaId,
      data.empleadoId,
    );
  }
  /**
     * Escucha el comando 'create_departamento' (RF-02)
     */
  @MessagePattern({ cmd: 'create_departamento' })
  @UsePipes(new ValidationPipe())
  createDepartamento(
    @Payload() data: { empresaId: string; dto: CreateDepartamentoDto },
  ) {
    console.log(
      `Microservicio PERSONAL: Recibido create_departamento para empresa: ${data.empresaId}`,
    );
    return this.personalService.createDepartamento(data.empresaId, data.dto);
  }
  /**
     * Escucha el comando 'get_departamentos' (RF-02)
     */
  @MessagePattern({ cmd: 'get_departamentos' })
  getDepartamentos(@Payload() data: { empresaId: string }) {
    console.log(
      `Microservicio PERSONAL: Recibido get_departamentos para empresa: ${data.empresaId}`,
    );
    return this.personalService.getDepartamentos(data.empresaId);
  }
  /**
   * Escucha el comando 'update_departamento' (RF-02)
   */
  @MessagePattern({ cmd: 'update_departamento' })
  @UsePipes(new ValidationPipe())
  updateDepartamento(
    @Payload()
    data: {
      empresaId: string;
      deptoId: string;
      dto: UpdateDepartamentoDto;
    },
  ) {
    console.log(
      `Microservicio PERSONAL: Recibido update_departamento para depto: ${data.deptoId}`,
    );
    return this.personalService.updateDepartamento(
      data.empresaId,
      data.deptoId,
      data.dto,
    );
  }
  /**
   * Escucha el comando 'delete_departamento' (RF-02)
   */
  @MessagePattern({ cmd: 'delete_departamento' })
  deleteDepartamento(
    @Payload()
    data: {
      empresaId: string;
      deptoId: string;
    },
  ) {
    console.log(
      `Microservicio PERSONAL: Recibido delete_departamento para depto: ${data.deptoId}`,
    );
    return this.personalService.deleteDepartamento(
      data.empresaId,
      data.deptoId,
    );
  }
  /**
   * Escucha el comando 'create_cargo' (RF-02)
   */
  @MessagePattern({ cmd: 'create_cargo' })
  @UsePipes(new ValidationPipe())
  createCargo(
    @Payload() data: { empresaId: string; dto: CreateCargoDto },
  ) {
    console.log(
      `Microservicio PERSONAL: Recibido create_cargo para empresa: ${data.empresaId}`,
    );
    return this.personalService.createCargo(data.empresaId, data.dto);
  }
}
