import { IOperation } from "@domain/interfaces/ITransaction";

export namespace ISetParentRepository {
    export type Request = IOperation;
    export type Response = void;
}

export interface ISetParentRepository {
    setParentOperation(
        o: ISetParentRepository.Request
    ): Promise<ISetParentRepository.Response>;
}