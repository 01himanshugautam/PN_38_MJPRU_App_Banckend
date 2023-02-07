export interface PaginatedData<ModelDto> {
  total: number;
  results: ModelDto[];
}
