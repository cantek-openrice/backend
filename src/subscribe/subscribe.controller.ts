import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Subscribe } from './interfaces/subscribe.interface';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';

@Controller('api/subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Get()
  async getSubscribes(): Promise<Subscribe[]> {
    return await this.subscribeService.getSubscribes();
  }

  @Get(':id')
  async getSubscribeByID(@Param() params: { id: string }) {
    return (await this.subscribeService.getSubscribeByID(params.id))[0];
  }

  @Post()
  async createSubscribe(@Body() createSubscribeDto: CreateSubscribeDto) {
    return (await this.subscribeService.createSubscribe(createSubscribeDto))[0];
  }

  @Delete(':id')
  async deleteSubscribe(@Param() params: { id: string }) {
    const subscribeFound = await this.subscribeService.getSubscribeByID(
      params.id,
    );
    if (subscribeFound) {
      return (await this.subscribeService.deleteSubscribe(params.id))[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This restaurant subscription cannot be found',
      });
    }
  }
}
