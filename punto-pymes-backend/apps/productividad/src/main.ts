// apps/productividad/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ProductividadModule } from './productividad.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ProductividadModule);
  const configService = app.get(ConfigService);

  // Lee el puerto del .env (ej. PRODUCTIVIDAD_SERVICE_PORT=3004)
  const port = configService.get<number>('PRODUCTIVIDAD_SERVICE_PORT') || 3004;

  // Conecta el microservicio al transporte TCP
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // Escucha en todas las interfaces dentro de Docker
      port: port,
    },
  });

  await app.startAllMicroservices();
  console.log(
    `🚀 Microservicio PRODUCTIVIDAD está escuchando en el puerto ${port}`,
  );
}
bootstrap();