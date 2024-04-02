import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { GetTeamsController } from "@infrastructure/http/controllers/get-teams/GetTeams";
import { makeLoadBlockById } from "@main/factories/use-cases/blocks/load-block-by-id-factory";
import { makeGetTeams } from "@main/factories/use-cases/teams/get-teams-factory";

export const makeGetTeamsController = (): BaseController => {
    const getTeamsUsecase = makeGetTeams();
    const loadBlockByPointer = makeLoadBlockById();

    return new GetTeamsController(
        getTeamsUsecase, 
        loadBlockByPointer
    );
}