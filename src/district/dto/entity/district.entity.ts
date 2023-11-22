import { District } from '../../interfaces/district.interface';

export class DistrictEntity implements District {
  district_id: string;
  name: string;
  active: boolean;
  created_at: Date;
}
