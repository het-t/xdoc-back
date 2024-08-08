export interface JWTVerifier {
    verifyAccessToken(jwt: string): string | object;
    verifyRefreshToken(jwt: string): string | object;
}