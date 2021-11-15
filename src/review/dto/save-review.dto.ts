import { Max, Min, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class SaveReviewDto {
  /**
   * uuid
   * @example "d3b71a51-dabd-4f3b-93b7-a9ccb1047dd8"
   */
  @IsUUID()
  @IsOptional()
  id?: string;

  /**
   * @example "Pizza Place"
   */
  @IsString()
  reviewee: string;

  /**
   * @example "Niklas Meyer"
   */
  @IsString()
  reviewer: string;

  /**
   * @example "Pizza Salami"
   */
  @IsString()
  item: string;

  /**
   * Rating that has to be between 0 and 5
   *
   * @example 5
   */
  @IsInt()
  @Max(5)
  @Min(0)
  rating: number;

  /**
   * @example "okay but soggy"
   */
  @IsString()
  comment: string;

  /**
   * uuid
   * @example "d3b71a51-dabd-4f3b-93b7-a9ccb1047dd8"
   */
  @IsUUID()
  collectionId: string;
}
