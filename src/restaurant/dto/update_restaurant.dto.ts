export class UpdateRestaurantDto {
  name?: string;
  address?: string;
  district_id?: string;
  latitude?: number;
  longitude?: number;
  postal_code?: string;
  phone?: string;
  intro?: string;
  opening_hours?: string;
  cover_image_url?: string;
  active?: boolean;
}
