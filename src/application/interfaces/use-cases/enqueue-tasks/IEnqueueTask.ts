import { UseCase } from "../UseCase";

export namespace IEnqueueTask {
    export type Request = {
        eventName: string,
        request: {
            appendContentOnly: boolean,
            deepCopyTransculsionContainers: boolean,
            isTemplateInstantiation: boolean,
            resolveTemplateVariables: object,
            sourceBlocks: Array<{ id: string }>,
            targetBlocks: Array<{ id: string }>
        };
    };
    export type Response = string;
}

export interface IEnqueueTask extends UseCase<
    IEnqueueTask.Request,
    IEnqueueTask.Response
> {
    execute(
        { eventName, request }: IEnqueueTask.Request
    ): Promise<IEnqueueTask.Response>;
}