import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Creamos el microservicio
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      // Usamos transporte TCP
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3001,  
      },
    },
  );
  await app.listen();
  console.log('Microservicio AUTH está escuchando en el puerto 3001');
}
bootstrap();