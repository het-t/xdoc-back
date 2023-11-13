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
exports.GetAccessTokenController = void 0;
const BaseController_1 = require("../BaseController");
const InvalidAuthTokenError_1 = require("../../errors/InvalidAuthTokenError");
const AuthTokenNotProvidedError_1 = require("../../errors/AuthTokenNotProvidedError");
const http_1 = require("../../helpers/http");
class GetAccessTokenController extends BaseController_1.BaseController {
    constructor(getAccessToken) {
        super();
        this.getAccessToken = getAccessToken;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cookie } = httpRequest.headers;
            if (!cookie) {
                return (0, http_1.unauthorized)(new AuthTokenNotProvidedError_1.AuthTokenNotProvidedError());
            }
            const tokenParts = cookie.split("=");
            const token = tokenParts[1];
            const accessToken = yield this.getAccessToken.execute(token);
            if (accessToken instanceof InvalidAuthTokenError_1.InvalidAuthTokenError) {
                return (0, http_1.unauthorized)(new InvalidAuthTokenError_1.InvalidAuthTokenError());
            }
            return (0, http_1.ok)(accessToken);
        });
    }
}
exports.GetAccessTokenController = GetAccessTokenController;
