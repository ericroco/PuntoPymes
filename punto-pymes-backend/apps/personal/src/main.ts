// apps/personal/src/main.ts
import { NestFactory } from '@nestjs/core';
import { PersonalModule } from './personal.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config'; // ← IMPORTAR ConfigService

async function bootstrap() {
  // Cargamos ConfigService para leer el puerto
  const tempApp = await NestFactory.createApplicationContext(PersonalModule); // ← Cambiar a createApplicationContext
  const configService = tempApp.get(ConfigService); // ← Usar la clase, no la cadena

  const port = configService.get<number>('PERSONAL_SERVICE_PORT') || 3002;

  // Cerramos la app temporal ANTES de crear el microservicio
  await tempApp.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PersonalModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0', // Acepta conexiones de otros contenedores
        port: port,
      },
    },
  );
  
  await app.listen();
  console.log(`🚀 Microservicio PERSONAL está escuchando en el puerto ${port}`);
}

bootstrap();