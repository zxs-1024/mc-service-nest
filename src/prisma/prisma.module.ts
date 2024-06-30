import { Global, Logger, Module } from '@nestjs/common';
import {
  PrismaModule as PrismaModuleLib,
  loggingMiddleware,
} from 'nestjs-prisma';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [
    PrismaModuleLib.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddlewareQuery'),
            logLevel: 'log', // 捕获查询日志
          }),
          // loggingMiddleware({
          //   logger: new Logger('PrismaMiddlewareInfo'),
          //   logLevel: 'debug', // 捕获信息日志
          // }),
          // loggingMiddleware({
          //   logger: new Logger('PrismaMiddlewareWarn'),
          //   logLevel: 'warn', // 捕获警告日志
          // }),
          // loggingMiddleware({
          //   logger: new Logger('PrismaMiddlewareError'),
          //   logLevel: 'error', // 捕获错误日志
          // }),
        ],
      },
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
