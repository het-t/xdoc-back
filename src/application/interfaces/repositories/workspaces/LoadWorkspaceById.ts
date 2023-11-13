import { Workspace } from "@domain/entities/workspace";

export namespace LoadWorkspaceByIdRepository {
    export type Request = string
    export type Response = Workspace | null;
}

export interface LoadWorkspaceByIdRepository {
    loadWorkspaceById(
        id: LoadWorkspaceByIdRepository.Request
    ): Promise<LoadWorkspaceByIdRepository.Response>;
}