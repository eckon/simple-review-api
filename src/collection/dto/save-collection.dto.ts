import { IsOptional, IsString, IsUUID } from 'class-validator';

export class SaveCollectionDto {
  /**
   * uuid
   * @example "d3b71a51-dabd-4f3b-93b7-a9ccb1047dd8"
   */
  @IsUUID()
  @IsOptional()
  id?: string;

  /**
   * @example "Food Reviews"
   */
  @IsString()
  title: string;

  /**
   * @example "this includes all food reviews from Niklas"
   */
  @IsString()
  description: string;
}
