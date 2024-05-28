export namespace ICreateUserRepository {
    export type Request = {
        id: string,
        name?: string,
        email: string,
        password: string
    };
    export type Response = void;
}

export interface ICreateUserRepository {
    createUser(
        {id, name, email, password}: ICreateUserRepository.Request
    ): Promise<ICreateUserRepository.Response>
}