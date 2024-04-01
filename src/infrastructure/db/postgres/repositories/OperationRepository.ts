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
        const filter: {
            id?: string,
            space_id?: string
        } = {};

        if(o.pointer.id) filter.id = o.pointer.id;
        if(o.pointer.spaceId) filter.space_id = o.pointer.spaceId;

        return await pool(o.pointer.table)
        .where(filter)
        .insert(o.args);
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

        let updateQuery: any;

        if(o.path.length >= 0) {
            updateQuery = pool(o.pointer.table)
            .where(filter)
            .update(
                o.path.length < 2 ?
                o.args :
                {
                    [o.path[0]]: (
                        pool.raw(
                            `jsonb_set(to_jsonb(??), cast(? as text[]), ?::jsonb)`,
                            [
                                o.path[0],
                                o.path.slice(1),
                                JSON.stringify(o.args)
                            ]
                        )
                    )
                }
            )
            .returning("*");
        }
        else {
            
        }

        const { sql, bindings } = updateQuery.toSQL();

        const updatedRecord = await updateQuery;
        return {};
    }
}