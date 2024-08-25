import { UseCase } from "../UseCase";

export namespace IGetBlockPermissionsByIds {
    export type Request = {
        ids: string[],
        userId: string
    };
    export type Response = Array<Record<string, any>>;
}

export interface IGetBlockPermissionsByIds extends UseCase<
    IGetBlockPermissionsByIds.Request,
    IGetBlockPermissionsByIds.Response
> {
    execute(
        { ids, userId }: IGetBlockPermissionsByIds.Request
    ): Promise<IGetBlockPermissionsByIds.Response>;
}