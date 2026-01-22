import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IaController } from './ia.controller';
import { IaService } from './ia.service';
import { DatabaseModule, DocumentoEmbedding } from 'default/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([DocumentoEmbedding]),
  ],
  controllers: [IaController],
  providers: [IaService],
})
export class IaModule { }