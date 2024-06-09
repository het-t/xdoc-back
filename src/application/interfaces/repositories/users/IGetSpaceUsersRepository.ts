export namespace IGetSpaceUsersRepository {
    export type Request = {
        spaceId: string
    };
    export type Response = Array<{
        user_id: string,
        membership_type: "editor" | "reader"
    }>;
}

export interface IGetSpaceUsersRepository {
    getSpaceUsers(
        { spaceId }: IGetSpaceUsersRepository.Request
    ): Promise<IGetSpaceUsersRepository.Response>
}