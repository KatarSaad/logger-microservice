import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { LoggerServiceImplementation } from './common/services/logger-service';

@Controller()
export class AppController {
  constructor(private readonly loggerService: LoggerServiceImplementation) {}

  @MessagePattern('log-here') // The queue to listen to for log messages
  handleLogMessage(
    @Payload()
    payload: {
      level: string;
      message: string;
      trace?: string;
      context?: string;
      timestamp: string;
      serviceName?: string;
      metadata?: Record<string, any>;
    },
  ) {
    try {
      const {
        level,
        message,
        trace,
        context,
        timestamp,
        serviceName,
        metadata,
      } = payload;

      const logPrefix = `[${timestamp}] [${serviceName ?? 'unknown'}]`;
      const formattedMessage = `${logPrefix} ${context ? `[${context}] ` : ''}${message}`;
      // Log the message with the appropriate level and trace if available
      switch (level) {
        case 'info':
          this.loggerService.log(formattedMessage);
          break;
        case 'warn':
          this.loggerService.warn(formattedMessage);
          break;
        case 'error':
          this.loggerService.error(formattedMessage, trace || '');
          break;
        case 'debug':
          this.loggerService.debug(formattedMessage);
          break;
        default:
          this.loggerService.log(formattedMessage);
          break;
      }

      // Optionally, process metadata if available
      if (metadata && Object.keys(metadata).length > 0) {
        this.loggerService.log(
          `${logPrefix} Metadata: ${JSON.stringify(metadata)}`,
        );
      }
    } catch (error) {
      this.loggerService.error(
        'Error while processing log message',
        error.stack,
      );
      throw new RpcException('Error while processing log message');
    }
  }
}
