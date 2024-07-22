export namespace IRemovePagePermissionsRepository {
    export type Request = {
        userIds: string[],
        spaceId: string
    };
    export type Response = void;
}

export interface IRemovePagePermissionsRepository {
    removePagePermissions(
        { userIds, spaceId }: IRemovePagePermissionsRepository.Request
    ): Promise<IRemovePagePermissionsRepository.Response>;
}