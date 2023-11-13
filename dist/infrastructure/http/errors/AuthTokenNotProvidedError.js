"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenNotProvidedError = void 0;
class AuthTokenNotProvidedError extends Error {
    constructor() {
        super("Authenication token not provided");
        this.name = "AuthTokenNotProvidedError";
    }
}
exports.AuthTokenNotProvidedError = AuthTokenNotProvidedError;
