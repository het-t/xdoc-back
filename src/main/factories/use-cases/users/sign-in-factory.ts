import env from "@config/env";
import { SignIn } from "@application/use-cases/users/SignIn";
import { BcryptAdaptor } from "@infrastructure/cryptography/BcryptAdaptor";
import { JWTAdaptor } from "@infrastructure/cryptography/JWTAdaptor";
import { TokenRepository } from "@infrastructure/db/mongodb/repositories/TokenRepository";
import { UserRepository } from "@infrastructure/db/mongodb/repositories/UsersRepository";

export const makeSignIn = (): SignIn => {
    const userRepository = new UserRepository();
    const tokenRepository = new TokenRepository();
    const jwtAdaptor = new JWTAdaptor(
        env.authenticationTokenSecret,
        env.refreshTokenSecret
    );
    const bcryptAdaptor = new BcryptAdaptor(env.bcryptSalt);

    return new SignIn(userRepository, tokenRepository, jwtAdaptor, bcryptAdaptor);
}