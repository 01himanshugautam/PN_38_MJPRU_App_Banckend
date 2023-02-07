import { Express } from 'express';
import rateLimit from 'express-rate-limit';

const RATE_WINDOW_SIZE: number = process.env.RATE_WINDOW_SIZE || 15 * 60 * 1000;
const RATE_LIMIT_MAX: number = process.env.RATE_LIMIT_MAX || 100;
const limiter = rateLimit({
  windowMs: RATE_WINDOW_SIZE, // 15 minutes
  max: RATE_LIMIT_MAX, // limit each IP to 100 requests per windowMs
});

export const limiterConfig = function (app: Express) {
  app.use(limiter);
};
