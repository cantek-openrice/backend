import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StaticController } from './static.express.controller';
import { StaticMiddleware } from './static.express.middleware';

@Module({
  controllers: [StaticController],
})
export class StaticExpressModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(StaticMiddleware).forRoutes('*');
  }
}
