// apps/nomina/src/nomina.service.ts
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contrato, Empleado, Beneficio, BeneficioAsignado } from 'default/database';
import { Repository, Not } from 'typeorm';
import {
  CreateContratoDto,
  EstadoContrato,
} from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';

@Injectable()
export class NominaService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,
    @InjectRepository(Beneficio)
    private readonly beneficioRepository: Repository<Beneficio>,
    @InjectRepository(BeneficioAsignado)
    private readonly beneficioAsignadoRepository: Repository<BeneficioAsignado>,
  ) { }

  /**
   * Lógica para OBTENER todos los contratos de UN empleado (RF-20)
   * Validado por Multi-Tenant (RNF20).
   */
  async getContratosByEmpleado(
    empresaId: string,
    empleadoId: string,
  ): Promise<Contrato[]> {
    console.log(
      `Microservicio NOMINA: Buscando contratos para empleado ${empleadoId}`,
    );

    // 1. Validar que el empleado pertenece a la empresa del usuario (RNF20)
    const empleado = await this.empleadoRepository.findOneBy({
      id: empleadoId,
      empresaId: empresaId,
    });

    if (!empleado) {
      throw new NotFoundException(
        'Empleado no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Si es válido, buscar sus contratos
    return this.contratoRepository.find({
      where: { empleadoId: empleadoId },
      withDeleted: false, // No mostrar los borrados lógicamente
      order: { fechaInicio: 'DESC' }, // Mostrar los más recientes primero
    });
  }

  /**
   * Lógica para CREAR un nuevo contrato (RF-20)
   * Validado por Multi-Tenant (RNF20).
   */
  async createContrato(
    empresaId: string,
    dto: CreateContratoDto,
  ): Promise<Contrato> {
    // 1. Validar que el empleadoId del DTO pertenece a la empresa (RNF20)
    const empleado = await this.empleadoRepository.findOneBy({
      id: dto.empleadoId,
      empresaId: empresaId,
    });

    if (!empleado) {
      throw new BadRequestException(
        'El empleadoId proporcionado no es válido o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica de Negocio: "Solo un contrato puede estar activo"
    const estadoNuevo = dto.estado || EstadoContrato.VIGENTE;
    if (estadoNuevo === EstadoContrato.VIGENTE) {
      const contratoActivo = await this.contratoRepository.findOneBy({
        empleadoId: dto.empleadoId,
        estado: EstadoContrato.VIGENTE,
      });
      if (contratoActivo) {
        throw new ConflictException(
          'El empleado ya tiene un contrato "Vigente". No se puede crear otro.',
        );
      }
    }

    // 3. Crear el contrato
    const nuevoContrato = this.contratoRepository.create({
      ...dto,
      estado: estadoNuevo,
    });

    return this.contratoRepository.save(nuevoContrato);
  }

  /**
   * Lógica para ACTUALIZAR un contrato (RF-20)
   * Validado por Multi-Tenant (RNF20).
   */
  async updateContrato(
    empresaId: string,
    contratoId: string,
    dto: UpdateContratoDto,
  ): Promise<Contrato> {
    // 1. Validar que el contrato pertenece a la empresa (RNF20)
    // Hacemos un 'join' con empleado para verificar el empresaId
    const contrato = await this.contratoRepository.findOne({
      where: { id: contratoId },
      relations: ['empleado'], // Cargamos la relación
    });

    if (!contrato || contrato.empleado.empresaId !== empresaId) {
      throw new NotFoundException(
        'Contrato no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica de Negocio: "Solo un contrato puede estar activo"
    // Si están intentando poner este contrato como "Vigente"...
    if (dto.estado === EstadoContrato.VIGENTE) {
      // ...buscamos si OTRO contrato (excluyendo el actual) ya está vigente.
      const otroContratoVigente = await this.contratoRepository.findOneBy({
        empleadoId: contrato.empleadoId,
        estado: EstadoContrato.VIGENTE,
        id: Not(contratoId), // ¡Importante: Excluirnos a nosotros mismos!
      });

      if (otroContratoVigente) {
        throw new ConflictException(
          'No se puede activar este contrato. El empleado ya tiene OTRO contrato vigente.',
        );
      }
    }

    // 3. Aplicar cambios y guardar
    const contratoActualizado = this.contratoRepository.merge(contrato, dto);
    return this.contratoRepository.save(contratoActualizado);
  }

  /**
   * Lógica para "borrar" lógicamente (Soft Delete) un contrato.
   */
  async deleteContrato(
    empresaId: string,
    contratoId: string,
  ): Promise<{ message: string }> {
    // 1. Validar que el contrato pertenece a la empresa (RNF20)
    const contrato = await this.contratoRepository.findOne({
      where: { id: contratoId },
      relations: ['empleado'],
    });

    if (!contrato || contrato.empleado.empresaId !== empresaId) {
      throw new NotFoundException(
        'Contrato no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica de Negocio: "No borrar un contrato vigente"
    // Esto fuerza al usuario a usar el flujo correcto de "Desvincular Empleado"
    // que definimos en personal.service.ts
    if (contrato.estado === EstadoContrato.VIGENTE) {
      throw new BadRequestException(
        'No se puede borrar un contrato "Vigente". Use la función "Desvincular Empleado" en el módulo de personal para finalizarlo.',
      );
    }

    // 3. Ejecutar Soft Delete
    await this.contratoRepository.softRemove(contrato);

    return { message: 'Contrato eliminado (desactivado) correctamente.' };
  }
  // --- INICIO DE CRUD PARA BENEFICIO (RF-19) ---

  /**
   * Lógica para OBTENER todos los beneficios (plantillas)
   * de una empresa (Multi-Tenant RNF20).
   */
  async getBeneficios(empresaId: string): Promise<Beneficio[]> {
    console.log(
      `Microservicio NOMINA: Buscando beneficios para empresaId: ${empresaId}`,
    );
    return this.beneficioRepository.find({
      where: { empresaId: empresaId },
      withDeleted: false,
    });
  }

  /**
   * Lógica para CREAR un nuevo beneficio (plantilla)
   * Validado por Multi-Tenant (RNF20).
   */
  async createBeneficio(
    empresaId: string,
    dto: CreateBeneficioDto,
  ): Promise<Beneficio> {
    // 1. Validar duplicados (Multi-Tenant)
    const beneficioExistente = await this.beneficioRepository.findOneBy({
      nombre: dto.nombre,
      empresaId: empresaId,
    });
    if (beneficioExistente) {
      throw new ConflictException(
        'Ya existe un beneficio con ese nombre en esta empresa.',
      );
    }

    // 2. Crear el beneficio
    const nuevoBeneficio = this.beneficioRepository.create({
      ...dto,
      empresaId: empresaId, // ¡Forzamos el Multi-tenancy!
    });

    return this.beneficioRepository.save(nuevoBeneficio);
  }

  /**
   * Lógica para ACTUALIZAR un beneficio (plantilla)
   * Validado por Multi-Tenant (RNF20).
   */
  async updateBeneficio(
    empresaId: string,
    beneficioId: string,
    dto: UpdateBeneficioDto,
  ): Promise<Beneficio> {
    // 1. Validar que el beneficio pertenece a la empresa
    const beneficio = await this.beneficioRepository.findOneBy({
      id: beneficioId,
      empresaId: empresaId,
    });
    if (!beneficio) {
      throw new NotFoundException(
        'Beneficio no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Si se cambia el nombre, validar duplicados
    if (dto.nombre && dto.nombre !== beneficio.nombre) {
      const beneficioExistente = await this.beneficioRepository.findOneBy({
        nombre: dto.nombre,
        empresaId: empresaId,
        id: Not(beneficioId),
      });
      if (beneficioExistente) {
        throw new ConflictException(
          'Ya existe un beneficio con ese nombre en esta empresa.',
        );
      }
    }

    // 3. Aplicar cambios y guardar
    const beneficioActualizado = this.beneficioRepository.merge(beneficio, dto);
    return this.beneficioRepository.save(beneficioActualizado);
  }

  /**
   * Lógica para "borrar" lógicamente (Soft Delete) un beneficio.
   */
  async deleteBeneficio(
    empresaId: string,
    beneficioId: string,
  ): Promise<{ message: string }> {
    // 1. Validar que el beneficio pertenece a la empresa
    const beneficio = await this.beneficioRepository.findOneBy({
      id: beneficioId,
      empresaId: empresaId,
    });
    if (!beneficio) {
      throw new NotFoundException(
        'Beneficio no encontrado o no pertenece a esta empresa.',
      );
    }

    // 2. Lógica de Negocio "Ultra Completa":
    // ¡No podemos borrar una plantilla de beneficio si está asignada a empleados!
    const asignaciones = await this.beneficioAsignadoRepository.count({
      where: { beneficioId: beneficioId },
    });

    if (asignaciones > 0) {
      throw new ConflictException(
        `No se puede eliminar. Este beneficio está asignado a ${asignaciones} empleado(s).`,
      );
    }

    // 3. Ejecutar Soft Delete
    await this.beneficioRepository.softRemove(beneficio);

    return { message: 'Beneficio eliminado correctamente.' };
  }
}