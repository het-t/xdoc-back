import { Workspace } from "@domain/entities/workspace";
import { UseCase } from "../UseCase"
import { WorkspaceNotFoundError } from "@application/errors/WorkspaceNotFoundError";

export namespace ILoadWorkspaceByIdInterface {
    export type Request = string;
    export type Response = Workspace
        | WorkspaceNotFoundError;
}

export interface ILoadWorkspaceByIdInterface extends UseCase<
    ILoadWorkspaceByIdInterface.Request,
    ILoadWorkspaceByIdInterface.Response
> {
    execute(
        id: ILoadWorkspaceByIdInterface.Request
    ): Promise<ILoadWorkspaceByIdInterface.Response>;    
}