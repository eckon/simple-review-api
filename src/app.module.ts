import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionModule } from './collection/collection.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    // TODO: this needs to handle local and production environments
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
    }),
    CollectionModule,
    ReviewModule,
  ],
})
export class AppModule {}
