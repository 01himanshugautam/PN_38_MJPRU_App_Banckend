import winston from 'winston';
import { Express } from 'express';
import basicAuth from 'express-basic-auth';

export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    //Add Multiple file
    new winston.transports.File({ filename: 'src/logs/combined.log' }),
    new winston.transports.File({ filename: 'src/logs/error.log', level: 'error' }),
    new winston.transports.File({
      filename: 'src/logs/rejections.log',
      handleRejections: true,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'src/logs/exceptions.log' }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

export default function winstonConfig(app: Express) {
  const password = process.env.SWAGGER_PASSWORD || 'supersecret';
  app.use(
    '/logs',
    basicAuth({
      users: { admin: password },
      challenge: true,
    }),
  );
  require('winston-logs-display')(app, logger);
}
