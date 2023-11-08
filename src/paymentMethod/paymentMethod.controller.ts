import { Controller, Get, Param } from '@nestjs/common';
import { PaymentMethod } from './interfaces/paymentMethod.interface';

@Controller('api/payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodController) {}

  @Get()
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    return await this.paymentMethodService.getPaymentMethods();
  }

  @Get(':id')
  async getPaymentMethodByID(@Param() id: string): Promise<PaymentMethod> {
    return (await this.paymentMethodService.getPaymentMethodByID(id))[0];
  }
}
