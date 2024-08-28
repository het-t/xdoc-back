import { LoadBlocksByPointers } from "@application/use-cases/blocks/LoadBlocksByPointers";
import { BlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository";
import { makeGetBlockPermissionsByIds } from "./get-block-permissions-by-ids";
import { WorkspaceRepository } from "@infrastructure/db/postgres/repositories/WorkspaceRepository";

export const makeLoadBlocksByPointers = (): LoadBlocksByPointers => {
    const blockRepository = new BlockRepository();
    const getBlockPermissionsByIds = makeGetBlockPermissionsByIds();
    const getUserSpaceRoles = new WorkspaceRepository();

    return new LoadBlocksByPointers(
        blockRepository,
        getBlockPermissionsByIds,
        getUserSpaceRoles
    );
}