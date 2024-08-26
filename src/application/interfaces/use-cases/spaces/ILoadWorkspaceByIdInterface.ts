import { UseCase } from "../UseCase"
import { WorkspaceNotFoundError } from "@application/errors/WorkspaceNotFoundError";
import { Space } from "@domain/interfaces/Space";

export namespace ILoadWorkspaceByIdInterface {
    export type Request = string;
    export type Response = Space
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