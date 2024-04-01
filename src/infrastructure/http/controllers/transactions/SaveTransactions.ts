import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { BaseController } from "../BaseController";
import { badRequest, ok } from "@infrastructure/http/helpers/http";
import { InvalidOperationPointer } from "@infrastructure/http/errors/InvalidOperationPointer";
import { InvalidOperationCommand } from "@infrastructure/http/errors/InvalidOperationCommand";
import { ITransaction } from "@domain/entities/ITransaction";
import { IHandleOperation } from "@application/interfaces/use-cases/handle-operation/IHandleOperation";

export namespace SaveTransactionsController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class SaveTransactionsController extends BaseController {
    constructor(
        private readonly handleOperation: IHandleOperation
    ) {
        super();
    }

    async execute(
        httpRequest: SaveTransactionsController.Request
    ): Promise<SaveTransactionsController.Response> {
        const transactions: ITransaction[] = httpRequest.body.transactions;
        const requestId: string = httpRequest.body.requestId;
        
        if (!transactions?.length) return badRequest(new Error("Invalid request"));

        try {
            for (let transaction of transactions) {                
                if (!transaction.operations?.length) return badRequest(new Error("Invalid transaction"));
                                
                for (let operation of transaction.operations) {
                    await this.handleOperation.execute(operation);
                }
            }
        } catch (error: any) {
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