import { Subscribe } from '../../interfaces/subscribe.interface';

export class SubscribeEntity implements Subscribe {
  subscribe_id: string;
  user_id: string;
  restaurant_id: string;
  active: boolean;
  created_at: Date;
}
