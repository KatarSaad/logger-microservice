// Central RabbitMQ configuration for Logger Microservice
export const RMQ_URL = process.env.RMQ_URL || 'amqp://rabbitmq:5672';
export const RMQ_QUEUE_LOGGER = process.env.RMQ_QUEUE_LOGGER || 'logging_queue';
export const RMQ_QUEUE_DURABLE = process.env.RMQ_QUEUE_DURABLE === 'true';
export const RMQ_FRAME_MAX = 8192;
