import { IBaseMapper } from '@mapper/interface/base-mapper.interface';
import { mapper } from '@mapper/mapper';
import MapperHelper from '@utils/class/mapper-helper.utils';
import { MapConfig } from '@utils/interfaces/map-config.interface';

export class BaseMapper<Source, Destination> implements IBaseMapper<Source, Destination> {
  model: any;
  responseModel: any;

  constructor(model: any, responseModel: any) {
    this.model = model;
    this.responseModel = responseModel;
  }

  map<Destination>(result: Destination, mapConfig?: MapConfig): Source {
    let mappedValue: Source = mapper.map(result, this.responseModel, this.model);
    if (mapConfig && mapConfig.excepts) {
      mappedValue = MapperHelper.deleteExceptKeys(mapConfig.excepts, mappedValue);
    }
    if (mapConfig && mapConfig.properties) {
      mappedValue = MapperHelper.propertyKeysMapped(mapConfig.properties, mappedValue);
    }
    return mappedValue;
  }

  mapMany<Destination>(objects: Destination[], mapConfig?: MapConfig): any {
    const entities: Source[] = [];
    objects.forEach(obj => {
      entities.push(this.map(obj, mapConfig));
    });
    return entities;
  }

  mapReverse<Source>(result: Source): Destination {
    return mapper.map(result, this.model, this.responseModel);
  }

  mapReverseEach<Source>(result: Source): Destination {
    return mapper.map(result, this.model, this.responseModel);
  }

  mapReverseMany<Source>(objects: Source[]): Destination[] {
    const entities: Destination[] = [];
    objects.forEach(obj => {
      entities.push(this.mapReverseEach(obj));
    });
    return entities;
  }
}
