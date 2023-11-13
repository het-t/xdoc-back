"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cors = void 0;
const cors = (options) => (req, res, next) => {
    res.set('Acess-Control-Allow-Headers', 'Authorization, Content-Type');
    res.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATH, OPTIONS');
    res.set("Access-Control-Allow-Origin", options.origin);
    res.set("Access-Control-Allow-Credentials", options.credentials.toString());
    next();
};
exports.cors = cors;
