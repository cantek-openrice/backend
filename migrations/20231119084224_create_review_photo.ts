import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('review_photo'))) {
    await knex.schema.createTable('review_photo', (table) => {
      table
        .uuid('review_photo_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.uuid('review_id').notNullable();
      table.foreign('review_id').references('review.review_id');
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
  await knex.schema.dropTableIfExists('review_photo');
}
