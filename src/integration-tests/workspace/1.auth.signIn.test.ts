import { _req } from "../index";
import { env } from "process";

describe("/singIn", () => {
    it("valid credentials", async () => {
        const result = await _req.post("/api/v1/signIn")
        .send({
            email: env.INT_TEST_USERNAME,
            password: env.INT_TEST_PASSWORD
        });

        const token = result.body.authenticationToken;

        expect(typeof token).toBe('string');
        expect(token).not.toHaveLength(0);
        expect(result.status).toBe(200);
    });
})