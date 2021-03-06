import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Collection } from '../../collection/entities/collection.entity';

@Entity()
export class Review {
  /**
   * uuid
   * @example "d3b71a51-dabd-4f3b-93b7-a9ccb1047dd8"
   */
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

  @ManyToOne(() => Collection, (collection: Collection) => collection.reviews, {
    onDelete: 'CASCADE',
  })
  collection: Collection;
}
