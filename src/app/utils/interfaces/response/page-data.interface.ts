import { GridKey } from '../base/grid-key.interface';

export interface IPageData {
  results?: any;
  total?: number;
  page?: number;
  limit?: number;
  headers?: string;
  assignedKey?: GridKey[];
}
