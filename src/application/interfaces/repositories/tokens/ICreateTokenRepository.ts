export namespace ICreateTokenRepository {
    export type Request = string;
    export type Response = string; 
}

export interface ICreateTokenRepository {
    createToken(
        token: ICreateTokenRepository.Request
    ): Promise<ICreateTokenRepository.Response>;
}