import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('restaurant_owner'))) {
    await knex.schema.createTable('restaurant_owner', (table) => {
      table
        .uuid('restaurant_owner_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.uuid('user_id').notNullable();
      table.foreign('user_id').references('user.user_id');
      table.uuid('restaurant_id').notNullable();
      table.foreign('restaurant_id').references('restaurant.restaurant_id');
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('restaurant_owner');
}
