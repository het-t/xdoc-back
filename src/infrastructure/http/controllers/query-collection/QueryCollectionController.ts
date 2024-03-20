import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { ICollectionQuery } from "@application/interfaces/use-cases/collection/ICollectionQuery";
import { ok } from "@infrastructure/http/helpers/http";

export namespace QueryCollectionController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class QueryCollectionController extends BaseController {
    constructor(
        private readonly queryCollection: ICollectionQuery
    ) {
        super();
    }
    
    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const { source, loader, collectionView } = httpRequest.body;

        // const results = await this.queryCollection.execute({collectionView, source, loader});
        
        const results = {
            result: {
                type: "reducers",
                reducerResults: {
                    collection_group_results: {
                        type: "results",
                        blockIds: [
                            "baa9ecda-888c-467c-823d-5a9963352bf1",
                            "4311b8f4-7508-4121-b060-77975c9b436c",
                            "1c02ee23-88ae-41eb-95cd-f7d86f5948f7"
                        ],
                        hasMore: false
                    }
                },
                sizeHint: 8
            },
            recordMap: {
                "block": {
                    "baa9ecda-888c-467c-823d-5a9963352bf1": {
                        "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
                        "value": {
                            "value": {
                                "id": "baa9ecda-888c-467c-823d-5a9963352bf1",
                                "type": "page",
                                "properties": {
                                    "title": [[
                                        "Trademark application"
                                    ]],
                                    "e_rz": [[
                                        "Low"
                                    ]],
                                    "J_Ab": [[
                                        "Pending approval from authority"
                                    ]]
                                },
                                "created_time": 1702578580864,
                                "last_edited_time": 1709405147421,
                                "parent_id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
                                "parent_table": "collection",
                                "alive": true,
                                "created_by_table": "xdoc_user",
                                "created_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                "last_edited_by_table": "xdoc_user",
                                "last_edited_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
                            }
                        }
                    },
                    "4311b8f4-7508-4121-b060-77975c9b436c": {
                        "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
                        "value": {
                            "value": {
                                "id": "4311b8f4-7508-4121-b060-77975c9b436c",
                                "type": "page",
                                "properties": {
                                    "title": [[
                                        "GST registration"
                                    ]]
                                },
                                "content": [
                                    "3c7ccdc4-ccb5-4ea7-ac4b-83d89dd8b2c9",
                                    "ff7a106a-ea5e-415b-aa19-efc3d3fca3f1"
                                ],
                                "created_time": 1702578580864,
                                "last_edited_time": 1709405147421,
                                "parent_id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
                                "parent_table": "collection",
                                "alive": true,
                                "created_by_table": "xdoc_user",
                                "created_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                "last_edited_by_table": "xdoc_user",
                                "last_edited_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
                            }
                        }
                    },
                    "1c02ee23-88ae-41eb-95cd-f7d86f5948f7": {
                        "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
                        "value": {
                            "value": {
                                "id": "1c02ee23-88ae-41eb-95cd-f7d86f5948f7",
                                "type": "page",
                                "properties": {
                                    "title": [[
                                        "Appointment of additional directors"
                                    ]]
                                },
                                "created_time": 1702578580864,
                                "last_edited_time": 1709405147421,
                                "parent_id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
                                "parent_table": "collection",
                                "alive": true,
                                "created_by_table": "xdoc_user",
                                "created_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                "last_edited_by_table": "xdoc_user",
                                "last_edited_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                                "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
                            }
                        }
                    }
                }
            },
            collectionIds: ["2db466a0-b0d9-4dec-809b-a90e3fbaf120"],
            allBlockIds: [
                "baa9ecda-888c-467c-823d-5a9963352bf1",
                "4311b8f4-7508-4121-b060-77975c9b436c",
                "1c02ee23-88ae-41eb-95cd-f7d86f5948f7"
            ]
        }

        return ok(results);
    }
}