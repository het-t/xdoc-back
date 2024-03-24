import { UseCase } from "@application/interfaces/use-cases/UseCase";
import { ForbiddenError } from "@application/errors/ForbiddenError";

export namespace IAuthenticateInterface {
    export type Request = string;
    export type Response = string | ForbiddenError;
}

export interface IAuthenticateInterface extends UseCase<
    IAuthenticateInterface.Request,
    IAuthenticateInterface.Response
> {
    execute(token: IAuthenticateInterface.Request): Promise<IAuthenticateInterface.Response>;
}