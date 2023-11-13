import { CreateWorkspace } from "@application/use-cases/workspaces/CreateWorkspace";
import { WorkspaceRepository } from "@infrastructure/db/mongodb/repositories/WorkspaceRepository";

export const makeCreateWorkspace = (): CreateWorkspace => {
    const workspaceRepository = new WorkspaceRepository();
    
    return new CreateWorkspace(workspaceRepository);
}