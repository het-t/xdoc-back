import { HttpRequest } from "@infrastructure/http/interfaces/HttpRequest";
import { HttpResponse } from "@infrastructure/http/interfaces/HttpResponse";
import { BaseController } from "../BaseController";
import { SignUp } from "@application/use-cases/users/SignUp";
import { InvalidUserError } from "@application/errors/InvalidUserError";
import { ok } from "@infrastructure/http/helpers/http";

export class SignUpController extends BaseController {
    constructor(private readonly signUp: SignUp) {
        super();
    }
    
    async execute(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { name, email, password, profilePicture } = httpRequest.body;
        
        //create default "{name}'s xdoc" workspace
        const workspaceId = "";
        const workspaceName = `${name}'s xdoc`;
        const workspaceIcon = ""

        const workspace = {
            workspaceId,
            workspaceName,
            workspaceIcon,
            favourites: []
        }

        //create user
        const userOrError = await this.signUp.execute({
            name,
            email,
            password,
            isDarkMode: false,
            profilePicture,
            workspaces: [
                workspace
            ]
        });

        return ok()


    }
}