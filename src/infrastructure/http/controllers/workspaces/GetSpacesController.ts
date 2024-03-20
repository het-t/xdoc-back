import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { IGetSpacesInterface } from "@application/interfaces/use-cases/spaces/IGetSpacesInterface";
import { ok } from "@infrastructure/http/helpers/http";

export namespace GetSpacesController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class GetSpacesController extends BaseController {
    constructor(
        private readonly getSpaces: IGetSpacesInterface
    ) {
        super();
    }

    async execute(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const { userId } = httpRequest.body;
        
        const spacesOrError = await this.getSpaces.execute({
            userId
        })

        return ok({
            spaces: spacesOrError
        });
    }
}