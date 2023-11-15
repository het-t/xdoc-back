import { InvalidPasswordError } from "@application/errors/InvalidPasswordError";
import { InvalidUserError } from "@application/errors/InvalidUserError";
import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { ok, unauthorized } from "@infrastructure/http/helpers/http";
import { SignInInterface } from "@application/interfaces/use-cases/users/SignInInterface";

export namespace SignInController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse<
        { authenticationToken: string } 
        | InvalidPasswordError
        | InvalidUserError
    >
}

export class SignInController extends BaseController {
    constructor(
        private readonly signIn: SignInInterface
    ) {
        super()
    }

    async execute(httpRequest: SignInController.Request): Promise<SignInController.Response> {
        const { email, password } = httpRequest.body;

        const authenticationOrError = await this.signIn.execute({
            email,
            password
        })

        if (authenticationOrError instanceof InvalidPasswordError || authenticationOrError instanceof InvalidUserError) {
            return unauthorized(authenticationOrError);
        }

        const { authenticationToken, refreshToken } = authenticationOrError;

        return ok(
            { authenticationToken },
            { token: refreshToken }
        )
    }
}