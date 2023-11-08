import { Module } from '@nestjs/common';
import { KnexModule } from 'src/global/modules/knex.module';
import { DistrictController } from './district.controller';
import { DistrictService } from './district.service';

@Module({
  imports: [KnexModule],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
