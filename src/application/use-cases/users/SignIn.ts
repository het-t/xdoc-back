import { HashCompare } from "@application/interfaces/cyptography/HashCompare";
import { ISignInInterface } from "@application/interfaces/use-cases/users/ISignInInterface";
import { JWTGenerator } from "@application/interfaces/cyptography/JWTGenerator";
import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { InvalidUserError } from "@application/errors/InvalidUserError";
import { InvalidPasswordError } from "@application/errors/InvalidPasswordError";

export class SignIn implements ISignInInterface {
    constructor(
        public readonly loadUserByEmailRepository: ILoadUserByEmailRepository,
        public readonly jwtGenerator: JWTGenerator,
        public readonly hashCompare: HashCompare
    ) {}

    async execute(
        credentials: ISignInInterface.Request
    ): Promise<ISignInInterface.Response> {
        const { email, password } = credentials;

        const [user] = await this.loadUserByEmailRepository.loadUserByEmail(email);

        if (!user) {
            return new InvalidUserError();
        }
        
        const isPasswordValid = await this.hashCompare.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return new InvalidPasswordError();
        }

        const authenticationToken = await this.jwtGenerator.generateAccessToken(user.id);
        const refreshToken = await this.jwtGenerator.generateRefreshToken(user.id);

        if(!authenticationToken) throw new Error("Unable to generate tokens");
        
        return {
            authenticationToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                alive: user.alive
            }
        }
    }
}