import { ErrorController } from '../app/https/controller/global/error.controller';
import { Request, Response, Express, NextFunction } from 'express';
import AppError from '../app/https/controller/global/utils/app-error.util';

export const errorHandlerConfig = function (app: Express) {
  // handle undefined Routes
  app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const err = new AppError(404, 'fail', 'undefined route');
    return ErrorController.handle(err, req, res, next);
  });

  // Global error handler
  app.use(ErrorController.handle);
};
