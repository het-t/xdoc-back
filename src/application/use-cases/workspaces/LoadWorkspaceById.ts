import { LoadWorkspaceByIdRepository } from "@application/interfaces/repositories/workspaces/LoadWorkspaceById";
import { LoadWorkspaceByIdInterface } from "@application/interfaces/use-cases/workspaces/LoadWorkspaceByIdInterface";

export class LoadWorkspaceById implements LoadWorkspaceByIdInterface {
    constructor(
        private readonly loadWorkspaceByIdRepository: LoadWorkspaceByIdRepository
    ) { }
    
    async execute(
        id: LoadWorkspaceByIdInterface.Request
    ): Promise<LoadWorkspaceByIdInterface.Response> {
        return this.loadWorkspaceByIdRepository.loadWorkspaceById(id);
    }
}