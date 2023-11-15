import { WorkspaceNotFoundError } from "@application/errors/WorkspaceNotFoundError";
import { LoadWorkspaceByIdRepository } from "@application/interfaces/repositories/workspaces/LoadWorkspaceById";
import { LoadWorkspaceByIdInterface } from "@application/interfaces/use-cases/workspaces/LoadWorkspaceByIdInterface";

export class LoadWorkspaceById implements LoadWorkspaceByIdInterface {
    constructor(
        private readonly loadWorkspaceByIdRepository: LoadWorkspaceByIdRepository
    ) { }
    
    async execute(
        id: LoadWorkspaceByIdInterface.Request
    ): Promise<LoadWorkspaceByIdInterface.Response> {
        const workspace = await this.loadWorkspaceByIdRepository.loadWorkspaceById(id);

        if (!workspace) {
            return new WorkspaceNotFoundError();
        }

        return workspace;
    }
}