import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { ILoadBlockByPointerRepository } from "@application/interfaces/repositories/blocks/ILoadBlockByPointerRepository";
import { ILoadBlockByPointer } from "@application/interfaces/use-cases/blocks/ILoadBlockByPointer";

export class LoadBlockById implements ILoadBlockByPointer {
    constructor(
        private readonly loadBlockByIdRepository: ILoadBlockByPointerRepository
    ) { }
    
    async execute(
        { table, spaceId, id }: ILoadBlockByPointer.Request
    ): Promise<ILoadBlockByPointer.Response>
    {
        const blockOrError = await this.loadBlockByIdRepository.loadBlockByPointer({
            table, 
            spaceId,
            id
        });

        if (!blockOrError) {
            return new BlockNotFoundError();
        }

        return blockOrError;
    }
}