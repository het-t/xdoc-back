"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignInController = void 0;
const SignInController_1 = require("@infrastructure/http/controllers/users/SignInController");
const sign_in_factory_1 = require("@main/factories/use-cases/users/sign-in-factory");
const makeSignInController = () => {
    const useCase = (0, sign_in_factory_1.makeSignIn)();
    return new SignInController_1.SignInController(useCase);
};
exports.makeSignInController = makeSignInController;
