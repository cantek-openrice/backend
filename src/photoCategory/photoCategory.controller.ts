import { Controller, Get, Param } from '@nestjs/common';
import { PhotoCategory } from './interfaces/photoCategory.interface';

@Controller('api/photo/category')
export class PhotoCategoryController {
  constructor(private readonly photoCategoryService: PhotoCategoryController) {}

  @Get()
  async getPhotoCategories(): Promise<PhotoCategory[]> {
    return await this.photoCategoryService.getPhotoCategories();
  }

  @Get(':id')
  async getPhotoCategoryByID(@Param() id: string): Promise<PhotoCategory> {
    return (await this.photoCategoryService.getPhotoCategoryByID(id))[0];
  }
}
