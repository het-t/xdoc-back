import { ICreateWorkspaceRepository } from "@application/interfaces/repositories/spaces/ICreateWorkspaceRepository";
import { ICreateWorkspaceInterface } from "@application/interfaces/use-cases/spaces/ICreateWorkspaceInterface";

export class CreateWorkspace implements ICreateWorkspaceInterface {
    constructor(
        private readonly createWorkspaceRepository: ICreateWorkspaceRepository
    ) { }
    
    async execute(
        workspaceData: ICreateWorkspaceInterface.Request
    ): Promise<ICreateWorkspaceInterface.Response> {
        return this.createWorkspaceRepository.createWorkspace(workspaceData);
    }
}