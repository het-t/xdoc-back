"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = void 0;
const InvalidUserError_1 = require("@application/errors/InvalidUserError");
const InvalidPasswordError_1 = require("@application/errors/InvalidPasswordError");
class SignIn {
    constructor(loadUserByEmailRepository, createTokenRepository, jwtGenerator, hashCompare) {
        this.loadUserByEmailRepository = loadUserByEmailRepository;
        this.createTokenRepository = createTokenRepository;
        this.jwtGenerator = jwtGenerator;
        this.hashCompare = hashCompare;
    }
    execute(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = credentials;
            const user = this.loadUserByEmailRepository.loadUserByEmail(email);
            if (!user) {
                return new InvalidUserError_1.InvalidUserError();
            }
            const isPasswordValid = this.hashCompare.compare(password, user.password);
            if (!isPasswordValid) {
                return new InvalidPasswordError_1.InvalidPasswordError();
            }
            const authenticationToken = yield this.jwtGenerator.generateAccessToken(user.id);
            const refreshToken = yield this.jwtGenerator.generateRefreshToken(user.id);
            yield this.createTokenRepository.createToken(refreshToken);
            return {
                authenticationToken,
                refreshToken
            };
        });
    }
}
exports.SignIn = SignIn;
