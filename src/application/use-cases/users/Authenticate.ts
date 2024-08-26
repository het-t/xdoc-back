import { JWTVerifier } from "@application/interfaces/cyptography/JWTVerifier";
import { IAuthenticateInterface } from "@application/interfaces/use-cases/users/IAuthenticateInterface";

export class Authenticate implements IAuthenticateInterface {
    constructor(
        private readonly jwtVerifier: JWTVerifier
    ) { }

    async execute(token: IAuthenticateInterface.Request): Promise<IAuthenticateInterface.Response> {
        return this.jwtVerifier.verifyAccessToken(token);
    }
}