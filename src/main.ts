import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as mustache from 'mustache-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { ValidationFilter } from './validation/validation.filter';
// import { TimeInterceptor } from './time/time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const loggerService = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(loggerService);
  app.use(cookieParser('My Secret KEY'));
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'html');
  app.engine('html', mustache());

  app.useGlobalFilters(new ValidationFilter());
  // app.useGlobalInterceptors(new TimeInterceptor());

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT')!);
}
bootstrap();
