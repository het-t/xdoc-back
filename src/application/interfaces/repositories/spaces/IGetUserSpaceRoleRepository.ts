import { IDbResponse } from "@application/interfaces/db/IDbResponse";
import { UUID } from "crypto";

export namespace IGetUserSpaceRoleRepository {
    export type Request = {
        ids: UUID[],
        userId: UUID
    };  
    export type Response = IDbResponse<{
        id: UUID,
        role: "member"
        | "owner"
        | null
    }[]>;
}

export interface IGetUserSpaceRoleRepository {
    getUserSpaceRole(
        { ids, userId }: IGetUserSpaceRoleRepository.Request
    ): Promise<IGetUserSpaceRoleRepository.Response>;
}