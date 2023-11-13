import { LoadWorkspaceById } from "@application/use-cases/workspaces/LoadWorkspaceById";
import { WorkspaceRepository } from "@infrastructure/db/mongodb/repositories/WorkspaceRepository";

export const makeLoadWorkspaceById = (): LoadWorkspaceById => {
    const workspaceRepository = new WorkspaceRepository();

    return new LoadWorkspaceById(workspaceRepository);
}