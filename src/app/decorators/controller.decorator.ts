/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ErrorController } from '@https/controller/global/error.controller';
import 'reflect-metadata';
export const Controller = (): any => {
  return (target: any, propertyKey: string, descriptor: any) => {
    for (const propertyName of Reflect.ownKeys(target.prototype).filter(prop => prop !== 'constructor')) {
      const desc = Object.getOwnPropertyDescriptor(target.prototype, propertyName)!;
      const isMethod = desc.value instanceof Function;
      if (!isMethod) continue;
      const fn = desc.value!;
      desc.value = async function DescriptorValue(...args: any[]) {
        try {
          return await fn.apply(this, args);
        } catch (error) {
          const [res, req, next] = args;
          return ErrorController.handle(error, res, req, next);
        }
      };
      Object.defineProperty(target.prototype, propertyName, desc);
    }
  };
};
