import { RelationalOptions } from '@utils/interfaces/base/relational-options.interface';
import Objection, { Model } from 'objection';

export default class RelationHelper {
  public static hasOne(model: any, to: string, from: string) {
    return this.getMappingData(Model.HasOneRelation, model, to, from);
  }

  public static hasMany(model: any, to: string, from: string) {
    return this.getMappingData(Model.HasManyRelation, model, to, from);
  }

  public static BelongsToOneRelation(model: any, to: string, from: string) {
    return this.getMappingData(Model.BelongsToOneRelation, model, to, from);
  }

  public static hasManyToMany(model: any, to: string, from: string, through?: RelationalOptions) {
    return this.getMappingData(Model.ManyToManyRelation, model, to, from, through);
  }

  public static getMappingData(relation: Objection.RelationType, model: any, to: string, from: string, through?: RelationalOptions) {
    if (relation == Model.ManyToManyRelation) {
      return {
        relation: relation,
        modelClass: model,
        join: {
          from: from,
          through: {
            from: through.from,
            to: through.to,
          },
          to: to,
        },
      };
    }
    return {
      relation: relation,
      modelClass: model,
      join: {
        from: from,
        to: to,
      },
    };
  }
}
