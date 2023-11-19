import { Test, TestingModule } from '@nestjs/testing';
import { DistrictController } from '../district.controller';
import { DistrictService } from '../district.service';
import { expectedDistricts } from './expectedDistricts';

jest.mock('../district.service');

describe('districtController', () => {
  let district: TestingModule;
  let districtController: DistrictController;
  let districtService: DistrictService;

  beforeAll(async () => {
    district = await Test.createTestingModule({
      controllers: [DistrictController],
      providers: [DistrictService],
    }).compile();

    districtController = district.get<DistrictController>(DistrictController);
    districtService = district.get<DistrictService>(DistrictService);
  });

  beforeEach(() => {
    jest
      .spyOn(districtService, 'getDistricts')
      .mockResolvedValue(expectedDistricts);
    jest
      .spyOn(districtService, 'getDistrictByID')
      .mockResolvedValue(expectedDistricts);
  });

  describe('getDistricts', () => {
    it('should return districts', async () => {
      const result = await districtController.getDistricts();
      expect(result).toEqual(expectedDistricts);
    });
  });

  describe('getDistrictByID', () => {
    it('should return district of that district id', async () => {
      const result = await districtController.getDistrictByID({
        district_id: '123',
      });
      expect(result).toEqual(expectedDistricts[0]);
    });
  });
});
