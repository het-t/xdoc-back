import env from "@config/env";
import express, { Express, Router } from "express";
import path = require("path");
import { onBoadingRoutes } from "@main/routes/onboarding-routes";
import { workspaceRoutes } from "@main/routes/workspace-routes";
import { saveTransactionsRoutes } from "@main/routes/save-transaction-routes";
import { syncRecordValuesRoutes } from "@main/routes/sync-record-values-routes";
import { queryCollectionRoutes } from "@main/routes/query-collection-routes";
import { searchRoutes } from "@main/routes/search-routes";
import { enqueueRoutes } from "@main/routes/enqueue-routes";
import { getTasksRoutes } from "@main/routes/get-tasks-routes";
import { getSpacesRoutes } from "@main/routes/get-spaces-routes";
import { getTeamsRoutes } from "@main/routes/get-teams-routes";
import { updateTeamMembersRoutes } from "@main/routes/update-team-members";

export default (app: Express): void => {
    const router = Router();

    app.use('/api/v1', router);
    
    saveTransactionsRoutes(router);
    onBoadingRoutes(router);
    workspaceRoutes(router);
    syncRecordValuesRoutes(router);
    queryCollectionRoutes(router);
    searchRoutes(router);
    enqueueRoutes(router);
    getTasksRoutes(router);
    getSpacesRoutes(router);
    getTeamsRoutes(router);
    updateTeamMembersRoutes(router);
    
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