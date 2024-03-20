export namespace IEnqueueTaskRepository {
    export type Request = {
        appendContentOnly: boolean,
        deepCopyTransculsionContainers: boolean,
        isTemplateInstantiation: boolean,
        resolveTemplateVariables: object,
        sourceBlocks: Array<{ id: string }>,
        targetBlocks: Array<{ id: string }>
    };
    export type Response = string;
}

export interface IEnqueueTaskRepository {
    duplicateBlock(
        {
            appendContentOnly,
            deepCopyTransculsionContainers,
            isTemplateInstantiation,
            resolveTemplateVariables,
            sourceBlocks,
            targetBlocks
        }: IEnqueueTaskRepository.Request
    ): Promise<IEnqueueTaskRepository.Response>;
}