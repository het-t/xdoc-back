import { ILoadBlocksByPointersRepository } from "@application/interfaces/repositories/blocks/ILoadBlocksByPointersRepository";
import { IGetUserSpaceRoleRepository } from "@application/interfaces/repositories/spaces/IGetUserSpaceRoleRepository";
import { IGetBlockPermissionsByIds } from "@application/interfaces/use-cases/blocks/IGetBlockPermissionsByIds";
import { ILoadBlocksByPointers } from "@application/interfaces/use-cases/blocks/ILoadBlocksByPointers";
import { IPointer } from "@domain/interfaces/ITransaction";
import { Role } from "@domain/interfaces/Role";
import { TeamMembership } from "@domain/interfaces/TeamMembership";
import { TeamPermission } from "@domain/interfaces/TeamPermission";
import { TeamPermissionType } from "@domain/interfaces/TeamPermissionType";
import { UUID } from "crypto";

const tables = ["block", "collection", "collection_view", "xdoc_space", "space_user", "xdoc_user"];

export class LoadBlocksByPointers implements ILoadBlocksByPointers {
    constructor(
        private readonly loadBlocksByPointersRepository: ILoadBlocksByPointersRepository,
        private readonly getBlockPermissionsByIds: IGetBlockPermissionsByIds,
        private readonly getUsersSpaceRolesRepository: IGetUserSpaceRoleRepository,
    ) { }
    
    async execute(
        { pointers, userId }: ILoadBlocksByPointers.Request
    ): Promise<ILoadBlocksByPointers.Response>
    {        
        const allRequestedPointerIds: Set<string> = new Set(pointers.map(pointer => pointer.id));
        const allRespondedPointerIds: Set<string> = new Set();

        const recordValues: any[] = [];

        while(pointers.length > 0) {
            pointers = pointers.filter((pointer) => tables.indexOf(pointer.table) !== -1);

            await Promise.allSettled(
                tables.map(async (table) => { 
                    const pointersToTable = pointers.filter((pointer) => pointer.table === table);
                    pointers = pointers.filter((pointer) => pointer.table !== table);
                    
                    const pointerIds = pointersToTable.map(pointer => pointer.id as UUID)
                    .filter(id => allRespondedPointerIds.has(id) === false);
                    
                    if(!pointerIds.length) return Promise.reject("no blocks requested for table " + table);
                    
                    pointerIds.forEach(id => {
                        allRespondedPointerIds.add(id);
                    });

                    const mapRecordIdsRoles: Record<string, Role> = {};
                    
                    if(table === "block") {
                        const effectivePermissions = await this.getBlockPermissionsByIds.execute({
                            ids: pointerIds,
                            userId
                        });

                        if(!effectivePermissions.length) return Promise.reject("user lacks required permissions " + table);

                        for(const permission of effectivePermissions) {
                            const {
                                id,
                                effective_parent_table: effectiveParentTable,
                                team_permissions: teamPermissions, 
                                is_team_default: isTeamDefault,
                                team_settings: teamSettings,
                                team_memberships: teamMemberships, 
                                space_role: spaceRole, 
                                space_settings: spaceSettings,
                                block_overriden_permissions: overridenPermissions
                            } = permission as any;

                            if(spaceRole == null) {
                                mapRecordIdsRoles[id] = "none";
                                continue;
                            }

                            if(effectiveParentTable === "xdoc_space") {
                                mapRecordIdsRoles[id] = "editor";
                            }
                            else if(effectiveParentTable === "team") {
                                const teamRight = extractTeamPermission(
                                    teamPermissions, 
                                    teamMemberships, 
                                    userId,
                                    isTeamDefault,
                                    spaceRole !== null
                                );
                                
                                if(!teamRight) mapRecordIdsRoles[id] = "none";
                                else if(teamSettings.disable_team_page_edits) mapRecordIdsRoles[id] = "reader";
                                else mapRecordIdsRoles[id] = teamRight;
                            }
                        }
                    } else if(table === "xdoc_space") {
                        const { rows: userSpaceRoles, rowCount} = await this.getUsersSpaceRolesRepository.getUserSpaceRole({
                            ids: pointerIds, 
                            userId
                        });

                        userSpaceRoles.forEach(({id, role}) => {
                            if(role === "owner") mapRecordIdsRoles[id] = "editor";
                            else if(role === "member") mapRecordIdsRoles[id] = "reader";
                            else mapRecordIdsRoles[id] = "none";
                        })
                    }

                    const accessibleRecords = pointerIds.filter((id) => mapRecordIdsRoles[id] !== 'none');

                    pointerIds.filter(id => mapRecordIdsRoles[id] === 'none')
                    .map((id) => {
                        recordValues.push({
                            value: {
                                id
                            },
                            role: "none"
                        });
                    });

                    if(accessibleRecords.length) {
                        const dbResponse = await this.loadBlocksByPointersRepository.loadBlocksByPointers({
                            table,
                            ids: accessibleRecords
                        });
    
                        if (!(dbResponse instanceof Error)) {
                            dbResponse.rows.forEach((recordValue: any) => {
                                syncRelatedRecordValues(pointers, allRespondedPointerIds, recordValue, table);
    
                                recordValues.push({
                                    value: recordValue,
                                    role: mapRecordIdsRoles[recordValue.id]
                                }
                                );
                            });
                        }
                    }
                })
            );
        }
        
        return recordValues;
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

function extractTeamPermission(
    teamPermissions: TeamPermission[], 
    teamMemberships: TeamMembership[], 
    userId: string,
    isTeamDefault: boolean,
    inSpace: boolean
) {
    const userTeamRole = teamMemberships.find((membership) => membership.user_id === userId)?.type;

    let teamPermission: TeamPermissionType | undefined = (
        userTeamRole === 'member' || isTeamDefault 
        ? "explicit_team_permission"
        : (
            userTeamRole === "owner" 
            ? "explicit_team_owner_permission"
            : undefined
        )
    ); 

    if(!teamPermission && inSpace) teamPermission = "space_permission";

    return teamPermission && teamPermissions.find(permission => {
        return permission.type === teamPermission; 
    })?.role;
}