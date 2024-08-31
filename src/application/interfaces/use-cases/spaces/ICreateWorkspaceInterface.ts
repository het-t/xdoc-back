import { UseCase } from "../UseCase";
import { Space } from "@domain/interfaces/Space";

export namespace ICreateWorkspaceInterface {
    export type Request = Pick<Space, "name">;
    export type Response = string | Error; 
}

export interface ICreateWorkspaceInterface extends UseCase<
    ICreateWorkspaceInterface.Request,
    ICreateWorkspaceInterface.Response
> {
    execute(
        workspaceData: ICreateWorkspaceInterface.Request
    ): Promise<ICreateWorkspaceInterface.Response>;
}