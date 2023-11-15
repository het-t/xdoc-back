import { BaseController } from "../BaseController";
import { IHttpRequest } from "../../interfaces/IHttpRequest";
import { IHttpResponse } from "../../interfaces/IHttpResponse";
import { InvalidAuthTokenError } from "../../errors/InvalidAuthTokenError";
import { AuthTokenNotProvidedError } from "../../errors/AuthTokenNotProvidedError";
import { ok, unauthorized } from "../../helpers/http";
import { GetAuthenticationTokenInterface } from "@application/interfaces/use-cases/users/GetAuthenticationTokenInterface";

export namespace GetAuthenticationTokenController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse<
        { accessToken: string } | 
        InvalidAuthTokenError | 
        AuthTokenNotProvidedError 
    >;
}

export class GetAccessTokenController extends BaseController {
    constructor(
        private readonly getAccessToken: GetAuthenticationTokenInterface
    ) {
        super();
    }

    async execute(
        httpRequest: GetAuthenticationTokenController.Request
    ): Promise<GetAuthenticationTokenController.Response> {
        const { cookie } = httpRequest.headers;

        if (!cookie) {
            return unauthorized(new AuthTokenNotProvidedError());
        }

        const tokenParts = cookie.split("=");
        const token = tokenParts[1];

        const accessToken = await this.getAccessToken.execute(token);

        if (accessToken instanceof InvalidAuthTokenError) {
            return unauthorized(new InvalidAuthTokenError())
        }

        return ok(accessToken);
    }
}