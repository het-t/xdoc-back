import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { IGetJoinedTeamsByUserId } from "@application/interfaces/use-cases/teams/IGetJoinedTeamsByUserId";
import { ok } from "@infrastructure/http/helpers/http";
import { ILoadBlockByPointer } from "@application/interfaces/use-cases/blocks/ILoadBlockByPointer";

export namespace GetTeamsController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class GetTeamsController extends BaseController {
    constructor(
        private readonly getJoinedTeamsByUserId: IGetJoinedTeamsByUserId,
        private readonly loadBlockByPointer: ILoadBlockByPointer
    ) {
        super();
    }

    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const spaceId = httpRequest.body.spaceId;
        const includeArchived = httpRequest.body.includeArchived;
        const onlyJoined = httpRequest.body.onlyJoined;
        
        const userId = "ca5f99c6-879b-4562-bd41-6651fc8d2099";
        
        const teams = await this.getJoinedTeamsByUserId.execute({
            userId,
            spaceId
        });

        const teamIds = teams.map(team => team.id);
        const teamsRecordValue: Record<string, object> = {};

        teams.forEach(team => {
            teamsRecordValue[team.id] = team;
        });

        return ok({
            teamIds,
            recordMap: {
                "team": teamsRecordValue
            }
        })
    }
}