import 'reflect-metadata';
import { config as dotConfig } from 'dotenv';
import { Migration } from '../../migration.config';
import { EnvironmentService } from './configs/env';
import { appServer } from './server';
import { logger } from './utils';

dotConfig();

class Server {

  public start() {
    logger.info('Running Server.start');

    const PORT = EnvironmentService.getOne('port') || 8088;

    // run knex migration
    Migration.run() /* this will run all knex migration to set up the db */

    if (require.main) {
      appServer.listen(PORT, () => {
        logger.info('')
        logger.info('===========================');
        logger.info(`  Listening on port: ${PORT}`);
        logger.info('===========================');
        logger.info('');
      });
    }
  }
}

new Server().start();
