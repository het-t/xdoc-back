import { BlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository";
import { makeMockLoadBlocksByPointers } from "@main/factories/use-cases/blocks/load-blocks-by-pointers.mock";
import { GetBlockPermissionsByIds } from "./GetBlockPermissionsByIds";
import { LoadBlocksByPointers } from "./LoadBlocksByPointers";
import { makeGetBlockPermissionsByIds } from "@main/factories/use-cases/blocks/get-block-permissions-by-ids";
import { Block } from "@domain/interfaces/Block";

describe("usecase loadBlocksByPointers", () => {

    let loadBlocksByPointersUsecase: LoadBlocksByPointers;
    let mockBlockRepository: jest.Mocked<BlockRepository>;
    let mockGetBlockPermissionsByIds: jest.Mocked<GetBlockPermissionsByIds>;

    beforeEach(() => {
        loadBlocksByPointersUsecase = makeMockLoadBlocksByPointers();
        mockBlockRepository = (loadBlocksByPointersUsecase as any).loadBlocksByPointersRepository;
        mockGetBlockPermissionsByIds = (loadBlocksByPointersUsecase as any).getBlockPermissionsByIds;

        mockGetBlockPermissionsByIds.execute = jest.fn();
    });

    it("block do not exists", async() => {
        const mockInput = {
            pointers: [{
                id: "93c31799-f1e3-495c-a17a-8ba5089b9199",
                table: "block",
                spaceId: "095a7ba0-7e68-40b2-ab82-4bde27e8c391"
            }],
            userId: "095a7ba0-7e68-40b2-ab82-4bde27e8c391"
        };
        
        mockGetBlockPermissionsByIds.execute.mockResolvedValue([]);

        const result = await loadBlocksByPointersUsecase.execute(mockInput);

        expect(result).toEqual({});
    });
    
    it("block is in teamspace, user is not part of it, but team settings allows view access for space_members", async() => {
        const mockInput = {
            pointers: [{
                id: "93c31799-f1e3-495c-a17a-8ba5089b9199",
                table: "block",
                spaceId: "095a7ba0-7e68-40b2-ab82-4bde27e8c391"
            }],
            userId: "095a7ba0-7e68-40b2-ab82-4bde27e8c391"
        };
        
        mockGetBlockPermissionsByIds.execute.mockResolvedValue([{
            id: "93c31799-f1e3-495c-a17a-8ba5089b9199",
            space_id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
            effective_parent_table: "team",
            team_permissions: [],
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
        }]);

        const mockRecordValues: Array<Block> = [{
            id: "93c31799-f1e3-495c-a17a-8ba5089b9199",
            type: "page",
            created_by_id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
            created_time: 1,
            last_edited_by_id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
            last_edited_time: 1,
            space_id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
            alive: true,
            properties: {},
            format: {},
            content: [],
            parent_id: "095a7ba0-7e68-40b2-ab82-4bde27e8c391",
            parent_table: "xdoc_space",
            view_ids: [],
            created_by_table: "xdoc_space",
            last_edited_by_table: "xdoc_user",
            permissions: []
        }];

        mockBlockRepository.loadBlocksByPointers.mockResolvedValue({
            rows: mockRecordValues,
            rowCount: 1
        });

        const result = await loadBlocksByPointersUsecase.execute(mockInput);

        expect(result).toEqual({
            recordValue: 
        });
    });

});

/**
 * Section1: request is for table block
 *  test1: block do not exists
 *  test2: block is in teamspace, user is not part of it, but team settings allows view access for space_members
 *  test3: block is in teamspace, user is not part of it, and team settings do not allow any access for space_members
 *  test4: block is private, user do not have access
 *  test5: block is private, user has access through overriden permissions
 * 
 * Section2: request if for space
 */