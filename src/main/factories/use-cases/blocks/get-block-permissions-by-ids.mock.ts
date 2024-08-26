import { IGetBlockPermissionsByIds } from "@application/interfaces/use-cases/blocks/IGetBlockPermissionsByIds";
import { GetBlockPermissionsByIds } from "@application/use-cases/blocks/GetBlockPermissionsByIds";
import { BlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository";
import { MockBlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository.mock";

export const makeMockGetBlockPermissionsByIds = (): IGetBlockPermissionsByIds => {
    const getBlockPermissionsByIds: BlockRepository = MockBlockRepository();

    return new GetBlockPermissionsByIds(getBlockPermissionsByIds);
}