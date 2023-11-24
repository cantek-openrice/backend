import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateReviewDto } from './dto/update_review.dto';
import { CreateReviewDtoExtended } from './dto/create_review.dto';
import { ReviewService } from './review.service';
import { ReviewEntity } from './dto/entity/review.entity';

@ApiTags('review')
@Controller('api/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  @ApiQuery({ name: 'restaurantID', required: false })
  async getReviews(
    @Query('restaurantID', new DefaultValuePipe('')) restaurantID: string,
  ): Promise<ReviewEntity[]> {
    let reviewsFiltered;
    const reviews = await this.reviewService.getReviews();

    if (restaurantID) {
      reviewsFiltered = reviews.filter(
        (review) => review.restaurant_id === restaurantID,
      );

      return Promise.all(
        reviewsFiltered.map(async (review) => {
          return {
            ...review,
            username: (
              await this.reviewService.getReviewerName(review.user_id)
            )[0].username,
            restaurantName: (
              await this.reviewService.getReviewRestaurantName(
                review.restaurant_id,
              )
            )[0].name,
            photo: (
              await this.reviewService.getReviewPhoto(review.review_id)
            )[0]?.photo_url,
          };
        }),
      );
    }

    return Promise.all(
      reviews.map(async (review) => ({
        ...review,
        username: (await this.reviewService.getReviewerName(review.user_id))[0]
          .username,
        restaurantName: (
          await this.reviewService.getReviewRestaurantName(review.restaurant_id)
        )[0].name,
        photo: (await this.reviewService.getReviewPhoto(review.review_id))[0]
          ?.photo_url,
      })),
    );
  }

  @Get('id/:review_id')
  @ApiParam({ name: 'review_id', required: true, type: String })
  async getReviewByID(
    @Param() params: { review_id: string },
  ): Promise<ReviewEntity> {
    const review = (
      await this.reviewService.getReviewByID(params.review_id)
    )[0];
    return {
      ...review,
      username: (await this.reviewService.getReviewerName(review.user_id))[0]
        .username,
      restaurantName: (
        await this.reviewService.getReviewRestaurantName(review.restaurant_id)
      )[0].name,
      photo: (await this.reviewService.getReviewPhoto(params.review_id))[0]
        ?.photo_url,
    };
  }

  @Post()
  @ApiQuery({ name: 'photoCategory', required: false })
  async createReview(
    @Body()
    body: CreateReviewDtoExtended,
    @Query('photoCategory', new DefaultValuePipe('Review'))
    photoCategory: string,
  ) {
    const photoCategoryID = (
      await this.reviewService.getPhotoCategoryID(photoCategory)
    )[0]?.photo_category_id;
    return (
      await this.reviewService.createReview(
        body.createReviewDto,
        body.restaurantID,
        photoCategoryID,
        body.fileExtension,
      )
    )[0];
  }

  @Put('id/:review_id')
  @ApiParam({ name: 'review_id', required: true, type: String })
  async updateReview(
    @Param() params: { review_id: string },
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewEntity | { message: string }> {
    const reviewFound = await this.reviewService.getReviewByID(
      params.review_id,
    );
    if (reviewFound) {
      return (
        await this.reviewService.updateReview(params.review_id, updateReviewDto)
      )[0];
    } else {
      return { message: 'This review cannot be found' };
    }
  }

  @Delete('id/:review_id')
  @ApiParam({ name: 'review_id', required: true, type: String })
  async deleteReview(
    @Param() params: { review_id: string },
  ): Promise<ReviewEntity | { message: string }> {
    const reviewFound = await this.reviewService.getReviewByID(
      params.review_id,
    );
    if (reviewFound) {
      return (await this.reviewService.deleteReview(params.review_id))[0];
    } else {
      return { message: 'This review cannot be found' };
    }
  }
}
