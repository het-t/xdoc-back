import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { GetSpacesController } from "@infrastructure/http/controllers/workspaces/GetSpacesController";
import { makeGetSpaces } from "@main/factories/use-cases/workspaces/get-spaces-factory";

export const makeGetSpacesController = (): BaseController => {
    const useCase = makeGetSpaces();
    
    return new GetSpacesController(useCase);
}