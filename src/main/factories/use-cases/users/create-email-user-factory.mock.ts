import { CreateEmailUser } from "@application/use-cases/users/CreateEmailUser";
import { MockUsersRepository } from "@infrastructure/db/postgres/repositories/UsersRepository.mock";

export const makeMockCreateEmailUser = (): CreateEmailUser => {
    const createEmailUserRepository = MockUsersRepository();

    return new CreateEmailUser(createEmailUserRepository);
}