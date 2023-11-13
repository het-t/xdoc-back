import express, { Express } from "express";
import setUpMiddlewares from "@main/config/middlewares";
import setUpRoutes from "@main/config/routes";

export default (): Express => {
    const app = express();

    setUpMiddlewares(app);
    setUpRoutes(app);

    return app;
}