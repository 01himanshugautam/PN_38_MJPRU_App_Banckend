import AppError from '@https/controller/global/utils/app-error.util';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export async function validateClass<Type>(
  type: any,
  data: any,
  skipMissingProperties = false,
  whitelist = false,
  forbidNonWhitelisted = true,
): Promise<Type> {
  const errors: ValidationError[] = await validate(plainToInstance(type, data), {
    skipMissingProperties,
    whitelist,
    forbidNonWhitelisted,
  });

  if (errors.length > 0) {
    const message = errors.toString();
    throw new AppError(400, 'Validation Failed', message);
  }
  return data;
}
