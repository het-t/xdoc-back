import { sign } from "jsonwebtoken";
import env from "@config/env";

export const generateTestToken = (userId = "c09448fd-6974-4aa5-8d96-9769434287f7") => {
    return sign({ userId }, env.authenticationTokenSecret, {
        expiresIn: "1d"
    });
}