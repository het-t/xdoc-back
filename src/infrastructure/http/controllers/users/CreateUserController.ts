import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { CreateUser } from "@application/use-cases/users/CreateUser";
import { badRequest, forbidden, ok } from "@infrastructure/http/helpers/http";
import { EmailAlredyInUseError } from "@application/errors/EmailAlreadyInUseError";

export namespace CreateUserController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse<{}>;
}

export class CreateUserController extends BaseController {
    constructor(
        private readonly createUser: CreateUser
    ) {
        super();
    }
    
    async execute(
        httpRequest: CreateUserController.Request
    ): Promise<CreateUserController.Response> {
        const { id, name, email, password } = httpRequest.body;

        const createUserOrError = await this.createUser.execute({
            id,
            name,
            email,
            password
        });

        if (createUserOrError instanceof EmailAlredyInUseError) {
            return badRequest(createUserOrError);
        }

        return ok({});
    }
}