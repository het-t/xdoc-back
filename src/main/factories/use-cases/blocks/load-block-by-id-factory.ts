import { LoadBlockById } from "@application/use-cases/blocks/LoadPageById";
import { BlockRepository } from "@infrastructure/db/mongodb/repositories/BlockRepository";

export const makeLoadBlockById = (): LoadBlockById => {
    const blockRepository = new BlockRepository();

    return new LoadBlockById(blockRepository);
}