import { ICreateBlockRepository } from "@application/interfaces/repositories/blocks/ICreateBlockRepository";
import { ILoadBlockByIdRepository } from "@application/interfaces/repositories/blocks/ILoadBlockByIdRepository";
import { pool } from "../helpers/db-connection";
import { IUpdateBlockByIdRepository } from "@application/interfaces/repositories/blocks/IUpdateBlockByIdRepository";

export class BlockRepository implements
    ILoadBlockByIdRepository,
    ICreateBlockRepository,
    IUpdateBlockByIdRepository
{
    async loadBlockById(
        id: ILoadBlockByIdRepository.Request
    ): Promise<ILoadBlockByIdRepository.Response> {
        return null;
    }

    async createBlock(
        args: ICreateBlockRepository.Request
    ): Promise<ICreateBlockRepository.Response> {
        return null;
    }

    async updateBlockById(
        { pointer, args }: IUpdateBlockByIdRepository.Request
    ): Promise<IUpdateBlockByIdRepository.Response> {
        return null;
    }
}