import { knexPool } from "@infrastructure/db/postgres/knex/knex";

export async function clearTables() {
    const tables: string[] = [
        "space_user",
        "xdoc_user_auth",
        "space",
        "xdoc_user",
        "invite",
        "user_root",
    ];

    return Promise.all(
        tables.map(async table => {
            return knexPool.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`)
        })
    )
}