import { ILoadBlocksByPointersRepository } from "@application/interfaces/repositories/blocks/ILoadBlocksByPointersRepository";
import { ILoadBlocksByPointers } from "@application/interfaces/use-cases/blocks/ILoadBlocksByPointers";
import { IPointer } from "@domain/entities/ITransaction";

const tables = ["block", "collection", "collection_view", "xdoc_space"];

export class LoadBlocksByPointers implements ILoadBlocksByPointers {
    constructor(
        private readonly loadBlocksByPointersRepository: ILoadBlocksByPointersRepository
    ) { }
    
    async execute(
        { pointers, spaceId }: ILoadBlocksByPointers.Request
    ): Promise<ILoadBlocksByPointers.Response>
    {        
        const recordValuesMap: Record<string, any> = {};

        const allRequestedPointerIds: Set<string> = new Set(pointers.map(pointer => pointer.id));
        const allRespondedPointerIds: Set<string> = new Set();

        while(pointers.length > 0) {
            pointers = pointers.filter((pointer) => tables.indexOf(pointer.table) !== -1);

            await Promise.all(
                tables.map(async table => { 
                    const pointersToTable = pointers.filter((pointer) => pointer.table === table);
                    pointers = pointers.filter((pointer) => pointer.table !== table);
                    
                    const pointerIds = pointersToTable.map(pointer => pointer.id)
                    .filter(id => allRespondedPointerIds.has(id) === false);
                    
                    pointerIds.forEach(id => {
                        allRespondedPointerIds.add(id);
                    });

                    const dbResponse = await this.loadBlocksByPointersRepository.loadBlocksByPointers({
                        table,
                        ids: pointerIds,
                        spaceId
                    });


                    if (!(dbResponse instanceof Error)) {
                        if(!recordValuesMap[table] && dbResponse.rows.length) recordValuesMap[table] = {};

                        dbResponse.rows.forEach((recordValue: any) => {
                            recordValuesMap[table][recordValue.id] = {
                                value: {
                                    value: recordValue,
                                    role: "editor"
                                },
                                spaceId
                            };
                            syncRelatedRecordValues(pointers, allRespondedPointerIds, recordValue, table);
                        });
                    }
                })
            );
        }

        return recordValuesMap;
    }
}


function syncRelatedRecordValues(pointers: IPointer[], allresponsedPointerIds: Set<string>, recordValue: any, table: string) {     
    //space
    if(recordValue.space_id && !allresponsedPointerIds.has(recordValue.space_id)) {
        pointers.push({
            id: recordValue.space_id,
            table: "xdoc_space"
        });
    }  
        
    //parent
    if(recordValue.parent_id && !allresponsedPointerIds.has(recordValue.parent_id)) {
        pointers.push({
            table: recordValue.parent_table,
            id: recordValue.parent_id,
            spaceId: recordValue.space_id
        });
    }

    //children
    if(recordValue?.content?.length) {
        pointers.push(
            ...[recordValue.content.map((id: string) => {
                return {
                    id,
                    table: "block",
                    spaceId: recordValue.space_id
                }
            })].filter(pointer => allresponsedPointerIds.has(pointer.id) === false)
        );
    }

    //views
    if(recordValue?.view_ids?.length) {
        recordValue.view_ids.map((id: string) => {
            if(!allresponsedPointerIds.has(id)) {
                pointers.push({
                    id,
                    table: "collection_view",
                    spaceId: recordValue.space_id
                })
            }
        });
    }

    //collection
    if(recordValue.collection_id && !allresponsedPointerIds.has(recordValue.collection_id)) {
        pointers.push({
            id: recordValue.collection_id,
            table: "collection",
            spaceId: recordValue.space_id
        });
    }

    //visited_templates 
    if(recordValue?.visited_templates?.length) {
        recordValue.visited_templates.map((id: string) => {
            pointers.push({
                table: "block",
                id,
                spaceId: recordValue.space_id
            })
        });
    }

    //private_pages
    if(recordValue?.private_pages?.length) {
        recordValue.private_pages.map((id: string) => {
            pointers.push({
                table: "block",
                id,
                spaceId: recordValue.space_id
            })
        });
    }
}