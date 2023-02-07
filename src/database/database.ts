import path from 'path';
const Knex = require('knex');
import * as env from 'dotenv';
env.config();

export const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const knexConfigObj = Knex({
  client: process.env.DB_CLIENT,
  useNullAsDefault: true,
  connection: connection,
  debug: true,
  pool: { min: 0, max: 50 },
  migrations: {
    directory: path.join(__dirname, '../database/database.ts'),
  },
  seeds: {
    directory: path.join(__dirname, '../database/seeds/'),
  },
});

export const knexMaster = Knex({
  client: process.env.DB_CLIENT,
  useNullAsDefault: true,
  connection: connection,
  debug: true,
  pool: { min: 0, max: 50 },
});
