import { Controller, Get, Param } from '@nestjs/common';
import { PaymentMethod } from './interfaces/paymentMethod.interface';
import { PaymentMethodService } from './paymentMethod.service';

@Controller('api/payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return await this.paymentMethodService.getPaymentMethods();
  }

  @Get(':id')
  async getPaymentMethodByID(
    @Param() params: { id: string },
  ): Promise<PaymentMethod> {
    return (await this.paymentMethodService.getPaymentMethodByID(params.id))[0];
  }
}
