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
import { RestaurantPayment } from './interfaces/restaurantPayment.interface';
import { CreateRestaurantPaymentDto } from './dto/create-restaurantPayment.dto';
import { ApiTags, ApiParam } from '@nestjs/swagger';

@ApiTags('Restaurant')
// @Controller('api/restaurant/payment') //We cannot use this, the api/restaurant/:id will take over the control
@Controller('api/restaurant_payment')
export class RestaurantPaymentController {
  constructor(
    private readonly restaurantPaymentService: RestaurantPaymentService,
  ) {}

  @Get()
  async getRestaurantPayments(): Promise<RestaurantPayment[]> {
    return await this.restaurantPaymentService.getRestaurantPayments();
  }

  @Get(':restaurant_payment_id')
  @ApiParam({ name: 'restaurant_payment_id', required: true, type: String })
  async getRestaurantPaymentByID(
    @Param() params: { restaurant_payment_id: string },
  ): Promise<RestaurantPayment> {
    return (
      await this.restaurantPaymentService.getRestaurantPaymentByID(
        params.restaurant_payment_id,
      )
    )[0];
  }

  @Post()
  async createRestaurantPayment(
    @Body() createRestaurantPaymentDto: CreateRestaurantPaymentDto,
  ) {
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
  ) {
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
