import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { BaseController } from "../BaseController";
import { badRequest, ok } from "@infrastructure/http/helpers/http";
import { InvalidOperationPointer } from "@infrastructure/http/errors/InvalidOperationPointer";
import { InvalidOperationCommand } from "@infrastructure/http/errors/InvalidOperationCommand";
import { ICreateBlock } from "@application/interfaces/use-cases/blocks/ICreateBlock";
import { ITransaction } from "@infrastructure/http/interfaces/ITransaction";
import { IUpdateBlock } from "@application/interfaces/use-cases/blocks/IUpdateBlock";
import { IListAfter } from "@application/interfaces/use-cases/space-view/IListAfter";
import { IListBefore } from "@application/interfaces/use-cases/space-view/IListBefore";
import { IListRemove } from "@application/interfaces/use-cases/space-view/IListRemove";
import { ICollectionUpdate } from "@application/interfaces/use-cases/collection/ICollectionUpdate";
import { ICollectionViewUpdate } from "@application/interfaces/use-cases/collection-view/ICollectionViewUpdate";
import { ICollectionCreate } from "@application/interfaces/use-cases/collection/ICollectionCreate";

export namespace SaveTransactions {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class SaveTransactions extends BaseController {
    constructor(
        private readonly createBlock: ICreateBlock,
        private readonly uploadBlock: IUpdateBlock,
        private readonly listAfter: IListAfter,
        private readonly listBefore: IListBefore,
        private readonly listRemove: IListRemove,
        private readonly collectionCreate: ICollectionCreate,
        private readonly collectionUpdate: ICollectionUpdate,
        private readonly collectionViewUpdate: ICollectionViewUpdate,
    ) {
        super();
    }

    async execute(
        httpRequest: SaveTransactions.Request
    ): Promise<SaveTransactions.Response> {
        const transactions: ITransaction[] = httpRequest.body.transactions;

        if (!transactions?.length) return badRequest(new Error("Invalid request"));

        try {
            for (let transaction of transactions) {                
                if (!transaction.operations?.length) return badRequest(new Error("Invalid transaction"));
                                
                for (let operation of transaction.operations) {

                    switch (operation.pointer.table) {
                        case "block":
                            switch (operation.command) {
                                case "set":
                                    await this.createBlock.execute({
                                        pointer: operation.pointer,
                                        args: operation.args
                                    });
                                    break;
                            
                                case "update":
                                    await this.uploadBlock.execute({
                                        pointer: operation.pointer,
                                        path: operation.path.join('.'),
                                        args: operation.args
                                    })
                                    break;
                                default:
                                    throw new InvalidOperationCommand();
                            }
                            break;
                        
                        case "space_view":
                            switch (operation.command) {
                                case "listAfter":
                                    await this.listAfter.execute({
                                        pointer: operation.pointer,
                                        path: operation.path.join('.'),
                                        args: operation.args
                                    })
                                    break;
                                
                                case "listBefore":
                                    await this.listBefore.execute({
                                        pointer: operation.pointer,
                                        path: operation.path.join('.'),
                                        args: operation.args
                                    })
                                    break;
                                
                                case "listRemove":
                                    await this.listRemove.execute({
                                        pointer: operation.pointer,
                                        path: operation.path.join('.'),
                                        args: operation.args
                                    })
                                    break;
                                
                                default:
                                    throw new InvalidOperationCommand();
                            }
                            break;
                        
                        case "collection_view": 
                            switch (operation.command) {
                                case "update": 
                                    await this.collectionViewUpdate.execute({
                                        pointer: operation.pointer,
                                        path: operation.path,
                                        args: operation.args
                                    });
                                    break;
                            }
                            break;
                        
                        case "collection": 
                            switch (operation.command) {
                                case "set": 
                                    await this.collectionCreate.execute({
                                        pointer: operation.pointer,
                                        args: operation.args
                                    });
                                    break;
                                    
                                case "update":
                                    await this.collectionUpdate.execute({
                                        pointer: operation.pointer, 
                                        path: operation.path,
                                        args: operation.args
                                    });
                                    break;
                            }
                            break;

                        default:
                            throw new InvalidOperationPointer();
                    }
                }
            }
        } catch (error: any) {
            console.log(error)
            if (
                error instanceof InvalidOperationCommand
                || error instanceof InvalidOperationPointer
            ) {
                return badRequest(error);
            }
            else {
                return badRequest(new Error("unknown error encountered"))
            }
        }

        return ok({})
    }
}