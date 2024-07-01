import { HttpExceptionFilter } from '@common/interceptors/http-exception.filter';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用 cors
  app.enableCors({
    origin: '*', // TODO: 允许所有来源，根据环境变量配置
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });

  // 应用全局拦截器 new ErrorInterceptor()
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 应用全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // TODO: 加上守卫
  // app.useGlobalGuards(new RoleGuard());

  // 配置 Swagger
  const config = new DocumentBuilder()
    // .addBearerAuth()
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
