import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { RestaurantPaymentService } from './restaurantPayment.service';
import { CreateRestaurantPaymentDto } from './dto/create_restaurant_payment.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { RestaurantPaymentEntity } from './dto/entity/restaurantPayment.entity';

@ApiTags('restaurant payment')
@Controller('api/restaurant-payment')
export class RestaurantPaymentController {
  constructor(
    private readonly restaurantPaymentService: RestaurantPaymentService,
  ) {}

  @Get()
  async getRestaurantPayments(): Promise<RestaurantPaymentEntity[]> {
    return await this.restaurantPaymentService.getRestaurantPayments();
  }

  @Get(':restaurant_payment_id')
  @ApiParam({ name: 'restaurant_payment_id', required: true, type: String })
  async getRestaurantPaymentByID(
    @Param() params: { restaurant_payment_id: string },
  ): Promise<RestaurantPaymentEntity> {
    return (
      await this.restaurantPaymentService.getRestaurantPaymentByID(
        params.restaurant_payment_id,
      )
    )[0];
  }

  @Post()
  async createRestaurantPayment(
    @Body() createRestaurantPaymentDto: CreateRestaurantPaymentDto,
  ): Promise<RestaurantPaymentEntity> {
    return (
      await this.restaurantPaymentService.createRestaurantPayment(
        createRestaurantPaymentDto,
      )
    )[0];
  }

  @Delete(':restaurant_payment_id')
  @ApiParam({ name: 'restaurant_payment_id', required: true, type: String })
  async deleteRestaurantPayment(
    @Param() params: { restaurant_payment_id: string },
  ): Promise<RestaurantPaymentEntity> {
    const restaurantPaymentFound =
      await this.restaurantPaymentService.getRestaurantPaymentByID(
        params.restaurant_payment_id,
      );
    if (restaurantPaymentFound) {
      return (
        await this.restaurantPaymentService.deleteRestaurantPayment(
          params.restaurant_payment_id,
        )
      )[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This restaurant payment method cannot be found',
      });
    }
  }
}
