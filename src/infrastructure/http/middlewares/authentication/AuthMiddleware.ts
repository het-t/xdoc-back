import { HttpRequest } from "@infrastructure/http/interfaces/HttpRequest";
import { HttpResponse } from "@infrastructure/http/interfaces/HttpResponse";
import { BaseMiddleware } from "../BaseMiddleware";
import { AuthTokenNotProvidedError } from "@infrastructure/http/errors/AuthTokenNotProvidedError";
import { InvalidAuthTokenError } from "@infrastructure/http/errors/InvalidAuthTokenError";
import { AuthenticateInterface } from "@application/interfaces/use-cases/users/AuthenticateInterface";
import { ForbiddenError } from "@application/errors/ForbiddenError";
import { ok, forbidden } from "@infrastructure/http/helpers/http"

export namespace AuthMiddleware {
    export type Request = HttpRequest<
        undefined,
        undefined,
        { authorization: string }
    >;
    
    export type Response = HttpResponse<
        { userId: string }
        | AuthTokenNotProvidedError
        | InvalidAuthTokenError
    >;
}
export class AuthMiddleware extends BaseMiddleware {
    constructor(private readonly authenticate: AuthenticateInterface) {
        super();
    }
    
    async execute(httpRequest: AuthMiddleware.Request): Promise<AuthMiddleware.Response> {
        const authHeader = httpRequest.headers?.authorization;

        if (!authHeader) {
            return forbidden(new AuthTokenNotProvidedError());
        }

        const [, authToken] = authHeader.split(' ');
        const userIdOrError = await this.authenticate.execute(authToken);
        
        if (userIdOrError instanceof ForbiddenError) {
            return forbidden(new InvalidAuthTokenError());
        }

        return ok({ userId: userIdOrError });
    }
}