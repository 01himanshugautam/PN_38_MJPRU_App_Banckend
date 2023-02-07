import { Request, Response, Express } from 'express';
import compression from 'compression';

function shouldCompress(req: Request, res: Response): boolean {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}

export const compressionConfig = function (app: Express) {
  app.use(compression({ filter: shouldCompress }));
};
