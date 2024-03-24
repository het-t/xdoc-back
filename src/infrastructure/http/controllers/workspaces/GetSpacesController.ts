import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { IGetSpacesInterface } from "@application/interfaces/use-cases/spaces/IGetSpacesInterface";
import { ok } from "@infrastructure/http/helpers/http";

export namespace GetSpacesController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class GetSpacesController extends BaseController {
    constructor(
        private readonly getSpaces: IGetSpacesInterface
    ) {
        super();
    }

    async execute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const { userId } = httpRequest.body;
        
        await this.getSpaces.execute({
            userId
        })

        const spacesOrError = {
            "dbf9ee2d-ded5-4b35-b63d-de778f9dc19a": {
                "spaceId": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
                "value": {
                    "value": {
                        "id": "dbf9ee2d-ded5-4b35-b63d-de778f9dc19a",
                        "version": 414,
                        "space_id": "f2cf1fd1-8789-4ddd-9190-49f41966c446",
                        "bookmarked_pages": [
                            "ad3a2c35-a9c8-4d99-8182-051fc8964pg2",
                            "47238a83-fb69-4d72-ba7c-9d491d20fpg2",
                        ],
                        "parent_id": "ca5f99c6-879b-4562-bd41-6651fc8d2099",
                        "parent_table": "user_root",
                        "alive": true,
                        "notify_mobile": true,
                        "notify_desktop": true,
                        "notify_email": true,
                        "visited_templates": [
                            "7e89f436-7aac-4f66-b0a6-6e65ec868d2a",
                            "88c9c2b0-d732-4342-8963-0580a4725571",
                            "ba43b46e-4ad3-47f7-95f0-58a3ba01476f",
                            "aebe0ee9-b0df-4ebb-bc61-ed69a09c7c8e",
                            "c6c8cadc-eaaa-46a3-aef7-0d18d6ce79f1",
                            "f685f763-d1f5-4dd1-bbc4-c7e9367cbbd5",
                            "2c76610c-703f-4246-9937-d21590f8dfff",
                            "a9056d36-db54-4e74-855c-6749a363dd21",
                            "cc0f64ab-f56d-4dae-87e9-b77931ce4b7c",
                            "2731005d-3f2c-4d59-af95-857605008540",
                            "269bb4b1-693f-4e47-844b-f181b6c92137",
                            "4cd0eced-e273-46c2-84f5-a7efd7fbdd2f"
                        ],
                        "sidebar_hidden_templates": [
                            "7e89f436-7aac-4f66-b0a6-6e65ec868d2a",
                            "88c9c2b0-d732-4342-8963-0580a4725571",
                            "ba43b46e-4ad3-47f7-95f0-58a3ba01476f",
                            "aebe0ee9-b0df-4ebb-bc61-ed69a09c7c8e",
                            "c6c8cadc-eaaa-46a3-aef7-0d18d6ce79f1",
                            "f685f763-d1f5-4dd1-bbc4-c7e9367cbbd5",
                            "2c76610c-703f-4246-9937-d21590f8dfff",
                            "a9056d36-db54-4e74-855c-6749a363dd21",
                            "cc0f64ab-f56d-4dae-87e9-b77931ce4b7c",
                            "2731005d-3f2c-4d59-af95-857605008540",
                            "269bb4b1-693f-4e47-844b-f181b6c92137",
                            "4cd0eced-e273-46c2-84f5-a7efd7fbdd2f"
                        ],
                        "created_getting_started": true,
                        "created_onboarding_templates": true,
                        "private_pages": [
                            "ad3a2c35-a9c8-4d99-8182-051fc8964pg2",
                            "47238a83-fb69-4d72-ba7c-9d491d20fpg2",
                            "47238a83-fb69-4d72-ba7c-9d491d20f6be",
                            "ad3a2c35-a9c8-4d99-8182-051fc8964207"
                        ],
                        "joined": true,
                        "joined_teams": [
                            "1122be2a-0b3a-4ca7-b782-37a55a5f4798"
                        ],
                        "settings": {
                            "personal_home": {
                                "version": 29,
                                "hide_new_badge": false,
                                "enabled_features": {
                                    "tips": true,
                                    "tasks": true,
                                    "calendar": true,
                                    "greeting": true,
                                    "templates": true
                                },
                                "seen_welcome_animation": true,
                                "home_landing_page_enabled": "home_landing_page_without_default"
                            },
                            "user_survey_data": {
                                "role": {
                                    "value": "personal",
                                    "version": 2,
                                    "collected_at": 1670100111083,
                                    "collected_from": "onboarding"
                                },
                                "function": {
                                    "value": "other",
                                    "version": 4,
                                    "collected_at": 1670100111083,
                                    "collected_from": "onboarding"
                                }
                            },
                            "notify_email_digest": true,
                            "ai_qna_waitlist_shown": true
                        }
                    },
                    "role": "editor"
                }
            }
        }

        return ok({
            space_view: spacesOrError
        });
    }
}