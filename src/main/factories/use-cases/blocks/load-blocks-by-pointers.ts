import { LoadBlocksByPointers } from "@application/use-cases/blocks/LoadBlocksByPointers";
import { BlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository";
import { makeGetBlockPermissionsByIds } from "./get-block-permissions-by-ids";

export const makeLoadBlocksByPointers = (): LoadBlocksByPointers => {
    const blockRepository = new BlockRepository();
    const getBlockPermissionsByIds = makeGetBlockPermissionsByIds();

    return new LoadBlocksByPointers(
        blockRepository,
        getBlockPermissionsByIds
    );
}