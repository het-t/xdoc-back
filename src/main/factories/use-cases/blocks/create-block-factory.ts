import { CreateBlock } from "@application/use-cases/blocks/CreateBlock";
import { BlockRepository } from "@infrastructure/db/mongodb/repositories/BlockRepository";

export const makeCreateBlock = (): CreateBlock => {
    const blockRepository = new BlockRepository();

    return new CreateBlock(blockRepository);
}