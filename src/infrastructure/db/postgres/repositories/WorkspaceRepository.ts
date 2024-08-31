import { ICreateWorkspaceRepository } from "@application/interfaces/repositories/spaces/ICreateWorkspaceRepository";
import { ILoadWorkspaceByIdRepository } from "@application/interfaces/repositories/spaces/ILoadWorkspaceById";
import { IGetSpacesRepository } from "@application/interfaces/repositories/spaces/IGetSpacesRepository";
import { IRemoveUsersByIdsRepository } from "@application/interfaces/repositories/spaces/IRemoveUsersByIdsRepository";
import { IRemovePagePermissionsRepository } from "@application/interfaces/repositories/spaces/IRemovePagePermissionsRepository";
import { Space } from "@domain/interfaces/Space";
import { IGetUserSpaceRoleRepository } from "@application/interfaces/repositories/spaces/IGetUserSpaceRoleRepository";
import { knexPool } from "../knex/knex";

export class WorkspaceRepository implements
    ICreateWorkspaceRepository,
    ILoadWorkspaceByIdRepository,
    IGetSpacesRepository,
    IRemoveUsersByIdsRepository,
    IRemovePagePermissionsRepository,
    IGetUserSpaceRoleRepository
{
    async loadWorkspaceById(id: string): Promise<Space> {
        return {} as Space;
    }

    async createWorkspace(
        workspaceData: ICreateWorkspaceRepository.Request
    ): Promise<ICreateWorkspaceRepository.Response> {
        return "null";
    }

    async getSpaces({ userId }: IGetSpacesRepository.Request): Promise<object> {
        return {};
    }

    async removeUsersByIds(
        {
            userIds, 
            spaceId
        }: IRemoveUsersByIdsRepository.Request
    ): Promise<void> {
        return await knexPool.raw(
            "call space_user_remove_by_user_ids(?, ?::uuid)", 
            [
                userIds,
                spaceId
            ]
        );
    }

    removePagePermissions(
        { userIds, spaceId }: IRemovePagePermissionsRepository.Request
    ): Promise<IRemovePagePermissionsRepository.Response> {
        return Promise.resolve();
    }

    async getUserSpaceRole({ ids, userId }: IGetUserSpaceRoleRepository.Request): Promise<IGetUserSpaceRoleRepository.Response> {
        return await knexPool.raw(
            "call xdoc_space_get_user_role(?, ?)",
            [
                userId,
                ids
            ]
        );
    }
}