import { UUID } from "crypto";
import { UseCase } from "../UseCase";

export namespace ICreateEmailUser {
    export type Request = {
        id: UUID,
        email: string
    };
    export type Response = UUID;
}

export interface ICreateEmailUser extends UseCase<
    ICreateEmailUser.Request,
    ICreateEmailUser.Response
> {
    execute(
        { email, id }: ICreateEmailUser.Request
    ): Promise<ICreateEmailUser.Response>;
}