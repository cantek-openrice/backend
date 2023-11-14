import { Controller, Get, Param } from '@nestjs/common';
import { DistrictService } from './district.service';
import { District } from './interfaces/district.interface';

@Controller('api/district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async getDistricts(): Promise<District[]> {
    return await this.districtService.getDistricts();
  }

  @Get(':id')
  async getDistrictByID(@Param() params: { id: string }): Promise<District> {
    return (await this.districtService.getDistrictByID(params.id))[0];
  }
}
