import { Knex } from 'knex';
import { SchemaName, TableName } from '../db.config';


export async function up(knex: Knex): Promise<void> {
  return knex
    .transaction(async (trx) => trx.schema
      .createSchemaIfNotExists(SchemaName.acumenService)
      .then(() => trx.schema.hasTable('users')
        .then((tableExists: boolean) => {
          if (!tableExists) {
            return trx.schema
              .withSchema(SchemaName.acumenService)
              .createTable(TableName.webhooks, (tableBuilder: Knex.CreateTableBuilder) => {
                tableBuilder
                  .bigIncrements('id')
                  .unique()
                  .primary({ constraintName: 'webhook_pkey' })
                  .notNullable();
                tableBuilder
                  .bigInteger('city_id')
                  .unsigned()
                  .notNullable();
                tableBuilder
                  .string('callback_url')
                  .notNullable();

                // foreign keys
                tableBuilder
                  .foreign('city_id')
                  .references('id')
                  .inTable(`${SchemaName.acumenService}.${TableName.cities}`);
              });
          }
        })));
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(SchemaName.acumenService)
    .dropTableIfExists(TableName.webhooks);
}

