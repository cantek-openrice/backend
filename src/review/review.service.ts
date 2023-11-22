import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { UpdateReviewDto } from './dto/update_review.dto';
import { CreateReviewDto } from './dto/create_review.dto';

@Injectable()
export class ReviewService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async getReviews() {
    return await this.knex.select('*').from('review');
  }

  async getReviewByID(id: string) {
    return await this.knex.select('*').from('review').where('review_id', id);
  }

  async createReview(
    review: CreateReviewDto,
    imagePrefix: string,
    restaurantID: string,
    photo_category_id: string,
  ) {
    const reviewDetail = await this.knex
      .insert({
        ...review,
        created_at: new Date(),
        modified_at: new Date(),
        active: true,
      })
      .into('review')
      .returning('*');

    await this.knex
      .insert({
        photo_category_id,
        review_id: reviewDetail[0].review_id,
        photo_url: `${imagePrefix}/${restaurantID}/photos/${reviewDetail[0].review_id}.jpg`,
      })
      .into('photo');

    return reviewDetail;
  }

  async updateReview(id: string, review: UpdateReviewDto) {
    return await this.knex('review')
      .update({ ...review, modified_at: new Date() })
      .where('review_id', id)
      .returning('*');
  }

  async deleteReview(id: string) {
    return await this.knex('review')
      .update({ active: false, modified_at: new Date() })
      .where('review_id', id)
      .returning('*');
  }

  async getReviewerName(userID: string) {
    return await this.knex
      .select('username')
      .from('user')
      .where('user_id', userID);
  }

  async getReviewRestaurantName(restaurantID: string) {
    return await this.knex
      .select('name')
      .from('restaurant')
      .where('restaurant_id', restaurantID);
  }

  async getReviewPhoto(reviewID: string) {
    return await this.knex
      .select('photo_url')
      .from('photo')
      .where('review_id', reviewID);
  }

  async getPhotoCategoryID(photoCategoryName: string) {
    return await this.knex
      .select('photo_category_id')
      .from('photo_category')
      .where('name', photoCategoryName);
  }
}
