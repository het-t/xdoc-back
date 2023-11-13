import { HttpRequest } from "@infrastructure/http/interfaces/HttpRequest";
import { HttpResponse } from "@infrastructure/http/interfaces/HttpResponse";
import { BaseController } from "../BaseController";
import { CreateWorkspaceInterface } from "@application/interfaces/use-cases/workspaces/CreateWorkspaceInterface";
import { ok } from "@infrastructure/http/helpers/http";

export class CreateWorkspaceController extends BaseController {
    constructor(private readonly createWorkspace: CreateWorkspaceInterface) {
        super();
    }

    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { name, icon, favourites } = httpRequest.body;

        const workspaceOrError = await this.createWorkspace.execute({
            name,
            icon,
            favourites
        });

        return ok({
            workspace: workspaceOrError
        })
    }
}