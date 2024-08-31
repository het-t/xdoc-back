import { UUID } from "crypto"
import { UseCase } from "../UseCase"

export namespace ICollectionSearch {
    export type Request = {
        collectionId: UUID,
        filters: {
            ancestors: UUID[],
            createdBy: UUID[],
            createdTime: Object,
            editedTime: Object,
            excludeTemplates: boolean,
            inTeams: UUID[],
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
        source: string,
        spaceId: UUID,
        type: "BlocksInCollection" 
    }
    export type Response = {
        results: Array<object>,
        total: number,
        recordMap: Object,
    }
}

export interface ICollectionSearch extends UseCase<
    ICollectionSearch.Request,
    ICollectionSearch.Response
> {
    execute(
        { collectionId, filters, ignoresHighlight, limit, query, recentPagesForBoosting, sort, source, spaceId, type }: ICollectionSearch.Request
    ): Promise<ICollectionSearch.Response>
}