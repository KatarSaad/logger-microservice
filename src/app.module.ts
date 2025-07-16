import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerRmqService } from './common/services/log-listener';
import { LoggerServiceImplementation } from './common/services/logger-service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import {
  RMQ_URL,
  RMQ_QUEUE_LOGGER,
  RMQ_QUEUE_DURABLE,
  RMQ_FRAME_MAX,
} from './common/rmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [RMQ_URL],
          queue: RMQ_QUEUE_LOGGER,
          queueOptions: {
            durable: RMQ_QUEUE_DURABLE,
          },
          socketOptions: {
            frameMax: RMQ_FRAME_MAX,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, LoggerServiceImplementation, LoggerRmqService],
})
export class AppModule {}
