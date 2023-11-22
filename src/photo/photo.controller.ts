import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create_photo.dto';
import { PhotoEntity } from './dto/entity/photo.entity';

@ApiTags('photo')
@Controller('api/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async getPhotos(): Promise<PhotoEntity[]> {
    return await this.photoService.getPhotos();
  }

  @Get(':photo_id')
  @ApiParam({ name: 'photo_id', required: true, type: String })
  async getPhotoByID(
    @Param() params: { photo_id: string },
  ): Promise<PhotoEntity> {
    return (await this.photoService.getPhotoByID(params.photo_id))[0];
  }

  @Get('review')
  @ApiQuery({ name: 'restaurantID', required: true })
  async getReviewPhotos(
    @Query('restaurantID') restaurantID: string,
  ): Promise<PhotoEntity[]> {
    return await this.photoService.getReviewPhotos(restaurantID);
  }

  @Get('menu')
  @ApiQuery({ name: 'restaurantID', required: true })
  async getMenuPhotos(
    @Query('restaurantID') restaurantID: string,
  ): Promise<PhotoEntity[]> {
    return await this.photoService.getMenuPhotos(restaurantID);
  }

  @Post()
  async createPhoto(
    @Body() createPhotoDto: CreatePhotoDto,
  ): Promise<PhotoEntity> {
    return (await this.photoService.createPhoto(createPhotoDto))[0];
  }

  @Delete(':photo_id')
  @ApiParam({ name: 'photo_id', required: true, type: String })
  async deletePhoto(
    @Param() params: { photo_id: string },
  ): Promise<PhotoEntity | { message: string }> {
    const photoFound = await this.photoService.getPhotoByID(params.photo_id);
    if (photoFound) {
      return (await this.photoService.deletePhoto(params.photo_id))[0];
    } else {
      return { message: 'This photo cannot be found' };
    }
  }
}
