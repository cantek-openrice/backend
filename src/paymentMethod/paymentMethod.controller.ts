import { Controller, Get, Param } from '@nestjs/common';
import { PaymentMethod } from './interfaces/paymentMethod.interface';
import { PaymentMethodService } from './paymentMethod.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment Method')
@Controller('api/payment_method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return await this.paymentMethodService.getPaymentMethods();
  }

  @Get(':payment_method_id')
  @ApiParam({ name: 'payment_method_id', required: true, type: String })
  async getPaymentMethodByID(
    @Param() params: { payment_method_id: string },
  ): Promise<PaymentMethod> {
    return (
      await this.paymentMethodService.getPaymentMethodByID(
        params.payment_method_id,
      )
    )[0];
  }
}
