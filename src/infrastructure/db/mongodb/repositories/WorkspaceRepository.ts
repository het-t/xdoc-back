import { CreateWorkspaceRepository } from "@application/interfaces/repositories/workspaces/CreateWorkspaceRepository";
import { LoadWorkspaceByIdRepository } from "@application/interfaces/repositories/workspaces/LoadWorkspaceById";
import { Collection } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { Workspace } from "@domain/entities/workspace";
import { mapDocument, objectIdToString, stringToObjectId } from "../helpers/mapper";

export class WorkspaceRepository implements
    CreateWorkspaceRepository,
    LoadWorkspaceByIdRepository
{
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('workspaces');
    }    

    async loadWorkspaceById(id: string): Promise<Workspace> {
        const collection = await WorkspaceRepository.getCollection();
        const workspace = await collection.findOne({ 
            _id: stringToObjectId(id)
        });
        
        return workspace && mapDocument(workspace);
    }

    async createWorkspace(workspaceData: CreateWorkspaceRepository.Request): Promise<CreateWorkspaceRepository.Response> {
        const collection = await WorkspaceRepository.getCollection();
        const { insertedId } = await collection.insertOne({
            ...workspaceData
        });

        return objectIdToString(insertedId);
    }
}