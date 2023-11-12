import { bodyParser } from "@main/middlewares/body-parser-middleware";
import { contentType } from "@main/middlewares/content-type-middleware";
import { cors } from "@main/middlewares/cors-middleware";
import { Express } from "express";

export default (app: Express): void => {
    app.use(bodyParser);
    app.use(cors({ origin: 'http://localhost:8080', credentials: true }))
    app.use(contentType);
}