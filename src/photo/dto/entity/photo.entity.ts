import { Photo } from '../../interfaces/photo.interface';

export class PhotoEntity implements Photo {
  photo_id: string;
  review_id: string;
  photo_category_id: string;
  photo_url: string;
  active: boolean;
  created_at: Date;
}
