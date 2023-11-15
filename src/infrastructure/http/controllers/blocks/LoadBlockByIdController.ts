import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { BlockNotFoundError } from "@application/errors/BlockNotFoundError";
import { badRequest, ok } from "@infrastructure/http/helpers/http";
import { ILoadBlockById } from "@application/interfaces/use-cases/blocks/ILoadBlockById";

export namespace LoadBlockByIdController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class LoadBlockByIdController extends BaseController {
    constructor(
        private readonly loadBlockById: ILoadBlockById
    ) { 
        super();
    }
    
    async execute(
        httpRequest: LoadBlockByIdController.Request
    ): Promise<LoadBlockByIdController.Response> {
        const { id } = httpRequest.body;
        const blockOrError = await this.loadBlockById.execute(id);
    
        if (blockOrError instanceof BlockNotFoundError) {
            return badRequest(blockOrError);
        }

        return ok({
            block: blockOrError
        })
    }
}