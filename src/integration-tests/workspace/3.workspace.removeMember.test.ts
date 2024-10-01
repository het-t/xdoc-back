import { knexPool } from "@infrastructure/db/postgres/knex/knex";
import { generateTestToken } from "../generateTestToken";
import { _req } from "../index";
import { runSeeds } from "../runSeeds";
import { clearTables } from "../clearTables";

describe("Integration test: Workspace remove member (/removeUsersFromSpace)", () => {
    beforeEach(async () => {
        await clearTables();
        await runSeeds();
    });
    
    afterEach(async () => {
        await clearTables();
    });
    
    it("removing member", async () => {
        await knexPool("space_user")
        .insert({
            id: "d5a93cea-695e-4b76-a12f-d552cfbc606f|9503ac1a-4db1-4183-93f1-665f4515fa64",
            user_id: "d5a93cea-695e-4b76-a12f-d552cfbc606f",
            space_id: "9503ac1a-4db1-4183-93f1-665f4515fa64",
            invite_id: null,
            membership_type: "member",
            version: 1
        });

        const result = await makeRequest(["d5a93cea-695e-4b76-a12f-d552cfbc606f"]);

        expect(result.status).toBe(200);

        const [{count}] = await knexPool("space_user")
        .where({
            id: "d5a93cea-695e-4b76-a12f-d552cfbc606f|9503ac1a-4db1-4183-93f1-665f4515fa64"
        })
        .count();

        expect(count).toBe("0");
    });

    it("removing user which is not member of workspace", async () => {
        const result = await makeRequest(["e9b8aa35-06f8-4ea8-912a-034c43ecdc5c"]);

        expect(result.status).toBe(200);
    });
});

async function makeRequest(userIds: string[]) {
    const payload = {
        userIds: [
            ...userIds
        ],
        spaceId: "9503ac1a-4db1-4183-93f1-665f4515fa64",
        removePagePermissions: true,
        revokeUserTokens: false
    };

    return _req.post("/api/v1/removeUsersFromSpace")
        .set("token_v1", generateTestToken())
        .send(payload);
}