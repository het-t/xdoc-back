export type HttpResponse<T = any> = {
    statusCode: number;
    body?: T;
    headers?: {token: string};
}