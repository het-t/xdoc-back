import { BaseController } from "@infrastructure/http/controllers/BaseController"
import { CreateWorkspaceController } from "@infrastructure/http/controllers/workspaces/CreateWorkspaceController";
import { makeCreateWorkspace } from "@main/factories/use-cases/workspaces/create-workspace-factory"

export const makeCreateWorkspaceController = (): BaseController => {
    const useCase = makeCreateWorkspace();

    return new CreateWorkspaceController(useCase);
}