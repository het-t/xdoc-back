"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticate = void 0;
const Authentication_1 = require("@application/use-cases/users/Authentication");
const JWTAdaptor_1 = require("@infrastructure/cryptography/JWTAdaptor");
const env_1 = __importDefault(require("@config/env"));
const makeAuthenticate = () => {
    const jwtVerifier = new JWTAdaptor_1.JWTAdaptor(env_1.default.authenticationTokenSecret, env_1.default.refreshTokenSecret);
    const authentication = new Authentication_1.Authenticate(jwtVerifier);
    return authentication;
};
exports.makeAuthenticate = makeAuthenticate;
