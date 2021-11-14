import { ApiHideProperty } from '@nestjs/swagger';
import { Collection } from 'src/collection/collection.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  reviewee: string;

  @Column()
  reviewer: string;

  @Column()
  item: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ApiHideProperty()
  @ManyToOne(() => Collection, (collection: Collection) => collection.reviews, {
    onDelete: 'CASCADE',
  })
  collection: Collection;
}
