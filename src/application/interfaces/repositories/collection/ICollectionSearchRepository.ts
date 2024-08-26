import { UUID } from "crypto"

export namespace ICollectionSearchRepository {
    export type Request = {
        collectionId: UUID,
        filters: {
            ancestors: Array<string>,
            createdBy: Array<string>,
            createdTime: Object,
            editedTime: Object,
            excludeTemplates: boolean,
            inTeams: Array<string>,
            includePublicPagesWithoutExplicitAccess: boolean,
            isDeletedOnly: boolean,
            lastEditedTime: Object,
            navigableBlockContentOnly: boolean,
            requiredEditPermission: boolean
        },
        ignoresHighlight: boolean,
        limit: number,
        query: string,
        recentPagesForBoosting: Array<{
            visitedAt: string,
            pageId: UUID
        }>,
        sort: object,
        spaceId: string
    }
    export type Response = Array<object>
}

export interface ICollectionSearchRepository {
    searchBlockInCollection(
        {
            collectionId,
            filters,
            ignoresHighlight,
            limit,
            query,
            recentPagesForBoosting,
            sort,
            spaceId
        }: ICollectionSearchRepository.Request
    ): Promise<ICollectionSearchRepository.Response>
}