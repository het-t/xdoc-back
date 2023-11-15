import { Workspace } from "@domain/entities/workspace";
import { UseCase } from "../UseCase"
import { WorkspaceNotFoundError } from "@application/errors/WorkspaceNotFoundError";

export namespace LoadWorkspaceByIdInterface {
    export type Request = string;
    export type Response = Workspace
        | WorkspaceNotFoundError;
}

export interface LoadWorkspaceByIdInterface extends UseCase<
    LoadWorkspaceByIdInterface.Request,
    LoadWorkspaceByIdInterface.Response
> {
    execute(
        id: LoadWorkspaceByIdInterface.Request
    ): Promise<LoadWorkspaceByIdInterface.Response>;    
}