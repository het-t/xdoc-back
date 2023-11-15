import { WorkspaceNotFoundError } from "@application/errors/WorkspaceNotFoundError";
import { Workspace } from "@domain/entities/workspace";

export namespace LoadWorkspaceByIdRepository {
    export type Request = string
    export type Response = Workspace
        | WorkspaceNotFoundError;
}

export interface LoadWorkspaceByIdRepository {
    loadWorkspaceById(
        id: LoadWorkspaceByIdRepository.Request
    ): Promise<LoadWorkspaceByIdRepository.Response>;
}