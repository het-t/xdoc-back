import { BlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository";
import { makeMockLoadBlocksByPointers } from "@main/factories/use-cases/blocks/load-blocks-by-pointers.mock";
import { GetBlockPermissionsByIds } from "./GetBlockPermissionsByIds";
import { LoadBlocksByPointers } from "./LoadBlocksByPointers";
import { blockScenarios } from "./LoadBlocksByPointers.block.test-data";
import { WorkspaceRepository } from "@infrastructure/db/postgres/repositories/WorkspaceRepository";
import { spaceScenarios } from "./LoadBlocksByPointers.xdoc-space.test-data";

describe("usecase loadBlocksByPointers", () => {
    
    let mockBlockRepository: jest.Mocked<BlockRepository>;
    let mockWorkspaceRepository: jest.Mocked<WorkspaceRepository>;
    let loadBlocksByPointersUsecase: LoadBlocksByPointers;
    let mockGetBlockPermissionsByIds: jest.Mocked<GetBlockPermissionsByIds>;

    beforeEach(() => {
        loadBlocksByPointersUsecase = makeMockLoadBlocksByPointers();
        
        mockBlockRepository = (loadBlocksByPointersUsecase as any).loadBlocksByPointersRepository;
        mockWorkspaceRepository = (loadBlocksByPointersUsecase as any).getUsersSpaceRolesRepository;

        mockGetBlockPermissionsByIds = (loadBlocksByPointersUsecase as any).getBlockPermissionsByIds;
        mockGetBlockPermissionsByIds.execute = jest.fn();
    });

    test.each(
        blockScenarios
    )("$description", async({ mockInput, mockBlockPermissionsByIds, mockRecordValues, expectedResults }) => {
        mockGetBlockPermissionsByIds.execute.mockResolvedValueOnce(mockBlockPermissionsByIds as any)
        
        mockBlockRepository.loadBlocksByPointers
        .mockResolvedValueOnce({
            rows: mockRecordValues,
            rowCount: mockRecordValues.length
        });

        const result = await loadBlocksByPointersUsecase.execute(mockInput);

        expect(result).toEqual(expectedResults);
    });

    test.each(
        spaceScenarios
    )("$description", async({ mockInput, mockUserSpaceRoles, mockRecordValues, expectedResults, }) => {        
        mockWorkspaceRepository.getUserSpaceRole
        .mockResolvedValueOnce({
            rows: mockUserSpaceRoles || [],
            rowCount: mockUserSpaceRoles?.length || 0
        });

        mockBlockRepository.loadBlocksByPointers
        .mockResolvedValueOnce({
            rows: mockRecordValues,
            rowCount: mockRecordValues.length
        });

        const result = await loadBlocksByPointersUsecase.execute(mockInput);

        expect(result).toEqual(expectedResults);
    });
});

/**
 * [-] Section1: request is for table block
 *  [+] block do not exist
 *  [+] block is in teamspace, user member of teamspace, member has full access to content
 *  [+] block is in teamspace, user not member of teamspace, no permission for space members is defined
 *  [+] block is in teamspace, user not member of teamspace, full access for space members
 *  [+] block is in teamspace, user not member of teamspace, user not member of space
 *  [-] block is in teamspace, teamspace is default, no explicit team permission for user
 *  [-] block is private, user is owner
 *  [-] block is private, user has no access
 *  [-] block is private, user has access through overriden permissions
 *
 * [+] Section2: request is for space
 *  [+] user is space owner
 *  [+] user is space member
 *  [+] user is not in space
 */