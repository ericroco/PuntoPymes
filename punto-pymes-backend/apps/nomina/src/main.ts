// apps/nomina/src/main.ts
import { NestFactory } from '@nestjs/core';
import { NominaModule } from './nomina.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NominaModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('NOMINA_SERVICE_PORT') || 3003;

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port,
    },
  });

  await app.startAllMicroservices();
  console.log(`Microservicio NOMINA está escuchando en el puerto ${port}`);
}
bootstrap();