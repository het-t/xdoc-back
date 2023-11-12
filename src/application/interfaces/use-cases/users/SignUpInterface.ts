import { EmailAlredyInUseError } from "@application/errors/EmailAlreadyInUseError";
import { UserProps } from "@domain/entities/user";
import { UseCase } from "../UseCase";

export namespace SignUpInterface {
    export type Request = Omit<UserProps, 'id' | 'createdAt' | 'editedAt'>;
    export type Response = string | EmailAlredyInUseError;
}

export interface SignUpInterface extends UseCase<
    SignUpInterface.Request,
    SignUpInterface.Response
> {
    execute(
        userData: SignUpInterface.Request
    ): Promise<SignUpInterface.Response>;
}