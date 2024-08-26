import env from "@config/env";
import { JWTAdaptor } from "./JWTAdaptor";

export function MockJWTAdaptor(): jest.Mocked<JWTAdaptor> {
    const jwtAdaptor = new JWTAdaptor(
        env.authenticationTokenSecret,
        env.refreshTokenSecret
    ) as jest.Mocked<JWTAdaptor>;

    jwtAdaptor.generateAccessToken = jest.fn();
    jwtAdaptor.generateRefreshToken = jest.fn();
    jwtAdaptor.verifyAccessToken = jest.fn();
    jwtAdaptor.verifyRefreshToken = jest.fn();

    return jwtAdaptor;
}