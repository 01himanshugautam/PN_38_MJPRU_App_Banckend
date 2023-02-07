const path = require('path');
require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    pool: { min: 0, max: 1 },
    migrations: {
      directory: path.join(__dirname, 'src/database/migrations/'),
    },
    seeds: {
      directory: path.join(__dirname, 'src/database/seeds/'),
    },
  },

  staging: {},

  production: {},
}['development'];
