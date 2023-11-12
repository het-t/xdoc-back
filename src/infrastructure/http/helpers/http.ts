import { HttpResponse } from "../interfaces/HttpResponse";
import ServerError from "../errors/ServerError";

export const ok = <T = any>(
    body: T,
    headers?: { token: string}
): HttpResponse<T> => {
    return {
        statusCode: 200,
        body,
        headers
    }
}

export const badRequest = (error: Error): HttpResponse<Error> => ({
    statusCode: 400,
    body: error
})

export const serverError = (error: Error): HttpResponse<Error> => {
    const stack = error instanceof Error ? error.stack : undefined;
    return {
        statusCode: 500,
        body: new ServerError(stack)
    }
}

export const unauthorized = (error: Error): HttpResponse<Error> => ({
    statusCode: 401,
    body: error
})

export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: 403,
  body: error,
});