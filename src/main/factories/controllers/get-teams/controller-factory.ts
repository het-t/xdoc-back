import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { GetTeamsController } from "@infrastructure/http/controllers/get-teams/GetTeams";
import { makeLoadBlocksByPointers } from "@main/factories/use-cases/blocks/load-blocks-by-pointers";
import { makeGetTeams } from "@main/factories/use-cases/teams/get-teams-factory";

export const makeGetTeamsController = (): BaseController => {
    const getTeamsUsecase = makeGetTeams();
    const loadBlockByPointer = makeLoadBlocksByPointers();

    return new GetTeamsController(
        getTeamsUsecase, 
        loadBlockByPointer
    );
}