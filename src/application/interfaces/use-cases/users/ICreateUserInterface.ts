import { EmailAlredyInUseError } from "@application/errors/EmailAlreadyInUseError";
import { UseCase } from "../UseCase";
import { IUser } from "@domain/entities/IUser";

export namespace ICreateUserInterface {
    export type Request = Omit<IUser, "alive">;
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