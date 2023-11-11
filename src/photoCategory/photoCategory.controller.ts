import { Controller, Get, Param } from '@nestjs/common';
import { PhotoCategory } from './interfaces/photoCategory.interface';
import { PhotoCategoryService } from './photoCategory.service';

@Controller('api/photo/category')
export class PhotoCategoryController {
  constructor(private readonly photoCategoryService: PhotoCategoryService) {}

  @Get()
  async getPhotoCategories(): Promise<PhotoCategory[]> {
    return await this.photoCategoryService.getPhotoCategories();
  }

  @Get(':id')
  async getPhotoCategoryByID(
    @Param() params: { id: string },
  ): Promise<PhotoCategory> {
    return (await this.photoCategoryService.getPhotoCategoryByID(params.id))[0];
  }
}
