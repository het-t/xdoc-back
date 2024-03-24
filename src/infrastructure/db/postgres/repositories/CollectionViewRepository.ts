import { pool } from "../helpers/db-connection";
import { ICollectionViewUpdateRepository } from "@application/interfaces/repositories/collection-view/ICollectionViewUpdateRepository";
import { preparePathedUpdate } from "../helpers/prepare-pathed-update";

export class CollectionViewRepository implements 
    ICollectionViewUpdateRepository
{
    async updateCollectionView(
        { pointer, path, args }: ICollectionViewUpdateRepository.Request
    ): Promise<ICollectionViewUpdateRepository.Response> {
        return null;
    }
}