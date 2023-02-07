import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationRequest {
  @IsNumberString()
  @IsOptional()
  page?: number;

  @IsNumberString()
  @IsOptional()
  limit?: number;

  static map(paginationRequest: PaginationRequest) {
    return {
      page: Number(paginationRequest.page) || 0,
      limit: Number(paginationRequest.limit) || 10,
    };
  }
}
