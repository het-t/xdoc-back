import { IPointer } from "@domain/interfaces/ITransaction";
import { Role } from "@domain/interfaces/Role";
import { UUID } from "crypto";

const spaceId = "c79dd9eb-5fb7-4ad5-8d3e-206afd8e6cb6";
const userId = "095a7ba0-7e68-40b2-ab82-4bde27e8c391";

const defaultMockPermissionByIds = {
    id: "93c31799-f1e3-495c-a17a-8ba5089b9199",
    space_id: spaceId,
    effective_parent_table: "team",
    team_permissions: [{
        type: "explicit_team_permission",
        role: "editor",
        team_id: "048143ba-2079-468d-a505-5b9919a53629"
    }],
    is_team_default: false,
    team_settings: {
        visibility: "space_members",
        invite_access: "space_members",
        disable_export: false,
        disable_public_access: false,
        disable_team_page_edits: false,
        space_member_join_access: "self_join"
    },
    team_memberships: [{
        type: "member",
        user_id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
        entity_type: "user"
    }],
    space_role: "member",
    space_settings: {},
    block_overriden_permissions: {}
};

const defaultMockInputBlock = {
    pointers: [{
        id: "93c31799-f1e3-495c-a17a-8ba5089b9199",
        table: "block",
        spaceId
    }],
    userId
};

const defaultMockInputSpace = {
    pointers: [{
        id: spaceId,
        table: "xdoc_space"
    }],
    userId
};


const defaultMockRecordValueBlock = {
    id: "93c31799-f1e3-495c-a17a-8ba5089b9199",
    type: "page",
    created_by_id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
    created_time: 1,
    last_edited_by_id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
    last_edited_time: 1,
    space_id: spaceId,
    alive: true,
    properties: {},
    format: {},
    content: [],
    parent_id: "048143ba-2079-468d-a505-5b9919a53629",
    parent_table: "team",
    view_ids: [],
    created_by_table: "xdoc_space",
    last_edited_by_table: "xdoc_user",
    permissions: []
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
}

type Scenario = {
    description: string;
    mockInput: {
        pointers: IPointer[],
        userId: UUID
    },
    mockBlockPermissionsByIds?: any[],
    mockUserSpaceRoles?: {
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
}

export const blockScenarios: Scenario[] = [
    {
        description: "block, user is member of teamspace, member has full access to content",
        mockInput: defaultMockInputBlock as any,
        mockBlockPermissionsByIds: [defaultMockPermissionByIds] as any,
        mockRecordValues: [defaultMockRecordValueBlock],
        expectedResults: [{
            value: defaultMockRecordValueBlock,
            role: "editor"
        }]
    },
    {
        description: "block, user not in teamspace, no permission for space_members is defined",
        mockInput: defaultMockInputBlock as any,
        mockBlockPermissionsByIds: [{
            ...defaultMockPermissionByIds,
            team_memberships: [{
                type: "member",
                user_id: "4bde27e8c392-7e68-40b2-ab82-095a7ba0",
                entity_type: "user"
            }]
        }] as any,
        mockRecordValues: [],
        expectedResults: [{
            value: {
                id: defaultMockInputBlock.pointers[0].id
            },
            role: "none"
        }]
    },
    {
        description: "block, user not in teamspace, space_member have full access to content",
        mockInput: defaultMockInputBlock as any,
        mockBlockPermissionsByIds: [{
            ...defaultMockPermissionByIds,
            team_permissions: [{
                type: "explicit_team_permission",
                role: "editor",
                team_id: "048143ba-2079-468d-a505-5b9919a53629"
            }, {
                type: 'space_permission',
                role: "editor"
            }]
        }] as any,
        mockRecordValues: [defaultMockRecordValueBlock],
        expectedResults: [{
            value: defaultMockRecordValueBlock,
            role: "editor"
        }]
    },
    {
        description: "block is in teamspace, user not member of teamspace, user not member of space",
        mockInput: {
            pointers: defaultMockInputBlock.pointers,
            userId: "d0074700-33c1-4133-8adc-58f2ee239881"
        },
        mockBlockPermissionsByIds: [defaultMockPermissionByIds,] as any,
        mockRecordValues: [defaultMockRecordValueBlock],
        expectedResults: [{
            value: {
                id: defaultMockInputBlock.pointers[0].id
            },
            role: "none"
        }]
    },
    {
        description: "block does not exist // block is in teamspace, user not member of teamspace, user not member of space",
        mockInput: defaultMockInputBlock as any,
        mockBlockPermissionsByIds: [] as any,
        mockRecordValues: [],
        expectedResults: []
    }
]

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
]