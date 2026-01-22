import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { IaService } from './ia.service';

@Controller()
export class IaController {
  constructor(private readonly iaService: IaService) { }

  @EventPattern('documento_subido')
  async handleDocumentoSubido(@Payload() data: { filePath: string; documentoId: string }) {
    console.log('📨 Evento recibido: documento_subido', data);
    this.iaService.procesarDocumento(data.filePath, data.documentoId);
  }

  @MessagePattern({ cmd: 'consultar_ia' })
  async consultar(@Payload() data: { pregunta: string }) {
    return this.iaService.consultarIA(data.pregunta);
  }
}