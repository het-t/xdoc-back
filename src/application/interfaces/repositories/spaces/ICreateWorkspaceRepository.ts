import { Space } from "@domain/interfaces/Space";

export namespace ICreateWorkspaceRepository {
    export type Request = Omit<Space, "id" | "created_at" | "last_edited_at">
    export type Response = string;
}

export interface ICreateWorkspaceRepository {
    createWorkspace(
        workspaceData: ICreateWorkspaceRepository.Request
    ): Promise<ICreateWorkspaceRepository.Response>;
}