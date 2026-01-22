import { NestFactory } from '@nestjs/core';
import { IaModule } from './ia.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // 1. Crear la app híbrida
  const app = await NestFactory.create(IaModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('IaBootstrap');

  const port = configService.get<number>('IA_SERVICE_PORT') || 3005;

  // 2. Conectar el Microservicio TCP
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);

  logger.log(`🤖 Microservicio IA escuchando TCP en puerto ${port} y HTTP en 3000`);
}
bootstrap();