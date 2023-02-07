import AppError from '../app-error.util';

export interface ErrorData {
  status: string;
  error: AppError;
  message: string;
  stack: string | undefined;
}
