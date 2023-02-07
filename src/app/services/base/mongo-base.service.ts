import { PaginationConfig } from '@https/controller/global/utils/interfaces/base/pagination-config.interface';
import { FilterQuery, Model } from 'mongoose';

export default class MongoBaseService<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  find(filterQuery: FilterQuery<T>, select = '', sort = {}): Promise<T[]> {
    return this.model.find(filterQuery, select).sort(sort).exec();
  }

  findById(id: string) {
    return this.model.findById(id).exec();
  }

  findOne(filterQuery: FilterQuery<T>, select?: string) {
    return this.model.findOne(filterQuery, select).exec();
  }

  findOneAndUpdate(filterQuery: FilterQuery<T>, update: Partial<T>) {
    return this.model.findOneAndUpdate(filterQuery, update, { new: true }).exec();
  }

  findOneAndDelete(filterQuery: FilterQuery<T>) {
    return this.model.findOneAndDelete(filterQuery).exec();
  }

  create(data: T): Promise<T> {
    return this.model.create(data);
  }

  update(filterQuery: FilterQuery<T>, data: Partial<T>): Promise<any> {
    return this.model.updateOne(filterQuery, data).exec();
  }

  delete(filterQuery: FilterQuery<T>): Promise<any> {
    return this.model.deleteOne(filterQuery).exec();
  }

  upsert(filterQuery: FilterQuery<T>, data: Partial<T>): Promise<any> {
    return this.model.updateOne(filterQuery, data, { upsert: true }).exec();
  }

  page(paginationConfig: PaginationConfig) {
    const limit = paginationConfig.limit || 10;
    const skip = paginationConfig.page || 0 * limit;

    const apps = this.model.find({}).skip(skip).limit(limit);
    const total = this.model.countDocuments({});

    return {
      results: apps,
      total,
    };
  }
}
