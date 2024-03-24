export namespace IDeleteTokenRepository {
    export type Request = string;
    export type Response = void;
}

export interface IDeleteTokenRepository {
    deleteToken(
        token: IDeleteTokenRepository.Request
    ): Promise<IDeleteTokenRepository.Response>;
}