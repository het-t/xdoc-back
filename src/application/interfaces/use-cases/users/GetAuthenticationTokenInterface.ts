import { ForbiddenError } from "@application/errors/ForbiddenError";
import { InvalidTokenError } from "@application/errors/InvalidTokenError";
import { UseCase } from "../UseCase";

export namespace GetAuthenticationTokenInterface {
    export type Request = string;
    export type Response = 
        { accessToken: string }
        | InvalidTokenError
        | ForbiddenError
}

export interface GetAuthenticationTokenInterface extends UseCase<
    GetAuthenticationTokenInterface.Request,
    GetAuthenticationTokenInterface.Response
>{
    execute(
        token: GetAuthenticationTokenInterface.Request
    ): Promise<GetAuthenticationTokenInterface.Response>;
}