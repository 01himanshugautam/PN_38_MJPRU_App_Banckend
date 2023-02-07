import AppError from '@https/controller/global/utils/app-error.util';

export function extractToken(req: any) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    throw new AppError(401, 'fail', 'You are not logged in');
  }
  return token;
}
