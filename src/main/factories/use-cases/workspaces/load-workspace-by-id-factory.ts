import { LoadWorkspaceById } from "@application/use-cases/spaces/LoadWorkspaceById";
import { WorkspaceRepository } from "@infrastructure/db/postgres/repositories/WorkspaceRepository";

export const makeLoadWorkspaceById = (): LoadWorkspaceById => {
    const workspaceRepository = new WorkspaceRepository();

    return new LoadWorkspaceById(workspaceRepository);
}