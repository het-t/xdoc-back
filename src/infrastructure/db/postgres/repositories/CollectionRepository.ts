import { pool } from "../helpers/db-connection";
import { ICollectionUpdateRepository } from "@application/interfaces/repositories/collection/ICollectionUpdateRepsitory";
import { ICollectionCreateRepository } from "@application/interfaces/repositories/collection/ICollectionCreateRepository";
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
    async loadCollectionById(
        id: string
    ): Promise<ICollectionLoadByIdRepository.Response> {
        return null;
    }

    async createCollection(
        { pointer, args }: ICollectionCreateRepository.Request
    ): Promise<ICollectionCreateRepository.Response> {
        return null;
    }

    async updateCollection(
        {pointer, path, args}: ICollectionUpdateRepository.Request
    ): Promise<ICollectionUpdateRepository.Response> {
        return null;
    }

    async queryCollection({ collectionView, source, loader }: ICollectionQueryRepository.Request): Promise<ICollectionQueryRepository.Response> {
        return null;
    }

    async searchBlockInCollection({ collectionId, filters, ignoresHighlight, limit, query, recentPagesForBoosting, sort, spaceId }: ICollectionSearchRepository.Request): Promise<ICollectionSearchRepository.Response> {
        return [];
    }
}