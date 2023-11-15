import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './interfaces/photo.interface';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Photo')
@Controller('api/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async getPhotos(): Promise<Photo[]> {
    return await this.photoService.getPhotos();
  }

  @Get(':photo_id')
  @ApiParam({ name: 'photo_id', required: true, type: String })
  async getPhotoByID(@Param() params: { photo_id: string }): Promise<Photo> {
    return (await this.photoService.getPhotoByID(params.photo_id))[0];
  }

  @Post()
  async createPhoto(@Body() createPhotoDto: CreatePhotoDto) {
    return (await this.photoService.createPhoto(createPhotoDto))[0];
  }

  @Delete(':photo_id')
  @ApiParam({ name: 'photo_id', required: true, type: String })
  async deletePhoto(@Param() params: { photo_id: string }) {
    const photoFound = await this.photoService.getPhotoByID(params.photo_id);
    if (photoFound) {
      return (await this.photoService.deletePhoto(params.photo_id))[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This photo cannot be found',
      });
    }
  }
}
