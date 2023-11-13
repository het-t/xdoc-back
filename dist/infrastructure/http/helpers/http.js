"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbidden = exports.unauthorized = exports.serverError = exports.badRequest = exports.ok = void 0;
const ServerError_1 = __importDefault(require("../errors/ServerError"));
const ok = (body, headers) => {
    return {
        statusCode: 200,
        body,
        headers
    };
};
exports.ok = ok;
const badRequest = (error) => ({
    statusCode: 400,
    body: error
});
exports.badRequest = badRequest;
const serverError = (error) => {
    const stack = error instanceof Error ? error.stack : undefined;
    return {
        statusCode: 500,
        body: new ServerError_1.default(stack)
    };
};
exports.serverError = serverError;
const unauthorized = (error) => ({
    statusCode: 401,
    body: error
});
exports.unauthorized = unauthorized;
const forbidden = (error) => ({
    statusCode: 403,
    body: error,
});
exports.forbidden = forbidden;
