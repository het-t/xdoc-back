import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { CreateTeam } from "@application/use-cases/teams/CreateTeam";
import { ok } from "@infrastructure/http/helpers/http";
import { randomUUID } from "crypto";

export namespace CreateTeamController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class CreateTeamController extends BaseController {
    constructor(
        private readonly createTeam: CreateTeam
    ) {
        super();
    }

    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const {
            isDefault,
            accessLevel,
            name,
            description,
            spaceId
        } = httpRequest.body;

        const userId = "ca5f99c6-879b-4562-bd41-6651fc8d2099";
        const teamId = randomUUID();

        await this.createTeam.execute({
            id: teamId,
            spaceId,
            userId,
            name,
            description,
            isDefault,
            accessLevel
        });

        return ok({
            teamId
        });
    }
}