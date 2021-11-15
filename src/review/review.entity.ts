import { ApiHideProperty } from '@nestjs/swagger';
import { Collection } from 'src/collection/collection.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  /**
    * @example "Pizza Place"
  */
  @Column()
  reviewee: string;

  /**
    * @example "Niklas Meyer"
  */
  @Column()
  reviewer: string;

  /**
    * @example "Pizza Salami"
  */
  @Column()
  item: string;

  /**
    * @example 5
  */
  @Column()
  rating: number;

  /**
    * @example "okay but soggy"
  */
  @Column()
  comment: string;

  @ApiHideProperty()
  @ManyToOne(() => Collection, (collection: Collection) => collection.reviews, {
    onDelete: 'CASCADE',
  })
  collection: Collection;
}
