import { Module } from '@nestjs/common';
import { KnexModule } from 'src/global/modules/knex.module';
import { PaymentMethodController } from './paymentMethod.controller';
import { PaymentMethodService } from './paymentMethod.service';

@Module({
  imports: [KnexModule],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
