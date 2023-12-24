import { Collection, ObjectId } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { ICollectionViewUpdateRepository } from "@application/interfaces/repositories/collection-view/ICollectionViewUpdateRepository";
import { preparePathedUpdate } from "../helpers/prepare-pathed-update";

export class CollectionViewRepository implements 
    ICollectionViewUpdateRepository
{
    static async getCollection(): Promise<Collection> {
        return await dbConnection.getCollection('collection_view');
    }

    async updateCollectionView(
        { pointer, path, args }: ICollectionViewUpdateRepository.Request
    ): Promise<ICollectionViewUpdateRepository.Response> {
        const collection = await CollectionViewRepository.getCollection();

        const pathedUpdate = preparePathedUpdate(path.join('.'), args);        

        await collection.findOneAndUpdate(
            {
                _id: pointer.id as unknown as ObjectId
            },
            {
                $set: path ? pathedUpdate : args
            }
        )
    }
}