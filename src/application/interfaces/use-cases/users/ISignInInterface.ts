import { InvalidPasswordError } from "@application/errors/InvalidPasswordError";
import { InvalidUserError } from "@application/errors/InvalidUserError";
import { UseCase } from "../UseCase";
import { IUser } from "@domain/entities/IUser";

export namespace ISignInInterface {
    export type Request = {
        email: string;
        password: string;
    };
    export type Response =  
        { 
            authenticationToken: string; 
            refreshToken: string,
            user: Omit<IUser, "password">
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