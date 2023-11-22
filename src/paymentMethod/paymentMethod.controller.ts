import { Controller, Get, Param } from '@nestjs/common';
import { PaymentMethodService } from './paymentMethod.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PaymentMethodEntity } from './dto/entity/paymentMethod.entity';

@ApiTags('payment method')
@Controller('api/payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  async getPaymentMethods(): Promise<PaymentMethodEntity[]> {
    return await this.paymentMethodService.getPaymentMethods();
  }

  @Get('id/:payment_method_id')
  @ApiParam({ name: 'payment_method_id', required: true, type: String })
  async getPaymentMethodByID(
    @Param() params: { payment_method_id: string },
  ): Promise<PaymentMethodEntity> {
    return (
      await this.paymentMethodService.getPaymentMethodByID(
        params.payment_method_id,
      )
    )[0];
  }
}
