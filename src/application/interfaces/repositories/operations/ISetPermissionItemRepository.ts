import { IOperation } from "@domain/entities/ITransaction";

export namespace ISetPermissionItemRepository {
    export type Request = IOperation;
    export type Response = void;
}

export interface ISetPermissionItemRepository {
    setPermissionItem(
        o: ISetPermissionItemRepository.Request
    ): Promise<ISetPermissionItemRepository.Response>;
}