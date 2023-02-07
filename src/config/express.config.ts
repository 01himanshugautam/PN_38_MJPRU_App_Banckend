import express, { json, Express } from 'express';
import path from 'path';
import routers from '../routers/index';

export default function expressConfig(app: Express) {
  app.use(express());
  app.use(json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', routers);
}
