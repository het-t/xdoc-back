import { LoadBlocksByPointers } from "@application/use-cases/blocks/LoadBlocksByPointers";
import { BlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository";

export const makeLoadBlockById = (): LoadBlocksByPointers => {
    const blockRepository = new BlockRepository();

    return new LoadBlocksByPointers(blockRepository);
}