import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('menu_photo'))) {
    await knex.schema.createTable('menu_photo', (table) => {
      table
        .uuid('menu_photo_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.uuid('restaurant_id').notNullable();
      table.foreign('restaurant_id').references('restaurant.restaurant_id');
      table.uuid('photo_category_id').notNullable();
      table
        .foreign('photo_category_id')
        .references('photo_category.photo_category_id');
      table.text('photo_url').notNullable();
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('menu_photo');
}
