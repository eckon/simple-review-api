import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { SaveCollectionDto } from './dto/save-collection.dto';
import { UUIDParam } from './dto/uuid-param-collection.dto';
import { Collection } from './entities/collection.entity';
import { CollectionCompletions } from './interfaces/completions.interface';

@ApiTags('collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get(':id')
  async get(@Param() params: UUIDParam): Promise<Collection> {
    return await this.collectionService.findOne(params.id);
  }

  /**
   * Create (no given id) or update (with given id) a collection
   */
  @Post()
  async save(@Body() body: SaveCollectionDto): Promise<Collection> {
    // in case an id was set, check if this collection really exists
    // we do not want to allow the user to set their own uuid
    if (body.id) {
      await this.collectionService.findOne(body.id);
    }

    return await this.collectionService.save(body);
  }

  @Delete(':id')
  async delete(@Param() params: UUIDParam): Promise<Collection> {
    return await this.collectionService.remove(params.id);
  }

  @Get(':id/completions')
  async completions(
    @Param() params: UUIDParam,
  ): Promise<CollectionCompletions> {
    const reviewers = await this.collectionService.findReviewers(params.id);

    return { reviewers };
  }
}
