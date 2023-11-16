import { IListAfterRepository } from "@application/interfaces/repositories/space-view/IListAfterRepository";
import { IListBeforeRepository } from "@application/interfaces/repositories/space-view/IListBeforeRepository";
import dbConnection from "../helpers/db-connection";
import { ObjectId, PushOperator } from "mongodb";

export class SpaceViewRepository implements
    IListAfterRepository,
    IListBeforeRepository
{
    static async getCollection() {
        return await dbConnection.getCollection("space_view")
    }

    async listAfter({ pointer, path, args }: IListAfterRepository.Request): Promise<IListAfterRepository.Response> {
        const collection = await SpaceViewRepository.getCollection();

        const document = await collection.findOne(
            { _id: pointer.id as unknown as ObjectId }
        )

        const end = document?.[path].length;
        const positionToInsert = document?.[path].indexOf(args.after);
            
        await collection.updateOne(
            { _id: pointer.id as unknown as ObjectId },
            {
                $push: {
                    [path]: {
                        $each: [args.id],
                        $position: positionToInsert >= 0 ? positionToInsert + 1 : end
                    }
                }
            }
        )
    }

    async listBefore({ pointer, path, args }: IListBeforeRepository.Request): Promise<IListBeforeRepository.Response> {
        const collection = await SpaceViewRepository.getCollection();

        const document = await collection.findOne(
            { _id: pointer.id as unknown as ObjectId }
        )

        const positionToInsert = document?.favourites.indexOf(args.before)
        
        await collection.updateOne(
            { _id: pointer.id as unknown as ObjectId },
            {
                $push: {
                    [path]: {
                        $each: [args.id],
                        $position: positionToInsert >= 1 ? positionToInsert: 0
                    }
                }
            }
        )
    }
}