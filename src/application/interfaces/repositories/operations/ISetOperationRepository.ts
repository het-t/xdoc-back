import { IOperation } from "@domain/entities/ITransaction";

export namespace ISetOperationRepository {
    export type Request = IOperation;
    export type Response = object;
}

export interface ISetOperationRepository {
    setOperation(
        o: ISetOperationRepository.Request
    ): Promise<ISetOperationRepository.Response>;
}