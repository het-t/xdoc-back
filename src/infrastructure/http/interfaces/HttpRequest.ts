export type HttpRequest<TBody = any, THeader = any, TParams = any> = {
    body?: TBody;
    headers?: THeader;
    params?: TParams;
    userId?: string;
    workspaceId?: string;
}