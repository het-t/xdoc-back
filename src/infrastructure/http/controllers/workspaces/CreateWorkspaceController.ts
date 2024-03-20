import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { ICreateWorkspaceInterface } from "@application/interfaces/use-cases/spaces/ICreateWorkspaceInterface";
import { created, ok } from "@infrastructure/http/helpers/http";

export namespace CreateWorkspaceController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse<string>;
}

export class CreateWorkspaceController extends BaseController {
    constructor(private readonly createWorkspace: ICreateWorkspaceInterface) {
        super();
    }

    async execute(httpRequest: CreateWorkspaceController.Request): Promise<CreateWorkspaceController.Response> {
        const { name, icon, favourites } = httpRequest.body;

        const workspaceIdOrError = await this.createWorkspace.execute({
            name,
            icon,
            favourites
        });

        return created({
            workspaceId: workspaceIdOrError
        })
    }
}