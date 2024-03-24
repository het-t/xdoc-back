import { IOperation } from "@domain/entities/ITransaction";

export namespace IUpdateOperationRepository {
    export type Request = IOperation;
    export type Response = object;
}

export interface IUpdateOperationRepository {
    updateOperation(
        o: IUpdateOperationRepository.Request
    ): Promise<IUpdateOperationRepository.Response>;
}