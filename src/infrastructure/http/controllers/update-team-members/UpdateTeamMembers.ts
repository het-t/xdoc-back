import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { IUpdateTeamMembers } from "@application/interfaces/use-cases/teams/IUpdateTeamMembers";
import { ok } from "@infrastructure/http/helpers/http";

export namespace UpdateTeamMembersController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class UpdateTeamMembersController extends BaseController {
    constructor(
        private readonly updateTeamMembers: IUpdateTeamMembers
    ) {
        super();
    }

    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const {
            spaceId,
            teamId,
            existingMembersOrGuestsToRemove,
            newMembersOrGuestsToAdd,
            isSettingDefaultTeam,
            addNewMembersToSpace
        } = httpRequest.body;

        await this.updateTeamMembers.execute({
            spaceId,
            teamId,
            existingMembersOrGuestsToRemove,
            newMembersOrGuestsToAdd,
            isSettingDefaultTeam,
            addNewMembersToSpace
        });

        return ok({});
    }
}