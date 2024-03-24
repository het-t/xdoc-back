import { ISetOperationRepository } from "@application/interfaces/repositories/operations/ISetOperationRepository";
import { IUpdateOperationRepository } from "@application/interfaces/repositories/operations/IUpdateOperationRepository";
import { pool } from "../helpers/db-connection";

export class OperationRepository implements 
    ISetOperationRepository,
    IUpdateOperationRepository
{
    async setOperation(
        o: ISetOperationRepository.Request
    ): Promise<ISetOperationRepository.Response> {
        
        return {};
    }

    async updateOperation(
        o: IUpdateOperationRepository.Request
    ): Promise<IUpdateOperationRepository.Response> {
        const filter: {
            id?: string,
            space_id?: string
        } = {};

        if(o.pointer.id) filter.id = o.pointer.id;
        if(o.pointer.spaceId) filter.space_id = o.pointer.spaceId;
        
        const res = await pool(o.pointer.table)
        .where(filter)
        .update(o.args)
        .returning('*');

        return {};
    }
}