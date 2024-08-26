import { WorkspaceNotFoundError } from "@application/errors/WorkspaceNotFoundError";
import { Space } from "@domain/interfaces/Space";

export namespace ILoadWorkspaceByIdRepository {
    export type Request = string
    export type Response = Space
    | WorkspaceNotFoundError;
}

export interface ILoadWorkspaceByIdRepository {
    loadWorkspaceById(
        id: ILoadWorkspaceByIdRepository.Request
    ): Promise<ILoadWorkspaceByIdRepository.Response>;
}