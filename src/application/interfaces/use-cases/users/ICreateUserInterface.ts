import { EmailAlredyInUseError } from "@application/errors/EmailAlreadyInUseError";
import { UseCase } from "../UseCase";

export namespace ICreateUserInterface {
    export type Request = {
        id: string,
        email: string,
        name?: string,
        password: string
    };
    export type Response = void | EmailAlredyInUseError;
}

export interface ICreateUserInterface extends UseCase<
ICreateUserInterface.Request,
ICreateUserInterface.Response
> {
    execute(
        userData: ICreateUserInterface.Request
    ): Promise<ICreateUserInterface.Response>;
}