"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("@config/env"));
const express_1 = __importStar(require("express"));
const path = require("path");
const onboarding_routes_1 = __importDefault(require("@main/routes/onboarding-routes"));
const workspace_routes_1 = __importDefault(require("@main/routes/workspace-routes"));
exports.default = (app) => {
    const router = (0, express_1.Router)();
    app.use('/v1', router);
    (0, onboarding_routes_1.default)(router);
    (0, workspace_routes_1.default)(router);
    if (env_1.default.nodeEnv === "production") {
        // eslint-disable-next-line no-underscore-dangle
        const __dirname = path.resolve('../');
        const staticPath = path.join(__dirname, 'notion-browser-client/build');
        app.use(express_1.default.static(staticPath));
        app.get('*', (req, res) => {
            res.type('html');
            res.sendFile(path.resolve(__dirname, 'notion-browser-client', 'build', 'index.html'));
        });
    }
    else {
        app.get("/test", (req, res) => {
            res.status(200).send({ message: "ok" });
        });
    }
};
