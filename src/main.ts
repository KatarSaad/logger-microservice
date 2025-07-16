import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  RMQ_URL,
  RMQ_QUEUE_LOGGER,
  RMQ_QUEUE_DURABLE,
  RMQ_FRAME_MAX,
} from './common/rmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
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
  });

  await app.startAllMicroservices();
  console.log(`🚀 Logger Microservice is listening on ${RMQ_URL}`);
  console.log(`📨 Queue name: ${RMQ_QUEUE_LOGGER}`);
  console.log(
    `📦 Queue durability: ${RMQ_QUEUE_DURABLE ? 'enabled' : 'disabled'}`,
  );
}
bootstrap();
