import { knex } from "knex";
import env from "@config/env";

describe("Postgresql database connection", () => {
    it("should establish successful db connection", async() => {
        const connection = knex({
            client: "pg",
            connection: {
                connectionString: `postgres://${env.pgUser}:${env.pgPassword}@${env.pgHost}:${env.pgPort}/${env.pgDatabase}`
            }
        }); 

        expect(connection).toBeTruthy();
    })
})