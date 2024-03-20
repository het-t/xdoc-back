import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { IGetTasks } from "@application/interfaces/use-cases/get-tasks/IGetTasks";
import { ok } from "@infrastructure/http/helpers/http";

export namespace GetTasksController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class GetTasksController extends BaseController {
    constructor(
        private readonly getTasks: IGetTasks
    ) {
        super();
    }

    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const {
            taskIds
        } = httpRequest.body;

        const recordMaps = await this.getTasks.execute(taskIds);

        return ok({
            recordMaps
        })
    }
}

// {
//     id: string,
//     eventName: string,
//     request: {
//         sourceBlocks: Array<{
//             id: string,
//             spaceId: string
//         }>,
//         targetBlocks: Array<{
//             id: string,
//             spaceId: string
//         }>,
//         appendContentOnly: boolean,
//         isTemplateInstantiation: boolean,
//         resolveTemplateVariables: object,
//         deepCopyTransclusionContainers: boolean,
//         useCrdt: boolean
//     },
//     actor: {
//         table: string,
//         id: string
//     },
//     rootRequest: {
//         eventName: string,
//         requestId: string
//     },
//     enqueuedat: number,
//     status: {
//         recordMap: object,
//         totalBlocks: number,
//         completeBlocks: number
//     },
//     state: "in_progress" | "success" | "failed"
// }