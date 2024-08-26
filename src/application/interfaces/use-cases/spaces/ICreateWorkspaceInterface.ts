import { UseCase } from "../UseCase";
import { Space } from "@domain/interfaces/Space";

export namespace ICreateWorkspaceInterface {
    export type Request = Omit<Space, "id" | "created_at" | "last_edited_at">;
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