import { IKeyedObjectListBeforeRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListBeforeRepository";
import { IKeyedObjectListRemoveRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListRemoveRepository";
import { IKeyedObjectListUpdateRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListUpdateRepository";
import { ISetOperationRepository } from "@application/interfaces/repositories/operations/ISetOperationRepository";
import { IUpdateOperationRepository } from "@application/interfaces/repositories/operations/IUpdateOperationRepository";
import { IHandleOperation } from "@application/interfaces/use-cases/handle-operation/IHandleOperation";

export class HandleOperation implements IHandleOperation {
    constructor(
        private readonly setOperationRepository: ISetOperationRepository,
        private readonly updateOperationRepository: IUpdateOperationRepository,
        private readonly keyedObjectListBeforeRepository: IKeyedObjectListBeforeRepository,
        private readonly keyedObjectListUpdateRepository: IKeyedObjectListUpdateRepository,
        private readonly keyedObjectListRemoveRepository: IKeyedObjectListRemoveRepository
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
            
            case "keyedObjectListBefore":
                await this.keyedObjectListBeforeRepository.keyedObjectListBeforeOperation(operation);
                break;

            case "keyedObjectListUpdate":
                await this.keyedObjectListUpdateRepository.keyedObjectListUpdateOperation(operation);
                break;

            case "keyedObjectListRemove":
                await this.keyedObjectListRemoveRepository.keyedObjectListRemoveOperation(operation);
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