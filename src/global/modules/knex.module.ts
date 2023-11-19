import { Module, Global } from '@nestjs/common';
import Knex from 'knex';
import knexConfigs from '../../../knexfile';

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
