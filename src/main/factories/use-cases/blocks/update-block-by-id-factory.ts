import { UploadBlock } from "@application/use-cases/blocks/UploadBlock";
import { BlockRepository } from "@infrastructure/db/postgres/repositories/BlockRepository";

export const makeUpdateBlockById = (): UploadBlock => {
    const blockRepository = new BlockRepository();

    return new UploadBlock(blockRepository);
}