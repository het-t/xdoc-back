import { ISetOperationRepository } from "@application/interfaces/repositories/operations/ISetOperationRepository";
import { IUpdateOperationRepository } from "@application/interfaces/repositories/operations/IUpdateOperationRepository";
import { IHandleOperation } from "@application/interfaces/use-cases/handle-operation/IHandleOperation";

export class HandleOperation implements IHandleOperation {
    constructor(
        public readonly setOperationRepository: ISetOperationRepository,
        public readonly updateOperationRepository: IUpdateOperationRepository
    ) {}

    async execute(
        operation: IHandleOperation.Request
    ): Promise<IHandleOperation.Response> {        
        switch(operation.command) {
            case "set": 
                await this.setOperationRepository.setOperation(operation);
                break;

            case "update":
                await this.updateOperationRepository.updateOperation(operation);
                break;
            
            case "listBefore":
                console.log("list before");
                break;

            default:
                console.log(operation);
        }

        return {};
    }
}