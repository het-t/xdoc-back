import { IGetBlockPermissionsByIdsRepository } from "@application/interfaces/repositories/blocks/IGetBlockPermissionsByIdsRepository";
import { IGetBlockPermissionsByIds } from "@application/interfaces/use-cases/blocks/IGetBlockPermissionsByIds";

export class GetBlockPermissionsByIds implements IGetBlockPermissionsByIds {
    constructor(
        private readonly getBlockPermissionsByIdsRepository: IGetBlockPermissionsByIdsRepository
    ) {}

    async execute({ ids, userId }: IGetBlockPermissionsByIds.Request): Promise<IGetBlockPermissionsByIds.Response> {
        const accessibleBlocks = await this.getBlockPermissionsByIdsRepository.getBlockPermissionsByIds({ ids, userId });

        if(accessibleBlocks instanceof Error) throw new Error(accessibleBlocks.toString());

        return accessibleBlocks.rows;
    }
}