import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { ICollectionSearch } from "@application/interfaces/use-cases/collection/ICollectionSearch";
import { ok } from "@infrastructure/http/helpers/http";

export namespace SearchController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class SearchController extends BaseController {
    constructor(
        private readonly searchCollection: ICollectionSearch
    ) {
        super();
    }

    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {        
        const { 
            collectionId,
            filters,
            ignoresHighlight,
            limit,
            query,
            recentPagesForBoosting,
            sort,
            source,
            spaceId,
            type
        } = httpRequest.body;

        let results;

        if (type === "BlocksInCollection") {
            results = this.searchCollection.execute({
                collectionId,
                filters,
                ignoresHighlight,
                limit,
                query,
                recentPagesForBoosting,
                sort,
                source,
                spaceId,
                type
            });

            results = {
                "results": [
                    {
                        "id": "ac58d68f-4ba9-4603-aa3e-38623aac9794"
                    },
                    {
                        "id": "ac58d68f-4ba9-4603-aa3e-38623aac9795"
                    }
                ],
                "total": 1,
                "recordMap": {
                    "block": {
                        "ac58d68f-4ba9-4603-aa3e-38623aac9794": {
                            "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
                            "value": {
                                "value": {
                                    "id": "ac58d68f-4ba9-4603-aa3e-38623aac9794",
                                    "version": 41,
                                    "type": "page",
                                    "properties": {
                                        "title": [
                                            [
                                                "Registration of company"
                                            ]
                                        ]
                                    },
                                    "content": [
                                        "3c7ccdc4-ccb5-4ea7-ac4b-83d89dd8b2b9",
                                        "ff7a106a-ea5e-415b-aa19-efc3d3fca3e1"
                                    ],
                                    "created_time": 1705662555572,
                                    "last_edited_time": 1705662567616,
                                    "parent_id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
                                    "parent_table": "collection",
                                    "alive": true,
                                    "is_template": true,
                                    "created_by_table": "notion_user",
                                    "created_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                    "last_edited_by_table": "notion_user",
                                    "last_edited_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                    "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
                                },
                                "role": "editor"
                            }
                        },
                        "ac58d68f-4ba9-4603-aa3e-38623aac9795": {
                            "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
                            "value": {
                                "value": {
                                    "id": "ac58d68f-4ba9-4603-aa3e-38623aac9795",
                                    "version": 41,
                                    "type": "page",
                                    "properties": {
                                        "title": [
                                            [
                                                "Trademark application"
                                            ]
                                        ]
                                    },
                                    "content": [
                                        "3c7ccdc4-ccb5-4ea7-ac4b-83d89dd8b2c0",
                                        "ff7a106a-ea5e-415b-aa19-efc3d3fca3e2"
                                    ],
                                    "created_time": 1705662555572,
                                    "last_edited_time": 1705662567616,
                                    "parent_id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
                                    "parent_table": "collection",
                                    "alive": true,
                                    "is_template": true,
                                    "created_by_table": "notion_user",
                                    "created_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                    "last_edited_by_table": "notion_user",
                                    "last_edited_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                    "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
                                },
                                "role": "editor"
                            }
                        }
                    }
                }
            }
        }

        return ok(results);
    }
}