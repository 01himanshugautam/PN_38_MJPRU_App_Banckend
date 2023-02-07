export interface IBaseService<Model, ModelDto> {
  handleError(data: any, message: string): void;
  get(id: number | string): Promise<Model>;
  gets(): Promise<Model[]>;
  create(modelDto: ModelDto): Promise<Model>;
  upsert(modelDto: ModelDto): Promise<Model>;
}
