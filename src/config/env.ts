require('dotenv').config();

export default {
    port: process.env.PORT || 8080,
    authenticationTokenSecret: process.env.AUTHENTICATION_TOKEN_SECRET || "authenticationtokensecret",
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "refreshtokensecret",
    bcryptSalt: 10,
    nodeEnv: 'test'
}