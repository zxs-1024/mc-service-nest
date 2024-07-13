import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 环境变量
  const configService = app.get(ConfigService);
  console.log('NODE_ENV: ', process.env.NODE_ENV);

  // 启用 cors
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', '*'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });
  // 应用全局拦截器 new ErrorInterceptor()
  app.useGlobalInterceptors(new ResponseInterceptor());

  // TODO: 加上守卫
  // app.useGlobalGuards(new RoleGuard());

  // 配置 Swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
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
