/* eslint-disable @typescript-eslint/no-var-requires */
import { Module, Global } from '@nestjs/common';
import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/./.env.local' });

const knexConfigs = require('./knexfile'); // must use require instead of import
const configMode = process.env.NODE_ENV || 'development';
const knexConfig = knexConfigs[configMode];

@Global()
@Module({
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: () => {
        const knex = Knex(knexConfig);
        return knex;
      },
    },
  ],
  exports: ['KnexConnection'],
})
export class KnexModule {}
