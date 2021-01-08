import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

import {config} from './config'
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  app.use(helmet())
  app.use(cookieParser( config.cookie_secret ))
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages:true
  }))

  await app.listen(3000);
}
bootstrap();
