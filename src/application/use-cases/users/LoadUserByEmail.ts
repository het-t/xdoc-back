import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { ILoadUserByEmail } from "@application/interfaces/use-cases/users/ILoadUserByEmail";
import { IUser } from "@domain/entities/IUser";

export class LoadUserByEmail implements ILoadUserByEmail {
    constructor(
        private readonly loadUserByEmailRepository: ILoadUserByEmailRepository
    ) { }

    execute(email: ILoadUserByEmail.Request): Promise<IUser> {
        return this.loadUserByEmailRepository.loadUserByEmail(email);
    }
}