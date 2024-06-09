import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { IRemoveUsersByIds } from "@application/interfaces/use-cases/spaces/IRemoveUsersByIds";
import { ok } from "@infrastructure/http/helpers/http";

export namespace RemoveUsersController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class RemoveUsersController extends BaseController {
    constructor(
        private readonly removeUsersByIds: IRemoveUsersByIds
    ) {
        super();
    }

    async execute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const {
            userIds,
            spaceId,
            removePagePermissions,
            revokeUserTokens
        } = httpRequest.body;

        await this.removeUsersByIds.execute({
            userIds,
            spaceId,
            removePagePermissions,
            revokeUserTokens
        });

        return ok({})
    }
}