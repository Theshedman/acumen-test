import knex, { Knex } from 'knex';
import { EnvironmentService } from './env';

const env = EnvironmentService.getMany();

const db = require('../../../knexfile')[env.node_env || 'development'];

export class Db {
  public static getConnection(): Knex {
    return knex(db);
  }
}
