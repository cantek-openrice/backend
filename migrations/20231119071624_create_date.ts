import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('date'))) {
    await knex.schema.createTable('date', (table) => {
      table
        .uuid('date_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.text('date_name').notNullable();
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('date');
}
