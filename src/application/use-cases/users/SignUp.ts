import { EmailAlredyInUseError } from "@application/errors/EmailAlreadyInUseError";
import { HashGenerator } from "@application/interfaces/cyptography/HashGenerator";
import { JWTGenerator } from "@application/interfaces/cyptography/JWTGenerator";
import { CreateTokenRepository } from "@application/interfaces/repositories/tokens/CreateTokenRepository";
import { CreateUserRepository } from "@application/interfaces/repositories/users/CreateUserRepository";
import { LoadUserByEmailRepository } from "@application/interfaces/repositories/users/LoadUserByEmailRepository";
import { SignUpInterface } from "@application/interfaces/use-cases/users/SignUpInterface";

export class SignUp implements SignUpInterface {
    constructor(
        public readonly hashGenerator: HashGenerator,
        public readonly jwtGenerator: JWTGenerator,
        public readonly createTokenRepository: CreateTokenRepository,
        public readonly loadUserbyEmailRepository: LoadUserByEmailRepository,
        public readonly createUserRepository: CreateUserRepository,
    ) {}

    async execute(
        userData: SignUpInterface.Request
    ): Promise<SignUpInterface.Response> {
        const { email, password } = userData;

        const existingUser = await this.loadUserbyEmailRepository.loadUserByEmail(email);

        if (existingUser) {
            return new EmailAlredyInUseError();
        }

        const hashedPassword = await this.hashGenerator.hash(password);

        const user = this.createUserRepository.createUser({
            ...userData,
            password: hashedPassword
        })

        return user;
    }
}