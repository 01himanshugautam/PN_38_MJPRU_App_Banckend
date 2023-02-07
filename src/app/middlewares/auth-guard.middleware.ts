import { User } from '@utils/interfaces/user.interface';
import { UserService } from '@services/user.service';
import { ErrorController } from '@https/controller/global/error.controller';
import { extractToken } from '@https/controller/global/utils/middleware/middleware.util';
import { TokenService } from '@services/token.service';
import AppError from '@utils/class/app-error.utils';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Container from 'typedi';

export const protect = () => {
  return async (req: any, res: any, next: NextFunction) => {
    try {
      const token = extractToken(req);
      const decode: any = jwt.verify(token, process.env.JWT_SECRET);

      const hasValidToken = await Container.get(TokenService).findOne({ token: `tokens:${decode.sub}:${token}` });
      if (!hasValidToken) {
        return next(new AppError(401, 'forbidden', 'Token is blacklisted'));
      }

      const user: User = await Container.get(UserService).get(decode.sub);
      if (!user) {
        return next(new AppError(401, 'forbidden', 'You do not have access'));
      }
      if (!user.is_active) {
        return next(new AppError(401, 'forbidden', 'Account is inactive'));
      }
      req.user = user;
      next();
      return;
    } catch (err: any) {
      err.statusCode = 401;
      err.message = 'Unauthorized access, Please Login again';
      return ErrorController.handle(err, req, res, next);
    }
  };
};
