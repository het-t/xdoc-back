import { ICreateWorkspaceRepository } from "@application/interfaces/repositories/spaces/ICreateWorkspaceRepository";
import { ICreateWorkspaceInterface } from "@application/interfaces/use-cases/spaces/ICreateWorkspaceInterface";
import { randomUUID } from "crypto";

export class CreateWorkspace implements ICreateWorkspaceInterface {
    constructor(
        private readonly createWorkspaceRepository: ICreateWorkspaceRepository
    ) { }
    
    async execute(
        { name, createdById }: ICreateWorkspaceInterface.Request
    ): Promise<ICreateWorkspaceInterface.Response> {
        const id = randomUUID();

        return this.createWorkspaceRepository.createWorkspace({
            id,
            name,
            createdById
        });
    }
}