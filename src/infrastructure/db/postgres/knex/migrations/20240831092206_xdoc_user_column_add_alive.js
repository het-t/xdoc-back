/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable("xdoc_user", (table) => {
        table.boolean("alive")
            .defaultTo(true)
            .notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("xdoc_user", (table) => {
        table.dropColumns("alive");
    })
};
