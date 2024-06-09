export namespace IRemoveUsersByIdsRepository {
    export type Request = {
        userIds: string[],
        spaceId: string
    }
    export type Response = void;
}

export interface IRemoveUsersByIdsRepository {
    removeUsersByIds(
        {userIds, spaceId}: IRemoveUsersByIdsRepository.Request
    ): Promise<IRemoveUsersByIdsRepository.Response>;
}