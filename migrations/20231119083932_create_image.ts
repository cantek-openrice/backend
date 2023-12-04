import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('image'))) {
    await knex.schema.createTable('image', (table) => {
      table
        .uuid('image_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.text('image_url').notNullable();
      table.uuid('image_category_id').notNullable();
      table
        .foreign('image_category_id')
        .references('image_category.image_category_id');
      table.uuid('photo_category_id').notNullable();
      table
        .foreign('photo_category_id')
        .references('photo_category.photo_category_id');
      table.uuid('image_container_id').notNullable();
      table
        .foreign('image_container_id')
        .references('image_container.image_container_id');
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamps(false, true);
      table.uuid('date_id').notNullable();
      table.foreign('date_id').references('date.date_id');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('image');
}
