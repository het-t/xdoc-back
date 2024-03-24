export namespace IGetTokenRepository {
    export type Request = string;
    export type Response = {
        _id: string;
        token: string;
        createdAt: Date
    } | null;
}

export interface IGetTokenRepository {
    getToken(
        token: IGetTokenRepository.Request
    ): Promise<IGetTokenRepository.Response>;
}