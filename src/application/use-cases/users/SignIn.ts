import { HashCompare } from "@application/interfaces/cyptography/HashCompare";
import { SignInInterface } from "@application/interfaces/use-cases/users/SignInInterface";
import { JWTGenerator } from "@application/interfaces/cyptography/JWTGenerator";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/users/LoadUserByEmailRepository";
import { InvalidUserError } from "@application/errors/InvalidUserError";
import { InvalidPasswordError } from "@application/errors/InvalidPasswordError";
import { CreateTokenRepository } from "@application/interfaces/repositories/tokens/CreateTokenRepository";

export class SignIn implements SignInInterface {
    constructor(
        public readonly loadUserByEmailRepository: LoadUserByEmailRepository,
        public readonly createTokenRepository: CreateTokenRepository,
        public readonly jwtGenerator: JWTGenerator,
        public readonly hashCompare: HashCompare,
    ) {}

    async execute(
        credentials: SignInInterface.Request
    ): Promise<SignInInterface.Response> {
        const { email, password } = credentials;

        const user = await this.loadUserByEmailRepository.loadUserByEmail(email);

        if (!user) {
            return new InvalidUserError();
        }

        const isPasswordValid = this.hashCompare.compare(
            password,
            user.password
        )

        if (!isPasswordValid) {
            return new InvalidPasswordError();
        }

        const authenticationToken = await this.jwtGenerator.generateAccessToken(user.id);
        const refreshToken = await this.jwtGenerator.generateRefreshToken(user.id);

        await this.createTokenRepository.createToken(refreshToken);

        return {
            authenticationToken,
            refreshToken
        }
    }
}