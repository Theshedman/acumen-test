import { EnvironmentService } from './src/app/configs/env';

const {
  db_host, db_password, db_port,
  db_user, db_name
} = EnvironmentService.getMany();

class KnexConfig {
  public static knexFile = {
    client: 'pg',
    connection: {
      host: db_host,
      port: db_port,
      user: db_user,
      password: db_password,
      database: db_name,
      sslmode: 'disable',
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'acumen_migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/database/seeds',
      extension: 'ts',
    },
  }

  public static KnexEnv = {
    production:  KnexConfig.knexFile,

    development:  KnexConfig.knexFile,

    test: {
      ...KnexConfig.knexFile,
      debug: true,
    },
  }
}

module.exports = KnexConfig.KnexEnv;
