import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ReviewDto } from '../app-types/dtos/review/review-dto';
import { RplyDto } from 'src/app-types/dtos/review/rply-dto';

@Injectable()
export class ReviewService {
  private readonly reviews: ReviewDto[] = [];

  getAllReviews(accountId: string, locationId: string): ReviewDto[] {
    try {
      const filteredReviews = this.reviews.filter(
        (review) =>
          review.accountId === accountId && review.locationId === locationId,
      );

      if (filteredReviews.length === 0) {
        throw new NotFoundException('No reviews found.');
      }

      return filteredReviews;
    } catch (error) {
      throw error;
    }
  }

  getReview(
    accountId: string,
    locationId: string,
    reviewId: string,
  ): ReviewDto {
    try {
      const review = this.reviews.find(
        (review) =>
          review.accountId === accountId &&
          review.locationId === locationId &&
          review.id === reviewId,
      );

      if (!review) {
        throw new NotFoundException('Review not found.');
      }

      return review;
    } catch (error) {
      throw error;
    }
  }

  async addReview(review: ReviewDto): Promise<ReviewDto> {
    try {
      const newReview = { ...review, id: uuidv4(), replies: [] };
      this.reviews.push(newReview);
      return newReview;
    } catch (error) {
      throw error;
    }
  }

  replyToReview(
    accountId: string,
    locationId: string,
    reviewId: string,
    reply: RplyDto,
  ): void {
    try {
      const review = this.reviews.find(
        (review) =>
          review.accountId === accountId &&
          review.locationId === locationId &&
          review.id === reviewId,
      );

      if (!review) {
        throw new NotFoundException('Review not found.');
      }

      review.replies.push(reply);
    } catch (error) {
      throw error;
    }
  }

  deleteReply(accountId: string, locationId: string, reviewId: string): void {
    try {
      const review = this.reviews.find(
        (review) =>
          review.accountId === accountId &&
          review.locationId === locationId &&
          review.id === reviewId,
      );

      if (!review) {
        throw new NotFoundException('Review not found.');
      }

      review.replies = [];
    } catch (error) {
      throw error;
    }
  }
}
