export default class MapperHelper {
  public static deleteExceptKeys(keys: string[] = [], object: any) {
    keys.length &&
      keys.forEach((key: string) => {
        if (key.includes('.')) {
          const firstKey = key.split('.')[0];
          const secondKey = key.split('.')[1];
          if (Array.isArray(object[firstKey])) {
            object[firstKey].forEach((value: any, i: number) => {
              delete object[firstKey][i][secondKey];
            });
          } else if (object[firstKey]) {
            delete object[firstKey][secondKey];
          }
        } else delete object[key];
      });
    return object;
  }

  public static propertyKeysMapped(keys: string[] = [], object: any = {}) {
    let mapProperties: any = {};
    keys.forEach((key: string) => {
      if (key.includes('.')) {
        const firstKey = key.split('.')[0];
        const secondKey = key.split('.')[1];
        if (Array.isArray(object[firstKey]) && object[firstKey]) {
          if (mapProperties[firstKey] === undefined) mapProperties[firstKey] = [];
          object[firstKey].forEach((ele: any, i: number) => {
            mapProperties[firstKey][i] = { ...mapProperties[firstKey][i] };
            mapProperties[firstKey][i][secondKey] = object[firstKey][i][secondKey];
          });
        }
        if (object[firstKey] && object[firstKey][secondKey] !== undefined) {
          mapProperties[firstKey] = { ...mapProperties[firstKey] };
          mapProperties[firstKey][secondKey] = object[firstKey][secondKey];
        }
        if (!object[firstKey]) {
          mapProperties[firstKey] = null;
        }
      } else if (object[key] !== undefined) {
        mapProperties[key] = object[key];
      }
    });
    if (keys === undefined) {
      mapProperties = { ...object };
    }
    return mapProperties;
  }

  public static groupBy(key: string, arrayData: any[]) {
    return arrayData.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}
