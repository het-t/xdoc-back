import { LoadBlockById } from "@application/use-cases/blocks/LoadBlockById";
import { BlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository";

export const makeLoadBlockById = (): LoadBlockById => {
    const blockRepository = new BlockRepository();

    return new LoadBlockById(blockRepository);
}