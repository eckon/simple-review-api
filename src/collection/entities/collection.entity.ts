import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from '../../review/entities/review.entity';

@Entity()
export class Collection {
  /**
   * uuid
   * @example "d3b71a51-dabd-4f3b-93b7-a9ccb1047dd8"
   */
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  /**
   * @example "Food Reviews"
   */
  @Column()
  title: string;

  /**
   * @example "this includes all food reviews from Niklas"
   */
  @Column()
  description: string;

  @OneToMany(() => Review, (review) => review.collection, {
    onDelete: 'CASCADE',
  })
  reviews?: Review[];
}
