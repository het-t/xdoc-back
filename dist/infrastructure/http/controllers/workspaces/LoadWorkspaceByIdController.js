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
exports.LoadWorkspaceByIdController = void 0;
const BaseController_1 = require("../BaseController");
const http_1 = require("@infrastructure/http/helpers/http");
class LoadWorkspaceByIdController extends BaseController_1.BaseController {
    constructor(loadWorkspaceById) {
        super();
        this.loadWorkspaceById = loadWorkspaceById;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = httpRequest.params;
            const workspaceOrError = yield this.loadWorkspaceById.execute(id);
            return (0, http_1.ok)({
                workspace: workspaceOrError
            });
        });
    }
}
exports.LoadWorkspaceByIdController = LoadWorkspaceByIdController;
