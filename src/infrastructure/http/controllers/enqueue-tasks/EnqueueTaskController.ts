import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { IEnqueueTask } from "@application/interfaces/use-cases/enqueue-tasks/IEnqueueTask";
import { ok } from "@infrastructure/http/helpers/http";

export namespace EnqueueTaskController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class EnqueueTaskController extends BaseController {
    constructor(
        private readonly enqueueTask: IEnqueueTask
    ) {
        super();
    }

    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const {
            eventName,
            request
        } = httpRequest.body;

        const taskId = await this.enqueueTask.execute({
            eventName,
            request
        })
        
        return ok({
            taskId
        })
    }
}