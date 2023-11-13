import { Workspace } from "@domain/entities/workspace";
import { UseCase } from "../UseCase";

export namespace CreateWorkspaceInterface {
    export type Request = Omit<Workspace, "id" | "createdAt" | "editedAt">;
    export type Response = string; 
}

export interface CreateWorkspaceInterface extends UseCase<
    CreateWorkspaceInterface.Request,
    CreateWorkspaceInterface.Response
> {
    execute(
        workspaceData: CreateWorkspaceInterface.Request
    ): Promise<CreateWorkspaceInterface.Response>;
}