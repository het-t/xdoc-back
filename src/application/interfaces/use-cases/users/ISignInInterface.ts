import { InvalidPasswordError } from "@application/errors/InvalidPasswordError";
import { InvalidUserError } from "@application/errors/InvalidUserError";
import { UseCase } from "../UseCase";
import { User } from "@domain/interfaces/User";

export namespace ISignInInterface {
    export type Request = {
        email: string;
        password: string;
    };
    export type Response =  
        { 
            authenticationToken: string; 
            refreshToken: string,
            user: User
        }
        | InvalidUserError
        | InvalidPasswordError
}

export interface ISignInInterface extends UseCase<
    ISignInInterface.Request,
    ISignInInterface.Response
> {
    execute(
        credentials: ISignInInterface.Request
    ): Promise<ISignInInterface.Response>;
}