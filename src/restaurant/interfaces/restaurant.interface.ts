export interface Restaurant {
  restaurant_id: string;
  name: string;
  address: string;
  district_id: string;
  latitude: number;
  longitude: number;
  postal_code: string;
  phone: string;
  intro: string;
  opening_hours: string;
  cover_image_url?: string;
  averageRating: number;
  reviewCount: number;
  active: boolean;
  created_at: Date;
  modified_at: Date;
}
