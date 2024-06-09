import { UseCase } from "../UseCase";

export namespace IRemoveUsersByIds {
    export type Request = {
        userIds: string[],
        spaceId: string,
        removePagePermissions: boolean,
        revokeUserTokens: boolean
    }
    export type Response = void;
}

export interface IRemoveUsersByIds extends UseCase<
    IRemoveUsersByIds.Request,
    IRemoveUsersByIds.Response
> {
    execute(
        { 
            userIds, spaceId, removePagePermissions, revokeUserTokens 
        }: IRemoveUsersByIds.Request
    ): Promise<IRemoveUsersByIds.Response>;
}