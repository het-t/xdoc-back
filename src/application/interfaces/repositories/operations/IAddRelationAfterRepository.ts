import { IOperation } from "@domain/entities/ITransaction";

export namespace IAddRelationAfterRepository {
    export type Request = IOperation;
    export type Response = void;
}

export interface IAddRelationAfterRepository {
    addRelationAfterOperation(
        o: IAddRelationAfterRepository.Request
    ): Promise<IAddRelationAfterRepository.Response>;
}