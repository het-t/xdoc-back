import { ICreateBlockRepository } from "@application/interfaces/repositories/blocks/ICreateBlockRepository";
import { ICreateBlock } from "@application/interfaces/use-cases/blocks/ICreateBlock";

export class CreateBlock implements ICreateBlock {
    constructor(
        private readonly createBlockRepository: ICreateBlockRepository
    ) {}

    async execute(
        blockData: ICreateBlock.Request
    ): Promise<ICreateBlock.Response> {
        await this.createBlockRepository.createBlock(blockData.args);
    }
}