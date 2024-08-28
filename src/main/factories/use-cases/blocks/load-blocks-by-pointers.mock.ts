import { LoadBlocksByPointers } from "@application/use-cases/blocks/LoadBlocksByPointers";
import { MockBlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository.mock";
import { makeMockGetBlockPermissionsByIds } from "./get-block-permissions-by-ids.mock";
import { MockWorkspaceRepository } from "@infrastructure/db/postgres/repositories/WorkspaceRepository.mock";

export const makeMockLoadBlocksByPointers = (): LoadBlocksByPointers => {
    const mockBlockRepository = MockBlockRepository();
    const mockGetBlockPermissionsByIds = makeMockGetBlockPermissionsByIds();
    const mockWorkspaceRepository = MockWorkspaceRepository();

    return new LoadBlocksByPointers(
        mockBlockRepository,
        mockGetBlockPermissionsByIds,
        mockWorkspaceRepository
    );
}