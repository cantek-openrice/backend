import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from './global/knex/knex.module';

@Module({
  imports: [KnexModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
