import { CreateWorkspace } from "@application/use-cases/spaces/CreateWorkspace";
import { WorkspaceRepository } from "@infrastructure/db/mongodb/repositories/WorkspaceRepository";

export const makeCreateWorkspace = (): CreateWorkspace => {
    const workspaceRepository = new WorkspaceRepository();
    
    return new CreateWorkspace(workspaceRepository);
}