import { _req } from "../index";
import { clearTables } from "../clearTables";
import { runSeeds } from "../runSeeds";
import { generateTestToken } from "../generateTestToken";
import { knexPool } from "@infrastructure/db/postgres/knex/knex";

describe("Integration: Teamspace create (/createTeam)", () => {
    beforeEach(async() => {
        await clearTables();
        await runSeeds();
    });

    afterEach(async() => {
        await clearTables();
    });

    it("open teamspace", async() => {
        const result = await _req.post("/api/v1/createTeam")
        .set("token_v1", generateTestToken())
        .send({
            spaceId: "9503ac1a-4db1-4183-93f1-665f4515fa64",
            name: "HR team",
            description: "We will let you know",
            isDefault: false,
            accessLevel: "open"
        });

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("teamId");


        const [{count}] = await knexPool("team")
        .count()
        .where({
            id: result.body.teamId
        })
        .whereRaw(`settings->>'visibility' = 'space_members'`)
        .whereRaw(`settings->>'invite_access' = 'team_members'`)
        .whereRaw(`settings->>'space_member_join_access' = 'self_join'`);

        expect(count).toBe("1");
    });

    it("closed teamspace", async() => {
        const result = await _req.post("/api/v1/createTeam")
        .set("token_v1", generateTestToken())
        .send({
            spaceId: "9503ac1a-4db1-4183-93f1-665f4515fa64",
            name: "HR team",
            description: "We will let you know",
            isDefault: false,
            accessLevel: "closed"
        });

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("teamId");

        const team = await knexPool("team")
        .select()
        .where({
            id: result.body.teamId
        })
        .whereRaw(`settings->>'invite_access' = 'team_members'`)
        .whereRaw(`settings->>'space_member_join_access' = 'invite_only'`)

        expect(team).toHaveLength(1);

        team[0].permissions.forEach((p: any) => {
            if(p.type == 'space_permission') expect(p.role).toBe("none");
        });
    });

    it("private teamspace", async() => {
        const result = await _req.post("/api/v1/createTeam")
        .set("token_v1", generateTestToken())
        .send({
            spaceId: "9503ac1a-4db1-4183-93f1-665f4515fa64",
            name: "HR team",
            description: "We will let you know",
            isDefault: false,
            accessLevel: "private"
        });

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("teamId");

        const team = await knexPool("team")
        .select()
        .where({
            id: result.body.teamId
        })
        .whereRaw(`settings->>'visibility' = 'team_members'`)
        .whereRaw(`settings->>'invite_access' = 'team_members'`)
        .whereRaw(`settings->>'space_member_join_access' = 'invite_only'`)

        expect(team).toHaveLength(1);

        team[0].permissions.forEach((p: any) => {
            if(p.type == 'space_permission') expect(p.role).toBe("none");
        });
    });

    it("default teamspace", async() => {
        const result = await _req.post("/api/v1/createTeam")
        .set("token_v1", generateTestToken())
        .send({
            spaceId: "9503ac1a-4db1-4183-93f1-665f4515fa64",
            name: "HR team",
            description: "We will let you know",
            isDefault: true,
            accessLevel: "default"
        });

        expect(result.status).toBe(200);
        expect(result.body).toHaveProperty("teamId");

        const [{count}] = await knexPool("team")
        .count()
        .where({
            id: result.body.teamId
        })
        .whereRaw(`settings->>'visibility' = 'space_members'`)
        .whereRaw(`settings->>'invite_access' = 'team_members'`)
        .whereRaw(`settings->>'space_member_join_access' = 'self_join'`);

        expect(count).toBe("1");
    });
});