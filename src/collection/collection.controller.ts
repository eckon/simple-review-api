import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Collection } from './collection.entity';
import { CollectionService } from './collection.service';
import { DeleteCollectionParams } from './dto/delete-collection-params.dto';
import { GetCollectionParams } from './dto/get-collection-params.dto';
import { SaveCollectionDto } from './dto/save-collection.dto';

@ApiTags('collection')
@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get(':id')
  async get(@Param() params: GetCollectionParams): Promise<Collection> {
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
      const result = await this.collectionService.findOne(body.id);
    }

    return await this.collectionService.save(body);
  }

  @Delete(':id')
  async delete(@Param() params: DeleteCollectionParams): Promise<Collection> {
    return await this.collectionService.remove(params.id);
  }
}
