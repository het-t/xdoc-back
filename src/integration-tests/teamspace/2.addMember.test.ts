import { _req } from "../index";
import { clearTables } from "../clearTables";
import { runSeeds } from "../runSeeds";
import { generateTestToken } from "../generateTestToken";
import { UUID } from "crypto";
import { knexPool } from "@infrastructure/db/postgres/knex/knex";

describe("Integration test: Teamspace add member (/updateTeamMembers)", () => {
    let teamId: UUID;

    beforeAll(async () => {
        await clearTables();
        await runSeeds();
    });

    afterAll(async () => {
        await clearTables();
        await runSeeds();
    });

    it("adding space member to teamspace", async () => {
        const result = await _req.post("/api/v1/updateTeamMembers")
        .set("token_v1", generateTestToken())
        .send({
            spaceId: "9503ac1a-4db1-4183-93f1-665f4515fa64",
            teamId: "e008d30c-2527-4cfd-9c90-2fcd6ac000c5",
            newMembersOrGuestsToAdd: [{
                entity_type: "user",
                type: "member",
                user_id: "f4bc614a-2dc2-48b9-9d76-0eff4d1f990a"
            }],
            isSettingDefaultTeam: false,
            addNewMembersToSpace: true
        });

        const [{membership}] = await knexPool("team")
        .select("membership")
        .where({
            id: "e008d30c-2527-4cfd-9c90-2fcd6ac000c5"
        });

        const newAddedMembership = membership.find((m: any) => m.user_id === "f4bc614a-2dc2-48b9-9d76-0eff4d1f990a");

        expect(newAddedMembership).toMatchObject({
            entity_type: "user",
            user_id: "f4bc614a-2dc2-48b9-9d76-0eff4d1f990a",
            type: "member"
        });

        expect(result.status).toBe(200);
    })
});