/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    try {
        await knex.schema.alterTable("space", (table) => {
            table.foreign("created_by_id")
                .references("id")
                .inTable("xdoc_user");

            table.foreign("last_edited_by_id")
                .references("id")
                .inTable("xdoc_user");
        });

        await knex.schema.alterTable("space_user", (table) => {
            table.foreign("user_id")
                .references("id")
                .inTable("xdoc_user");

            table.foreign("space_id")
                .references("id")
                .inTable("space");
        });
    } catch(err) {
        console.log(err);
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    try {
        await knex.schema.alterTable("space", (table) => {
          table.dropForeign("id");
        });

        await knex.schema.alterTable("space_user", (table) => {
            table.dropForeign("user_id");

            table.dropForeign("space_id");
        });
    } catch(err) {
        console.log(err);
    }
};
