import { GridKey } from '../base/grid-key.interface';

export interface GridTableResponse {
  results?: any;
  has_next: boolean;
  has_previous: boolean;
  next_page_number: number | null;
  previous_page_number: number | null;
  start_index: number;
  end_index: number;
  num_page: number;
  count: number;
  count_per_page: number;
  headers?: string;
  assignedKeys?: GridKey[];
}
