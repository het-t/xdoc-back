import { IOperation } from "@domain/entities/ITransaction";

export namespace ISetRepository {
    export type Request = IOperation;
    export type Response = object;
}

export interface ISetRepository {
    setOperation(
        o: ISetRepository.Request
    ): Promise<ISetRepository.Response>;
}