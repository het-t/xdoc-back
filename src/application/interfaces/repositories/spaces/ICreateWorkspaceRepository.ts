import { Space } from "@domain/interfaces/Space";

export namespace ICreateWorkspaceRepository {
    export type Request = Pick<Space, "name">
    export type Response = string;
}

export interface ICreateWorkspaceRepository {
    createWorkspace(
        workspaceData: ICreateWorkspaceRepository.Request
    ): Promise<ICreateWorkspaceRepository.Response>;
}