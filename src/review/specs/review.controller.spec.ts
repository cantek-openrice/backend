import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from '../review.controller';
import { ReviewService } from '../review.service';
import { expectedReviewPhotos } from '../../photo/specs/expectedReviewPhotos';
import { expectedPhotoCategories } from '../../photoCategory/specs/expectedPhotoCategories';
import { expectedRestaurants } from '../../restaurant/specs/expectedRestaurants';
import { expectedUsers } from '../../userRelated/user/specs/expectedUsers';
import { expectedReviews } from './expectedReviews';

jest.mock('../review.service');

describe('ReviewController', () => {
  let review: TestingModule;
  let reviewController: ReviewController;
  let reviewService: ReviewService;

  beforeAll(async () => {
    review = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService],
    }).compile();

    reviewController = review.get<ReviewController>(ReviewController);
    reviewService = review.get<ReviewService>(ReviewService);
  });

  beforeEach(() => {
    jest.spyOn(reviewService, 'getReviews').mockResolvedValue(expectedReviews);
    jest
      .spyOn(reviewService, 'getReviewByID')
      .mockResolvedValue(expectedReviews);
    jest
      .spyOn(reviewService, 'createReview')
      .mockResolvedValue(expectedReviews);
    jest
      .spyOn(reviewService, 'updateReview')
      .mockResolvedValue(expectedReviews);
    jest
      .spyOn(reviewService, 'deleteReview')
      .mockResolvedValue(expectedReviews);
    jest
      .spyOn(reviewService, 'getReviewerName')
      .mockResolvedValue([{ username: expectedUsers[0].username }]);
    jest
      .spyOn(reviewService, 'getReviewRestaurantName')
      .mockResolvedValue([{ name: expectedRestaurants[0].name }]);
    jest
      .spyOn(reviewService, 'getReviewPhoto')
      .mockResolvedValue([{ photo_url: expectedReviewPhotos[0].photo_url }]);
    jest
      .spyOn(reviewService, 'getPhotoCategoryID')
      .mockResolvedValue([
        { photo_category_id: expectedReviewPhotos[0].photo_category_id },
      ]);
  });

  describe('getReviews', () => {
    it('should return reviews with restaurant id starts with 123', async () => {
      const result = await reviewController.getReviews(
        expectedReviews[0].restaurant_id,
      );
      expect(result).toEqual([
        {
          ...expectedReviews[0],
          username: expectedUsers[0].username,
          restaurantName: expectedRestaurants[0].name,
          photo: expectedReviewPhotos[0].photo_url,
        },
      ]);
    });

    it('should return reviews', async () => {
      const result = await reviewController.getReviews('');
      expect(result).toEqual([
        {
          ...expectedReviews[0],
          username: expectedUsers[0].username,
          restaurantName: expectedRestaurants[0].name,
          photo: expectedReviewPhotos[0].photo_url,
        },
      ]);
    });
  });

  describe('getReviewByID', () => {
    it('should return review of that review id', async () => {
      const result = await reviewController.getReviewByID({
        review_id: expectedReviews[0].review_id,
      });
      expect(result).toEqual({
        ...expectedReviews[0],
        username: expectedUsers[0].username,
        restaurantName: expectedRestaurants[0].name,
        photo: expectedReviewPhotos[0].photo_url,
      });
    });
  });

  describe('createReview', () => {
    it('should return that review after creating a review', async () => {
      const result = await reviewController.createReview(
        {
          createReviewDto: {
            user_id: expectedReviews[0].review_id,
            restaurant_id: expectedReviews[0].restaurant_id,
            title: expectedReviews[0].title,
            content: expectedReviews[0].content,
            rating: expectedReviews[0].rating,
            spending: expectedReviews[0].spending,
            visited_date: expectedReviews[0].visited_date,
          },
          restaurantID: expectedRestaurants[0].restaurant_id,
        },
        expectedPhotoCategories[0].name,
      );

      expect(result).toEqual(expectedReviews[0]);
    });
  });

  describe('updateReview', () => {
    it('should return that review after updating a review', async () => {
      const result = await reviewController.updateReview(
        { review_id: expectedReviews[0].review_id },
        {
          user_id: expectedReviews[0].user_id,
          restaurant_id: expectedReviews[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating,
          spending: expectedReviews[0].spending,
          visited_date: expectedReviews[0].visited_date,
          active: false,
        },
      );

      expect(result).toEqual(expectedReviews[0]);
    });

    it('should return review cannot be found message if the review cannot be found', async () => {
      jest.spyOn(reviewService, 'getReviewByID').mockResolvedValue(null);
      const result = await reviewController.updateReview(
        { review_id: expectedReviews[0].review_id },
        {
          user_id: expectedReviews[0].user_id,
          restaurant_id: expectedReviews[0].restaurant_id,
          title: expectedReviews[0].title,
          content: expectedReviews[0].content,
          rating: expectedReviews[0].rating,
          spending: expectedReviews[0].spending,
          visited_date: expectedReviews[0].visited_date,
          active: false,
        },
      );
      expect(result).toEqual({ message: 'This review cannot be found' });
    });
  });

  describe('deleteReview', () => {
    it('should return that review after changing the active state of a review', async () => {
      const result = await reviewController.deleteReview({
        review_id: expectedReviews[0].review_id,
      });
      expect(result).toEqual(expectedReviews[0]);
    });

    it('should return review cannot be found message if the review cannot be found', async () => {
      jest.spyOn(reviewService, 'getReviewByID').mockResolvedValue(null);
      const result = await reviewController.deleteReview({
        review_id: expectedReviews[0].review_id,
      });
      expect(result).toEqual({ message: 'This review cannot be found' });
    });
  });
});
