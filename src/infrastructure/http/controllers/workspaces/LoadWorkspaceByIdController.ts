import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { LoadWorkspaceByIdInterface } from "@application/interfaces/use-cases/workspaces/LoadWorkspaceByIdInterface";
import { badRequest, ok } from "@infrastructure/http/helpers/http";
import { WorkspaceNotFoundError } from "@application/errors/WorkspaceNotFoundError";

export namespace LoadWorkspaceByIdController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class LoadWorkspaceByIdController extends BaseController {
    constructor(
        private readonly loadWorkspaceById: LoadWorkspaceByIdInterface
    ) {
        super();
    }

    async execute(
        httpRequest: LoadWorkspaceByIdController.Request
    ): Promise<LoadWorkspaceByIdController.Response> {
        const { id } = httpRequest.params;
        
        const workspaceOrError = await this.loadWorkspaceById.execute(id);

        if (workspaceOrError instanceof WorkspaceNotFoundError) {
            return badRequest(workspaceOrError)
        }
        
        return ok({
            workspace: workspaceOrError
        })
    }
}