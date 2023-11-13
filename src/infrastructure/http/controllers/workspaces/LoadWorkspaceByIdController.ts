import { HttpRequest } from "@infrastructure/http/interfaces/HttpRequest";
import { HttpResponse } from "@infrastructure/http/interfaces/HttpResponse";
import { BaseController } from "../BaseController";
import { LoadWorkspaceByIdInterface } from "@application/interfaces/use-cases/workspaces/LoadWorkspaceByIdInterface";
import { ok } from "@infrastructure/http/helpers/http";

export class LoadWorkspaceByIdController extends BaseController {
    constructor(private readonly loadWorkspaceById: LoadWorkspaceByIdInterface) {
        super();
    }

    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { id } = httpRequest.params;
        
        const workspaceOrError = await this.loadWorkspaceById.execute(id);

        return ok({
            workspace: workspaceOrError
        })
    }
}