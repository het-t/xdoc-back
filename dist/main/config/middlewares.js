"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_middleware_1 = require("@main/middlewares/body-parser-middleware");
const content_type_middleware_1 = require("@main/middlewares/content-type-middleware");
const cors_middleware_1 = require("@main/middlewares/cors-middleware");
exports.default = (app) => {
    app.use(body_parser_middleware_1.bodyParser);
    app.use((0, cors_middleware_1.cors)({ origin: 'http://localhost:8080', credentials: true }));
    app.use(content_type_middleware_1.contentType);
};
