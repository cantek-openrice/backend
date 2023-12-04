import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('image_category'))) {
    await knex.schema.createTable('image_category', (table) => {
      table
        .uuid('image_category_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.text('image_category_name').notNullable();
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamps(false, true);
      table.uuid('date_id').notNullable();
      table.foreign('date_id').references('date.date_id');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('image_category');
}
