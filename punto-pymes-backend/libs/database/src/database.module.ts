// libs/database/src/database.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities'; // Importa todo desde el "archivo barril"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // Importamos ConfigModule para que ConfigService esté disponible
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './.env', // Apunta al .env de la raíz del monorepo
        }),
      ],
      // Inyectamos ConfigService en nuestra factory
      inject: [ConfigService],
      
      // useFactory nos permite construir la conexión dinámicamente
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        
        // Leemos las variables de entorno (del .env)
        // host: 'localhost' funciona porque Docker Desktop mapea
        // los puertos del host (tu PC) al contenedor.
        host: configService.get<string>('DB_POSTGRES_HOST'),
        port: configService.get<number>('DB_POSTGRES_PORT'),
        username: configService.get<string>('DB_POSTGRES_USER'),
        password: configService.get<string>('DB_POSTGRES_PASSWORD'),
        database: configService.get<string>('DB_POSTGRES_DATABASE'),

        // Cargamos TODAS las 27 entidades que definimos
        entities: Object.values(entities),

        /**
         * ¡IMPORTANTE! (Solo para Desarrollo)
         * synchronize: true le dice a TypeORM que automáticamente
         * cree o modifique las tablas de la BDD para que coincidan
         * con nuestras entidades.
         * NUNCA USAR EN PRODUCCIÓN (se usan migraciones).
         */
        synchronize: true,
      }),
    }),
  ],
  /**
   * Exportamos TypeOrmModule para que cualquier módulo que importe
   * DatabaseModule (como AuthModule) pueda usar
   * TypeOrmModule.forFeature([...]) para inyectar Repositorios.
   */
  exports: [TypeOrmModule],
})
export class DatabaseModule {}