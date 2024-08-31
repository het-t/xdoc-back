import { IPointer } from "@domain/interfaces/ITransaction";
import { ISetRepository } from "@application/interfaces/repositories/operations/ISetRepository";
import { IUpdateRepository } from "@application/interfaces/repositories/operations/IUpdateOperationRepository";
import { ISetParentRepository } from "@application/interfaces/repositories/operations/ISetParentRepository";
import { IKeyedObjectListBeforeRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListBeforeRepository";
import { IKeyedObjectListUpdateRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListUpdateRepository";
import { IKeyedObjectListRemoveRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListRemoveRepository";
import { IAddRelationAfterRepository } from "@application/interfaces/repositories/operations/IAddRelationAfterRepository";
import { ISetPermissionItemRepository } from "@application/interfaces/repositories/operations/ISetPermissionItemRepository";
import { knexPool } from "../knex/knex";

export class OperationRepository implements 
    ISetRepository,
    IUpdateRepository,
    IKeyedObjectListBeforeRepository,
    IKeyedObjectListUpdateRepository,
    IKeyedObjectListRemoveRepository,
    ISetParentRepository,
    IAddRelationAfterRepository,
    ISetPermissionItemRepository
{
    async setOperation(
        o: ISetRepository.Request
    ): Promise<ISetRepository.Response> {
        const filter: {
            id?: string,
            space_id?: string
        } = {};

        if(o.pointer.id) filter.id = o.pointer.id;
        if(o.pointer.spaceId) filter.space_id = o.pointer.spaceId;

        let query = knexPool(o.pointer.table);

        if(o.path.length === 0) {
            query = query.insert(o.args);
        }
        else if (o.path.length === 1) {
            Object.keys(o.args).forEach(key => {
                const _args = (typeof o.args[key] !== "string" 
                    ? JSON.stringify(o.args[key])
                    : o.args[key]
                );
                query = query.update({
                    [o.path[0]]: knexPool.jsonSet(
                        o.path[0],
                        key,
                        _args
                    )
                });
            });
            
            query = query.where(filter);
        }
        else {
            const updateTargetPath = '$.' + o.path.slice(1).join('.');       
        
            const _args = (typeof o.args !== "string" 
                ? JSON.stringify(o.args)
                : o.args
            );
            
            query = query.update({
                [o.path[0]]: knexPool.jsonSet(
                    o.path[0],
                    updateTargetPath,
                    _args
                )
            });

            query = query.where(filter);
        }

        return await query;
    }

    async updateOperation(
        o: IUpdateRepository.Request
    ): Promise<IUpdateRepository.Response> {  
        const filter: {
            id?: string,
            space_id?: string
        } = {};

        if(o.pointer.id) filter.id = o.pointer.id;
        if(o.pointer.spaceId) filter.space_id = o.pointer.spaceId;

        let query = knexPool(o.pointer.table)
        .where(filter);

        if(o.path.length === 0) {
            query = knexPool(o.pointer.table)
            .insert({
                id: filter.id,
                ...o.args
            })
            .onConflict("id")
            .merge();
        }
        else if (o.path.length === 1) {
            Object.keys(o.args).forEach(key => {
                query = query.update({
                    [o.path[0]]: knexPool.jsonSet(
                        o.path[0],
                        '$.'+ key,
                        JSON.stringify(o.args[key])
                    )
                })
            });
        }
        else {
            const updateTargetPath = '$.' + o.path.slice(1).join('.');

            query = query.update({
                [o.path[0]]: knexPool.jsonSet(
                    o.path[0],
                    updateTargetPath,
                    JSON.stringify(o.args)
                )
            });
        }
        return await query;
    }

    async setParentOperation(
        { pointer, args }: ISetParentRepository.Request
    ): Promise<ISetParentRepository.Response> {
        const filter: {
            id?: string,
            space_id?: string
        } = {};

        if(pointer.id) filter.id = pointer.id;
        if(pointer.spaceId) filter.space_id = pointer.spaceId;

        const query = knexPool(pointer.table)
        .where(filter)
        .update({
            parent_id: args.parentId,
            parent_table: args.parentTable
        });

        return void(await query);
    }

    async setPermissionItem(
        { pointer, path, args }: ISetPermissionItemRepository.Request
    ): Promise<ISetPermissionItemRepository.Response> {
        const filter: {
            id?: string,
            space_id?: string
        } = {};

        if(pointer.id) filter.id = pointer.id;
        if(pointer.spaceId) filter.space_id = pointer.spaceId;

        const query = knexPool(pointer.table)
        .where(filter)
        .update({
            [path[0]]: knexPool.raw(`${path[0]} || '${JSON.stringify(args)}'::jsonb`)
        });

        return void(await query);
    }

    async keyedObjectListUpdateOperation(
        { pointer, path, args }: IKeyedObjectListUpdateRepository.Request
    ): Promise<IKeyedObjectListUpdateRepository.Response> {
        const targetNode = await OperationRepository.getTargetIndexNode(
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
        const targetNode = await OperationRepository.getTargetIndexNode(
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
        const targetNode = await OperationRepository.getTargetIndexNode(
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

    async addRelationAfterOperation(
        { pointer, path, args }: IAddRelationAfterRepository.Request
    ): Promise<IAddRelationAfterRepository.Response> {
        const targetNode: any[] = await OperationRepository.getTargetIndexNode(pointer, path);
        const newRelationValue = [
            '‣',
            [[
                'p',
                args.id,
                args.spaceId
            ]]
        ];

        let updatedTargetNodeValue = [];

        if(targetNode?.length > 0) {
            updatedTargetNodeValue = [
                ...targetNode,
                [','], 
                newRelationValue
            ];
        }
        else {
            updatedTargetNodeValue = [
                newRelationValue
            ];
        }

        this.updateOperation({
            pointer,
            args: updatedTargetNodeValue,
            path,
            command: "update"
        });
        
        return;
    }

    static async getTargetIndexNode(
        pointer: IPointer,
        path: string[],
    ) {
        let filter: { id: string, space_id?: string } = {
            id: pointer.id
        };
        if(pointer.spaceId) filter.space_id = pointer.spaceId;

        const targetRecord = await knexPool(pointer.table)
        .where(filter)
        .first();

        let targetNode: Record<string, any> = targetRecord;

        path.forEach(_path => {
            targetNode = targetNode[_path];
        })

        return targetNode as any;
    }
}