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
exports.Authenticate = void 0;
const ForbiddenError_1 = require("@application/errors/ForbiddenError");
class Authenticate {
    constructor(jwtVerifier) {
        this.jwtVerifier = jwtVerifier;
    }
    execute(authenticationToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const decodedToken = yield this.jwtVerifier.verifyAccessToken(authenticationToken);
            if (!decodedToken) {
                return new ForbiddenError_1.ForbiddenError();
            }
            const decodedTokenString = JSON.stringify(decodedToken);
            const decodedTokenObject = JSON.parse(decodedTokenString);
            return decodedTokenObject.userId;
        });
    }
}
exports.Authenticate = Authenticate;
