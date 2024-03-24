import { pool } from "../helpers/db-connection";
import { IListAfterRepository } from "@application/interfaces/repositories/space-view/IListAfterRepository";
import { IListBeforeRepository } from "@application/interfaces/repositories/space-view/IListBeforeRepository";
import { IListRemoveRepository } from "@application/interfaces/repositories/space-view/IListRemoveRepository";

export class SpaceViewRepository implements
    IListAfterRepository,
    IListBeforeRepository,
    IListRemoveRepository
{
    async listAfter({ pointer, path, args }: IListAfterRepository.Request): Promise<IListAfterRepository.Response> {
        return null;
    }

    async listBefore({ pointer, path, args }: IListBeforeRepository.Request): Promise<IListBeforeRepository.Response> {
        return null;
    }

    async listRemove({ pointer, path, args }: IListRemoveRepository.Request): Promise<IListRemoveRepository.Response> {
        return null;
    }
}