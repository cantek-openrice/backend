import { Module } from '@nestjs/common';
import { StaticController } from './static.controller';

@Module({
  controllers: [StaticController],
})
export class StaticExpressModule {}
//  implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(StaticMiddleware).forRoutes('*');
//   }
// }
