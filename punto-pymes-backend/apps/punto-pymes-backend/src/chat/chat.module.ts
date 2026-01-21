import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Mensaje, MensajeSchema } from './schemas/mensaje.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Mensaje.name, schema: MensajeSchema }]),
    ],
    providers: [ChatGateway, ChatService],
    exports: [ChatService],
})
export class ChatModule { }