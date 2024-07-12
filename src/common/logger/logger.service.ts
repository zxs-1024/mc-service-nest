import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as winston from 'winston';
import { Logger } from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private readonly ossLogger: Logger;
  private readonly answerLogger: Logger;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {
    const level = this.configService.get<string>('LOG_LEVEL') || 'info';
    this.ossLogger = winston.createLogger({
      level,
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/weekly/oss-%DATE%.log',
          datePattern: 'YYYY-wo',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '4w',
        }),
      ],
    });
    this.answerLogger = winston.createLogger({
      level,
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/weekly/answer-%DATE%.log',
          datePattern: 'YYYY-wo',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '24w',
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  ossError(message, options) {
    this.ossLogger.error(message, options);
  }

  answerError(message, options) {
    this.answerLogger.error(message, options);
  }
}
