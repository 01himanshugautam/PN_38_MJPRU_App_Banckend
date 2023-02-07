import { PaginatedData } from '@utils/interfaces/base/paginated-data.interface';
import { PaginationConfig } from '@utils/interfaces/base/pagination-config.interface';

export interface IRead<T> {
  find(config: PaginationConfig, relations?: string): Promise<PaginatedData<T>>;
  findById(id: number | string, relations?: string): Promise<T | undefined>;
  findOne(obj: any, relations?: string): Promise<T>;
}
