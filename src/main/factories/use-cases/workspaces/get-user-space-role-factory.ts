import { GetUserSpaceRole } from "@application/use-cases/spaces/GetUserSpaceRole";
import { WorkspaceRepository } from "@infrastructure/db/postgres/repositories/WorkspaceRepository";

export const makeGetUserSpaceRole = (): GetUserSpaceRole => {
    const getUserSpaceRoleRepository = new WorkspaceRepository();

    return new GetUserSpaceRole(getUserSpaceRoleRepository);
}