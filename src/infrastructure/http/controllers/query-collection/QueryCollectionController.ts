import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { ICollectionQuery } from "@application/interfaces/use-cases/collection/ICollectionQuery";
import { ok } from "@infrastructure/http/helpers/http";
import { ILoadBlocksByPointers } from "@application/interfaces/use-cases/blocks/ILoadBlocksByPointers";

export namespace QueryCollectionController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class QueryCollectionController extends BaseController {
    constructor(
        private readonly queryCollection: ICollectionQuery,
        private readonly loadBlocksByPointers: ILoadBlocksByPointers
    ) {
        super();
    }
    
    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const { source, loader } = httpRequest.body;

        const result = await this.queryCollection.execute({
            source, 
            loader
        });

        const collectionRecordIds = result.reducerResults?.collection_group_results?.blockIds;

        const collectionRecordsPointers = collectionRecordIds?.map((id) => {
            return {
                id,
                spaceId: source.spaceId,
                table: "block"
            }
        });

        let recordMap = {};
        if(collectionRecordsPointers) {
            recordMap = await this.loadBlocksByPointers.execute({
                pointers: collectionRecordsPointers,
                spaceId: source.spaceId
            });
        }

        return ok({
            result,
            recordMap
        });
    }
}