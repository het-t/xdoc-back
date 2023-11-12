export class BlockNotFoundError extends Error {
    constructor() {
        super("Block not found");
        this.name = "BlockNotFound";
    }
}