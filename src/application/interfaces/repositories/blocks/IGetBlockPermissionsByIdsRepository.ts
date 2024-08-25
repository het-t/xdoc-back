import { IDbResponse } from "@application/interfaces/db/IDbResponse";

export namespace IGetBlockPermissionsByIdsRepository {
    export type Request = {
        ids: string[],
        userId: string
    };
    export type Response = IDbResponse<Array<{
        id: string,
        block_overriden_permission: Record<string, any>
        collection_permissions: Record<string, any>,
        team_permissions: Record<string, any>
        space_role: "member" | "owner"
    }>> | Error;
}

export interface IGetBlockPermissionsByIdsRepository {
    getBlockPermissionsByIds(
        { ids }: IGetBlockPermissionsByIdsRepository.Request
    ): Promise<IGetBlockPermissionsByIdsRepository.Response>;
}