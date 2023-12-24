import { ICreateBlockRepository } from "@application/interfaces/repositories/blocks/ICreateBlockRepository";
import { ILoadBlockByIdRepository } from "@application/interfaces/repositories/blocks/ILoadBlockByIdRepository";
import { Collection, ObjectId } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { mapDocument, mapToDocument, objectIdToString, stringToObjectId } from "../helpers/mapper";
import { IUpdateBlockByIdRepository } from "@application/interfaces/repositories/blocks/IUpdateBlockByIdRepository";

export class BlockRepository implements
    ILoadBlockByIdRepository,
    ICreateBlockRepository,
    IUpdateBlockByIdRepository
{
    static async getCollection(): Promise<Collection> {
        return await dbConnection.getCollection('block');
    }

    async loadBlockById(
        id: ILoadBlockByIdRepository.Request
    ): Promise<ILoadBlockByIdRepository.Response> {
        const collection = await BlockRepository.getCollection();
        const block = collection.findOne({
            _id: stringToObjectId(id)
        })

        return block && mapDocument(block);
    }

    async createBlock(
        args: ICreateBlockRepository.Request
    ): Promise<ICreateBlockRepository.Response> {
        const collection = await BlockRepository.getCollection();

        const document = mapToDocument(args);
        
        await collection.insertOne(document);
    }

    async updateBlockById(
        { pointer, path, args }: IUpdateBlockByIdRepository.Request
    ): Promise<IUpdateBlockByIdRepository.Response> {
        const collection = await BlockRepository.getCollection();

        await collection.findOneAndUpdate(
            {
                _id: pointer.id as unknown as ObjectId
            },
            {
                $set: path ? { [path]: args } : args
            }
        )
    }
}