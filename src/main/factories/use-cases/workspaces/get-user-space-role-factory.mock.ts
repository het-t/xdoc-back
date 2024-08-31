import { GetUserSpaceRole } from "@application/use-cases/spaces/GetUserSpaceRole";
import { MockWorkspaceRepository } from "@infrastructure/db/postgres/repositories/WorkspaceRepository.mock";

export const makeMockGetUserSpaceRole = (): GetUserSpaceRole => {
    const mockGetUserSpaceRoleRepository = MockWorkspaceRepository();

    return new GetUserSpaceRole(mockGetUserSpaceRoleRepository);
}