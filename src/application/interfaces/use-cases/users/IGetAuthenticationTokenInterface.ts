import { ForbiddenError } from "@application/errors/ForbiddenError";
import { InvalidTokenError } from "@application/errors/InvalidTokenError";
import { UseCase } from "../UseCase";

export namespace IGetAuthenticationTokenInterface {
    export type Request = string;
    export type Response = 
        { accessToken: string }
        | InvalidTokenError
        | ForbiddenError
}

export interface IGetAuthenticationTokenInterface extends UseCase<
    IGetAuthenticationTokenInterface.Request,
    IGetAuthenticationTokenInterface.Response
>{
    execute(
        token: IGetAuthenticationTokenInterface.Request
    ): Promise<IGetAuthenticationTokenInterface.Response>;
}