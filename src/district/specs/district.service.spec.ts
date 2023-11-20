import * as dotenv from 'dotenv';
import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { DistrictService } from '../district.service';
import { expectedDistricts } from './expectedDistricts';

dotenv.config();

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('DistrictService', () => {
  let districtService: DistrictService;
  let districtIDs: { district_id: string }[];

  beforeAll(async () => {
    districtService = new DistrictService(knex);
  });

  beforeEach(async () => {
    districtIDs = await knex
      .insert({
        name: expectedDistricts[0].name,
      })
      .into('district')
      .returning('district_id');
  });

  describe('getDistricts', () => {
    it('should return districts', async () => {
      const result = await districtService.getDistricts();
      const districtFiltered = result.filter(
        (district) => district.district_id === districtIDs[0].district_id,
      );
      expect(districtFiltered).toMatchObject([
        {
          name: expectedDistricts[0].name,
        },
      ]);
    });
  });

  describe('getDistrictByID', () => {
    it('should return district of that district id', async () => {
      const result = await districtService.getDistrictByID(
        districtIDs[0].district_id,
      );
      expect(result).toMatchObject([
        {
          name: expectedDistricts[0].name,
        },
      ]);
    });
  });

  afterEach(async () => {
    await knex('district')
      .whereIn(
        'district_id',
        districtIDs.map((districtID) => districtID.district_id),
      )
      .del();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
