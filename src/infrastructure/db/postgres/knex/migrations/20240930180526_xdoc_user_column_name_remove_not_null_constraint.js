/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.alterTable("xdoc_user", (table) => {
    table.string("name", 100)
    .nullable()
    .alter();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.alterTable("xdoc_user", (table) => {
        table.string("name", 100)
        .notNullable()
        .alter();
      })
};
