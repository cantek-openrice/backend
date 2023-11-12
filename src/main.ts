import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:3865',
      credentials: true,
    }),
  );
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Openrice-Canada')
    .setDescription('The Openrice-Canada API description')
    .setVersion('1.0')
    .addTag('openrice')
    .build();

  const doucment = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doucment);

  await app.listen(8080);
}
bootstrap();
