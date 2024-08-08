import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IAuthenticateInterface } from "@application/interfaces/use-cases/users/IAuthenticateInterface";
import { BaseController } from "../BaseController";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { forbidden, ok } from "@infrastructure/http/helpers/http";

export namespace AuthController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class AuthController extends BaseController {
    constructor(
        private readonly authenticate: IAuthenticateInterface
    ) {
        super();
    }

    async execute(
        httpRequest: AuthController.Request
    ): Promise<AuthController.Response> {
        try {
            const token = httpRequest.headers?.cookie?.split("=")?.[1];        
            await this.authenticate.execute(token);
            return ok({});
        }
        catch(error) {
            return forbidden(new Error("Invalid token"));
        }
    }
}