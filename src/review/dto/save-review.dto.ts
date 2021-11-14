export class SaveReviewDto {
  id?: string;
  reviewee: string;
  reviewer: string;
  item: string;
  rating: number;
  comment: string;
  collectionId: string;
}
