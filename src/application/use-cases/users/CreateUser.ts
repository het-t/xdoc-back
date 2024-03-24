import { EmailAlredyInUseError } from "@application/errors/EmailAlreadyInUseError";
import { HashGenerator } from "@application/interfaces/cyptography/HashGenerator";
import { ICreateUserRepository } from "@application/interfaces/repositories/users/ICreateUserRepository";
import { ILoadUserByEmailRepository } from "@application/interfaces/repositories/users/ILoadUserByEmailRepository";
import { ICreateUserInterface } from "@application/interfaces/use-cases/users/ICreateUserInterface";

export class CreateUser implements ICreateUserInterface {
    constructor(
        public readonly hashGenerator: HashGenerator,
        public readonly loadUserbyEmailRepository: ILoadUserByEmailRepository,
        public readonly createUserRepository: ICreateUserRepository,
    ) {}

    async execute(
        { id, name, email, password }: ICreateUserInterface.Request
    ): Promise<ICreateUserInterface.Response> {

        const [ existingUser ] = await this.loadUserbyEmailRepository.loadUserByEmail(email);
        
        if (existingUser) {
            return new EmailAlredyInUseError();
        }

        const hashedPassword = await this.hashGenerator.hash(password);

        return await this.createUserRepository.createUser({
            id,
            email,
            password: hashedPassword,
            name
        });
    }
}