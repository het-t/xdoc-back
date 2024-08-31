/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.schema.createTable("space_user", (table) => {
        table.uuid("user_id")
            .notNullable();
        table.uuid("space_id")
            .notNullable();
        table.specificType("membership_type", "space_user_membership")
            .notNullable()
            .defaultTo("member");
        table.uuid("invite_id");
        table.integer("version")
            .defaultTo(1);
        table.primary(["user_id", "space_id"]);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("space_user");
};
