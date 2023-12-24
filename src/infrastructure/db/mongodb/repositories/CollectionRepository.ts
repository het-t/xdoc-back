import { Collection, ObjectId } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { ICollectionUpdateRepository } from "@application/interfaces/repositories/collection/ICollectionUpdateRepsitory";
import { ICollectionCreateRepository } from "@application/interfaces/repositories/collection/ICollectionCreateRepository";
import { mapToDocument } from "../helpers/mapper";
import { preparePathedUpdate } from "../helpers/prepare-pathed-update";

export class CollectionRepository implements
    ICollectionUpdateRepository,
    ICollectionCreateRepository
{
    static async getCollection(): Promise<Collection> {
        return await dbConnection.getCollection('collection');
    }

    async createCollection(
        { pointer, args }: ICollectionCreateRepository.Request
    ): Promise<ICollectionCreateRepository.Response> {
        const collection = await CollectionRepository.getCollection();

        const document = mapToDocument(args);

        await collection.insertOne(document);
    }

    async updateCollection(
        {pointer, path, args}: ICollectionUpdateRepository.Request
    ): Promise<ICollectionUpdateRepository.Response> {
        const collection = await CollectionRepository.getCollection();

        const pathedUpdate = preparePathedUpdate(path.join('.'), args);        

        await collection.updateOne(
            {
                _id: pointer.id as unknown as ObjectId
            },
            {
                $set: path ? pathedUpdate : args
            }
        )
    }
}