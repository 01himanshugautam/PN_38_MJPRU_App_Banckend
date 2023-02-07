export interface WhereConfig {
  key: string;
  operator?: string;
  value: string | number;
}

export interface WhereInConfig {
  key: string;
  data: any[];
}
