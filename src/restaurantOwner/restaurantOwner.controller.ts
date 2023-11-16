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
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { RestaurantOwnerEntity } from './dto/entity/restaurantOwner.enttiy';

@ApiTags('restaurant owner')
@Controller('api/restaurant-owner')
export class RestaurantOwnerController {
  constructor(
    private readonly restaurantOwnerService: RestaurantOwnerService,
  ) {}

  @Get()
  async getRestaurantOwners(): Promise<RestaurantOwnerEntity[]> {
    return await this.restaurantOwnerService.getRestaurantOwners();
  }

  @Get(':restaurant_owner_id')
  @ApiParam({ name: 'restaurant_owner_id', required: true, type: String })
  async getRestaurantOwnerByID(
    @Param() params: { restaurant_owner_id: string },
  ): Promise<RestaurantOwnerEntity> {
    return (
      await this.restaurantOwnerService.getRestaurantOwnerByID(
        params.restaurant_owner_id,
      )
    )[0];
  }

  @Post()
  async createRestaurantOwner(
    @Body() createRestaurantOwnerDto: CreateRestaurantOwnerDto,
  ): Promise<RestaurantOwnerEntity> {
    return (
      await this.restaurantOwnerService.createRestaurantOwner(
        createRestaurantOwnerDto,
      )
    )[0];
  }

  @Put(':restaurant_owner_id')
  @ApiParam({ name: 'restaurant_owner_id', required: true, type: String })
  async updateRestaurantOwner(
    @Param() params: { restaurant_owner_id: string },
    @Body() updateRestaurantOwnerDto: UpdateRestaurantOwnerDto,
  ): Promise<RestaurantOwnerEntity> {
    const restaurantOwnerFound =
      await this.restaurantOwnerService.getRestaurantOwnerByID(
        params.restaurant_owner_id,
      );
    if (restaurantOwnerFound) {
      return (
        await this.restaurantOwnerService.updateRestaurantOwner(
          params.restaurant_owner_id,
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

  @Delete(':restaurant_owner_id')
  @ApiParam({ name: 'restaurant_owner_id', required: true, type: String })
  async deleteRestaurantOwner(
    @Param() params: { restaurant_owner_id: string },
  ): Promise<RestaurantOwnerEntity> {
    const restaurantOwnerFound =
      await this.restaurantOwnerService.getRestaurantOwnerByID(
        params.restaurant_owner_id,
      );
    if (restaurantOwnerFound) {
      return (
        await this.restaurantOwnerService.deleteRestaurantOwner(
          params.restaurant_owner_id,
        )
      )[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This restaurant owner cannot be found',
      });
    }
  }
}
