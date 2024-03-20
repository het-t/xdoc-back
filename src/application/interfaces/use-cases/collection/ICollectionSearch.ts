import { UseCase } from "../UseCase"

export namespace ICollectionSearch {
    export type Request = {
        collectionId: string,
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
            pageId: string
        }>,
        sort: object,
        source: string,
        spaceId: string,
        type: "BlocksInCollection" 
    }
    export type Response = {
        results: Array<object>,
        total: number,
        recordMap: Object,
    }
    // trackEventProperties: Object,
    // clusterInfo: Object
}

export interface ICollectionSearch extends UseCase<
    ICollectionSearch.Request,
    ICollectionSearch.Response
> {
    execute(
        { collectionId, filters, ignoresHighlight, limit, query, recentPagesForBoosting, sort, source, spaceId, type }: ICollectionSearch.Request
    ): Promise<ICollectionSearch.Response>
}