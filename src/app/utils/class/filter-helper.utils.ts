export default class Filter {
  public static eq(key: any, value: any) {
    return this.getMappingData(key, value, '=');
  }
  public static in(key: any, value: any) {
    return {
      key: key,
      data: value,
    };
  }

  public static getMappingData(key: any, value: string, operator?: any) {
    if (operator != '=') {
      return {
        key: key,
        operator: operator,
        value: value,
      };
    }
    return {
      key: key,
      value: value,
    };
  }
}
