import { Authenticate } from "@application/use-cases/users/Authenticate";
import env from "@config/env";
import { JWTAdaptor } from "@infrastructure/cryptography/JWTAdaptor";

export const makeAuthenticate = (): Authenticate => {

    const jwtVerifier = new JWTAdaptor(
        env.authenticationTokenSecret, 
        env.refreshTokenSecret
    );
    return new Authenticate(jwtVerifier);
}