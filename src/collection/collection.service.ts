import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';

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
    const result = await this.findOne(id);

    // remove duplicate values
    const reviewersSet = new Set<string>();
    result.reviews.forEach((review) => reviewersSet.add(review.reviewee));

    return [...reviewersSet];
  }
}
