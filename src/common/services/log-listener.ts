import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { LoggerServiceImplementation } from './logger-service';

@Injectable()
export class LoggerRmqService {}
