"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUserError = void 0;
class InvalidUserError extends Error {
    constructor() {
        super("Invalid user");
        this.name = "InvalidUser";
    }
}
exports.InvalidUserError = InvalidUserError;
