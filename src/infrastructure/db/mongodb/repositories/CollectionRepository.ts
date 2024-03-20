import { Collection, ObjectId } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { ICollectionUpdateRepository } from "@application/interfaces/repositories/collection/ICollectionUpdateRepsitory";
import { ICollectionCreateRepository } from "@application/interfaces/repositories/collection/ICollectionCreateRepository";
import { mapDocument, mapToDocument } from "../helpers/mapper";
import { preparePathedUpdate } from "../helpers/prepare-pathed-update";
import { ICollectionLoadByIdRepository } from "@application/interfaces/repositories/collection/ICollectionLoadByIdRepository";
import { ICollectionQueryRepository } from "@application/interfaces/repositories/collection/ICollectionQueryRepository";
import { ICollectionSearchRepository } from "@application/interfaces/repositories/collection/ICollectionSearchRepository";

export class CollectionRepository implements
    ICollectionLoadByIdRepository,
    ICollectionUpdateRepository,
    ICollectionCreateRepository,
    ICollectionQueryRepository,
    ICollectionSearchRepository
{
    static async getCollection(): Promise<Collection> {
        return await dbConnection.getCollection('collection');
    }

    static async getBlockCollection(): Promise<Collection> {
        return await dbConnection.getCollection('block');
    }

    async loadCollectionById(
        id: string
    ): Promise<ICollectionLoadByIdRepository.Response> {
        const collection = await CollectionRepository.getCollection();

        const block = await collection.findOne({
            _id: id as unknown as ObjectId
        })

        return block && mapDocument(block);
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

    async queryCollection({ collectionView, source, loader }: ICollectionQueryRepository.Request): Promise<ICollectionQueryRepository.Response> {
        const collection = await CollectionRepository.getBlockCollection();

        const results = await collection.find({
            parent_table: source.type,
            parent_id: source.id,
            space_id: source.spaceId
        }).toArray();
        
        return results.map((doc) => mapDocument(doc)) as unknown as ICollectionQueryRepository.Response;       
    }

    async searchBlockInCollection({ collectionId, filters, ignoresHighlight, limit, query, recentPagesForBoosting, sort, spaceId }: ICollectionSearchRepository.Request): Promise<ICollectionSearchRepository.Response> {
        return [];
    }
}