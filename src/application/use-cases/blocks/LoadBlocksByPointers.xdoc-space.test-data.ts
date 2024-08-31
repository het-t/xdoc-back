import { IPointer } from "@domain/interfaces/ITransaction";
import { Role } from "@domain/interfaces/Role";
import { UUID } from "crypto";

const spaceId = "c79dd9eb-5fb7-4ad5-8d3e-206afd8e6cb6";
const userId = "095a7ba0-7e68-40b2-ab82-4bde27e8c391";

const defaultMockInputSpace = {
    pointers: [{
        id: spaceId,
        table: "xdoc_space"
    }],
    userId
};


type Scenario = {
    description: string;
    mockInput: {
        pointers: IPointer[],
        userId: UUID
    },
    mockUserSpaceRoles: {
        id: UUID,
        role: "member"
        | "owner"
        | null
    }[],
    mockRecordValues: any[],
    expectedResults: {
        value: Record<string, any>,
        role: Role
    }[]
};

const defaultMockRecordValueSpace = {
    id: spaceId,
    name: "Angel's Notion",
    permissions: [{
        role: "member",
        type: "user_permission",
        user_id: userId,
        invite_id: "1f538aaa-9f94-4e1c-951c-7c82db2a412c"
    }],
    pages: [],
    created_time: 1,
    last_edited_time: 1,
    created_by_table: "xdoc_user",
    created_by_id: userId,
    last_edited_by_table: "xdoc_user",
    last_edited_by_id: userId,
    plan_type: "team",
    invite_link_enabled: true,
    settings: {},
    sucscription_tier: "free"
};

export const spaceScenarios: Scenario[] = [
    {
        description: "xdoc_space, user is member of space",
        mockInput: defaultMockInputSpace as any,
        mockUserSpaceRoles: [{
            id: spaceId,
            role: "member"
        }],
        mockRecordValues: [defaultMockRecordValueSpace],
        expectedResults: [{
            value: defaultMockRecordValueSpace,
            role: "reader"
        }]
    },
    {
        description: "xdoc_space, user is owner of space",
        mockInput: defaultMockInputSpace as any,
        mockUserSpaceRoles: [{
            id: spaceId,
            role: "owner"
        }],
        mockRecordValues: [{
            ...defaultMockRecordValueSpace,
            permissions: [{
                user_id: userId,
                role: "owner",
                invite_id: "1f538aaa-9f94-4e1c-951c-7c82db2a412c",
                type: "user_permission"
            }]
        }],
        expectedResults: [{
            value: {
                ...defaultMockRecordValueSpace,
                permissions: [{
                    user_id: userId,
                    role: "owner",
                    invite_id: "1f538aaa-9f94-4e1c-951c-7c82db2a412c",
                    type: "user_permission"
                }]
            },
            role: "editor"
        }]
    },
    {
        description: "xdoc_space, user is not in space",
        mockInput: defaultMockInputSpace as any,
        mockUserSpaceRoles: [{
            id: spaceId,
            role: null
        }],
        mockRecordValues: [],
        expectedResults: [{
            value: {
                id: spaceId
            },
            role: "none"
        }]
    }
];