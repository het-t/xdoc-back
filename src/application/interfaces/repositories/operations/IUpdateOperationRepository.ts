import { IOperation } from "@domain/interfaces/ITransaction";

export namespace IUpdateRepository {
    export type Request = IOperation;
    export type Response = object;
}

export interface IUpdateRepository {
    updateOperation(
        o: IUpdateRepository.Request
    ): Promise<IUpdateRepository.Response>;
}