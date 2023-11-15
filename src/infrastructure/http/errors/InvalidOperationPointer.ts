export class InvalidOperationPointer extends Error {
    constructor() {
        super("Invalid operation pointer");
        this.name = "InvalidOperationPointer";
    }
}