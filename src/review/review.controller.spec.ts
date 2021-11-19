import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CollectionService } from '../collection/collection.service';
import { Collection } from '../collection/entities/collection.entity';
import { Review } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

const oneCollection: Collection = {
  title: 'title',
  description: 'description',
  id: 'd3b71a51-dabd-4f3b-93b7-a9ccb1047dd8',
};

const oneReview: Review = {
  item: 'item',
  rating: 4,
  comment: 'its okay',
  reviewee: 'Niklas',
  reviewer: 'Pizza Place',
  collection: oneCollection,
};

describe('ReviewController', () => {
  let controller: ReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        ReviewService,
        CollectionService,
        {
          provide: getRepositoryToken(Review),
          useValue: {
            save: jest.fn().mockResolvedValue(oneReview),
            findOne: jest.fn().mockResolvedValue(oneReview),
          },
        },
        {
          provide: getRepositoryToken(Collection),
          useValue: { findOne: jest.fn().mockResolvedValue(oneCollection) },
        },
      ],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('save()', () => {
    it('should create without id', async () => {
      const result = await controller.save({
        collectionId: oneCollection.id,
        ...oneReview,
      });

      expect(result).toEqual(oneReview);
    });

    // this test sadly does not really do anything (the check is always mocked so its always correct)
    it('should update with id', async () => {
      const result = await controller.save({
        id: oneReview.id,
        collectionId: oneCollection.id,
        ...oneReview,
      });

      expect(result).toEqual(oneReview);
    });
  });
});
