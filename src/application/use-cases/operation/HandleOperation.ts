import { IKeyedObjectListBeforeRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListBeforeRepository";
import { IKeyedObjectListRemoveRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListRemoveRepository";
import { IKeyedObjectListUpdateRepository } from "@application/interfaces/repositories/operations/IKeyedObjectListUpdateRepository";
import { ISetRepository } from "@application/interfaces/repositories/operations/ISetRepository";
import { ISetParentRepository } from "@application/interfaces/repositories/operations/ISetParentRepository";
import { IUpdateRepository } from "@application/interfaces/repositories/operations/IUpdateOperationRepository";
import { IHandleOperation } from "@application/interfaces/use-cases/handle-operation/IHandleOperation";
import { IAddRelationAfterRepository } from "@application/interfaces/repositories/operations/IAddRelationAfterRepository";

export class HandleOperation implements IHandleOperation {
    constructor(
        private readonly setRepository: ISetRepository,
        private readonly updateRepository: IUpdateRepository,
        private readonly keyedObjectListBeforeRepository: IKeyedObjectListBeforeRepository,
        private readonly keyedObjectListUpdateRepository: IKeyedObjectListUpdateRepository,
        private readonly keyedObjectListRemoveRepository: IKeyedObjectListRemoveRepository,
        private readonly setParentRepository: ISetParentRepository,
        private readonly addRelationAfterRepository: IAddRelationAfterRepository
    ) {}

    async execute(
        operation: IHandleOperation.Request
    ): Promise<IHandleOperation.Response> {        
        switch(operation.command) {
            case "set": 
                await this.setRepository.setOperation(operation);
                break;

            case "update":
                await this.updateRepository.updateOperation(operation);
                break;
            
            case "setParent":
                await this.setParentRepository.setParentOperation(operation);
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

            case "addRelationAfter":
                await this.addRelationAfterRepository.addRelationAfterOperation(operation);
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