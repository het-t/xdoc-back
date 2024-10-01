import { knexPool } from "@infrastructure/db/postgres/knex/knex";

export async function runSeeds() {
    await knexPool.seed.run();
}