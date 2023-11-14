import type { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    // client: 'sqlite3',
    // connection: {
    //   filename: './dev.sqlite3',
    // },
    client: 'postgresql',
    // debug: true,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT_NUMBER),
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  testing: {
    client: 'postgresql',
    connection: {
      host: process.env.TEST_DB_HOST,
      port: parseInt(process.env.TEST_DB_PORT_NUMBER),
      database: process.env.TEST_DB_NAME,
      user: process.env.TEST_DB_USERNAME,
      password: process.env.TEST_DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

// module.exports = config; // es5
export default config; // es6
