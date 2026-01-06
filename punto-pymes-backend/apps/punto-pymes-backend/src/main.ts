import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// 👇 1. IMPORTAR ESTO DE EXPRESS
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- A. CONFIGURACIÓN DE TAMAÑO DE ARCHIVOS (ESTO ARREGLA EL ERROR 413) ---
  // Aumentamos el límite a 50MB (o lo que necesites)
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));


  // --- B. CONFIGURACIÓN DE CORS ---
  app.enableCors({
    origin: ['http://localhost:4200', 'http://192.168.1.6:4200', 'http://25.37.228.19:4200', 'http://192.168.56.1:4200',
      'http://192.168.137.1:4200'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // --- C. CONFIGURACIÓN DE PIPES GLOBALES ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // --- D. CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('PuntoPyMES API')
    .setDescription('Documentación de la API del Sistema de RRHH')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Gateway corriendo en: http://localhost:3000`);
  console.log(`📚 Swagger Docs en: http://localhost:3000/api/docs`);
}
bootstrap();