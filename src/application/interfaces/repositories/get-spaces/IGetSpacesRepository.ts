export namespace IGetSpacesRepository {
    export type Request = void;
    export type Response = object;
}

export interface IGetSpacesRepository {
    getSpacesByUserId(): Promise<IGetSpacesRepository.Response>;
}