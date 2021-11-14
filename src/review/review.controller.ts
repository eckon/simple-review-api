import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollectionService } from 'src/collection/collection.service';
import { DeleteReviewParams } from './dto/delete-review-params.dto';
import { GetReviewParams } from './dto/get-review-params.dto';
import { SaveReviewDto } from './dto/save-review.dto';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@ApiTags('review')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly collectionService: CollectionService,
  ) {}

  @Get(':id')
  async get(@Param() params: GetReviewParams): Promise<Review> {
    return await this.reviewService.findOne(params.id);
  }

  /**
   * Create (no given id) or update (with given id) a review
   */
  @Post()
  async save(@Body() body: SaveReviewDto): Promise<Review> {
    const collection = await this.collectionService.findOne(body.collectionId);

    // in case an id was set, check if this review really exists
    // we do not want to allow the user to set their own uuid
    if (body.id) {
      await this.reviewService.findOne(body.id);
    }

    const result = await this.reviewService.save({ collection, ...body });
    return await this.reviewService.findOne(result.id);
  }

  @Delete(':id')
  async delete(@Param() params: DeleteReviewParams): Promise<Review> {
    return await this.reviewService.remove(params.id);
  }
}
