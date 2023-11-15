import { IUpdateBlockByIdRepository } from "@application/interfaces/repositories/blocks/IUpdateBlockByIdRepository";
import { IUpdateBlock } from "@application/interfaces/use-cases/blocks/IUpdateBlock";

export class UploadBlock implements IUpdateBlock {
    constructor(
        private readonly updateBlockRepository: IUpdateBlockByIdRepository
    ) { }
    
    async execute(
        {
            pointer,
            path,
            args
        }: IUpdateBlock.Request
    ): Promise<IUpdateBlock.Response> {
        await this.updateBlockRepository.updateBlockById({
            pointer,
            path,
            args
        })
    }
}