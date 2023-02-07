import { Request, Express } from 'express';
import cors from 'cors';

const whitelist = ['http://localhost:3001', 'http://localhost:3000', 'https://bdo.1knetworks.com', 'http://localhost:5001'];

const corsOptionsDelegate = function (req: Request, callback: any) {
  let corsOptions;
  const ab = req.header('Origin') || '';

  if (whitelist.indexOf(ab) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

export const corsConfig = function (app: Express) {
  app.use(cors(corsOptionsDelegate));
};
