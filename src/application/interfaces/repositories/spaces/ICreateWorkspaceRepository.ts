import { Space } from "@domain/interfaces/Space";
import { UUID } from "crypto";

export namespace ICreateWorkspaceRepository {
    export type Request = {
        id: UUID,
        name: string,
        createdById: UUID
    }
    export type Response = UUID;
}

export interface ICreateWorkspaceRepository {
    createWorkspace(
        { name, id, createdById }: ICreateWorkspaceRepository.Request
    ): Promise<ICreateWorkspaceRepository.Response>;
}