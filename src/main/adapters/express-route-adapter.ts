import { BaseController } from "@infrastructure/http/controllers/BaseController"
import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest"
import { Request, Response } from "express";

export const expressRouteAdapter = (controller: BaseController) => async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers
    }

    const userId = "express-route-adapter-user-id";
    const workspaceId = "express-route-adapter-workspace-id";

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
        res.status(httpResponse.statusCode).json({
            error: httpResponse.body?.message
        })
    }
}