import { UseCase } from "../UseCase";

export namespace ISignOutInterface {
    export type Request = string;
    export type Response = void;
}

export interface ISignOutInterface extends UseCase<ISignOutInterface.Request, ISignOutInterface.Response> {
    execute(
        token: ISignOutInterface.Request
    ): Promise<ISignOutInterface.Response>
}