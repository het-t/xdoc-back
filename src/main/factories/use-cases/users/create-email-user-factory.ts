import { CreateEmailUser } from "@application/use-cases/users/CreateEmailUser";
import { UserRepository } from "@infrastructure/db/postgres/repositories/UsersRepository";

export const makeCreateEmailUser = (): CreateEmailUser => {
    const createEmailUserRepository = new UserRepository();
    
    return new CreateEmailUser(createEmailUserRepository);
}