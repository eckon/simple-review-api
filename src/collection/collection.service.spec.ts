import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { CollectionService } from './collection.service';

describe('CollectionService', () => {
  let service: CollectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionService,
        { provide: getRepositoryToken(Collection), useValue: {} },
      ],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
