import { ForbiddenError } from "@application/errors/ForbiddenError";
import { InvalidTokenError } from "@application/errors/InvalidTokenError";
import { JWTGenerator } from "@application/interfaces/cyptography/JWTGenerator";
import { JWTVerifier } from "@application/interfaces/cyptography/JWTVerifier";
import { GetTokenRepository } from "@application/interfaces/repositories/tokens/GetTokenRepository";
import { GetAuthenticationTokenInterface } from "@application/interfaces/use-cases/users/IGetAuthenticationTokenInterface";

export class GetAuthenticationToken implements GetAuthenticationTokenInterface {
    constructor(
        private readonly getTokenRepository: GetTokenRepository,
        private readonly jwtVerifier: JWTVerifier,
        private readonly jwtGenerator: JWTGenerator
    ) {}

    async execute(
        token: string
    ): Promise<GetAuthenticationTokenInterface.Response> {
        const storedToken = await this.getTokenRepository.getToken(token);

        if (!storedToken) {
            return new InvalidTokenError();
        }

        const decodedToken = await this.jwtVerifier.verifyRefreshToken(token);

        if (!decodedToken) {
            return new ForbiddenError();
        }

        const stringifyDecodedToken = JSON.stringify(decodedToken);
        const parsedDecodedToken = JSON.parse(stringifyDecodedToken);

        const accessToken = await this.jwtGenerator.generateAccessToken(
            parsedDecodedToken.userId
        )

        return {
            accessToken
        }
    }
}