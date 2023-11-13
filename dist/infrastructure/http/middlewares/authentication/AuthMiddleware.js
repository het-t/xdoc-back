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
exports.AuthMiddleware = void 0;
const BaseMiddleware_1 = require("../BaseMiddleware");
const AuthTokenNotProvidedError_1 = require("@infrastructure/http/errors/AuthTokenNotProvidedError");
const InvalidAuthTokenError_1 = require("@infrastructure/http/errors/InvalidAuthTokenError");
const ForbiddenError_1 = require("@application/errors/ForbiddenError");
const http_1 = require("@infrastructure/http/helpers/http");
class AuthMiddleware extends BaseMiddleware_1.BaseMiddleware {
    constructor(authenticate) {
        super();
        this.authenticate = authenticate;
    }
    execute(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = (_a = httpRequest.headers) === null || _a === void 0 ? void 0 : _a.authorization;
            if (!authHeader) {
                return (0, http_1.forbidden)(new AuthTokenNotProvidedError_1.AuthTokenNotProvidedError());
            }
            const [, authToken] = authHeader.split(' ');
            const userIdOrError = yield this.authenticate.execute(authToken);
            if (userIdOrError instanceof ForbiddenError_1.ForbiddenError) {
                return (0, http_1.forbidden)(new InvalidAuthTokenError_1.InvalidAuthTokenError());
            }
            return (0, http_1.ok)({ userId: userIdOrError });
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
