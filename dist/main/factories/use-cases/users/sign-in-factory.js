"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignIn = void 0;
const env_1 = __importDefault(require("@config/env"));
const SignIn_1 = require("@application/use-cases/users/SignIn");
const BcryptAdaptor_1 = require("@infrastructure/cryptography/BcryptAdaptor");
const JWTAdaptor_1 = require("@infrastructure/cryptography/JWTAdaptor");
const TokenRepository_1 = require("@infrastructure/db/mongodb/repositories/TokenRepository");
const UsersRepository_1 = require("@infrastructure/db/mongodb/repositories/UsersRepository");
const makeSignIn = () => {
    const userRepository = new UsersRepository_1.UserRepository();
    const tokenRepository = new TokenRepository_1.TokenRepository();
    const jwtAdaptor = new JWTAdaptor_1.JWTAdaptor(env_1.default.authenticationTokenSecret, env_1.default.refreshTokenSecret);
    const bcryptAdaptor = new BcryptAdaptor_1.BcryptAdaptor(env_1.default.bcryptSalt);
    return new SignIn_1.SignIn(userRepository, tokenRepository, jwtAdaptor, bcryptAdaptor);
};
exports.makeSignIn = makeSignIn;
