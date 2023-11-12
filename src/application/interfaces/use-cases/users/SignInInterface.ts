import { InvalidPasswordError } from "@application/errors/InvalidPasswordError";
import { InvalidUserError } from "@application/errors/InvalidUserError";
import { UseCase } from "../UseCase";

export namespace SignInInterface {
    export type Request = {
        email: string;
        password: string;
    };
    export type Response =  
        { authenticationToken: string; refreshToken: string}
        | InvalidUserError
        | InvalidPasswordError
}

export interface SignInInterface extends UseCase<
    SignInInterface.Request,
    SignInInterface.Response
> {
    execute(
        credentials: SignInInterface.Request
    ): Promise<SignInInterface.Response>;
}