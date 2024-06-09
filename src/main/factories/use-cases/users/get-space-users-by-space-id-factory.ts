import { GetSpaceUsers } from "@application/use-cases/users/GetSpaceUsers";
import { UserRepository } from "@infrastructure/db/postgres/repositories/UsersRepository";

export const makeGetSpaceUsersBySpaceId = (): GetSpaceUsers => {
    const usersRepository = new UserRepository();

    return new GetSpaceUsers(usersRepository);
}