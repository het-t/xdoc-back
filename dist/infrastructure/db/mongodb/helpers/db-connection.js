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
const env_1 = __importDefault(require("@config/env"));
const mongodb_1 = require("mongodb");
class DbConnection {
    connect(url) {
        return __awaiter(this, void 0, void 0, function* () {
            this.url = url;
            this.client = new mongodb_1.MongoClient(url);
            yield this.client.connect();
        });
    }
    disconnecti() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.client) === null || _a === void 0 ? void 0 : _a.close());
            this.client = undefined;
        });
    }
    getCollection(name) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client && this.url) {
                yield this.connect(this.url);
            }
            const db = (_a = this.client) === null || _a === void 0 ? void 0 : _a.db(env_1.default.mongoDbName);
            if (!db) {
                throw new Error("MongoDB client is not connected");
            }
            return db.collection(name);
        });
    }
}
exports.default = new DbConnection();
