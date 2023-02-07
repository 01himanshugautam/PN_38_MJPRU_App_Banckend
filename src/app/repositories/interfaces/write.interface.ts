export interface IWrite<T> {
  create(item: T): Promise<T>;
  update(id: string | number, item: T, transaction: any): Promise<T>;
  // delete(id: string | number): Promise<T>;
}
