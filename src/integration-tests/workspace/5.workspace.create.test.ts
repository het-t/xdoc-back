import { _req } from "../index"
import { generateTestToken } from "../generateTestToken";
import { clearTables } from "../clearTables";
import { runSeeds } from "../runSeeds";
import { knexPool } from "@infrastructure/db/postgres/knex/knex";

describe("Integration test: Workspace create", () => {
    beforeAll(async () => {
        await clearTables();
        await runSeeds();
    });

    afterAll(async () => {
        await clearTables();
    });

    it("create workspace", async () => {
        const result = await _req.post("/api/v1/createSpace")
        .set("token_v1", generateTestToken())
        .send({
            name: "Heaven on Earth"
        });

        let [{ count }] = await knexPool("space")
            .count("id")
            .where({
                name: "Heaven on Earth",
                created_by_id: "c09448fd-6974-4aa5-8d96-9769434287f7",
                last_edited_by_id: "c09448fd-6974-4aa5-8d96-9769434287f7"
            });

        count = parseInt(count.toString());

        expect(count).toBe(1);
        expect(result.body).toHaveProperty("spaceId");
        expect(result.status).toBe(200);
    });
})