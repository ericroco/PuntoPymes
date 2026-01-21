// apps/punto-pymes-backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),

    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'auth_service',
            port: +configService.get<number>('AUTH_SERVICE_PORT')!,
          },
        }),
      },
      {
        name: 'PERSONAL_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'personal_service',
            port: +configService.get<number>('PERSONAL_SERVICE_PORT')!,
          },
        }),
      },
      {
        name: 'NOMINA_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'nomina_service',
            port: +configService.get<number>('NOMINA_SERVICE_PORT')!,
          },
        }),
      },
      {
        name: 'PRODUCTIVIDAD_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: 'productividad_service',
            port: +configService.get<number>('PRODUCTIVIDAD_SERVICE_PORT')!,
          },
        }),
      },
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<string>('JWT_EXPIRES_IN')!,
        },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // 👇 CONFIGURACIÓN DE MONGO (NUEVO)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        // 1. Leemos tus variables
        const host = configService.get<string>('DB_MONGO_HOST');
        const port = configService.get<string>('DB_MONGO_PORT');
        const user = configService.get<string>('DB_MONGO_USER');
        const pass = configService.get<string>('DB_MONGO_PASSWORD');
        const dbName = configService.get<string>('DB_MONGO_DATABASE');

        const uri = `mongodb://${user}:${pass}@${host}:${port}/${dbName}?authSource=admin`;

        console.log('🐢 Intentando conectar a Mongo en:', `mongodb://${user}:******@${host}:${port}/${dbName}`);

        return { uri };
      },
      inject: [ConfigService],
    }),

    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }