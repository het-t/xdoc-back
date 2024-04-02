import { IHttpResponse } from "../interfaces/IHttpResponse";
import { IHttpRequest } from "../interfaces/IHttpRequest";
import { Validation } from "../interfaces/IValidation";
import { badRequest, serverError } from "../helpers/http";

export abstract class BaseController {
    constructor(private readonly validation?: Validation) {}

    abstract execute(httpRequest: IHttpRequest): Promise<IHttpResponse>

    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        try {
            const error = this.validation?.validate(httpRequest);
            if (error) {
                return badRequest(error);
            }
            return await this.execute(httpRequest);
        }
        catch (error: any) {
            console.log(error);
            return serverError(error);
        }
    }
}