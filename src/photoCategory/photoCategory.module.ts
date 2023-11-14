import { Module } from '@nestjs/common';
import { KnexModule } from '../global/modules/knex.module';
import { PhotoCategoryController } from './photoCategory.controller';
import { PhotoCategoryService } from './photoCategory.service';

@Module({
  imports: [KnexModule],
  controllers: [PhotoCategoryController],
  providers: [PhotoCategoryService],
})
export class PhotoCategoryModule {}
