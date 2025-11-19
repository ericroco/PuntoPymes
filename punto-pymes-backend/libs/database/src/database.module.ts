// libs/database/src/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities';

// Convierte el objeto a un array de clases
const entityList = Object.values(entities).filter(
  (entity) => typeof entity === 'function'
);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './.env',
        }),
      ],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_POSTGRES_HOST'),
        port: configService.get<number>('DB_POSTGRES_PORT'),
        username: configService.get<string>('DB_POSTGRES_USER'),
        password: configService.get<string>('DB_POSTGRES_PASSWORD'),
        database: configService.get<string>('DB_POSTGRES_DATABASE'),
        entities: entityList,
        synchronize: true,
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule { }