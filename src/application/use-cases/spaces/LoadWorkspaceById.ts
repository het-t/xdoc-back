import { WorkspaceNotFoundError } from "@application/errors/WorkspaceNotFoundError";
import { ILoadWorkspaceByIdRepository } from "@application/interfaces/repositories/spaces/ILoadWorkspaceById";
import { ILoadWorkspaceByIdInterface } from "@application/interfaces/use-cases/spaces/ILoadWorkspaceByIdInterface";

export class LoadWorkspaceById implements ILoadWorkspaceByIdInterface {
    constructor(
        private readonly loadWorkspaceByIdRepository: ILoadWorkspaceByIdRepository
    ) { }
    
    async execute(
        id: ILoadWorkspaceByIdInterface.Request
    ): Promise<ILoadWorkspaceByIdInterface.Response> {
        const workspace = await this.loadWorkspaceByIdRepository.loadWorkspaceById(id);

        if (!workspace) {
            return new WorkspaceNotFoundError();
        }

        return workspace;
    }
}