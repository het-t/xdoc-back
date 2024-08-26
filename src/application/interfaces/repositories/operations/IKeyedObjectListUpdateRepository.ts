import { IOperation } from "@domain/interfaces/ITransaction";

export namespace IKeyedObjectListUpdateRepository {
    export type Request = IOperation;
    export type Response = void;
}

export interface IKeyedObjectListUpdateRepository {
    keyedObjectListUpdateOperation(
        o: IKeyedObjectListUpdateRepository.Request
    ): Promise<IKeyedObjectListUpdateRepository.Response>;
}