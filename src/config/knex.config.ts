import { knexConfigObj } from '../database/database';
import { Model } from 'objection';

export default function knexConfig() {
  Model.knex(knexConfigObj);
  console.log('PSQL Database Connected');
}
