import { knexPool } from "@infrastructure/db/postgres/knex/knex";
import { _req } from "../index";
import { clearTables } from "../clearTables";
import { generateTestToken } from "../generateTestToken";
import { runSeeds } from "../runSeeds";

describe("Integration test: User create (/)", () => {
    beforeAll(async () => {
        await clearTables();
        await runSeeds();
    });

    afterAll(async () => {
        await clearTables();
    });

    it("create user", async () => {
        const result = await _req.post("/api/v1/createEmailUser")
            .set("token_v1", generateTestToken())
            .send({
                email: "someone@gmail.com"
            });

        expect(result.status).toBe(200);

        let [{ count }] = await knexPool("xdoc_user")
        .count()
        .where({
            email: "someone@gmail.com"
        });

        count = parseInt(count.toString());

        expect(count).toBe(1);
    });

    it("create user with existing email", async () => {
        let [{ count: countBefore }] = await knexPool("xdoc_user")
        .count()
        .where({
            email: "someone@gmail.com"
        });

        countBefore = parseInt(countBefore.toString());

        expect(countBefore).toBe(1);

        const result = await _req.post("/api/v1/createEmailUser")
            .set("token_v1", generateTestToken())
            .send({
                email: "someone@gmail.com"
            });

        expect(result.status).toBe(403);

        let [{ count: countAfter }] = await knexPool("xdoc_user")
        .count()
        .where({
            email: "someone@gmail.com"
        });
        
        countAfter = parseInt(countAfter.toString());

        expect(countAfter).toBe(1);
    })
});