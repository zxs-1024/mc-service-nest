import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { winstonLogger } from '@common/logger/winston-logger';
import { LogsMiddleware } from '@common/middlewares/logs.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaModule } from '@prisma/prisma.module';
import { WinstonModule } from 'nest-winston';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      instance: winstonLogger,
    }),
    PrismaModule,
    HttpModule,
    UserModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [],
  providers: [
    // 应用全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
