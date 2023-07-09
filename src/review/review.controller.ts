import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from '../app-types/dtos/review/review-dto';
import { ApiKeyAuthGuard } from '../auth/guard/apikey-auth.guard';
import { RplyDto } from 'src/app-types/dtos/review/rply-dto';

@Controller('accounts/:accountId/locations/:locationId/reviews')
@UseGuards(ApiKeyAuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getAllReviews(
    @Param('accountId') accountId: string,
    @Param('locationId') locationId: string,
  ): ReviewDto[] {
    return this.reviewService.getAllReviews(accountId, locationId);
  }

  @Post()
  addNewReview(
    @Param('accountId') accountId: string,
    @Param('locationId') locationId: string,
    @Body() review: ReviewDto,
  ): Promise<ReviewDto> {
    review.accountId = accountId;
    review.locationId = locationId;
    return this.reviewService.addReview(review);
  }

  @Get(':reviewId')
  getReview(
    @Param('accountId') accountId: string,
    @Param('locationId') locationId: string,
    @Param('reviewId') reviewId: string,
  ): ReviewDto {
    return this.reviewService.getReview(accountId, locationId, reviewId);
  }

  @Post(':reviewId/reply')
  replyToReview(
    @Param('accountId') accountId: string,
    @Param('locationId') locationId: string,
    @Param('reviewId') reviewId: string,
    @Body() reply: RplyDto,
  ): void {
    this.reviewService.replyToReview(accountId, locationId, reviewId, reply);
  }

  @Delete(':reviewId')
  deleteRply(
    @Param('accountId') accountId: string,
    @Param('locationId') locationId: string,
    @Param('reviewId') reviewId: string,
  ): void {
    return this.reviewService.deleteReply(accountId, locationId, reviewId);
  }
}
