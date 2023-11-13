import { WorkspaceProps } from "@domain/entities/workspace";

export namespace CreateWorkspaceRepository {
    export type Request = Omit<WorkspaceProps, "id" | "createdAt" | "editedAt">
    export type Response = string;
}

export interface CreateWorkspaceRepository {
    createWorkspace(
        workspaceData: CreateWorkspaceRepository.Request
    ): Promise<CreateWorkspaceRepository.Response>;
}