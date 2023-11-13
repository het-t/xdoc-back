"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockNotFoundError = void 0;
class BlockNotFoundError extends Error {
    constructor() {
        super("Block not found");
        this.name = "BlockNotFound";
    }
}
exports.BlockNotFoundError = BlockNotFoundError;
