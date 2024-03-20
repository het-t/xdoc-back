import { WorkspaceNotFoundError } from "@application/errors/WorkspaceNotFoundError";
import { Workspace } from "@domain/entities/workspace";

export namespace ILoadWorkspaceByIdRepository {
    export type Request = string
    export type Response = Workspace
        | WorkspaceNotFoundError;
}

export interface ILoadWorkspaceByIdRepository {
    loadWorkspaceById(
        id: ILoadWorkspaceByIdRepository.Request
    ): Promise<ILoadWorkspaceByIdRepository.Response>;
}