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
exports.GetAuthenticationToken = void 0;
const ForbiddenError_1 = require("@application/errors/ForbiddenError");
const InvalidTokenError_1 = require("@application/errors/InvalidTokenError");
class GetAuthenticationToken {
    constructor(getTokenRepository, jwtVerifier, jwtGenerator) {
        this.getTokenRepository = getTokenRepository;
        this.jwtVerifier = jwtVerifier;
        this.jwtGenerator = jwtGenerator;
    }
    execute(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const storedToken = yield this.getTokenRepository.getToken(token);
            if (!storedToken) {
                return new InvalidTokenError_1.InvalidTokenError();
            }
            const decodedToken = yield this.jwtVerifier.verifyRefreshToken(token);
            if (!decodedToken) {
                return new ForbiddenError_1.ForbiddenError();
            }
            const stringifyDecodedToken = JSON.stringify(decodedToken);
            const parsedDecodedToken = JSON.parse(stringifyDecodedToken);
            const accessToken = yield this.jwtGenerator.generateAccessToken(parsedDecodedToken.userId);
            return {
                accessToken
            };
        });
    }
}
exports.GetAuthenticationToken = GetAuthenticationToken;
