import { ICreateWorkspaceRepository } from "@application/interfaces/repositories/spaces/ICreateWorkspaceRepository";
import { ILoadWorkspaceByIdRepository } from "@application/interfaces/repositories/spaces/ILoadWorkspaceById";
import { pool } from "../helpers/db-connection";
import { Workspace } from "@domain/entities/workspace";
import { IGetSpacesRepository } from "@application/interfaces/repositories/spaces/IGetSpacesRepository";

export class WorkspaceRepository implements
    ICreateWorkspaceRepository,
    ILoadWorkspaceByIdRepository,
    IGetSpacesRepository
{
    async loadWorkspaceById(id: string): Promise<Workspace> {
        return null;
    }

    async createWorkspace(
        workspaceData: ICreateWorkspaceRepository.Request
    ): Promise<ICreateWorkspaceRepository.Response> {
        return null;
    }

    async getSpaces({ userId }: IGetSpacesRepository.Request): Promise<object> {
        return {};
    }
}