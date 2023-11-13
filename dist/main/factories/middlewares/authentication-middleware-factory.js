"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticationMiddleware = void 0;
const authenticate_factory_1 = require("../use-cases/users/authenticate-factory");
const AuthMiddleware_1 = require("@infrastructure/http/middlewares/authentication/AuthMiddleware");
const makeAuthenticationMiddleware = () => {
    const authenticationUseCase = (0, authenticate_factory_1.makeAuthenticate)();
    return new AuthMiddleware_1.AuthMiddleware(authenticationUseCase);
};
exports.makeAuthenticationMiddleware = makeAuthenticationMiddleware;
