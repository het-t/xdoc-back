import { LoadUserByEmail } from "@application/use-cases/users/LoadUserByEmail";
import { UserRepository } from "@infrastructure/db/postgres/repositories/UsersRepository";

export const makeLoadUserByEmail = (): LoadUserByEmail => {
    const loadUserByEmailRepository = new UserRepository();

    return new LoadUserByEmail(loadUserByEmailRepository);
}