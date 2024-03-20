import { Workspace } from "@domain/entities/workspace";
import { UseCase } from "../UseCase";

export namespace ICreateWorkspaceInterface {
    export type Request = Omit<Workspace, "id" | "createdAt" | "editedAt">;
    export type Response = string; 
}

export interface ICreateWorkspaceInterface extends UseCase<
    ICreateWorkspaceInterface.Request,
    ICreateWorkspaceInterface.Response
> {
    execute(
        workspaceData: ICreateWorkspaceInterface.Request
    ): Promise<ICreateWorkspaceInterface.Response>;
}