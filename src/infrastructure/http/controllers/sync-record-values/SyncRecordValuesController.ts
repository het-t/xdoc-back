import { ILoadBlocksByPointers } from "@application/interfaces/use-cases/blocks/ILoadBlocksByPointers";
import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { ok, unauthorized } from "@infrastructure/http/helpers/http";
import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";

export interface IPointer {
    table: string,
    id: string,
    spaceId?: string
}

export namespace SyncRecordValuesController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class SyncRecordValuesController extends BaseController {
    constructor(
        private readonly loadBlocksByPointers: ILoadBlocksByPointers
    ) {
        super();
    }

    async execute(
        httpRequest: SyncRecordValuesController.Request,
        { locals }: IHttpResponse
    ): Promise<SyncRecordValuesController.Response> {
        const requests = httpRequest.body.requests;

        const requestedPointers: Set<IPointer> = new Set();

        requests.map((request: { pointer: IPointer }) => {
            requestedPointers.add(request.pointer);
        });

        if(!locals?.userId) return unauthorized(new Error(""));

        const responseRecordValues = await this.loadBlocksByPointers.execute({
            pointers: Array.from(requestedPointers),
            userId: locals.userId
        });

        const recordMap: Record<string, any> = {};

        responseRecordValues.map(recordValue => {
            
        })

        return ok({
            recordMap: responseRecordValues
        });
    }
}
        // recordPointers.map(async (pointer: IPointer) => {    
            
        //     if (pointer.id === "!ad3a2c35-a9c8-4d99-8182-051fc8964207") {
        //         recordMap["block"][pointer.id] = {
        //             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             "value": {
        //                 "value": {
        //                     "id": "ad3a2c35-a9c8-4d99-8182-051fc8964207",
        //                     "version": 26,
        //                     "type": "collection_view_page",
        //                     "view_ids": [
        //                         "f3498306-3d20-489d-9fa4-1c1693528939"
        //                     ],
        //                     "collection_id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
        //                     "format": {
        //                         "collection_pointer": {
        //                             "id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
        //                             "table": "collection",
        //                             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                         }
        //                     },
        //                     "created_time": 1701968452035,
        //                     "last_edited_time": 1705663523977,
        //                     "parent_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //                     "parent_table": "xdoc_space",
        //                     "alive": true,
        //                     "created_by_table": "notion_user",
        //                     "created_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
        //                     "last_edited_by_table": "notion_user",
        //                     "last_edited_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
        //                     "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 },
        //                 "role": "editor"
        //             }            
        //         }
        //     }
        //     else if (pointer.id === "f3498306-3d20-489d-9fa4-1c1693528939") {
        //         recordMap["collection_view"][pointer.id] = {
        //             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             "value": {
        //                 "value": {
        //                     "id": "f3498306-3d20-489d-9fa4-1c1693528939",
        //                     "version": 21,
        //                     "name": "Table",
        //                     "type": "table",
        //                     "format": {
        //                         "table_wrap": true,
        //                         "list_properties": [
        //                             {
        //                                 "visible": true,
        //                                 "property": "e_rz"
        //                             },
        //                             {
        //                                 "visible": true,
        //                                 "property": "i^J["
        //                             }
        //                         ],
        //                         "table_properties": [
        //                             {
        //                                 "width": 276,
        //                                 "visible": true,
        //                                 "property": "title"
        //                             },
        //                             {
        //                                 "visible": true,
        //                                 "property": "J_Ab"
        //                             },
        //                             {
        //                                 "visible": true,
        //                                 "property": "IU]T"
        //                             },
        //                             {
        //                                 "visible": true,
        //                                 "property": "e_rz"
        //                             }
        //                         ],
        //                         "collection_pointer": {
        //                             "id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
        //                             "table": "collection",
        //                             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                         }
        //                     },
        //                     "parent_id": "ad3a2c35-a9c8-4d99-8182-051fc8964207",
        //                     "parent_table": "block",
        //                     "alive": true,
        //                     "page_sort": [
        //                         "baa9ecda-888c-467c-823d-5a9963352bf1",
        //                         "4311b8f4-7508-4121-b060-77975c9b436c",
        //                         "1c02ee23-88ae-41eb-95cd-f7d86f5948f7"
        //                     ],
        //                     "query2": {
        //                         "calendar_by": "i^J[",
        //                         "aggregations": [
        //                             {
        //                                 "property": "title",
        //                                 "aggregator": "count"
        //                             }
        //                         ]
        //                     },
        //                     "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 },
        //                 "role": "editor"
        //             }
        //         }
        //     }
        //     else if (pointer.id === "2db466a0-b0d9-4dec-809b-a90e3fbaf120") {
        //         recordMap['collection'][pointer.id] = {
                //     "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
                //     "value": {
                //         "value": {
                //             "id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
                //             "version": 15,
                //             "name": [
                //                 [
                //                     "Tasks"
                //                 ]
                //             ],
                //             "schema": {
                //                 "e_rz": {
                //                     "name": "Priority",
                //                     "type": "select",
                //                     "options": [
                //                         {
                //                             "id": "31a1d5e9-b5e9-43fb-b3d4-bb59e0c61f23",
                //                             "color": "green",
                //                             "value": "Low"
                //                         },
                //                         {
                //                             "id": "31a1b5e9-d5e9-43fb-b3d4-bb59e0c61f23",
                //                             "color": "yellow",
                //                             "value": "Moderate"
                //                         },
                //                         {
                //                             "id": "31a1d5e9-43fb-b5e9-b3d4-bb59e0c61f23",
                //                             "color": "red",
                //                             "value": "High"
                //                         }
                //                     ]
                //                 },
                //                 "J_Ab": {
                //                     "name": "Status",
                //                     "type": "status",
                //                     "groups": [
                //                         {
                //                             "id": "25e5fcf2-fb24-4e5c-88aa-c0d7a1acaf43",
                //                             "name": "To do",
                //                             "color": "gray",
                //                             "optionIds": [
                //                                 "0ca3665d-d708-430f-a024-95f0d7f907e8",
                //                                 "KJY]"
                //                             ]
                //                         },
                //                         {
                //                             "id": "360a2d24-f37a-43e2-a4ae-f1f19e5ba5ef",
                //                             "name": "In progress",
                //                             "color": "blue",
                //                             "optionIds": [
                //                                 "gh<L",
                //                                 "WEtG",
                //                                 "25621df1-d131-4b63-bd98-7cea84b4fb06"
                //                             ]
                //                         },
                //                         {
                //                             "id": "8abf40d9-7c7e-4502-bd3d-f3995a4f3e0d",
                //                             "name": "Complete",
                //                             "color": "green",
                //                             "optionIds": [
                //                                 "S>EH",
                //                                 "99126e59-59f5-40d4-b703-1271b73ab663"
                //                             ]
                //                         }
                //                     ],
                //                     "options": [
                //                         {
                //                             "id": "0ca3665d-d708-430f-a024-95f0d7f907e8",
                //                             "value": "Not started"
                //                         },
                //                         {
                //                             "id": "KJY]",
                //                             "value": "Reassigned"
                //                         },
                //                         {
                //                             "id": "25621df1-d131-4b63-bd98-7cea84b4fb06",
                //                             "color": "blue",
                //                             "value": "In progress"
                //                         },
                //                         {
                //                             "id": "99126e59-59f5-40d4-b703-1271b73ab663",
                //                             "color": "green",
                //                             "value": "Done"
                //                         },
                //                         {
                //                             "id": "S>EH",
                //                             "color": "red",
                //                             "value": "Cancelled"
                //                         },
                //                         {
                //                             "id": "WEtG",
                //                             "color": "yellow",
                //                             "value": "Pending for approval"
                //                         },
                //                         {
                //                             "id": "gh<L",
                //                             "value": "Pending approval from authority"
                //                         }
                //                     ],
                //                     "defaultOption": "Not started"
                //                 },
                //                 "G<Mv": {
                //                     "name": "Client",
                //                     "type": "relation",
                //                     "version": "v2",
                //                     "autoRelate": {
                //                         "enabled": false
                //                     },
                //                     "collection_id": "e8302e06-84ff-493e-93a6-0d0632485389",
                //                     "collection_pointer": {
                //                         "id": "e8302e06-84ff-493e-93a6-0d0632485389",
                //                         "table": "collection",
                //                         "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
                //                     }
                //                 },
                //                 "i^J[": {
                //                     "name": "Deadline",
                //                     "type": "date",
                //                     "date_format": "DD/MM/YYYY",
                //                     "time_format": "LT"
                //                 },
                //                 "IU]T": {
                //                     "name": "Assigned to",
                //                     "type": "person"
                //                 },
                //                 "title": {
                //                     "name": "Name",
                //                     "type": "title"
                //                 }
                //             },
                //             "format": {
                //                 "collection_page_properties": [
                //                     {
                //                         "visible": true,
                //                         "property": "e_rz"
                //                     },
                //                     {
                //                         "visible": true,
                //                         "property": "J_Ab"
                //                     }
                //                 ]
                //             },
                //             "parent_id": "ad3a2c35-a9c8-4d99-8182-051fc8964207",
                //             "parent_table": "block",
                //             "alive": true,
                //             "template_pages": [
                //                 "ac58d68f-4ba9-4603-aa3e-38623aac9794"
                //             ],
                //             "migrated": true,
                //             "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
                //         },
                //         "role": "editor"
                //     }
                // }
        //     }
        //     else if (pointer.id === "47238a83-fb69-4d72-ba7c-9d491d20f6be") {
        //         recordMap["block"][pointer.id] = {
        //             spaceId: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             value: {
        //                 value: {
        //                     id: pointer.id,
        //                     type: "page",
        //                     properties: {
        //                         title: [
        //                             [
        //                                 pointer.id
        //                             ]
        //                         ]
        //                     },
        //                     parent_table: "collection",
        //                     parent_id: "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
        //                     discussions: [
        //                         "128fd538-dc03-49ee-bef6-57b87a2519d4"
        //                     ],
        //                     content: [
        //                         "3c7ccdc4-ccb5-4ea7-ac4b-83d89dd8b2c9",
        //                         "ff7a106a-ea5e-415b-aa19-efc3d3fca3f1"
        //                     ],
        //                     space_id: "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 }
        //             }
        //         }
        //         // ,
        //         //                 e_rz: [
        //         //                     ['some', 'random', 'tag']
        //         //                 ]
        //     }
        //     else if (pointer.id === "128fd538-dc03-49ee-bef6-57b87a2519d4") {
        //         recordMap["discussion"][pointer.id] = {
        //             spaceId: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             value: {
        //                 value: {
        //                     id: pointer.id,
        //                     type: "default",
        //                     parent_id: "47238a83-fb69-4d72-ba7c-9d491d20f6be",
        //                     parent_table: "block",
        //                     resolved: false,
        //                     comments: [
        //                         "401f670f-1403-41c0-9d87-5edfeb6f3a84",
        //                         "368ea6fd-6221-4706-8827-bba449fdeea1"
        //                     ],
        //                     space_id: "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 }
        //             }
        //         }
        //     }
        //     else if (pointer.id === "401f670f-1403-41c0-9d87-5edfeb6f3a84") {
        //         recordMap["comment"][pointer.id] = {
        //             spaceId: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             value: {
        //                 value: {
        //                     id: pointer.id,
        //                     parent_id: "128fd538-dc03-49ee-bef6-57b87a2519d4",
        //                     parent_table: "discussion",
        //                     alive: true,
        //                     text: [
        //                         [
        //                             "1st comment"
        //                         ]
        //                     ],
        //                     created_time: 1707358688542,
        //                     last_edited_time: 1707358680000,
        //                     space_id: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //                     created_by_table: "notion_user",
        //                     created_by_id: "ca5f99c6-879b-4562-bd41-6651fc8d2099"
        //                 }
        //             }
        //         }
        //     }
        //     else if (pointer.id === "368ea6fd-6221-4706-8827-bba449fdeea1") {
        //         recordMap["comment"][pointer.id] = {
        //             spaceId: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             value: {
        //                 value: {
        //                     id: pointer.id,
        //                     parent_id: "128fd538-dc03-49ee-bef6-57b87a2519d4",
        //                     parent_table: "discussion",
        //                     alive: true,
        //                     text: [
        //                         [
        //                             "2d comment"
        //                         ]
        //                     ],
        //                     created_time: 1707358688542,
        //                     last_edited_time: 1707358680000,
        //                     space_id: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //                     created_by_table: "notion_user",
        //                     created_by_id: "ca5f99c6-879b-4562-bd41-6651fc8d2099"
        //                 }
        //             }
        //         }
        //     }
        //     //second collection
        //     else if (pointer.id === "ad3a2c35-a9c8-4d99-8182-051fc8964992") {
        //         recordMap["block"][pointer.id] = {
        //             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             "value": {
        //                 "value": {
        //                     "id": "ad3a2c35-a9c8-4d99-8182-051fc8964992",
        //                     "version": 26,
        //                     "type": "collection_view_page",
        //                     "view_ids": [
        //                         "f3498306-3d20-489d-9fa4-1c1693528pg2"
        //                     ],
        //                     "collection_id": "2db466a0-b0d9-4dec-809b-a90e3fbafpg2",
        //                     "format": {
        //                         "collection_pointer": {
        //                             "id": "2db466a0-b0d9-4dec-809b-a90e3fbafpg2",
        //                             "table": "collection",
        //                             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                         }
        //                     },
        //                     "created_time": 1701968452035,
        //                     "last_edited_time": 1705663523977,
        //                     "parent_id": "37b06f5d-e5ae-408f-b12a-ad1294ff1pg2",
        //                     "parent_table": "block",
        //                     "alive": true,
        //                     "created_by_table": "notion_user",
        //                     "created_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
        //                     "last_edited_by_table": "notion_user",
        //                     "last_edited_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
        //                     "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 },
        //                 "role": "editor"
        //             }            
        //         }
        //     }
        //     else if (pointer.id === "f3498306-3d20-489d-9fa4-1c1693528pg2") {
        //         recordMap["collection_view"][pointer.id] = {
        //             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             "value": {
        //                 "value": {
        //                     "id": "f3498306-3d20-489d-9fa4-1c1693528pg2",
        //                     "version": 21,
        //                     "name": "Table",
        //                     "type": "table",
        //                     "format": {
        //                         "table_wrap": true,
        //                         "list_properties": [
        //                             {
        //                                 "visible": true,
        //                                 "property": "e_rz"
        //                             },
        //                             {
        //                                 "visible": true,
        //                                 "property": "i^J["
        //                             }
        //                         ],
        //                         "table_properties": [
        //                             {
        //                                 "width": 276,
        //                                 "visible": true,
        //                                 "property": "title"
        //                             },
        //                             {
        //                                 "visible": true,
        //                                 "property": "e_rz"
        //                             },
        //                             {
        //                                 "visible": true,
        //                                 "property": "{Tp`"
        //                             }
        //                         ],
        //                         "collection_pointer": {
        //                             "id": "2db466a0-b0d9-4dec-809b-a90e3fbafpg2",
        //                             "table": "collection",
        //                             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                         }
        //                     },
        //                     "parent_id": "ad3a2c35-a9c8-4d99-8182-051fc8964992",
        //                     "parent_table": "block",
        //                     "alive": true,
        //                     "page_sort": [
        //                         "baa9ecda-888c-467c-823d-5a9963352pg2",
        //                         "4311b8f4-7508-4121-b060-77975c9b436c"
        //                     ],
        //                     "query2": {
        //                         "calendar_by": "i^J[",
        //                         "aggregations": [
        //                             {
        //                                 "property": "title",
        //                                 "aggregator": "count"
        //                             }
        //                         ]
        //                     },
        //                     "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 },
        //                 "role": "editor"
        //             }
        //         }
        //     }
        //     else if (pointer.id === "2db466a0-b0d9-4dec-809b-a90e3fbafpg2") {
        //         recordMap['collection'][pointer.id] = {
        //             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             "value": {
        //                 "value": {
        //                     "id": "2db466a0-b0d9-4dec-809b-a90e3fbafpg2",
        //                     "version": 15,
        //                     "name": [
        //                         [
        //                             "Clients"
        //                         ]
        //                     ],
        //                     "schema": {
        //                         "e_rz": {
        //                             "name": "Tags",
        //                             "type": "multi_select",
        //                             "options": [
        //                                 {
        //                                     "id": "31a1d5e9-b5e9-43fb-b3d4-bb59e0c61pg2",
        //                                     "color": "yellow",
        //                                     "value": "random"
        //                                 },
        //                                 {
        //                                     "id": "31a1b5e9-d5e9-43fb-b3d4-bb59e0c61pg2",
        //                                     "color": "purple",
        //                                     "value": "some"
        //                                 },
        //                                 {
        //                                     "id": "31a1d5e9-43fb-b5e9-b3d4-bb59e0c61pg2",
        //                                     "color": "brown",
        //                                     "value": "tag"
        //                                 }
        //                             ]
        //                         },
        //                         "i^J[": {
        //                             "name": "Date",
        //                             "type": "date",
        //                             "date_format": "DD/MM/YYYY",
        //                             "time_format": "LT"
        //                         },
        //                         "title": {
        //                             "name": "Name",
        //                             "type": "title"
        //                         },
        //                         "{Tp`": {
        //                             "name": "db1_key 1",
        //                             "type": "relation",
        //                             "version": "v2",
        //                             "property": "eg<A",
        //                             "autoRelate": {
        //                                 "enabled": false
        //                             },
        //                             "collection_id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
        //                             "collection_pointer": {
        //                                 "id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
        //                                 "table": "collection",
        //                                 "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                             }
        //                         }
        //                     },
        //                     "format": {
        //                         "collection_page_properties": [
        //                             {
        //                                 "visible": true,
        //                                 "property": "e_rz"
        //                             }
        //                         ]
        //                     },
        //                     "parent_id": "ad3a2c35-a9c8-4d99-8182-051fc8964992",
        //                     "parent_table": "block",
        //                     "alive": true,
        //                     "template_pages": [
        //                         "ac58d68f-4ba9-4603-aa3e-38623aac9pg2"
        //                     ],
        //                     "migrated": true,
        //                     "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 },
        //                 "role": "editor"
        //             }
        //         }
        //     }
        //     else if (pointer.id === "47238a83-fb69-4d72-ba7c-9d491d20fpg2") {
        //         recordMap["block"][pointer.id] = {
        //             spaceId: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             value: {
        //                 value: {
        //                     id: pointer.id,
        //                     type: "page",
        //                     properties: {
        //                         title: [
        //                             [
        //                                 pointer.id
        //                             ]
        //                         ],
        //                         e_rz: [
        //                             ['some', 'random', 'tag']
        //                         ]
        //                     },
        //                     parent_table: "collection",
        //                     parent_id: "2db466a0-b0d9-4dec-809b-a90e3fbafpg2",
        //                     discussions: [
        //                         "128fd538-dc03-49ee-bef6-57b87a251pg2"
        //                     ],
        //                     content: [],
        //                     space_id: "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 }
        //             }
        //         }
        //     }
        //     else if (pointer.id === "128fd538-dc03-49ee-bef6-57b87a251pg2") {
        //         recordMap["discussion"][pointer.id] = {
        //             spaceId: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             value: {
        //                 value: {
        //                     id: pointer.id,
        //                     type: "default",
        //                     parent_id: "47238a83-fb69-4d72-ba7c-9d491d20fpg2",
        //                     parent_table: "block",
        //                     resolved: false,
        //                     comments: [
        //                         "401f670f-1403-41c0-9d87-5edfeb6f3pg2",
        //                         "368ea6fd-6221-4706-8827-bba449fdepg2"
        //                     ],
        //                     space_id: "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 }
        //             }
        //         }
        //     }
        //     else if (pointer.id === "401f670f-1403-41c0-9d87-5edfeb6f3pg2") {
        //         recordMap["comment"][pointer.id] = {
        //             spaceId: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             value: {
        //                 value: {
        //                     id: pointer.id,
        //                     parent_id: "128fd538-dc03-49ee-bef6-57b87a251pg2",
        //                     parent_table: "discussion",
        //                     alive: true,
        //                     text: [
        //                         [
        //                             "pg2: 1st comment"
        //                         ]
        //                     ],
        //                     created_time: 1707358688542,
        //                     last_edited_time: 1707358680000,
        //                     space_id: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //                     created_by_table: "notion_user",
        //                     created_by_id: "ca5f99c6-879b-4562-bd41-6651fc8d2099"
        //                 }
        //             }
        //         }
        //     }
        //     else if (pointer.id === "368ea6fd-6221-4706-8827-bba449fdepg2") {
        //         recordMap["comment"][pointer.id] = {
        //             spaceId: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             value: {
        //                 value: {
        //                     id: pointer.id,
        //                     parent_id: "128fd538-dc03-49ee-bef6-57b87a2519d4",
        //                     parent_table: "discussion",
        //                     alive: true,
        //                     text: [
        //                         [
        //                             "pg2: 2d comment"
        //                         ]
        //                     ],
        //                     created_time: 1707358688542,
        //                     last_edited_time: 1707358680000,
        //                     space_id: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //                     created_by_table: "notion_user",
        //                     created_by_id: "ca5f99c6-879b-4562-bd41-6651fc8d2099"
        //                 }
        //             }
        //         }
        //     }
        //     else if (pointer.id === "ac58d68f-4ba9-4603-aa3e-38623aac9794") {
        //         recordMap["block"][pointer.id] = {
        //             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             "value": {
        //                 "value": {
        //                     "id": "ac58d68f-4ba9-4603-aa3e-38623aac9794",
        //                     "version": 41,
        //                     "type": "page",
        //                     "properties": {
        //                         "title": [
        //                             [
        //                                 "File Form 3"
        //                             ]
        //                         ]
        //                     },
        //                     "content": [
        //                         "3c7ccdc4-ccb5-4ea7-ac4b-83d89dd8b2b9",
        //                         "ff7a106a-ea5e-415b-aa19-efc3d3fca3e1"
        //                     ],
        //                     "created_time": 1705662555572,
        //                     "last_edited_time": 1705662567616,
        //                     "parent_id": "2db466a0-b0d9-4dec-809b-a90e3fbaf120",
        //                     "parent_table": "collection",
        //                     "alive": true,
        //                     "is_template": true,
        //                     "created_by_table": "notion_user",
        //                     "created_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
        //                     "last_edited_by_table": "notion_user",
        //                     "last_edited_by_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
        //                     "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 },
        //                 "role": "editor"
        //             }
        //         }
        //     }
        //     else if (pointer.id === "3c7ccdc4-ccb5-4ea7-ac4b-83d89dd8b2c9") {
        //         recordMap["block"][pointer.id] = {
        //             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             "value": {
        //                 "value": {
        //                     "id": "3c7ccdc4-ccb5-4ea7-ac4b-83d89dd8b2c9",
        //                     "type": "page",
        //                     "properties": {
        //                         "title": [[ pointer.id ]]
        //                     },
        //                     "parent_id": "47238a83-fb69-4d72-ba7c-9d491d20f6be",
        //                     "parent_table": "block",
        //                     "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 },
        //                 "role": "editor"
        //             }
        //         }
        //     }
        //     else if (pointer.id === "ff7a106a-ea5e-415b-aa19-efc3d3fca3f1") {
        //         recordMap["block"][pointer.id] = {
        //             "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //             "value": {
        //                 "value": {
        //                     "id": "ff7a106a-ea5e-415b-aa19-efc3d3fca3f1",
        //                     "type": "page",
        //                     "properties": {
        //                         "title": [[ pointer.id ]]
        //                     },
        //                     "parent_id": "47238a83-fb69-4d72-ba7c-9d491d20f6be",
        //                     "parent_table": "block",
        //                     "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //                 },
        //                 "role": "editor"
        //             }
        //         }
        //     }
        //     // else {
        //     //     recordMap["block"][pointer.id] = {
        //     //         spaceId: "f2cf1fd1-8789-4ddd-9190-49f41966c446",
        //     //         value: {
        //     //             value: {
        //     //                 id: pointer.id,
        //     //                 type: "page",
        //     //                 properties: {
        //     //                     title: [
        //     //                         [
        //     //                             pointer.id
        //     //                         ]
        //     //                     ]
        //     //                 },
        //     //                 parent_table: "block",
        //     //                 parent_id: "ad3a2c35-a9c8-4d99-8182-051fc8964207",
        //     //                 discussions: [],
        //     //                 content: [],
        //     //                 space_id: "f2cf1fd1-8789-4ddd-9190-49f41966c446"
        //     //             }
        //     //         }
        //     //     }
        //     // }
        // });