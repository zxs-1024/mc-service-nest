import * as winston from 'winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

export const winstonConfig: winston.LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new transports.DailyRotateFile({
      filename: 'logs/%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp(),
        format.json(),
      ),
      maxFiles: '30d',
    }),
    new transports.DailyRotateFile({
      filename: 'logs/%DATE%-combined.log',
      datePattern: 'YYYY-MM-DD',
      format: format.combine(
        format.timestamp(),
        format.json(),
        format((info) => {
          if (info.level === 'error') {
            return false; // 过滤掉'error'级别的日志
          }
          return info;
        })(),
      ),
      maxFiles: '30d',
    }),
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize({ all: true }),
        format.timestamp(),
        format.printf(({ timestamp, level, message, stack }) => {
          return stack
            ? `${timestamp} [${level}] ${message} - ${stack}`
            : `${timestamp} [${level}] ${message}`;
        }),
      ),
    }),
  ],
};
