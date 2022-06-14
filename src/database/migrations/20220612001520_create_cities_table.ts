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
              .createTable(TableName.cities, (tableBuilder: Knex.CreateTableBuilder) => {
                tableBuilder
                  .bigIncrements('id')
                  .unique()
                  .primary({ constraintName: 'city_pkey' })
                  .notNullable();
                tableBuilder
                  .string('name')
                  .unique()
                  .notNullable();
                tableBuilder
                  .decimal('latitude')
                  .notNullable();
                tableBuilder
                  .decimal('longitude')
                  .notNullable();
              });
          }
        })));
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .withSchema(SchemaName.acumenService)
    .dropTableIfExists(TableName.cities);
}

