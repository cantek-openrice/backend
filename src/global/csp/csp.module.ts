import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CspService } from './csp.service';
import { CspMiddleware } from './csp.middleware';

@Module({
  providers: [CspService],
})
export class CspModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CspMiddleware).forRoutes('*');
  }
}
