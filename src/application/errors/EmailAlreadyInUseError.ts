export class EmailAlredyInUseError extends Error {
    constructor() {
        super("Email is already in use");
        this.name = "EmailAlreadyInUse";
    }
}