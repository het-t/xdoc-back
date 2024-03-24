import { Authenticate } from "@application/use-cases/users/Authentication";
import { AuthenticateInterface } from "@application/interfaces/use-cases/users/IAuthenticateInterface"
import { JWTAdaptor } from "@infrastructure/cryptography/JWTAdaptor";
import env from "@config/env";

export const makeAuthenticate = (): AuthenticateInterface => {
    const jwtVerifier = new JWTAdaptor(env.authenticationTokenSecret, env.refreshTokenSecret);
    const authentication = new Authenticate(jwtVerifier);

    return authentication;
}