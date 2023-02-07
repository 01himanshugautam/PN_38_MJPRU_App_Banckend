import { BaseRepository } from '@repositories/base/base.repository';
import { IBaseService } from '@services/interface/base-service.interface';
import AppError from '@utils/class/app-error.utils';
import { PaginatedData } from '@utils/interfaces/base/paginated-data.interface';
import { PaginationConfig } from '@utils/interfaces/base/pagination-config.interface';
import { RepoConfig } from '@utils/interfaces/base/repo-config.interface';
import { Service } from 'typedi';

@Service()
export class BaseService<Model, ModelDto> implements IBaseService<Model, ModelDto> {
  baseRepository: BaseRepository<Model>;
  notFoundMessage: string;
  notFoundsMessage: string;
  constructor(baseRepository: BaseRepository<Model>, notFoundMessage: any = null, notFoundsMessage: any = null) {
    this.baseRepository = baseRepository;
    this.notFoundMessage = notFoundMessage || 'Data not found';
    this.notFoundsMessage = notFoundsMessage || 'Data not found';
  }
  gets(): Promise<Model[]> {
    throw new Error('Method not implemented.');
  }

  async findByIds(ids: string[] | number[], relations?: string): Promise<Model[]> {
    return await this.baseRepository.findByIds(ids, relations);
  }

  handleError(data: any, message: string): void {
    if (!data) {
      throw new AppError(404, 'Not Found', message);
    }
  }

  async get(id: string | number, relations?: string, error = true): Promise<Model> {
    const result = await this.baseRepository.findById(id, relations);
    if (error) {
      this.handleError(result, this.notFoundMessage);
    }
    return result;
  }
  async findOne(obj: any, relations?: string, error = true): Promise<Model> {
    const result = await this.baseRepository.findOne(obj, relations);
    if (error) {
      this.handleError(result, this.notFoundMessage);
    }
    return result;
  }

  async find(obj: any, relations?: string, error = true): Promise<PaginatedData<Model>> {
    const result = await this.baseRepository.find(obj, relations);
    if (error) {
      this.handleError(result, this.notFoundMessage);
    }
    return result;
  }

  async paginate(paginationConfig: PaginationConfig, relations?: string): Promise<PaginatedData<Model>> {
    return await this.baseRepository.find(paginationConfig, relations);
  }

  async page(paginationConfig: PaginationConfig, relations?: string): Promise<PaginatedData<Model>> {
    return await this.baseRepository.findWithGraphFetch(paginationConfig, relations);
  }

  async create(modelDto: ModelDto, transaction?: any): Promise<Model> {
    const data: Model = await this.baseRepository.create(modelDto, transaction);
    this.handleError(data, 'Server Error! Data not created');
    return data;
  }
  async createMany(modelDto: ModelDto[], relations?: string, transaction?: any): Promise<Model[]> {
    const data: Model[] = await this.baseRepository.createMany(modelDto, relations, transaction);
    this.handleError(data, 'Server Error! Data not created');
    return data;
  }

  async upsert(modelDto: ModelDto, relations?: string): Promise<Model> {
    const data: Model = await this.baseRepository.upsert(modelDto, relations);
    this.handleError(data, 'Server Error! Data not created');
    return data;
  }

  async update(id: string | number, modelDto: ModelDto, relations?: string, transaction?: any): Promise<Model> {
    const data: Model = await this.baseRepository.update(id, modelDto, relations, transaction);
    this.handleError(data, 'Server Error! Data not created');
    return data;
  }
  async insertGraph(modelDto: ModelDto, relations?: string): Promise<Model> {
    const data: Model = await this.baseRepository.insertGraph(modelDto, relations);
    this.handleError(data, 'Server Error! Data not created');
    return data;
  }

  async insertWithRelated(obj: any): Promise<Model> {
    const data: Model = await this.baseRepository.insertGraph(obj);
    this.handleError(data, 'Server Error! Data not created');
    return data;
  }

  async deleteById(id: string | number): Promise<Model> {
    const result = await this.baseRepository.deleteById(id);
    this.handleError(result, this.notFoundMessage);
    return result;
  }

  async delete(repoConfig?: RepoConfig): Promise<Model> {
    const result = await this.baseRepository.delete(repoConfig);
    return result;
  }

  async search(term: string, searchKeys: string[] = ['name'], relations?: string) {
    if (!Boolean(term.trim())) {
      return [];
    }
    return await this.baseRepository.search(term.trim(), searchKeys, relations);
  }

  async searchStatusTrue(term: string, searchKeys: string[] = ['name'], relations?: string) {
    if (!Boolean(term.trim())) {
      return [];
    }
    return await this.baseRepository.searchStatusTrue(term.trim(), searchKeys, relations);
  }
  async relate(relation: string, parentId: number[] | number | string[] | string, childId: number[] | number | string[] | string) {
    if (childId instanceof Array) {
      childId.forEach(async element => {
        return await this.baseRepository.relate(relation, parentId, element);
      });
    } else {
      return await this.baseRepository.relate(relation, parentId, childId);
    }
  }
  async unRelate(relation: string, parentId: number[] | number | string[] | string, childConfig: RepoConfig) {
    return await this.baseRepository.unRelate(relation, parentId, childConfig);
  }
  async getAll(relation?: string): Promise<Model[]> {
    const result: Model[] = await this.baseRepository.getAll(relation);
    return result || [];
  }
}
