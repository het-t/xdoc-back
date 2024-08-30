import { IGetUserSpaceRoleRepository } from "@application/interfaces/repositories/spaces/IGetUserSpaceRoleRepository";
import { IGetUserSpaceRole } from "@application/interfaces/use-cases/spaces/IGetUserSpaceRole";

export class GetUserSpaceRole implements IGetUserSpaceRole {
    constructor(
        private readonly getUserSpaceRoleRepository: IGetUserSpaceRoleRepository
    ) {}

    async execute(
        { spaceIds, userId }: IGetUserSpaceRole.Request
    ): Promise<IGetUserSpaceRole.Response> {
        return (await this.getUserSpaceRoleRepository.getUserSpaceRole({
            ids: spaceIds, 
            userId
        })).rows;
    }
}