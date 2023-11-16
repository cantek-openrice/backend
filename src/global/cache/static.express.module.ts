import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StaticExpressController } from './static.express.controller';
import { StaticExpressMiddleware } from './static.express.middleware';

@Module({
  controllers: [StaticExpressController],
})
export class StaticExpressModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StaticExpressMiddleware).forRoutes('*');
  }
}
