export namespace IGetSpacesRepository {
    export type Request = {
        userId: string
    };
    export type Response = object;
}

export interface IGetSpacesRepository {
    getSpaces(
        { userId }: IGetSpacesRepository.Request
    ): Promise<IGetSpacesRepository.Response>
}