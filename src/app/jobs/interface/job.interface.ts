export interface IBaseJob {
  process(): void;
  enqueue(data: any, config?: any): void;
}
