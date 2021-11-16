import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from '../review/review.entity';
import { Collection } from './collection.entity';
import { CollectionService } from './collection.service';

const reviewOne: Omit<Review, 'collection'> = {
  item: 'Pizza',
  rating: 3,
  comment: 'its okay',
  reviewee: 'Niklas',
  reviewer: 'Pizza Place',
};

const reviewTwo: Omit<Review, 'collection'> = {
  item: 'Fries',
  rating: 2,
  comment: 'soggy',
  reviewee: 'Laura',
  reviewer: 'Pizza Place',
};

const oneCollection: Collection = {
  title: 'title',
  description: 'description',
  id: 'd3b71a51-dabd-4f3b-93b7-a9ccb1047dd8',
  reviews: [reviewOne, reviewTwo] as Review[],
};

const mockCollectionFunction = (version: string) => {
  if (version == 'fake') {
    return oneCollection;
  } else if (version == 'multiple') {
    const multipleReviews = oneCollection;
    multipleReviews.reviews = [
      reviewOne,
      reviewTwo,
      reviewOne,
      reviewOne,
      reviewTwo,
    ] as Review[];

    return oneCollection;
  } else {
    const emptyCollection = oneCollection;
    emptyCollection.reviews = [];

    return emptyCollection;
  }
};

describe('CollectionService', () => {
  let service: CollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionService,
        {
          provide: getRepositoryToken(Collection),
          useValue: {
            findOne: jest.fn(mockCollectionFunction),
          },
        },
      ],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findReviewers', () => {
    it('should return correct array', async () => {
      const result = await service.findReviewers('fake');

      expect(result).toEqual(['Niklas', 'Laura']);
    });

    it('should return correct array even with duplicates', async () => {
      const result = await service.findReviewers('multiple');

      expect(result).toEqual(['Niklas', 'Laura']);
    });

    it('should return empty array when no data', async () => {
      const result = await service.findReviewers('no data');

      expect(result).toEqual([]);
    });
  });
});
