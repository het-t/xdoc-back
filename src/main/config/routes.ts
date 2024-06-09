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
import { findUserRoutes } from "@main/routes/find-user-routes";
import { createEmailuserRoutes } from "@main/routes/create-email-user";
import { removeUsersFromSpaceRoutes } from "@main/routes/remove-users-from-space";
import { getVisibleUsersRoutes } from "@main/routes/get-visible-users-routes";

export default (app: Express): void => {
    const router = Router();

    const __dirname = path.resolve('./');
    
    if(env.nodeEnv === "production") {
        const staticPath = path.join(__dirname, 'x_dist');
        app.use(express.static(staticPath));
    }
 
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
    findUserRoutes(router);
    createEmailuserRoutes(router);
    removeUsersFromSpaceRoutes(router);
    getVisibleUsersRoutes(router);
    
    if (env.nodeEnv === "production") {
        // eslint-disable-next-line no-underscore-dangle
        app.get('*', (req, res) => {
            res.type('html');
            res.sendFile(
                path.resolve(__dirname, 'x_dist', 'index.html')
            );
        });
    } else {
        app.get("/test", (req, res) => {
            res.status(200).send({message: "ok"})
        })
    }
}