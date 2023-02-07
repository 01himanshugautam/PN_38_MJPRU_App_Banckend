import { GridTableResponse } from '@utils/interfaces/response/grid-table-response.interface';
import { IPageData } from '@utils/interfaces/response/page-data.interface';

export default class PaginationResponse {
  public static map(data: IPageData): GridTableResponse {
    const hasNext = data.page * data.limit < data.total ? true : false;
    const hasPrev = data.page <= 1 ? false : true;
    return {
      results: data.results,
      num_page: data.page,
      has_next: hasNext,
      has_previous: hasPrev,
      next_page_number: hasNext ? Number(data.page) + 1 : null,
      previous_page_number: hasPrev ? Number(data.page) - 1 : null,
      start_index: (data.page - 1) * data.limit + 1,
      end_index: hasNext ? data.page * data.limit : data.total,
      count: data.total,
      count_per_page: data.limit,
      headers: data.headers,
      assignedKeys: data.assignedKey,
    };
  }
}
