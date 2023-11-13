"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("@main/config/middlewares"));
const routes_1 = __importDefault(require("@main/config/routes"));
exports.default = () => {
    const app = (0, express_1.default)();
    (0, middlewares_1.default)(app);
    (0, routes_1.default)(app);
    return app;
};
