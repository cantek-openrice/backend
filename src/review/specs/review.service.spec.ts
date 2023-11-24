import Knex from 'knex';
import knexConfigs from '../../../knexfile';
import { ReviewService } from '../review.service';
import { expectedUsers } from '../../userRelated/user/specs/expectedUsers';
import { expectedRestaurants } from '../../restaurant/specs/expectedRestaurants';
import { expectedDistricts } from '../../district/specs/expectedDistricts';
import { expectedPhotoCategories } from '../../photoCategory/specs/expectedPhotoCategories';
import { expectedReviewPhotos } from '../../photo/specs/expectedReviewPhotos';
import { expectedReviews } from './expectedReviews';

const configMode = process.env.TESTING_NODE_ENV || 'testing';
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

describe('ReviewService', () => {
  let reviewService: ReviewService;
  let reviewIDs: { review_id: string }[];
  let userIDs: { user_id: string }[];
  let districtIDs: { district_id: string }[];
  let restaurantIDs: { restaurant_id: string }[];
  let photoCategoryIDs: { photo_category_id: string }[];
  let reviewPhotoIDs: { review_photo_id: string }[];

  beforeAll(async () => {
    reviewService = new ReviewService(knex);
  });

  beforeEach(async () => {
    districtIDs = await knex
      .insert({
        name: expectedDistricts[0].name,
      })
      .into('district')
      .returning('district_id');

    userIDs = await knex
      .insert({
        username: expectedUsers[0].username,
        email: expectedUsers[0].email,
        password: expectedUsers[0].password,
        role: expectedUsers[0].role,
      })
      .into('user')
      .returning('user_id');

    restaurantIDs = await knex
      .insert({
        name: expectedRestaurants[0].name,
        address: expectedRestaurants[0].address,
        district_id: districtIDs[0].district_id,
        latitude: expectedRestaurants[0].latitude,
        longitude: expectedRestaurants[0].longitude,
        postal_code: expectedRestaurants[0].postal_code,
        phone: expectedRestaurants[0].phone,
        intro: expectedRestaurants[0].intro,
        opening_hours: expectedRestaurants[0].opening_hours,
      })
      .into('restaurant')
      .returning('restaurant_id');

    reviewIDs = await knex
      .insert({
        user_id: userIDs[0].user_id,
        restaurant_id: restaurantIDs[0].restaurant_id,
        title: expectedReviews[0].title,
        content: expectedReviews[0].content,
        rating: expectedReviews[0].rating,
        spending: expectedReviews[0].spending,
        visited_date: expectedReviews[0].visited_date,
      })
      .into('review')
      .returning('review_id');
  });

  describe('getReviews', () => {
    it('should return reviews', async () => {
      const result = await reviewService.getReviews();
      const reviewFiltered = result.filter(
        (review) => review.review_id === reviewIDs[0].review_id,
      );
      expect(reviewFiltered).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating.toString(),
          spending: expectedReviews[0].spending.toString(),
          visited_date: expectedReviews[0].visited_date,
        },
      ]);
    });
  });

  describe('getReviewByID', () => {
    it('should return review of that review id', async () => {
      const result = await reviewService.getReviewByID(reviewIDs[0].review_id);
      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating.toString(),
          spending: expectedReviews[0].spending.toString(),
          visited_date: expectedReviews[0].visited_date,
        },
      ]);
    });
  });

  describe('createReview', () => {
    it('should return that review after creating a review', async () => {
      photoCategoryIDs = await knex
        .insert({ name: 'Review' })
        .into('photo_category')
        .returning('photo_category_id');

      const result = await reviewService.createReview(
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating,
          spending: expectedReviews[0].spending,
          visited_date: expectedReviews[0].visited_date,
        },
        restaurantIDs[0].restaurant_id,
        photoCategoryIDs[0].photo_category_id,
        'png',
      );

      reviewIDs.push({ review_id: result[0].review_id });

      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating.toString(),
          spending: expectedReviews[0].spending.toString(),
          visited_date: expectedReviews[0].visited_date,
        },
      ]);
    });
  });

  describe('updateReview', () => {
    it('should return that review after changing a review', async () => {
      const result = await reviewService.updateReview(reviewIDs[0].review_id, {
        title: expectedReviews[0].title,
        content: expectedReviews[0].content,
        rating: expectedReviews[0].rating,
        spending: expectedReviews[0].spending,
        visited_date: expectedReviews[0].visited_date,
        active: false,
      });

      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating.toString(),
          spending: expectedReviews[0].spending.toString(),
          visited_date: expectedReviews[0].visited_date,
        },
      ]);
    });
  });

  describe('deleteReview', () => {
    it('should return that review after changing the active state of a review', async () => {
      const result = await reviewService.deleteReview(reviewIDs[0].review_id);
      expect(result).toMatchObject([
        {
          user_id: userIDs[0].user_id,
          restaurant_id: restaurantIDs[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating.toString(),
          spending: expectedReviews[0].spending.toString(),
          visited_date: expectedReviews[0].visited_date,
        },
      ]);
    });
  });

  describe('getReviewerName', () => {
    it('should get the username of a specific user id', async () => {
      const result = await reviewService.getReviewerName(userIDs[0].user_id);
      expect(result).toEqual([
        {
          username: expectedUsers[0].username,
        },
      ]);
    });
  });

  describe('getReviewRestaurantName', () => {
    it('should get the name of a specific restaurant id', async () => {
      const result = await reviewService.getReviewRestaurantName(
        restaurantIDs[0].restaurant_id,
      );
      expect(result).toEqual([
        {
          name: expectedRestaurants[0].name,
        },
      ]);
    });
  });

  describe('getReviewPhoto', () => {
    it('should get the photo of a specific review id', async () => {
      photoCategoryIDs = await knex
        .insert({
          name: expectedPhotoCategories[0].name,
        })
        .into('photo_category')
        .returning('photo_category_id');

      reviewPhotoIDs = await knex
        .insert({
          photo_category_id: photoCategoryIDs[0].photo_category_id,
          review_id: reviewIDs[0].review_id,
          photo_url: expectedReviewPhotos[0].photo_url,
        })
        .into('review_photo')
        .returning('review_photo_id');

      const result = await reviewService.getReviewPhoto(reviewIDs[0].review_id);
      expect(result).toEqual([
        {
          photo_url: expectedReviewPhotos[0].photo_url,
        },
      ]);
    });
  });

  describe('getPhotoCategoryID', () => {
    it('should get the photo category id of a specific photo category name', async () => {
      photoCategoryIDs = await knex
        .insert({ name: 'Review' })
        .into('photo_category')
        .returning('photo_category_id');

      const result = await reviewService.getPhotoCategoryID('Review');
      const photoCategoryIDFiltered = result.filter(
        (photoCategoryID) =>
          photoCategoryID.photo_category_id ===
          photoCategoryIDs[0].photo_category_id,
      );
      expect(photoCategoryIDFiltered).toMatchObject([
        {
          photo_category_id: photoCategoryIDs[0].photo_category_id,
        },
      ]);
    });
  });

  afterEach(async () => {
    let reviewPhotos;
    if (reviewPhotoIDs && reviewPhotoIDs.length > 0) {
      await knex('review_photo')
        .whereIn(
          'review_photo_id',
          reviewPhotoIDs.map((reviewPhotoID) => reviewPhotoID.review_photo_id),
        )
        .del();
    }

    if (photoCategoryIDs && photoCategoryIDs.length > 0) {
      reviewPhotos = await knex
        .select('*')
        .from('review_photo')
        .whereIn(
          'photo_category_id',
          photoCategoryIDs.map(
            (photoCategoryID) => photoCategoryID.photo_category_id,
          ),
        );
    }

    if (
      reviewPhotos &&
      reviewPhotos.length === 0 &&
      photoCategoryIDs &&
      photoCategoryIDs.length > 0
    ) {
      await knex('photo_category')
        .whereIn(
          'photo_category_id',
          photoCategoryIDs.map(
            (photoCategoryID) => photoCategoryID.photo_category_id,
          ),
        )
        .del();
    }

    reviewPhotos = await knex
      .select('*')
      .from('review_photo')
      .whereIn(
        'review_id',
        reviewIDs.map((reviewID) => reviewID.review_id),
      );

    if (reviewPhotos && reviewPhotos.length === 0) {
      await knex('review')
        .whereIn(
          'review_id',
          reviewIDs.map((reviewID) => reviewID.review_id),
        )
        .del();
    }

    const reviews = await knex
      .select('*')
      .from('review')
      .whereIn(
        'restaurant_id',
        restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
      );

    reviews.concat(
      await knex
        .select('*')
        .from('review')
        .whereIn(
          'user_id',
          userIDs.map((userID) => userID.user_id),
        ),
    );

    if (reviews.length === 0) {
      await knex('restaurant')
        .whereIn(
          'restaurant_id',
          restaurantIDs.map((restaurantID) => restaurantID.restaurant_id),
        )
        .del();

      await knex('user')
        .whereIn(
          'user_id',
          userIDs.map((userID) => userID.user_id),
        )
        .del();

      await knex('district')
        .whereIn(
          'district_id',
          districtIDs.map((districtID) => districtID.district_id),
        )
        .del();
    }
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
