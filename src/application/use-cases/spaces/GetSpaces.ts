import { IGetSpacesRepository } from "@application/interfaces/repositories/spaces/IGetSpacesRepository";
import { IGetSpacesInterface } from "@application/interfaces/use-cases/spaces/IGetSpacesInterface";

export class GetSpaces implements IGetSpacesInterface {
    constructor(
        private readonly getSpacesRepository: IGetSpacesRepository
    ) {}

    async execute(
        userId: IGetSpacesInterface.Request
    ): Promise<IGetSpacesInterface.Response> {
        return await this.getSpacesRepository.getSpaces(userId);
    }
}