import env from "@config/env";
import { CreateUser } from "@application/use-cases/users/CreateUser";
import { BcryptAdaptor } from "@infrastructure/cryptography/BcryptAdaptor";
import { UserRepository } from "@infrastructure/db/postgres/repositories/UsersRepository";

export const makeCreateUser = (): CreateUser => {
    const userRepository = new UserRepository();
    const hashGenerator = new BcryptAdaptor(env.bcryptSalt);
    
    return new CreateUser(
        hashGenerator, 
        userRepository, 
        userRepository
    );
}