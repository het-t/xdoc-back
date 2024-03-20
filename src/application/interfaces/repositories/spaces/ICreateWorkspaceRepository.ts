import { WorkspaceProps } from "@domain/entities/workspace";

export namespace ICreateWorkspaceRepository {
    export type Request = Omit<WorkspaceProps, "id" | "createdAt" | "editedAt">
    export type Response = string;
}

export interface ICreateWorkspaceRepository {
    createWorkspace(
        workspaceData: ICreateWorkspaceRepository.Request
    ): Promise<ICreateWorkspaceRepository.Response>;
}