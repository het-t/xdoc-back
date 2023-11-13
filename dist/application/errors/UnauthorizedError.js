"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnautorizedError = void 0;
class UnautorizedError extends Error {
    constructor() {
        super("Unauthorized");
        this.name = "Unauthorized";
    }
}
exports.UnautorizedError = UnautorizedError;
