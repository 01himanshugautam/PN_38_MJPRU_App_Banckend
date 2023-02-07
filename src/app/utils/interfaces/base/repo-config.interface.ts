import { SortConfig } from './sort-config.interface';
import { WhereConfig, WhereInConfig } from './where-config.interface';

export interface RepoConfig {
  relations?: string;
  transaction?: string;
  ordering?: SortConfig; // key, order -> ASC , DESC
  headers?: string;
  filters?: WhereConfig[];
  whereIn?: WhereInConfig[]; // key, order ->[];
}

export const filtersToWhereConfig = (paginationFilter: string) => {
  if (!paginationFilter) {
    return [];
  }
  const whereConfigs: WhereConfig[] = [];
  const filterArray = paginationFilter.split(',');
  filterArray.forEach(value => {
    const likeObj = value.split(':');
    const whereConfig: WhereConfig = {
      key: likeObj[0],
      value: likeObj[2],
    };
    if (!Boolean(likeObj[1] == 'equal' || likeObj[1] == 'eq' || likeObj[1] == '=')) {
      whereConfig.operator = likeObj[1];
    }
    whereConfigs.push(whereConfig);
  });
  return whereConfigs;
};
