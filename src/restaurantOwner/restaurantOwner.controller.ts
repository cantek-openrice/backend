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
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Restaurant')
// @Controller('api/restaurant/owner') // We cannot use this, the api/restaurant/:id will take over the controll
@Controller('api/restaurant_owner')
export class RestaurantOwnerController {
  constructor(
    private readonly restaurantOwnerService: RestaurantOwnerService,
  ) {}

  @Get()
  async getRestaurantOwners(): Promise<RestaurantOwner[]> {
    return await this.restaurantOwnerService.getRestaurantOwners();
  }

  @Get(':restaurant_owner_id')
  @ApiParam({ name: 'restaurant_owner_id', required: true, type: String })
  async getRestaurantOwnerByID(
    @Param() params: { restaurant_owner_id: string },
  ): Promise<RestaurantOwner> {
    return (
      await this.restaurantOwnerService.getRestaurantOwnerByID(
        params.restaurant_owner_id,
      )
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

  @Put(':restaurant_owner_id')
  @ApiParam({ name: 'restaurant_owner_id', required: true, type: String })
  async updateRestaurantOwner(
    @Param() params: { restaurant_owner_id: string },
    @Body() updateRestaurantOwnerDto: UpdateRestaurantOwnerDto,
  ) {
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
  ) {
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
