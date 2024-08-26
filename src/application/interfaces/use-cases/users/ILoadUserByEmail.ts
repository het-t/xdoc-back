import { UseCase } from "../UseCase";
import { User } from "@domain/interfaces/User";

export namespace ILoadUserByEmail {
    export type Request = string;
    export type Response = User;
}

export interface ILoadUserByEmail extends UseCase<
    ILoadUserByEmail.Request,
    ILoadUserByEmail.Response
> {  
    execute(
        email: ILoadUserByEmail.Request
    ): Promise<ILoadUserByEmail.Response>;
}