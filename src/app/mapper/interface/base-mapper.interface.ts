import { MapConfig } from '@utils/interfaces/map-config.interface';

export interface IBaseMapper<Source, Destination> {
  map<Destination>(result: Destination, mapConfig?: MapConfig): Source;
  mapMany<Destination>(results: Destination[], mapConfig?: MapConfig): Source[];
  mapReverse<Source>(result: Source): Destination;
  mapReverseMany<Source>(results: Source[]): Destination[];
  mapReverseEach<Source>(result: Source): Destination;
}
