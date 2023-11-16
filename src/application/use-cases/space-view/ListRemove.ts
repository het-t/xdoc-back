import { IListRemoveRepository } from "@application/interfaces/repositories/space-view/IListRemoveRepository";
import { IListRemove } from "@application/interfaces/use-cases/space-view/IListRemove";

export class ListRemove implements IListRemove {
    constructor(private readonly listRemoveRepository: IListRemoveRepository) { }
    
    async execute({ pointer, args, path }: IListRemove.Request): Promise<IListRemove.Response> {
        await this.listRemoveRepository.listRemove({
            pointer,
            path,
            args
        })
    }
}