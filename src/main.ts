import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:3865',
      credentials: true,
    }),
  );
  await app.listen(8080);
}
bootstrap();
