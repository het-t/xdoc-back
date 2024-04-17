import { HandleOperation } from "@application/use-cases/operation/HandleOperation";
import { OperationRepository } from "@infrastructure/db/postgres/repositories/OperationRepository";

export const makeHandleOperation = (): HandleOperation => {
    const operationRepository = new OperationRepository();

    return new HandleOperation(
        operationRepository,
        operationRepository,
        operationRepository,
        operationRepository,
        operationRepository,
        operationRepository,
        operationRepository
    );
}