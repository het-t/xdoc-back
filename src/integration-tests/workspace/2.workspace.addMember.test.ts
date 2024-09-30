import { generateTestToken } from "../generateTestToken";
import { _req } from "../index";

const reqPayload = {
    "requestId": "5c622366-e860-4b10-800a-b6dc1343e6c2",
    "transactions": [
        {
            "id": "72ec0f2c-9952-40b8-aa1d-3c525ce1e82e",
            "spaceId": "9503ac1a-4db1-4183-93f1-665f4515fa64",
            "debug": {
                "userAction": "permissionsActions.savePermissionItems"
            },
            "operations": [
                {
                    "pointer": {
                        "table": "invite",
                        "id": "e998236c-ec85-4f26-873b-bbc64300f345",
                        "spaceId": "9503ac1a-4db1-4183-93f1-665f4515fa64"
                    },
                    "path": [],
                    "command": "update",
                    "args": {
                        "id": "e998236c-ec85-4f26-873b-bbc64300f345",
                        "version": 1,
                        "flow_id": "ac8d869d-c166-4397-8ec3-ba18b653a77f",
                        "space_id": "9503ac1a-4db1-4183-93f1-665f4515fa64",
                        "target_id": "9503ac1a-4db1-4183-93f1-665f4515fa64",
                        "target_table": "space",
                        "inviter_id": "c09448fd-6974-4aa5-8d96-9769434287f7",
                        "inviter_table": "xdoc_user",
                        "invitee_id": "c09448fd-6974-4aa5-8d96-9769434287f7",
                        "invitee_table_or_group": "xdoc_user",
                        "message": "",
                        "created_time": 1724937197470,
                        "attributes": {
                            "permission": {
                                "type": "user_permission",
                                "role": "editor",
                                "user_id": "c09448fd-6974-4aa5-8d96-9769434287f7",
                                "invite_id": "e998236c-ec85-4f26-873b-bbc64300f345"
                            },
                            "origin_type": "space_settings_add_members"
                        }
                    }
                },
                {
                    "pointer": {
                        "table": "space_user",
                        "id": "c09448fd-6974-4aa5-8d96-9769434287f7|9503ac1a-4db1-4183-93f1-665f4515fa64",
                        "spaceId": "9503ac1a-4db1-4183-93f1-665f4515fa64"
                    },
                    "command": "update",
                    "path": [],
                    "args": {
                        "id": "c09448fd-6974-4aa5-8d96-9769434287f7|9503ac1a-4db1-4183-93f1-665f4515fa64",
                        "user_id": "c09448fd-6974-4aa5-8d96-9769434287f7",
                        "space_id": "9503ac1a-4db1-4183-93f1-665f4515fa64",
                        "invite_id": "e998236c-ec85-4f26-873b-bbc64300f345",
                        "membership_type": "owner"
                    }
                }
            ]
        }
    ]
};

describe("Integration test", () => {
    it("/saveTransactions", async () => {
        const result = await _req.post("/api/v1/saveTransactions")
        .set("token_v1", generateTestToken())
        .send(reqPayload);

        expect(result.status).toBe(200);
    });
});