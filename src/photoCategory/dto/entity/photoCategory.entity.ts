import { PhotoCategory } from '../../interfaces/photoCategory.interface';

export class PhotoCategoryEntity implements PhotoCategory {
  photo_category_id: string;
  name: string;
  active: boolean;
  created_at: Date;
}
