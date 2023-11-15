import { Controller, Get, Param } from '@nestjs/common';
import { PhotoCategory } from './interfaces/photoCategory.interface';
import { PhotoCategoryService } from './photoCategory.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Photo')
// @Controller('api/photo/category') // We cannot use this, api/photo/:id with take over the control
@Controller('api/photo_category')
export class PhotoCategoryController {
  constructor(private readonly photoCategoryService: PhotoCategoryService) {}

  @Get()
  async getPhotoCategories(): Promise<PhotoCategory[]> {
    return await this.photoCategoryService.getPhotoCategories();
  }

  @Get(':photo_category_id')
  @ApiParam({ name: 'photo_category_id', required: true, type: String })
  async getPhotoCategoryByID(
    @Param() params: { photo_category_id: string },
  ): Promise<PhotoCategory> {
    return (
      await this.photoCategoryService.getPhotoCategoryByID(
        params.photo_category_id,
      )
    )[0];
  }
}
