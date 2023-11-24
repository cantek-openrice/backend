import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RestaurantPaymentMethodService } from './restaurantPaymentMethod.service';
import { CreateRestaurantPaymentMethodDto } from './dto/create_restaurant_payment_method.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { RestaurantPaymentMethodEntity } from './dto/entity/restaurantPaymentMethod.entity';

@ApiTags('restaurant payment method')
@Controller('api/restaurant/payment/method')
export class RestaurantPaymentMethodController {
  constructor(
    private readonly restaurantPaymentMethodService: RestaurantPaymentMethodService,
  ) {}

  @Get()
  async getRestaurantPaymentMethods(): Promise<
    RestaurantPaymentMethodEntity[]
  > {
    return await this.restaurantPaymentMethodService.getRestaurantPaymentMethods();
  }

  @Get('id/:restaurant_payment_method_id')
  @ApiParam({
    name: 'restaurant_payment_method_id',
    required: true,
    type: String,
  })
  async getRestaurantPaymentMethodByID(
    @Param() params: { restaurant_payment_method_id: string },
  ): Promise<RestaurantPaymentMethodEntity> {
    return (
      await this.restaurantPaymentMethodService.getRestaurantPaymentMethodByID(
        params.restaurant_payment_method_id,
      )
    )[0];
  }

  @Post()
  async createRestaurantPaymentMethod(
    @Body() createRestaurantPaymentMethodDto: CreateRestaurantPaymentMethodDto,
  ): Promise<RestaurantPaymentMethodEntity> {
    const restaurantPaymentMethod =
      await this.restaurantPaymentMethodService.createRestaurantPaymentMethod(
        createRestaurantPaymentMethodDto,
      );
    return restaurantPaymentMethod[0];
  }

  @Delete('id/:restaurant_payment_method_id')
  @ApiParam({
    name: 'restaurant_payment_method_id',
    required: true,
    type: String,
  })
  async deleteRestaurantPaymentMethod(
    @Param() params: { restaurant_payment_method_id: string },
  ): Promise<RestaurantPaymentMethodEntity | { message: string }> {
    const restaurantPaymentMethodFound =
      await this.restaurantPaymentMethodService.getRestaurantPaymentMethodByID(
        params.restaurant_payment_method_id,
      );
    if (restaurantPaymentMethodFound) {
      return (
        await this.restaurantPaymentMethodService.deleteRestaurantPaymentMethod(
          params.restaurant_payment_method_id,
        )
      )[0];
    } else {
      return { message: 'This restaurant payment method cannot be found' };
    }
  }
}
