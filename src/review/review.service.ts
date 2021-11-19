import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findOne(id: string): Promise<Review> {
    const result = await this.reviewRepository.findOne(id);

    if (!result) {
      throw new HttpException(
        `Review id of "${id}" does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async save(review: Review): Promise<Review> {
    return await this.reviewRepository.save(review);
  }

  async remove(id: string): Promise<Review> {
    const toDelete = await this.findOne(id);
    await this.reviewRepository.delete(id);

    return toDelete;
  }
}
