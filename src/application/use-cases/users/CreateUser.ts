import { HashGenerator } from "@application/interfaces/cyptography/HashGenerator";
import { ICreateUserRepository } from "@application/interfaces/repositories/users/ICreateUserRepository";
import { ICreateUserInterface } from "@application/interfaces/use-cases/users/ICreateUserInterface";

export class CreateUser implements ICreateUserInterface {
    constructor(
        private readonly hashGenerator: HashGenerator,
        private readonly createUserRepository: ICreateUserRepository,
    ) {}

    async execute(
        { id, name, email, password }: ICreateUserInterface.Request
    ): Promise<ICreateUserInterface.Response> {
        const hashedPassword = await this.hashGenerator.hash(password);

        return await this.createUserRepository.createUser({
            id,
            email,
            password: hashedPassword,
            name
        });
    }
}