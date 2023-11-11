import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { RestaurantPaymentService } from './restaurantPayment.service';
import { RestaurantPayment } from './interfaces/restaurantPayment.interface';
import { CreateRestaurantPaymentDto } from './dto/create-restaurantPayment.dto';

@Controller('api/restaurant/payment')
export class RestaurantPaymentController {
  constructor(
    private readonly restaurantPaymentService: RestaurantPaymentService,
  ) {}

  @Get()
  async getRestaurantPayments(): Promise<RestaurantPayment[]> {
    return await this.restaurantPaymentService.getRestaurantPayments();
  }

  @Get(':id')
  async getRestaurantPaymentByID(
    @Param() params: { id: string },
  ): Promise<RestaurantPayment> {
    return (
      await this.restaurantPaymentService.getRestaurantPaymentByID(params.id)
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

  @Delete(':id')
  async deleteRestaurantPayment(@Param() params: { id: string }) {
    const restaurantPaymentFound =
      await this.restaurantPaymentService.getRestaurantPaymentByID(params.id);
    if (restaurantPaymentFound) {
      return (
        await this.restaurantPaymentService.deleteRestaurantPayment(params.id)
      )[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This restaurant payment method cannot be found',
      });
    }
  }
}
