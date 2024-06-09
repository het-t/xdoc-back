import { UseCase } from "../UseCase";

export namespace IGetSpaceUsers {
    export type Request = string;
    export type Response = Array<{
        userId: string,
        role: "editor" | "reader"
    }>
}

export interface IGetSpaceUsers extends UseCase<
    IGetSpaceUsers.Request,
    IGetSpaceUsers.Response
> {
    execute(
        spaceId: IGetSpaceUsers.Request
    ): Promise<IGetSpaceUsers.Response>;
}