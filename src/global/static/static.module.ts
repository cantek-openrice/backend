import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'coverage',
        'lcov-report',
      ),
      serveRoot: '/test/jest/coverage/api',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'test',
        'coverage',
        'lcov-report',
      ),
      serveRoot: '/test/jest/coverage/e2e',
    }),
  ],
})
export class StaticModule {}
