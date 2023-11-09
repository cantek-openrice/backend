import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRestaurantOwnerDto } from './dto/create-restaurantOwner.dto';
import { UpdateRestaurantOwnerDto } from './dto/update-restaurantOwner.dto';
import { RestaurantOwnerService } from './restaurantOwner.service';
import { RestaurantOwner } from './interfaces/restaurantOwner.interface';

@Controller('api/restaurant/owner')
export class RestaurantOwnerController {
  constructor(
    private readonly restaurantOwnerService: RestaurantOwnerService,
  ) {}

  @Get()
  async getRestaurantOwners(): Promise<RestaurantOwner[]> {
    return await this.restaurantOwnerService.getRestaurantOwners();
  }

  @Get(':id')
  async getRestaurantOwnerByID(@Param() id: string) {
    return (await this.restaurantOwnerService.getRestaurantOwnerByID(id))[0];
  }

  @Post()
  async createRestaurantOwner(
    @Body() createRestaurantOwnerDto: CreateRestaurantOwnerDto,
  ) {
    return (
      await this.restaurantOwnerService.createRestaurantOwner(
        createRestaurantOwnerDto,
      )
    )[0];
  }

  @Put(':id')
  async updateRestaurantOwner(
    @Param() id: string,
    @Body() updateRestaurantOwnerDto: UpdateRestaurantOwnerDto,
  ) {
    const restaurantOwnerFound =
      await this.restaurantOwnerService.getRestaurantOwnerByID(id);
    if (restaurantOwnerFound) {
      return (
        await this.restaurantOwnerService.updateRestaurantOwner(
          id,
          updateRestaurantOwnerDto,
        )
      )[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This restaurantOwner cannot be found',
      });
    }
  }

  @Delete(':id')
  async deleteRestaurantOwner(@Param() id: string) {
    const restaurantOwnerFound =
      await this.restaurantOwnerService.getRestaurantOwnerByID(id);
    if (restaurantOwnerFound) {
      return (await this.restaurantOwnerService.deleteRestaurantOwner(id))[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This restaurantOwner cannot be found',
      });
    }
  }
}
