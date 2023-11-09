import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './interfaces/photo.interface';

@Controller('api/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async getPhotos(): Promise<Photo[]> {
    return await this.photoService.getPhotos();
  }

  @Get(':id')
  async getPhotoByID(@Param() id: string) {
    return (await this.photoService.getPhotoByID(id))[0];
  }

  @Post()
  async createPhoto(@Body() createPhotoDto: CreatePhotoDto) {
    return (await this.photoService.createPhoto(createPhotoDto))[0];
  }

  @Delete(':id')
  async deletePhoto(@Param() id: string) {
    const photoFound = await this.photoService.getPhotoByID(id);
    if (photoFound) {
      return (await this.photoService.deletePhoto(id))[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This photo cannot be found',
      });
    }
  }
}
