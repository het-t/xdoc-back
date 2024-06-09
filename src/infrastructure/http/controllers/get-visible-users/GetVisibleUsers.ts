import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { IGetSpaceUsers } from "@application/interfaces/use-cases/users/IGetSpaceUsers";
import { ok } from "@infrastructure/http/helpers/http";

export namespace GetVisibleUsers {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class GetVisibleUsers extends BaseController {
    constructor(
        private readonly getSpaceUsers: IGetSpaceUsers
    ) {
        super();
    }

    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const { spaceId } = httpRequest.body;

        const users = await this.getSpaceUsers.execute(spaceId);

        return ok({
            users
        });
    }
}