export interface ReportDownloadConfig {
  page?: number;
  limit?: number;
  ordering?: string;
  headers?: string;
  filters?: string;
  fileName?: string;
  appendFilters?: string;
}
