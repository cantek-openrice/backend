import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
  async getRestaurantOwnerByID(@Param() params: { id: string }) {
    return (
      await this.restaurantOwnerService.getRestaurantOwnerByID(params.id)
    )[0];
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
    @Param() params: { id: string },
    @Body() updateRestaurantOwnerDto: UpdateRestaurantOwnerDto,
  ) {
    const restaurantOwnerFound =
      await this.restaurantOwnerService.getRestaurantOwnerByID(params.id);
    if (restaurantOwnerFound) {
      return (
        await this.restaurantOwnerService.updateRestaurantOwner(
          params.id,
          updateRestaurantOwnerDto,
        )
      )[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This restaurant owner cannot be found',
      });
    }
  }

  @Delete(':id')
  async deleteRestaurantOwner(@Param() params: { id: string }) {
    const restaurantOwnerFound =
      await this.restaurantOwnerService.getRestaurantOwnerByID(params.id);
    if (restaurantOwnerFound) {
      return (
        await this.restaurantOwnerService.deleteRestaurantOwner(params.id)
      )[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This restaurant owner cannot be found',
      });
    }
  }
}
