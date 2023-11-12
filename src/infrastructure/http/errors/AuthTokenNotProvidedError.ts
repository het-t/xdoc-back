export class AuthTokenNotProvidedError extends Error {
    constructor() {
        super("Authenication token not provided");

        this.name = "AuthTokenNotProvidedError"
    }
}