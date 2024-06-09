import { IUser } from "@domain/entities/IUser";
import { UseCase } from "../UseCase";

export namespace ILoadUserByEmail {
    export type Request = string;
    export type Response = IUser;
}

export interface ILoadUserByEmail extends UseCase<
    ILoadUserByEmail.Request,
    ILoadUserByEmail.Response
> {  
    execute(
        email: ILoadUserByEmail.Request
    ): Promise<ILoadUserByEmail.Response>;
}