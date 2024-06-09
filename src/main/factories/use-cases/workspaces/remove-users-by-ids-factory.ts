import { RemoveUsersByIds } from "@application/use-cases/spaces/RemoveUsersByIds";
import { WorkspaceRepository } from "@infrastructure/db/postgres/repositories/WorkspaceRepository";

export const makeRemoveUsersByIds = (): RemoveUsersByIds => {
    const workspaceRepository = new WorkspaceRepository();

    return new RemoveUsersByIds(
        workspaceRepository,
        workspaceRepository
    );
}