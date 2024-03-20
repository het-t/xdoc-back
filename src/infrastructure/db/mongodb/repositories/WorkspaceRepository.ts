import { ICreateWorkspaceRepository } from "@application/interfaces/repositories/spaces/ICreateWorkspaceRepository";
import { ILoadWorkspaceByIdRepository } from "@application/interfaces/repositories/spaces/ILoadWorkspaceById";
import { Collection } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { Workspace } from "@domain/entities/workspace";
import { mapDocument, objectIdToString, stringToObjectId } from "../helpers/mapper";
import { IGetSpacesRepository } from "@application/interfaces/repositories/spaces/IGetSpacesRepository";

export class WorkspaceRepository implements
    ICreateWorkspaceRepository,
    ILoadWorkspaceByIdRepository,
    IGetSpacesRepository
{
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('workspace');
    }    

    async loadWorkspaceById(id: string): Promise<Workspace> {
        const collection = await WorkspaceRepository.getCollection();
        const workspace = await collection.findOne({ 
            _id: stringToObjectId(id)
        });
        
        return workspace && mapDocument(workspace);
    }

    async createWorkspace(
        workspaceData: ICreateWorkspaceRepository.Request
    ): Promise<ICreateWorkspaceRepository.Response> {
        const collection = await WorkspaceRepository.getCollection();
        const { insertedId } = await collection.insertOne({
            ...workspaceData
        });

        return objectIdToString(insertedId);
    }

    async getSpaces({ userId }: IGetSpacesRepository.Request): Promise<object> {
        return {};
    }
}