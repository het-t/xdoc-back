import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { ILoadUserByEmail } from "@application/interfaces/use-cases/users/ILoadUserByEmail";
import { badRequest, ok } from "@infrastructure/http/helpers/http";

export namespace FindUserConroller {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class FindUserConroller extends BaseController {
    constructor(
        private loadUserByEmail: ILoadUserByEmail
    ) {
        super();
    }

    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const {
            email
        } = httpRequest.body;

        if(!email) {
            return badRequest(
                new Error("Email not provided")
            )
        }
        
        const user = await this.loadUserByEmail.execute(email);

        if(user) {
            return ok({
                value: {
                    value: {
                        id: user.id,
                        email: user.email
                    },
                    role: "reader"
                }
            })
        }

        return ok({});
    }
}