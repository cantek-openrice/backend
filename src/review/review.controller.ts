import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateReviewDto } from './dto/update_review.dto';
import { CreateReviewDto } from './dto/create_review.dto';
import { ReviewService } from './review.service';
import { ReviewEntity } from './dto/entity/review.entity';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('review')
@Controller('api/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviews(): Promise<ReviewEntity[]> {
    const reviews = await this.reviewService.getReviews();
    return Promise.all(
      reviews.map(async (review) => ({
        ...review,
        username: (await this.reviewService.getReviewerName(review.user_id))[0]
          .username,
        restaurantName: (
          await this.reviewService.getReviewRestaurantName(review.restaurant_id)
        )[0].name,
      })),
    );
  }

  @Get(':review_id')
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
    };
  }

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return (await this.reviewService.createReview(createReviewDto))[0];
  }

  @Put(':review_id')
  @ApiParam({ name: 'review_id', required: true, type: String })
  async updateReview(
    @Param() params: { review_id: string },
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewEntity> {
    const reviewFound = await this.reviewService.getReviewByID(
      params.review_id,
    );
    if (reviewFound) {
      return (
        await this.reviewService.updateReview(params.review_id, updateReviewDto)
      )[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This review cannot be found',
      });
    }
  }

  @Delete(':review_id')
  @ApiParam({ name: 'review_id', required: true, type: String })
  async deleteReview(
    @Param() params: { review_id: string },
  ): Promise<ReviewEntity> {
    const reviewFound = await this.reviewService.getReviewByID(
      params.review_id,
    );
    if (reviewFound) {
      return (await this.reviewService.deleteReview(params.review_id))[0];
    } else {
      throw new NotFoundException('Bad request', {
        cause: new Error(),
        description: 'This review cannot be found',
      });
    }
  }
}
