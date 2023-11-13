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
exports.SignInController = void 0;
const InvalidPasswordError_1 = require("@application/errors/InvalidPasswordError");
const InvalidUserError_1 = require("@application/errors/InvalidUserError");
const BaseController_1 = require("../BaseController");
const http_1 = require("@infrastructure/http/helpers/http");
class SignInController extends BaseController_1.BaseController {
    constructor(signIn) {
        super();
        this.signIn = signIn;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = httpRequest.body;
            const authenticationOrError = yield this.signIn.execute({
                email,
                password
            });
            if (authenticationOrError instanceof InvalidPasswordError_1.InvalidPasswordError || authenticationOrError instanceof InvalidUserError_1.InvalidUserError) {
                return (0, http_1.unauthorized)(authenticationOrError);
            }
            const { authenticationToken, refreshToken } = authenticationOrError;
            return (0, http_1.ok)({ authenticationToken }, { token: refreshToken });
        });
    }
}
exports.SignInController = SignInController;
