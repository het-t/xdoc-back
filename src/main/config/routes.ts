import userRoutes from "@main/routes/user-routes";
import env from "config/env";
import express, { Express, Router } from "express";
import path = require("path");

export default (app: Express): void => {
    const router = Router();

    app.use('/v1', router);
    userRoutes(router);

    if (env.nodeEnv === "production") {
        // eslint-disable-next-line no-underscore-dangle
        const __dirname = path.resolve('../');
        const staticPath = path.join(__dirname, 'notion-browser-client/build');
        app.use(express.static(staticPath));

        app.get('*', (req, res) => {
        res.type('html');
        res.sendFile(
            path.resolve(__dirname, 'notion-browser-client', 'build', 'index.html')
        );
        });
    } else {
        app.get("/test", (req, res) => {
            res.status(200).json({message: "ok"})
        })
    }
}