"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerError extends Error {
    constructor(stack) {
        super("Internal server error");
        this.stack = stack;
        this.name = "InternalServerError";
    }
}
exports.default = ServerError;
