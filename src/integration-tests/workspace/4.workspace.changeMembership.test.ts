import { knexPool } from "@infrastructure/db/postgres/knex/knex";
import { _req } from "../index"
import { generateTestToken } from "../generateTestToken";
import { clearTables } from "../clearTables";
import { runSeeds } from "../runSeeds";


describe("Integration test: Workspace change membership ()", () => {
    beforeEach(async () => {
        await clearTables();
        await runSeeds();    
    });
    
    afterEach(async () => {
        await clearTables();
    });

    it("changing from member to owner", async () => {
        await knexPool("space_user")
        .insert({
            id: "d5a93cea-695e-4b76-a12f-d552cfbc606f|9503ac1a-4db1-4183-93f1-665f4515fa64",
            user_id: "d5a93cea-695e-4b76-a12f-d552cfbc606f",
            space_id: "9503ac1a-4db1-4183-93f1-665f4515fa64",
            invite_id: null,
            membership_type: "member",
            version: 1
        });

        const result = await makeRequest("owner");

        expect(result.status).toBe(200);

        const [{ membership_type: membership }] = await knexPool("space_user") 
            .select("membership_type")
            .where({
                id: "d5a93cea-695e-4b76-a12f-d552cfbc606f|9503ac1a-4db1-4183-93f1-665f4515fa64"
            });
        
        expect(membership).toBe("owner");
    });

    it("changing from owner to member", async () => {
        await knexPool("space_user")
        .insert({
            id: "d5a93cea-695e-4b76-a12f-d552cfbc606f|9503ac1a-4db1-4183-93f1-665f4515fa64",
            user_id: "d5a93cea-695e-4b76-a12f-d552cfbc606f",
            space_id: "9503ac1a-4db1-4183-93f1-665f4515fa64",
            invite_id: null,
            membership_type: "owner",
            version: 1
        });

        const result = await makeRequest("member");
       
        expect(result.status).toBe(200);

        const [{ membership_type: membership }] = await knexPool("space_user") 
            .select("membership_type")
            .where({
                id: "d5a93cea-695e-4b76-a12f-d552cfbc606f|9503ac1a-4db1-4183-93f1-665f4515fa64"
            });
        
        expect(membership).toBe("member");
    });
});

async function makeRequest(membership: "owner" | "member") {
    const payload = {
        "requestId": "7affead7-bac3-4d44-899a-d9609de95508",
        "transactions": [
            {
                "id": "45e9020f-7615-4240-8064-7f2e67ad4003",
                "spaceId": "9503ac1a-4db1-4183-93f1-665f4515fa64",
                "debug": {
                    "userAction": "TeamMembersPermissionRow.permissionComponent"
                },
                "operations": [
                    {
                        "pointer": {
                            "table": "space_user",
                            "id": "d5a93cea-695e-4b76-a12f-d552cfbc606f|9503ac1a-4db1-4183-93f1-665f4515fa64",
                            "spaceId": "9503ac1a-4db1-4183-93f1-665f4515fa64"
                        },
                        "command": "update",
                        "path": [],
                        "args": {
                            "membership_type": membership
                        }
                    }
                ]
            }
        ]
    };

    return _req.post("/api/v1/saveTransactions")
        .set("token_v1", generateTestToken())
        .send(payload);
}