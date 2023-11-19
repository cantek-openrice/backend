import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('review'))) {
    await knex.schema.createTable('review', (table) => {
      table
        .uuid('review_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.uuid('user_id').notNullable();
      table.foreign('user_id').references('user.user_id');
      table.uuid('restaurant_id').notNullable();
      table.foreign('restaurant_id').references('restaurant.restaurant_id');
      table.text('title').notNullable();
      table.text('content').notNullable();
      table.bigInteger('rating').notNullable();
      table.bigInteger('spending').notNullable();
      table.timestamp('visited_at').notNullable();
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('modified_at').notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('review');
}
