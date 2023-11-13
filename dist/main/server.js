"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const app_1 = __importDefault(require("@main/config/app"));
const env_1 = __importDefault(require("@config/env"));
const db_connection_1 = __importDefault(require("@infrastructure/db/mongodb/helpers/db-connection"));
const app = (0, app_1.default)();
try {
    db_connection_1.default.connect(env_1.default.mongoUrl)
        .then(() => {
        app.listen(env_1.default.port, () => {
            console.log("server is running: ", env_1.default.port);
        });
    });
}
catch (err) {
    console.log(err);
}
