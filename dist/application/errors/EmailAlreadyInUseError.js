"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlredyInUseError = void 0;
class EmailAlredyInUseError extends Error {
    constructor() {
        super("Email is already in use");
        this.name = "EmailAlreadyInUse";
    }
}
exports.EmailAlredyInUseError = EmailAlredyInUseError;
