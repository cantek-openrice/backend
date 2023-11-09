import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Review } from './interfaces/review.interface';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@Controller('api/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviews(): Promise<Review[]> {
    const reviews = await this.reviewService.getReviews();
    return Promise.all(
      reviews.map(async (review) => ({
        ...review,
        username: await this.reviewService.getReviewerName(review.user_id),
        restaurantName: await this.reviewService.getReviewRestaurantName(
          review.restaurant_id,
        ),
      })),
    );
  }

  @Get(':id')
  async getReviewByID(@Param() id: string): Promise<Review> {
    const review = (await this.reviewService.getReviewByID(id))[0];
    return {
      ...review,
      username: await this.reviewService.getReviewerName(review.user_id),
      restaurantName: await this.reviewService.getReviewRestaurantName(
        review.restaurant_id,
      ),
    };
  }

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return (await this.reviewService.createReview(createReviewDto))[0];
  }

  @Put(':id')
  async updateReview(
    @Param() id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const reviewFound = await this.reviewService.getReviewByID(id);
    if (reviewFound) {
      return (await this.reviewService.updateReview(id, updateReviewDto))[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This review cannot be found',
      });
    }
  }

  @Delete(':id')
  async deleteReview(@Param() id: string) {
    const reviewFound = await this.reviewService.getReviewByID(id);
    if (reviewFound) {
      return (await this.reviewService.deleteReview(id))[0];
    } else {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'This review cannot be found',
      });
    }
  }
}
