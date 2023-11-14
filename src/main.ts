import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as dotenv from 'dotenv';
import * as cors from 'cors';
import helmet from 'helmet';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    cors({
      origin: [
        'http://localhost:3865',
        'https://openricecanadafrontend.vercel.app',
      ],
      credentials: true,
    }),
  );

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Openrice Canada')
    .setDescription('The Openrice Canada API description')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
