import { serverError } from "@infrastructure/http/helpers/http";
import { HttpRequest } from "@infrastructure/http/interfaces/HttpRequest";
import { HttpResponse } from "@infrastructure/http/interfaces/HttpResponse";

export abstract class BaseMiddleware {
    abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            return await this.execute(httpRequest);
        } catch (error) {
            return serverError(error);
        }
    }
}