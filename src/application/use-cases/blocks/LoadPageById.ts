import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { ILoadBlockByIdRepository } from "@application/interfaces/repositories/blocks/ILoadBlockByIdRepository";
import { ILoadBlockById } from "@application/interfaces/use-cases/blocks/ILoadBlockById";

export class LoadBlockById implements ILoadBlockById {
    constructor(
        private readonly loadBlockByIdRepository: ILoadBlockByIdRepository
    ) { }
    
    async execute(
        id: ILoadBlockById.Request
    ): Promise<ILoadBlockById.Response>
    {
        const pageOrError = await this.loadBlockByIdRepository.loadPageById(id);
        
        if (!pageOrError) {
            return new BlockNotFoundError();
        } 

        return pageOrError;
    }
}