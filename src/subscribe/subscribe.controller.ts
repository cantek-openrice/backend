import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CreateSubscribeDto } from './dto/create_subscribe.dto';
import { SubscribeEntity } from './dto/entity/subscribe.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('subscribe')
@Controller('api/subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Get()
  async getSubscribes(): Promise<SubscribeEntity[]> {
    return await this.subscribeService.getSubscribes();
  }

  @Get(':subscribe_id')
  @ApiParam({ name: 'subscribe_id', required: true, type: String })
  async getSubscribeByID(
    @Param() params: { subscribe_id: string },
  ): Promise<SubscribeEntity> {
    return (
      await this.subscribeService.getSubscribeByID(params.subscribe_id)
    )[0];
  }

  @Post()
  async createSubscribe(
    @Body() createSubscribeDto: CreateSubscribeDto,
  ): Promise<SubscribeEntity> {
    return (await this.subscribeService.createSubscribe(createSubscribeDto))[0];
  }

  @Delete(':subscribe_id')
  @ApiParam({ name: 'subscribe_id', required: true, type: String })
  async deleteSubscribe(
    @Param() params: { subscribe_id: string },
  ): Promise<SubscribeEntity> {
    const subscribeFound = await this.subscribeService.getSubscribeByID(
      params.subscribe_id,
    );
    if (subscribeFound) {
      return (
        await this.subscribeService.deleteSubscribe(params.subscribe_id)
      )[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This restaurant subscription cannot be found',
      });
    }
  }
}
