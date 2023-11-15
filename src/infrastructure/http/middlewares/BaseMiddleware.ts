import { serverError } from "@infrastructure/http/helpers/http";
import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";

export abstract class BaseMiddleware {
    abstract execute(httpRequest: IHttpRequest): Promise<IHttpResponse>;

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            return await this.execute(httpRequest);
        } catch (error: any) {
            return serverError(error);
        }
    }
}