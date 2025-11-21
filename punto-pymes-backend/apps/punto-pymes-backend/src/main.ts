import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // 1. Importar Swagger
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- A. CONFIGURACIÓN DE CORS ---
  // Esto permite que Angular (puerto 4200) hable con NestJS (puerto 3000)
  app.enableCors({
    origin: 'http://localhost:4200', // Permitir solo al Frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // --- B. CONFIGURACIÓN DE PIPES GLOBALES ---
  // Esto ya lo deberías tener, pero asegúrate para que los DTOs funcionen bien
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina campos extra que no estén en el DTO
      transform: true, // Transforma tipos (ej: string a number en params)
      forbidNonWhitelisted: true, // Lanza error si envían campos basura
    }),
  );

  // --- C. CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('PuntoPyMES API')
    .setDescription('Documentación de la API del Sistema de RRHH')
    .setVersion('1.0')
    .addBearerAuth() // ¡Vital! Agrega el botón de "Authorize" para meter el Token
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // La documentación estará en: http://localhost:3000/api/docs
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Gateway corriendo en: http://localhost:3000`);
  console.log(`📚 Swagger Docs en: http://localhost:3000/api/docs`);
}
bootstrap();