import { IHttpResponse } from "../interfaces/IHttpResponse";
import ServerError from "../errors/ServerError";

export const ok = <T = any>(
    body: T,
    headers?: { token: string}
): IHttpResponse<T> => {
    return {
        statusCode: 200,
        body,
        headers
    }
}

export const created = <T = any>(body: T): IHttpResponse => {
    return {
        statusCode: 201,
        body
    }
}

export const badRequest = (error: Error): IHttpResponse<Error> => ({
    statusCode: 400,
    body: error
})

export const serverError = (error: Error): IHttpResponse<Error> => {
    const stack = error instanceof Error ? error.stack : undefined;
    return {
        statusCode: 500,
        body: new ServerError(stack)
    }
}

export const unauthorized = (error: Error): IHttpResponse<Error> => ({
    statusCode: 401,
    body: error
})

export const forbidden = (error: Error): IHttpResponse<Error> => ({
  statusCode: 403,
  body: error,
});