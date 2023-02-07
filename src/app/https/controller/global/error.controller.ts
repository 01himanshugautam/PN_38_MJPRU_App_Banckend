import { ErrorData } from '@https/controller/global/utils/interfaces/error-data.interface';
import { Request, Response } from 'express';
import { logger } from '@config/winston.config';

export class ErrorController {
  public static handle(err: any, req: Request, res: Response, next: any = null) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    const errData: ErrorData = {
      status: err.status,
      error: err,
      message: err.message,
      stack: '',
    };

    if (process.env.NODE_ENV != 'production') {
      errData.stack = err.stack;
    }
    logger.error(errData.message, { stack: err.stack });

    return res.status(err.statusCode).json(errData);
  }
}
