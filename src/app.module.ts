import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { LoggerModule } from '@common/logger/logger.module';
import { LogsMiddleware } from '@common/middlewares/logs.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from '@prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { TaskService } from './tasks/task.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    LoggerModule,
    HttpModule,
    UserModule,
    AuthModule,
    CommonModule,
    ArticlesModule,
  ],
  controllers: [],
  providers: [
    // 应用全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    Logger,
    TaskService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
