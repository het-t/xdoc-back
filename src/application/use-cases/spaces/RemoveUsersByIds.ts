import { IRemovePagePermissionsRepository } from "@application/interfaces/repositories/spaces/IRemovePagePermissionsRepository";
import { IRemoveUsersByIdsRepository } from "@application/interfaces/repositories/spaces/IRemoveUsersByIdsRepository";
import { IRemoveUsersByIds } from "@application/interfaces/use-cases/spaces/IRemoveUsersByIds";

export class RemoveUsersByIds implements IRemoveUsersByIds {
    constructor(
        private readonly removeUsersByIdsRepository: IRemoveUsersByIdsRepository,
        private readonly removePagePermissionsRepository: IRemovePagePermissionsRepository
    ) {}

    async execute(
        { 
            userIds, 
            spaceId, 
            removePagePermissions, 
            revokeUserTokens 
        }: IRemoveUsersByIds.Request
    ): Promise<IRemoveUsersByIds.Response> {
        await this.removeUsersByIdsRepository.removeUsersByIds({
            userIds,
            spaceId
        });

        if(removePagePermissions) {
            await this.removePagePermissionsRepository.removePagePermissions({
                userIds,
                spaceId
            });
        }

        return;
    }
}