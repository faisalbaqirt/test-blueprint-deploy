/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.timestamps(true, true);
    table.string("username").notNullable().unique();
    table.string("email").notNullable();
    table.string("name");
    table.string("password");
    table.string("photo").defaultTo("https://res.cloudinary.com/dxgjnu4h8/image/upload/v1698433031/users/profile_ccs4ks.jpg");
    table.string("role").defaultTo("user")
});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
