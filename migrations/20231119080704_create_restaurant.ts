import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('restaurant'))) {
    await knex.schema.createTable('restaurant', (table) => {
      table
        .uuid('restaurant_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.text('name').notNullable();
      table.text('address').notNullable();
      table.text('phone').notNullable();
      table.uuid('district_id').notNullable();
      table.foreign('district_id').references('district.district_id');
      table.text('postal_code').notNullable();
      table.decimal('latitude', 6, 2).notNullable();
      table.decimal('longitude', 6, 2).notNullable();
      table.text('intro').notNullable();
      table.text('opening_hours').notNullable();
      table.text('cover_image_url');
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('modified_at').notNullable();
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('restaurant');
}
