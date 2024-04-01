import { UseCase } from "../UseCase";

export namespace IGetSpaces {
    export type Request = {};
    export type Response = object;
}

export interface IGetSpaces extends UseCase<
    IGetSpaces.Request,
    IGetSpaces.Response
> {
    execute(): Promise<IGetSpaces.Response>;
}