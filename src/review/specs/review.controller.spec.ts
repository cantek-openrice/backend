import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from '../review.controller';
import { ReviewService } from '../review.service';
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
      .mockResolvedValue([{ username: 'Timothy' }]);
    jest
      .spyOn(reviewService, 'getReviewRestaurantName')
      .mockResolvedValue([{ name: 'restaurant' }]);
  });

  describe('getReviews', () => {
    it('should return reviews', async () => {
      const result = await reviewController.getReviews();
      expect(result).toEqual(expectedReviews);
    });
  });

  describe('getReviewByID', () => {
    it('should return review of that review id', async () => {
      const result = await reviewController.getReviewByID({
        review_id: '123',
      });
      expect(result).toEqual(expectedReviews[0]);
    });
  });

  describe('createReview', () => {
    it('should return that review after creating a review', async () => {
      const result = await reviewController.createReview({
        user_id: '123',
        restaurant_id: '123',
        title: 'title',
        content: 'content',
        rating: 1,
        spending: 10,
        visited_date: new Date('2023-11-17'),
      });

      expect(result).toEqual(expectedReviews[0]);
    });
  });

  describe('updateReview', () => {
    it('should return that review after updating a review', async () => {
      const result = await reviewController.updateReview(
        { review_id: '123' },
        {
          user_id: '123',
          restaurant_id: '123',
          title: 'title',
          content: 'content',
          rating: 1,
          spending: 10,
          visited_date: new Date('2023-11-17'),
          active: false,
        },
      );

      expect(result).toEqual(expectedReviews[0]);
    });
  });

  describe('deleteReview', () => {
    it('should return that review after changing the active state of a review', async () => {
      const result = await reviewController.deleteReview({
        review_id: '123',
      });
      expect(result).toEqual(expectedReviews[0]);
    });
  });
});
