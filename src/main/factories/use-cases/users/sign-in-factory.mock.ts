import { ISignInInterface } from "@application/interfaces/use-cases/users/ISignInInterface";
import { SignIn } from "@application/use-cases/users/SignIn";
import { MockBcryptAdaptor } from "@infrastructure/cryptography/BcryptAdaptor.mock";
import { MockJWTAdaptor } from "@infrastructure/cryptography/JWTAdaptor.mock";
import { MockUsersRepository } from "@infrastructure/db/postgres/repositories/UsersRepository.mock";

export const makeMockSignIn = (): SignIn => {
    const loadUserByEmailRepository = MockUsersRepository();
    const jwtGenerator = MockJWTAdaptor();
    const hashCompare = MockBcryptAdaptor();

    return new SignIn(
        loadUserByEmailRepository,
        jwtGenerator,
        hashCompare
    );
}