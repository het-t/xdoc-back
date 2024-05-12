import env from "@config/env";
import { knex } from "knex";

export const pool = knex({
    client: "pg",
    connection: {
        connectionString: `postgres://${env.pgUser}:${env.pgPassword}@${env.pgHost}:${env.pgPort}/${env.pgDatabase}`
    }
});