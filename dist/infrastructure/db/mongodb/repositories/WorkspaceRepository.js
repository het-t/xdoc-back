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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceRepository = void 0;
const db_connection_1 = __importDefault(require("../helpers/db-connection"));
const mapper_1 = require("../helpers/mapper");
class WorkspaceRepository {
    static getCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_connection_1.default.getCollection('workspaces');
        });
    }
    loadWorkspaceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield WorkspaceRepository.getCollection();
            const workspace = yield collection.findOne({
                _id: (0, mapper_1.stringToObjectId)(id)
            });
            return workspace && (0, mapper_1.mapDocument)(workspace);
        });
    }
    createWorkspace(workspaceData) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield WorkspaceRepository.getCollection();
            const { insertedId } = yield collection.insertOne(Object.assign({}, workspaceData));
            return (0, mapper_1.objectIdToString)(insertedId);
        });
    }
}
exports.WorkspaceRepository = WorkspaceRepository;
