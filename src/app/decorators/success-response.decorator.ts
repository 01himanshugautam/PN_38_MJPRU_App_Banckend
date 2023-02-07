/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ResponseUtils } from '@https/controller/global/utils/class/response.utils';
import { ISuccessResponse } from '@https/controller/global/utils/interfaces/base/success-response.interface';
import { IResponseConfig } from '@https/controller/global/utils/interfaces/response-config.interface';
import 'reflect-metadata';
export const SuccessResponse = (result?: ISuccessResponse, resConfig?: IResponseConfig): any => {
  return (target: any, propertyKey: string, descriptor: any) => {
    if (descriptor && descriptor.value instanceof Function) {
      const fn = descriptor.value!;
      descriptor.value = async function (...args: any[]) {
        let res = args[1];
        if (args.length == 4) {
          res = args[2];
        }
        if (args.length == 5) {
          res = args[3];
        }
        const data = await fn.apply(this, args);
        if (!result) {
          return ResponseUtils.success(res, data, resConfig);
        }
        return result.withMap ? ResponseUtils.success(res, data, resConfig) : ResponseUtils.customSuccess(res, data, resConfig);
      };
      return descriptor;
    } else {
      // Iterate over class properties except constructor
      for (const propertyName of Reflect.ownKeys(target.prototype).filter(prop => prop !== 'constructor')) {
        const desc = Object.getOwnPropertyDescriptor(target.prototype, propertyName)!;
        const isMethod = desc.value instanceof Function;
        if (!isMethod) continue;
        const fn = desc.value!;
        desc.value = async function DescriptorValue(...args: any[]) {
          let res = args[1];
          if (args.length == 4) {
            res = args[2];
          }
          const data = await fn.apply(this, args);
          return ResponseUtils.success(res, data, resConfig);
        };
        Object.defineProperty(target.prototype, propertyName, desc);
      }
    }
  };
};
