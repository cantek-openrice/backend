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
  async getSubscribeByID(@Param() id: string) {
    return (await this.subscribeService.getSubscribeByID(id))[0];
  }

  @Post()
  async createSubscribe(@Body() createSubscribeDto: CreateSubscribeDto) {
    return (await this.subscribeService.createSubscribe(createSubscribeDto))[0];
  }

  @Delete(':id')
  async deleteSubscribe(@Param() id: string) {
    const subscribeFound = await this.subscribeService.getSubscribeByID(id);
    if (subscribeFound) {
      return (await this.subscribeService.deleteSubscribe(id))[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This subscription cannot be found',
      });
    }
  }
}
