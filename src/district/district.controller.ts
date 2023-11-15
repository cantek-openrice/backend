import { Controller, Get, Param } from '@nestjs/common';
import { DistrictService } from './district.service';
import { District } from './interfaces/district.interface';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('District')
@Controller('api/district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Get()
  async getDistricts(): Promise<District[]> {
    return await this.districtService.getDistricts();
  }

  @Get(':district_id')
  @ApiParam({ name: 'district_id', required: true, type: String })
  async getDistrictByID(
    @Param() params: { district_id: string },
  ): Promise<District> {
    return (await this.districtService.getDistrictByID(params.district_id))[0];
  }
}
