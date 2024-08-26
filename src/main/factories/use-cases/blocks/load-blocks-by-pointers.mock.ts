import { LoadBlocksByPointers } from "@application/use-cases/blocks/LoadBlocksByPointers";
import { MockBlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository.mock";
import { makeMockGetBlockPermissionsByIds } from "./get-block-permissions-by-ids.mock";

export const makeMockLoadBlocksByPointers = (): LoadBlocksByPointers => {
    const mockBlockRepository = MockBlockRepository();
    const mockGetBlockPermissionsByIds = makeMockGetBlockPermissionsByIds();

    return new LoadBlocksByPointers(
        mockBlockRepository,
        mockGetBlockPermissionsByIds
    );
}