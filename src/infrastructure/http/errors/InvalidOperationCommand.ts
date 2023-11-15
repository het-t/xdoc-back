export class InvalidOperationCommand extends Error {
    constructor() {
        super("Invalid operation command");
        this.name = "InvalidOperationCommand";
    }
}