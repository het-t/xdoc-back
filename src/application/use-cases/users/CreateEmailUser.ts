import { ICreateEmailUserRepository } from "@application/interfaces/repositories/users/ICreateEmailUserRepository";
import { ICreateEmailUser } from "@application/interfaces/use-cases/users/ICreateEmailUserInterface";

export class CreateEmailUser implements ICreateEmailUser {
    constructor(
        public readonly createEmailUserRepository: ICreateEmailUserRepository
    ) {}

    async execute(
        { id, email }: ICreateEmailUser.Request
    ): Promise<ICreateEmailUser.Response> {
        return (
            await this.createEmailUserRepository.createEmailUser({ 
                id, 
                email 
            })
        )?.id;
    }
}