import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('restaurant_payment'))) {
    await knex.schema.createTable('restaurant_payment', (table) => {
      table
        .uuid('restaurant_payment_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.uuid('restaurant_id').notNullable();
      table.foreign('restaurant_id').references('restaurant.restaurant_id');
      table.uuid('payment_method_id').notNullable();
      table
        .foreign('payment_method_id')
        .references('payment_method.payment_method_id');
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('restaurant_payment');
}
