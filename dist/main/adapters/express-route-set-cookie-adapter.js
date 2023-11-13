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
exports.expressRouteSetCookieAdapter = void 0;
const expressRouteSetCookieAdapter = (controller) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const httpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        userId: req.userId
    };
    const httpResponse = yield controller.handle(httpRequest);
    const refreshToken = (_a = httpResponse.headers) === null || _a === void 0 ? void 0 : _a.token;
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode)
            .cookie("token_v1", refreshToken, {
            sameSite: 'strict',
            path: '/',
            httpOnly: true,
            expires: new Date(new Date().getTime() + 86400000)
        })
            .json(httpResponse.body);
    }
    else {
        res.status(httpResponse.statusCode)
            .json({
            error: (_b = httpResponse.body) === null || _b === void 0 ? void 0 : _b.message
        });
    }
});
exports.expressRouteSetCookieAdapter = expressRouteSetCookieAdapter;
