/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { validateClass } from '@https/controller/global/utils/class/validate-helper.util';
import { IValidatorConfig } from '@https/controller/global/utils/interfaces/base/validator-config.interface';

function validationFactory<T>(metadataKey: Symbol, model: any, source: 'body' | 'query' | 'params' | 'empty', config?: IValidatorConfig) {
  return function (target: any, propertyName: string, descriptor: any) {
    Reflect.defineMetadata(metadataKey, model, target, propertyName);

    const fn = descriptor.value!;
    descriptor.value = async function (...args: any[]) {
      const model = Reflect.getOwnMetadata(metadataKey, target, propertyName);

      const [req, res, next] = args;
      const newArgs = [];
      if (source != 'empty') {
        const plain = req[source];
        const data = await validateClass<T>(model, plain);
        newArgs.push(data);
      } else {
        newArgs.push(req);
      }
      if (config && config.hasRequest && source != 'empty') {
        newArgs.push(req);
      }
      if (config && config.hasUser) {
        newArgs.push(req.user);
      }
      newArgs.push(res);
      newArgs.push(next);
      return await fn.apply(this, newArgs);
    };
    return descriptor;
  };
}

export const ValidateQuery = (dto: any, config?: IValidatorConfig) => validationFactory(Symbol('validate-query'), dto, 'query', config);
export const ValidateBody = (dto: any, config?: IValidatorConfig) => validationFactory(Symbol('validate-body'), dto, 'body', config);
export const ValidateParams = (dto: any, config?: IValidatorConfig) => validationFactory(Symbol('validate-params'), dto, 'params', config);

export const NoValidate = (config?: IValidatorConfig) => validationFactory(Symbol('validate'), null, 'empty', config);
