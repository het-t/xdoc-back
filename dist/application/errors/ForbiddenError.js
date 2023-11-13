"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
class ForbiddenError extends Error {
    constructor() {
        super("Forbidden");
        this.name = "Forbidden";
    }
}
exports.ForbiddenError = ForbiddenError;
