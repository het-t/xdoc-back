export class ForbiddenError extends Error {
    constructor() {
        super("Forbidden");
        this.name = "Forbidden";
    }
}