import { SortConfig } from './sort-config.interface';
import { WhereConfig, WhereInConfig } from './where-config.interface';

export interface RepoConfig {
  page?: number;
  relations?: string;
  limit?: number;
  ordering?: SortConfig; // key, order -> ASC , DESC
  headers?: string;
  filters?: WhereConfig[];
  whereIn?: WhereInConfig[]; // key, order ->[];
}
