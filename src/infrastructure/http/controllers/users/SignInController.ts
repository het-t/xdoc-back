import { InvalidPasswordError } from "@application/errors/InvalidPasswordError";
import { InvalidUserError } from "@application/errors/InvalidUserError";
import { HttpRequest } from "@infrastructure/http/interfaces/HttpRequest";
import { HttpResponse } from "@infrastructure/http/interfaces/HttpResponse";
import { BaseController } from "../BaseController";
import { ok, unauthorized } from "@infrastructure/http/helpers/http";
import { SignInInterface } from "@application/interfaces/use-cases/users/SignInInterface";

export namespace SignInController {
    export type Request = HttpRequest;
    export type Response = HttpResponse<
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

    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
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