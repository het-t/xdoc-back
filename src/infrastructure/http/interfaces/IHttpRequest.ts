export type IHttpRequest<TBody = any, TParams = any, THeader = any> = {
    body?: TBody;
    params?: TParams;
    headers?: THeader;
    userId?: string;
    workspaceId?: string;
}