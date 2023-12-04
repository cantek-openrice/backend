import { Module } from '@nestjs/common';
import { PhotoCategoryController } from './photoCategory.controller';
import { PhotoCategoryService } from './photoCategory.service';

@Module({
  controllers: [PhotoCategoryController],
  providers: [PhotoCategoryService],
})
export class PhotoCategoryModule {}
