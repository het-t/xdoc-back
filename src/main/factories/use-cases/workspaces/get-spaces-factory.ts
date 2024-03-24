import { GetSpaces } from "@application/use-cases/spaces/GetSpaces";
import { WorkspaceRepository } from "@infrastructure/db/postgres/repositories/WorkspaceRepository";

export const makeGetSpaces = (): GetSpaces => {
    const getSpacesRepository = new WorkspaceRepository();

    return new GetSpaces(getSpacesRepository);
}