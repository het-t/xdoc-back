/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("invite", (table) => {
        table.uuid("id")
            .notNullable()
            .primary();
        table.uuid("flow_id")
            .notNullable();
        table.uuid("space_id")
            .notNullable();
        table.uuid("target_id")
            .notNullable();
        table.specificType("target_table", "xdoc_table")
            .notNullable();
        table.uuid("inviter_id")
            .notNullable();
        table.specificType("inviter_table", "xdoc_table")
            .notNullable();
        table.uuid("invitee_id")
            .notNullable();
        table.specificType("invitee_table", "xdoc_table")
            .notNullable();
        table.text("message")
            .defaultTo("");
        table.bigInteger("created_time")
            .notNullable()
            .defaultTo(knex.raw("EXTRACT(EPOCH FROM NOW())"));
        table.bigInteger("last_edited_time")
            .notNullable()
            .defaultTo(knex.raw("EXTRACT(EPOCH FROM NOW())"));
        table.jsonb("attributes")
            .notNullable()
            .defaultTo('{}');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("invite");
};
