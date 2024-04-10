import { ISetOperationRepository } from "@application/interfaces/repositories/operations/ISetOperationRepository";
import { IUpdateOperationRepository } from "@application/interfaces/repositories/operations/IUpdateOperationRepository";
import { pool } from "../helpers/db-connection";
import { IKeyedObjectListBeforeRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListBeforeRepository";
import { IKeyedObjectListUpdateRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListUpdateRepository";
import { IKeyedObjectListRemoveRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListRemoveRepository";
import { IPointer } from "@domain/entities/ITransaction";

export class OperationRepository implements 
    ISetOperationRepository,
    IUpdateOperationRepository,
    IKeyedObjectListBeforeRepository,
    IKeyedObjectListUpdateRepository,
    IKeyedObjectListRemoveRepository
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
                    JSON.stringify(o.args)
                )
            });
        }
        return await query;
    }

    async keyedObjectListUpdateOperation(
        {pointer, path, args}: IKeyedObjectListUpdateRepository.Request
    ): Promise<IKeyedObjectListUpdateRepository.Response> {
        const targetNode = await this.getTargetIndexNode(
            pointer,
            path
        );

        let targetIndex = 0;
        if(args?.id) {
            targetIndex = targetNode.findIndex(({id}: {id: string}) => id === args.id);
        }

        const updatedTargetNodeValue = [];

        if(targetIndex !== 0) {
            updatedTargetNodeValue.push(...targetNode.slice(0, targetIndex))
        }

        updatedTargetNodeValue.push({
            ...targetNode[targetIndex],
            ...args
        });

        if(targetIndex !== targetNode.length) {
            updatedTargetNodeValue.push(...targetNode.slice(targetIndex+1));
        }

        this.setOperation({
            args: updatedTargetNodeValue,
            path,
            pointer,
            command: "update"
        });
    }

    async keyedObjectListRemoveOperation(
        {pointer, args, path}: IKeyedObjectListRemoveRepository.Request
    ): Promise<IKeyedObjectListRemoveRepository.Response> {
        const targetNode = await this.getTargetIndexNode(
            pointer,
            path,
        );

        let targetIndex = 0;
        if(args?.remove?.id) {
            targetIndex = targetNode.findIndex(({id}: {id: string}) => id === args.remove.id)
        }

        const updatedTargetNodeValue = [
            ...targetNode.slice(0, targetIndex),
            ...targetNode.slice(targetIndex+1)
        ];

        this.setOperation({
            args: updatedTargetNodeValue,
            path,
            pointer,
            command: "update"
        });
    }   

    async keyedObjectListBeforeOperation(
        { pointer, path, args }: IKeyedObjectListBeforeRepository.Request
    ): Promise<IKeyedObjectListBeforeRepository.Response> {
        const targetNode = await this.getTargetIndexNode(
            pointer,
            path
        );

        let targetIndex = 0;
        if(args?.before?.id) {
            targetIndex = targetNode.findIndex(({id}: {id: string}) => id === args.before.id);
        }

        const updatedTargetNodeValue = [
            ...targetNode.slice(0, targetIndex),
            args.value,
            ...targetNode.slice(targetIndex)
        ];

        this.setOperation({
            args: updatedTargetNodeValue,
            path,
            pointer,
            command: "update"
        });
    }

    private async getTargetIndexNode(
        pointer: IPointer,
        path: string[],
    ) {
        let filter: { id: string, space_id?: string } = {
            id: pointer.id
        };
        if(pointer.spaceId) filter.space_id = pointer.spaceId;

        const targetRecord = await pool(pointer.table)
        .where(filter)
        .first();

        let targetNode: Record<string, any> = targetRecord;

        path.forEach(_path => {
            targetNode = targetNode[_path];
        })

        return targetNode;
    }
}