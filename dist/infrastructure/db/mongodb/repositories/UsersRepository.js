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
exports.UserRepository = void 0;
const db_connection_1 = __importDefault(require("../helpers/db-connection"));
const mapper_1 = require("../helpers/mapper");
class UserRepository {
    static getCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_connection_1.default.getCollection('users');
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield UserRepository.getCollection();
            const { insertedId } = yield collection.insertOne(Object.assign(Object.assign({}, userData), { createdAt: Date.now() }));
            return (0, mapper_1.objectIdToString)(insertedId);
        });
    }
    loadUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield UserRepository.getCollection();
            const rawUser = yield collection.findOne({ email });
            return rawUser && (0, mapper_1.mapDocument)(rawUser);
        });
    }
}
exports.UserRepository = UserRepository;
