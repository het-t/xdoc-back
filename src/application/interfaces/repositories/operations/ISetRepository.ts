import { IOperation } from "@domain/interfaces/ITransaction";

export namespace ISetRepository {
    export type Request = IOperation;
    export type Response = object;
}

export interface ISetRepository {
    setOperation(
        o: ISetRepository.Request
    ): Promise<ISetRepository.Response>;
}