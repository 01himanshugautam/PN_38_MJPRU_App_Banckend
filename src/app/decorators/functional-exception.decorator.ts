/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from '@https/controller/global/utils/app-error.util';
import 'reflect-metadata';
export const HandleNotFound = (message: string): any => {
  return (target: any, propertyKey: string, descriptor: any) => {
    const fn = descriptor.value!;
    descriptor.value = async function (...args: any[]) {
      const [, res] = args;
      const data = await fn.apply(this, args);
      if (!data) {
        const errorMessage: string = Boolean(message) ? message : 'Data not found';
        throw new AppError(404, 'Not Found', errorMessage);
      }
      return data;
    };
    return descriptor;
  };
};
