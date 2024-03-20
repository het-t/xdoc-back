import { UseCase } from "../UseCase";

export namespace IGetSpacesInterface {
    export type Request = {
        userId: string
    };
    export type Response = object;
}

export interface IGetSpacesInterface extends UseCase<
    IGetSpacesInterface.Request,
    IGetSpacesInterface.Response
> {
    execute(
        userId: IGetSpacesInterface.Request
    ): Promise<IGetSpacesInterface.Response>
}