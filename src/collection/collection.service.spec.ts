import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from '../review/entities/review.entity';
import { CollectionService } from './collection.service';
import { Collection } from './entities/collection.entity';

const reviewOne: Omit<Review, 'collection'> = {
  item: 'Pizza',
  rating: 3,
  comment: 'okay',
  reviewer: 'Niklas',
  reviewee: 'Pizza Place',
};

const reviewTwo: Omit<Review, 'collection'> = {
  item: 'Fries',
  rating: 2,
  comment: 'soggy',
  reviewer: 'Laura',
  reviewee: 'Fries Place',
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

  // functions are wrapped by same utility, meaning one call tests all of them
  describe('findReviewAttribute', () => {
    it('should return correct array', async () => {
      const resultReviewers = await service.findReviewers('fake');
      expect(resultReviewers).toEqual(['Niklas', 'Laura']);

      const resultReviewees = await service.findReviewees('fake');
      expect(resultReviewees).toEqual(['Pizza Place', 'Fries Place']);

      const resultItems = await service.findItems('fake');
      expect(resultItems).toEqual(['Pizza', 'Fries']);

      const resultComments = await service.findComments('fake');
      expect(resultComments).toEqual(['okay', 'soggy']);
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
