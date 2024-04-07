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

        let query = pool(o.pointer.table);

        if(o.path.length === 0) {
            query = query.insert(o.args);
        }
        else if (o.path.length === 1) {
            Object.keys(o.args).forEach(key => {
                query = query.update({
                    [o.path[0]]: pool.jsonSet(
                        o.path[0],
                        key,
                        JSON.stringify(o.args[key])
                    )
                });
            });
        }
        else {
            const updateTargetPath = '$.' + o.path.slice(1).join('.');       

            query = query.update({
                [o.path[0]]: pool.jsonSet(
                    o.path[0],
                    updateTargetPath,
                    JSON.stringify(o.args)
                )
            });
        }

        return await query;
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

        let query = pool(o.pointer.table)
        .where(filter);

        if(o.path.length === 0) {
            query = query.update(o.args);
        }
        else if (o.path.length === 1) {
            Object.keys(o.args).forEach(key => {
                query = query.update({
                    [o.path[0]]: pool.jsonSet(
                        o.path[0],
                        key,
                        JSON.stringify(o.args[key])
                    )
                });
            });
        }
        else {
            const updateTargetPath = '$.' + o.path.slice(1).join('.');

            query = query.update({
                [o.path[0]]: pool.jsonSet(
                    o.path[0],
                    updateTargetPath,
                    o.args
                )
            });
        }
        return await query;
    }
}