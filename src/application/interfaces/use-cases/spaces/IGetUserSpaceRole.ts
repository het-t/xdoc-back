import { UUID } from "crypto";
import { UseCase } from "../UseCase";

export namespace IGetUserSpaceRole {
    export type Request = {
        spaceIds: UUID[],
        userId: UUID
    };
    export type Response = Promise<Array<{
        role: "member"
        | "owner"
        | null,
        id: UUID
    }>>;
}

export interface IGetUserSpaceRole extends UseCase<
    IGetUserSpaceRole.Request,
    IGetUserSpaceRole.Response
> {
    execute(
        { spaceIds, userId }: IGetUserSpaceRole.Request
    ): Promise<IGetUserSpaceRole.Response>
}