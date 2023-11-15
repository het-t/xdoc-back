import env from "@config/env";
import express, { Express, Router } from "express";
import path = require("path");
import { onBoadingRoutes } from "@main/routes/onboarding-routes";
import { workspaceRoutes } from "@main/routes/workspace-routes";
import { saveTransactionsRoutes } from "@main/routes/save-transaction-routes";

export default (app: Express): void => {
    const router = Router();

    app.use('/api/v1', router);
    
    saveTransactionsRoutes(router);
    onBoadingRoutes(router);
    workspaceRoutes(router);

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
            res.status(200).send({message: "ok"})
        })
    }
}