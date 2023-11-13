"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpController = void 0;
const BaseController_1 = require("../BaseController");
const http_1 = require("@infrastructure/http/helpers/http");
class SignUpController extends BaseController_1.BaseController {
    constructor(signUp) {
        super();
        this.signUp = signUp;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, profilePicture } = httpRequest.body;
            //create default "{name}'s xdoc" workspace
            const workspaceId = "";
            const workspaceName = `${name}'s xdoc`;
            const workspaceIcon = "";
            const workspace = {
                workspaceId,
                workspaceName,
                workspaceIcon,
                favourites: []
            };
            //create user
            const userOrError = yield this.signUp.execute({
                name,
                email,
                password,
                isDarkMode: false,
                profilePicture,
                workspaces: [
                    workspace
                ]
            });
            return (0, http_1.ok)();
        });
    }
}
exports.SignUpController = SignUpController;
