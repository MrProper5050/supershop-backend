import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

import {config} from './config'
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  app.use(helmet())
  app.use(cookieParser( config.cookie_secret ))

  await app.listen(3000);
}
bootstrap();
