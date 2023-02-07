/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv from 'ajv';
import AppError from '../app-error.util';

export function validateSchema(schema: any, data: any) {
  const validate: any = new Ajv().compile(schema);
  const valid = validate(data);
  if (!valid) {
    const statusCode = 401;
    const message = validate.errors[0]['message'];
    const status = 'Validation Failed';
    throw new AppError(statusCode, status, message);
  }
}
