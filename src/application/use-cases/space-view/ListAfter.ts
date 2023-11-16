import { IListAfterRepository } from "@application/interfaces/repositories/space-view/IListAfterRepository";
import { IListAfter } from "@application/interfaces/use-cases/space-view/IListAfter";

export class ListAfter implements IListAfter {
    constructor(
        private readonly listAfterRepository: IListAfterRepository
    ) { }
    
    async execute({ pointer, path, args }: IListAfter.Request): Promise<IListAfter.Response> {
        await this.listAfterRepository.listAfter({
            pointer,
            path,
            args
        });
    }
}