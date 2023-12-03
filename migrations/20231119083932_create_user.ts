import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', (table) => {
      table
        .uuid('user_id')
        .primary()
        .defaultTo(knex.raw('gen_random_uuid()'))
        .notNullable();
      table.text('email').notNullable();
      table.text('username').notNullable();
      table.text('password').notNullable();
      table.string('role');
      table.uuid('user_role_id');
      table.foreign('user_role_id').references('user_role.user_role_id');
      table.text('profile_picture_url');
      table.uuid('image_id');
      table.foreign('image_id').references('image.image_id');
      table.boolean('active').notNullable().defaultTo(true);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('modified_at');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user');
}
