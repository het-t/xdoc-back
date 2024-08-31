import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { ILoadUserByEmail } from "@application/interfaces/use-cases/users/ILoadUserByEmail";
import { User } from "@domain/interfaces/User";

export class LoadUserByEmail implements ILoadUserByEmail {
    constructor(
        private readonly loadUserByEmailRepository: ILoadUserByEmailRepository
    ) { }

    async execute(email: ILoadUserByEmail.Request): Promise<ILoadUserByEmail.Response> {
        return await this.loadUserByEmailRepository.loadUserByEmail(email);
    }
}