import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { ICreateWorkspaceInterface } from "@application/interfaces/use-cases/spaces/ICreateWorkspaceInterface";
import { ok } from "@infrastructure/http/helpers/http";

export namespace CreateWorkspaceController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse<Record<string, any>>;
}

export class CreateWorkspaceController extends BaseController {
    constructor(
        private readonly createWorkspace: ICreateWorkspaceInterface,
        private readonly addMemberInWorkspace: I
    ) {
        super();
    }

    async execute(
        httpRequest: CreateWorkspaceController.Request,
        { locals }: Record<string, any>
    ): Promise<CreateWorkspaceController.Response> {
        const { name } = httpRequest.body;

        const workspaceIdOrError = await this.createWorkspace.execute({
            name,
            createdById: locals.userId
        });

        if(workspaceIdOrError instanceof Error) throw workspaceIdOrError;

        return ok({ 
            spaceId: workspaceIdOrError
        });
    }
}