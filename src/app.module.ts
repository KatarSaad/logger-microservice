import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerRmqService } from './common/services/log-listener';
import { LoggerServiceImplementation } from './common/services/logger-service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOGGER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'logging_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, LoggerServiceImplementation, LoggerRmqService],
})
export class AppModule {}
