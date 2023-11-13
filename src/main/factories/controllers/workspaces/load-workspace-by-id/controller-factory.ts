import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { LoadWorkspaceByIdController } from "@infrastructure/http/controllers/workspaces/LoadWorkspaceByIdController";
import { makeLoadWorkspaceById } from "@main/factories/use-cases/workspaces/load-workspace-by-id-factory";

export const makeLoadWorkspaceByIdController = (): BaseController => {
    const useCase = makeLoadWorkspaceById();
    
    return new LoadWorkspaceByIdController(useCase);
}