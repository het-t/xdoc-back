import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest";
import { IHttpResponse } from "@infrastructure/http/interfaces/IHttpResponse";
import { BaseController } from "../BaseController";
import { LoadUserByEmail } from "@application/use-cases/users/LoadUserByEmail";
import { EmailAlredyInUseError } from "@application/errors/EmailAlreadyInUseError";
import { badRequest, forbidden, ok } from "@infrastructure/http/helpers/http";
import { CreateEmailUser } from "@application/use-cases/users/CreateEmailUser";
import { randomBytes, randomUUID } from "crypto";

export namespace CreateEmailUserController {
    export type Request = IHttpRequest;
    export type Response = IHttpResponse;
}

export class CreateEmailUserController extends BaseController {
    constructor(
        private readonly loadUserByEmail: LoadUserByEmail,
        private readonly createEmailUser: CreateEmailUser
    ) {
        super();
    }

    async execute(
        httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
        const { email } = httpRequest.body;

        if(!email) {
            return badRequest(
                new Error("Email not provided")
            )
        }

        const [existingUser] = await this.loadUserByEmail.execute(email);

        if (existingUser) {
            return forbidden(
                new EmailAlredyInUseError()
            );
        }

        const id = randomUUID();
        const password = randomBytes(8).toString("hex");

        console.log(id, password);

        await this.createEmailUser.execute({
            id,
            email
        });


        return ok({
            id
        });
    }
}