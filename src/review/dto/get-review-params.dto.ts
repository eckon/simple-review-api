import { IsUUID } from 'class-validator';

export class GetReviewParams {
  /**
   * uuid
   * @example "d3b71a51-dabd-4f3b-93b7-a9ccb1047dd8"
   */
  @IsUUID()
  id: string;
}
