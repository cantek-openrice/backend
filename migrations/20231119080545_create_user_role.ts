import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user_role'))) {
    await knex.schema.createTable('user_role', (table) => {
      table
        .uuid('user_role_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.uuid('user_role_name').notNullable();
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_role');
}
