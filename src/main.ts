import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable microservice mode to listen to RabbitMQ messages
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ URL
      queue: 'logging_queue', // Queue name
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices(); // Start the microservice
}
bootstrap();
