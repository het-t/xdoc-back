import { LoadUserByEmail } from "@application/use-cases/users/LoadUserByEmail";
import { MockUsersRepository } from "@infrastructure/db/postgres/repositories/UsersRepository.mock";

export const makeMockLoadUserByEmail = (): LoadUserByEmail => {
    const loadUserByEmailRepository = MockUsersRepository();

    return new LoadUserByEmail(loadUserByEmailRepository);
}