import { IGetBlockPermissionsByIds } from "@application/interfaces/use-cases/blocks/IGetBlockPermissionsByIds";
import { GetBlockPermissionsByIds } from "@application/use-cases/blocks/GetBlockPermissionsByIds";
import { BlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository";

export const makeGetBlockPermissionsByIds = (): IGetBlockPermissionsByIds => {
    const getBlockPermissionsByIds = new BlockRepository();

    return new GetBlockPermissionsByIds(getBlockPermissionsByIds);
}