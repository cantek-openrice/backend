import { Module } from '@nestjs/common';
import { KnexModule } from 'src/global/modules/knex.module';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

@Module({
  imports: [KnexModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
