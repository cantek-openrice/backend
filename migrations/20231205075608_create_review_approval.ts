import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('review_approval'))) {
    await knex.schema.createTable('review_approval', (table) => {
      table
        .uuid('review_approval_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.uuid('review_id').notNullable();
      table.foreign('review_id').references('review.review_id');
      table.uuid('review_photo_id').notNullable();
      table
        .foreign('review_photo_id')
        .references('review_photo.review_photo_id');
      table.uuid('image_id');
      table.foreign('image_id').references('image.image_id');
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('review_approval');
}
