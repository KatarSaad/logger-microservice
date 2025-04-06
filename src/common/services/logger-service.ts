import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

// Create a custom Winston Logger
@Injectable()
export class LoggerServiceImplementation implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info', // Default level
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        // Daily rotating log file for general logs
        new DailyRotateFile({
          filename: 'logs/log-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
        // Daily rotating log file for errors
        new DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
        // Console transport for development
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
