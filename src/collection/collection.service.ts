import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../review/entities/review.entity';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  async findOne(id: string): Promise<Collection> {
    const result = await this.collectionRepository.findOne(id, {
      relations: ['reviews'],
    });

    if (!result) {
      throw new HttpException(
        `Collection id of "${id}" does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async save(collection: Collection): Promise<Collection> {
    return this.collectionRepository.save(collection);
  }

  async remove(id: string): Promise<Collection> {
    const toDelete = await this.findOne(id);
    await this.collectionRepository.delete(id);

    return toDelete;
  }

  async findReviewers(id: string): Promise<string[]> {
    return this.findReviewAttribute(id, 'reviewer');
  }

  async findReviewees(id: string): Promise<string[]> {
    return this.findReviewAttribute(id, 'reviewee');
  }

  async findItems(id: string): Promise<string[]> {
    return this.findReviewAttribute(id, 'item');
  }

  async findComments(id: string): Promise<string[]> {
    return this.findReviewAttribute(id, 'comment');
  }

  // TODO: would like the attribute type to be bound to Review
  async findReviewAttribute(
    id: string,
    attribute: 'reviewer' | 'reviewee' | 'item' | 'comment',
  ): Promise<string[]> {
    const result = await this.findOne(id);

    // remove duplicate values
    const reviewersSet = new Set<string>();
    result.reviews.forEach((review) => reviewersSet.add(review[attribute]));

    return [...reviewersSet];
  }
}
