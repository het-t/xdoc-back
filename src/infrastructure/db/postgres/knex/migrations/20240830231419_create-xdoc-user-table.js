/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("xdoc_user", (table) => {
        table.uuid("id")
            .notNullable()
            .primary();
        table.integer("version")
            .defaultTo(1);
        table.string("email", 254)
            .notNullable();
        table.string("name", 100)
            .notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTableIfExists("xdoc_user");
};
