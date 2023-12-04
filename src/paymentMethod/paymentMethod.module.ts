import { Module } from '@nestjs/common';
import { PaymentMethodController } from './paymentMethod.controller';
import { PaymentMethodService } from './paymentMethod.service';

@Module({
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
