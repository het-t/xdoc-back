"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentType = void 0;
const contentType = (req, res, next) => {
    if (!res.type) {
        res.type('json');
    }
    next();
};
exports.contentType = contentType;
