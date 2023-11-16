import { IListBeforeRepository } from "@application/interfaces/repositories/space-view/IListBeforeRepository";
import { IListBefore } from "@application/interfaces/use-cases/space-view/IListBefore";

export class ListBefore implements IListBefore {
    constructor(
        private readonly listBeforeRepository: IListBeforeRepository
    ) { }
    
    async execute({ pointer, path, args }: IListBefore.Request): Promise<IListBefore.Response> {
        await this.listBeforeRepository.listBefore({
            pointer,
            path,
            args
        });
    }
}