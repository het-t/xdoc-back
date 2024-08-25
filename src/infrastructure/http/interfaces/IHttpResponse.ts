export type IHttpResponse<T = any> = {
    statusCode: number;
    body?: T;
    headers?: {token: string};
    locals?: Record<string, any>;
}