import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 全局注册拦截器
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  // 全局注册拦截器
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(9080);

}
bootstrap();
