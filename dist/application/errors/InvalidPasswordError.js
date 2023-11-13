"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordError = void 0;
class InvalidPasswordError extends Error {
    constructor() {
        super("Invalid password");
        this.name = "InvalidPassword";
    }
}
exports.InvalidPasswordError = InvalidPasswordError;
