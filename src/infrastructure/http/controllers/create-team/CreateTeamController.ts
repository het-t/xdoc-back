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
        httpRequest: IHttpRequest,
        { locals }: Record<string, any>
    ): Promise<IHttpResponse> {
        const {
            isDefault,
            accessLevel,
            name,
            description,
            spaceId
        } = httpRequest.body;


        const teamId = await this.createTeam.execute({
            spaceId,
            createdById: locals.userId,
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