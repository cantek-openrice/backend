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
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PhotoEntity } from './dto/entity/photo.entity';

@ApiTags('Photo')
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
  ): Promise<PhotoEntity> {
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
