import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { ILoadUserByEmail } from "@application/interfaces/use-cases/users/ILoadUserByEmail";
import { User } from "@domain/interfaces/User";

export class LoadUserByEmail implements ILoadUserByEmail {
    constructor(
        private readonly loadUserByEmailRepository: ILoadUserByEmailRepository
    ) { }

    execute(email: ILoadUserByEmail.Request): Promise<User> {
        return this.loadUserByEmailRepository.loadUserByEmail(email);
    }
}