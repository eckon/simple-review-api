import { Review } from 'src/review/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Collection {
  // this will also be used as the access token
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Review, (review) => review.collection, {
    onDelete: 'CASCADE',
  })
  reviews?: Review[];
}
