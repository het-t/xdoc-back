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
exports.SignUp = void 0;
const EmailAlreadyInUseError_1 = require("@application/errors/EmailAlreadyInUseError");
class SignUp {
    constructor(hashGenerator, jwtGenerator, createTokenRepository, loadUserbyEmailRepository, createUserRepository) {
        this.hashGenerator = hashGenerator;
        this.jwtGenerator = jwtGenerator;
        this.createTokenRepository = createTokenRepository;
        this.loadUserbyEmailRepository = loadUserbyEmailRepository;
        this.createUserRepository = createUserRepository;
    }
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userData;
            const existingUser = yield this.loadUserbyEmailRepository.loadUserByEmail(email);
            if (existingUser) {
                return new EmailAlreadyInUseError_1.EmailAlredyInUseError();
            }
            const hashedPassword = yield this.hashGenerator.hash(password);
            const user = this.createUserRepository.createUser(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            return user;
        });
    }
}
exports.SignUp = SignUp;
