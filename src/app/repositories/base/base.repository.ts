/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRead } from '@repositories/interfaces/read.interface';
import { IWrite } from '@repositories/interfaces/write.interface';
import { PaginatedData } from '@utils/interfaces/base/paginated-data.interface';
import { PaginationConfig } from '@utils/interfaces/base/pagination-config.interface';
import { RepoConfig } from '@utils/interfaces/base/repo-config.interface';
import { WhereConfig, WhereInConfig } from '@utils/interfaces/base/where-config.interface';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  async findById(id: number | string, relations?: string): Promise<T | undefined> {
    if (!relations) {
      return await this.model.query().findById(id);
    }
    return await this.model.query().withGraphFetched(relations).findById(id);
  }
  async findByIds(ids: number[] | string[], relations?: string): Promise<T[]> {
    if (!relations) {
      return await this.model.query().whereIn('id', ids);
    }
    return await this.model.query().withGraphFetched(relations).whereIn('id', ids);
  }
  async create(item: any, transaction?: any): Promise<T> {
    if (transaction) {
      return await this.model.query(transaction).insertAndFetch(item);
    }
    return await this.model.query().insertAndFetch(item);
  }

  async createMany(items: any[], relations?: string, transaction?: any): Promise<T[]> {
    const objectArray: any[] = [];
    for (let index = 0; index < items.length; index++) {
      if (relations) {
        if (transaction) {
          objectArray.push(await this.model.query(transaction).insertAndFetch(items[index]).withGraphFetched(relations));
        } else {
          objectArray.push(await this.model.query().insertAndFetch(items[index]).withGraphFetched(relations));
        }
      } else {
        if (transaction) {
          objectArray.push(await this.model.query(transaction).insertAndFetch(items[index]));
        } else {
          objectArray.push(await this.model.query().insertAndFetch(items[index]));
        }
      }
    }
    return objectArray;
  }
  async update(id: string | number, item: any, relations?: string, transaction?: any): Promise<T> {
    let queryBuilder = this.model.query();
    if (transaction) {
      queryBuilder = this.model.query(transaction);
    }
    return await queryBuilder.withGraphFetched(relations).patchAndFetchById(id, item);
  }
  async updateMany(items: any[]): Promise<any[]> {
    const objectArray: any[] = [];
    items &&
      items.forEach(async item => {
        const data = await this.model.query().patchAndFetchById(item.id, item);
        objectArray.push(data);
      });
    return objectArray;
  }
  async deleteById(id: string | number, repoConfig?: RepoConfig): Promise<T> {
    return await this.model.query().deleteById(id);
  }

  async delete(repoConfig: RepoConfig): Promise<T> {
    let queryBuilder = this.model.query();
    if (repoConfig.transaction) {
      queryBuilder = this.model.query(repoConfig.transaction);
    }
    queryBuilder = this.addFilters(queryBuilder, repoConfig);
    return await queryBuilder.delete();
  }

  addFilters(queryBuilder: any, repoConfig: RepoConfig) {
    if (repoConfig.whereIn) {
      repoConfig.whereIn.forEach((obj: WhereInConfig) => {
        queryBuilder = queryBuilder.whereIn(obj.key, obj.data);
      });
    }
    if (repoConfig.filters) {
      repoConfig.filters.forEach((obj: WhereConfig) => {
        if (!obj.operator || obj.operator == '=' || obj.operator == 'equal') {
          queryBuilder = queryBuilder.where(obj.key, obj.value);
        } else if (obj.operator == 'like') {
          const value = `%${obj.value}%`;
          queryBuilder = queryBuilder.where(obj.key, obj.operator, value);
        } else if (obj.operator == 'startWith') {
          const value = `${obj.value}%`;
          queryBuilder = queryBuilder.where(obj.key, obj.operator, value);
        } else {
          queryBuilder = queryBuilder.where(obj.key, obj.operator, obj.value);
        }
      });
    }
    return queryBuilder;
  }

  async find(paginationConfig?: PaginationConfig, relations?: string): Promise<PaginatedData<T>> {
    let queryBuilder = this.model.query();
    if (relations) {
      queryBuilder = queryBuilder.joinRelated(relations);
    }
    if (paginationConfig.headers) {
      const selectArray = paginationConfig.headers.split(',');
      const resultSelect: any[] = [];
      selectArray.forEach(select => {
        const key = select.split(' ');
        if (key[0].split('.')[0] == 'count') {
          resultSelect.push(this.model.relatedQuery(key[0].split('.')[1]).count().as(key[2]));
        } else {
          resultSelect.push(select);
        }
      });
      queryBuilder = queryBuilder.select(...resultSelect);
    }
    if (paginationConfig.ordering) {
      const sortType = paginationConfig.ordering.startsWith('-') ? 'DESC' : 'ASC';
      queryBuilder = queryBuilder.orderBy(paginationConfig.ordering.replace('-', ''), sortType);
    }

    if (paginationConfig.filters) {
      const filterArray = paginationConfig.filters.split(',');
      filterArray.forEach((value, index) => {
        const likeObj = value.split(':');
        queryBuilder = queryBuilder.where(likeObj[0], likeObj[1], `${likeObj[2]}`);
      });
    }
    return queryBuilder.page(paginationConfig.page - 1, paginationConfig.limit);
  }

  async count(paginationConfig?: PaginationConfig, relations?: string): Promise<any> {
    let queryBuilder = this.model.query();
    if (paginationConfig.filters) {
      const filterArray = paginationConfig.filters.split(',');
      filterArray.forEach((value, index) => {
        const likeObj = value.split(':');
        queryBuilder = queryBuilder.where(likeObj[0], likeObj[1], `${likeObj[2]}`);
      });
    }
    return await queryBuilder.resultSize();
  }

  async findWithGraphFetch(paginationConfig?: PaginationConfig, relations?: string): Promise<PaginatedData<T>> {
    let queryBuilder = this.model.query();
    if (relations) {
      queryBuilder = queryBuilder.withGraphFetched(relations);
    }

    if (paginationConfig.headers) {
      const selectArray = paginationConfig.headers.split(',');
      const resultSelect: any[] = [];
      selectArray.forEach(select => {
        const key = select.split(' ');
        if (key[0].split('.')[0] == 'count') {
          resultSelect.push(this.model.relatedQuery(key[0].split('.')[1]).count().as(key[2]));
        } else {
          resultSelect.push(select);
        }
      });
      queryBuilder = queryBuilder.select(...resultSelect);
    }
    if (paginationConfig.ordering) {
      const sortType = paginationConfig.ordering.startsWith('-') ? 'DESC' : 'ASC';
      queryBuilder = queryBuilder.orderBy(paginationConfig.ordering.replace('-', ''), sortType);
    } else {
      queryBuilder = queryBuilder.orderBy('id', 'DESC');
    }

    if (paginationConfig.filters) {
      const filterArray = paginationConfig.filters.split(',');
      filterArray.forEach((value, index) => {
        const likeObj = value.split(':');
        if (likeObj[0].split('.').length > 1) {
          const searchKey = likeObj[1] == 'like' ? `%${likeObj[2]}%` : likeObj[2];

          const query =
            likeObj[1] != 'equal'
              ? this.model.relatedQuery(likeObj[0].split('.')[0]).where(likeObj[0].split('.')[1], likeObj[1], searchKey)
              : this.model.relatedQuery(likeObj[0].split('.')[0]).where(likeObj[0].split('.')[1], searchKey);
          queryBuilder = queryBuilder.whereExists(query);
          queryBuilder = queryBuilder.modifyGraph(likeObj[0].split('.')[0], (builder: any) => {
            const [dotKey, operator, value] = likeObj;
            const key = dotKey.split('.')[1];
            if (operator == '=' || operator == 'equal') {
              builder.where(key, value);
            } else if (operator == 'like') {
              builder.where(key, operator, `%${value}%`);
            } else if (operator == 'date') {
              // update_at:date:22-10-2022~23-10-2023
              const dates = value.split('~');
              const from_date = new Date(dates[0]);
              const to_date = new Date(dates[1]);
              from_date.setHours(from_date.getHours() - 5);
              from_date.setMinutes(from_date.getMinutes() - 30);
              to_date.setDate(to_date.getDate() + 1);
              to_date.setHours(to_date.getHours() - 5);
              to_date.setMinutes(to_date.getMinutes() - 30);
              queryBuilder = queryBuilder.whereBetween(key, [from_date, to_date]);
            } else {
              builder.where(key, operator, value);
            }
          });
        } else {
          const [key, operator, value] = likeObj;
          if (operator == '=' || operator == 'equal') {
            queryBuilder = queryBuilder.where(key, `${value}`);
          } else if (operator == 'like') {
            queryBuilder = queryBuilder.where(key, operator, `%${value}%`);
          } else if (operator == 'date') {
            // update_at:date:22-10-2022~23-10-2023
            const dates = value.split('~');
            const from_date = new Date(dates[0]);
            const to_date = new Date(dates[1]);
            to_date.setDate(to_date.getDate() + 1);
            from_date.setHours(from_date.getHours() - 5);
            from_date.setMinutes(from_date.getMinutes() - 30);
            to_date.setHours(to_date.getHours() - 5);
            to_date.setMinutes(to_date.getMinutes() - 30);
            queryBuilder = queryBuilder.whereBetween(key, [from_date, to_date]);

            // 2021-10-20 2022-10-21 ----
          } else if (operator == 'null') {
            queryBuilder = queryBuilder.whereNull(key);
          } else {
            queryBuilder = queryBuilder.where(key, operator, value);
          }
        }
      });
    }
    return queryBuilder.page(paginationConfig.page - 1, paginationConfig.limit);
  }

  async findOne(obj: any, relations?: string, error = true): Promise<T> {
    let queryBuilder = this.model.query();
    if (relations) {
      queryBuilder = queryBuilder.withGraphFetched(relations);
    }
    return await queryBuilder.findOne(obj);
  }

  async insertGraph(obj: any, relations?: string): Promise<T> {
    const queryBuilder = this.model.query();
    if (!relations) {
      return await queryBuilder.insertGraph(obj, { allowRefs: true, relate: true, unrelate: true });
    }
    return await queryBuilder.insertGraph(obj, { allowRefs: true, relate: true, unrelate: true }).withGraphFetched(relations);
  }

  async insertWithRelated(obj: any): Promise<T> {
    return this.model.query().insertWithRelated(obj);
  }

  async upsert(obj: any, relations?: string): Promise<T> {
    const queryBuilder = this.model.query();
    if (!relations) {
      return await queryBuilder.upsertGraph(obj, { allowRefs: true, relate: true, unrelate: true });
    }
    return await queryBuilder.upsertGraph(obj, { allowRefs: true, relate: true, unrelate: true }).withGraphFetched(relations);
  }

  async search(term: string, searchKeys: string[], relations?: string): Promise<T[]> {
    let queryBuilder = this.model.query();
    if (relations) {
      queryBuilder = queryBuilder.withGraphFetched(relations);
    }
    searchKeys.forEach((value, index) => {
      if (index == 0) {
        if (value.split('.').length > 1) {
          const query = this.model.relatedQuery(value.split('.')[0]).where(value.split('.')[1], 'like', `%${term}%`);

          queryBuilder = queryBuilder.whereExists(query);
          queryBuilder = queryBuilder.modifyGraph(value.split('.')[0], (builder: any) => {
            const key = value.split('.')[1];
            builder.where(key, 'like', `%${term}%`);
          });
        } else {
          queryBuilder = queryBuilder.where(value, 'like', `%${term}%`);
        }
      } else {
        queryBuilder = queryBuilder.orWhere(value, 'like', `%${term}%`);
      }
    });
    return await queryBuilder.limit(10);
  }

  async searchStatusTrue(term: string, searchKeys: string[], relations?: string): Promise<T[]> {
    let queryBuilder = this.model.query();
    if (relations) {
      queryBuilder = queryBuilder.withGraphFetched(relations).where('status', 1);
    }
    searchKeys.forEach((value, index) => {
      if (index == 0) {
        if (value.split('.').length > 1) {
          const query = this.model.relatedQuery(value.split('.')[0]).where(value.split('.')[1], 'like', `%${term}%`);
          queryBuilder = queryBuilder.whereExists(query);
          queryBuilder = queryBuilder.modifyGraph(value.split('.')[0], (builder: any) => {
            const key = value.split('.')[1];
            builder.where(key, 'like', `%${term}%`);
          });
        } else {
          queryBuilder = queryBuilder.where(value, 'like', `%${term}%`).where('status', 1);
        }
      } else {
        queryBuilder = queryBuilder.orWhere(value, 'like', `%${term}%`).where('status', 1);
      }
    });
    return await queryBuilder.limit(10);
  }

  async relate(relation: string, parentId: number[] | number | string[] | string, childId: number[] | number | string[] | string, transaction?: any) {
    if (transaction) {
      return await this.model.relatedQuery(relation, transaction).for(parentId).relate(childId);
    }
    return await this.model.relatedQuery(relation).for(parentId).relate(childId);
  }

  async unRelate(relation: string, parentId: number[] | number | string[] | string, child: RepoConfig) {
    let queryBuilder = this.model.relatedQuery(relation).for(parentId).unrelate();
    queryBuilder = this.addFilters(queryBuilder, child);
    return await queryBuilder;
  }

  async getAll(relations?: string): Promise<T[]> {
    let queryBuilder = this.model.query();
    if (relations) {
      queryBuilder = queryBuilder.select().withGraphFetched(relations);
    }
    return await queryBuilder.select();
  }
}
