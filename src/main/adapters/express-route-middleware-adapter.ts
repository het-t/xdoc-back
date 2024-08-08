import { BaseController } from "@infrastructure/http/controllers/BaseController";
import { IHttpRequest } from "@infrastructure/http/interfaces/IHttpRequest"
import { NextFunction, Request, Response } from "express";

export const expressRouteMiddlewareAdapter = (controller: BaseController) => async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers
    }

    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        next();
    } else {
        res.status(httpResponse.statusCode).json({
            error: httpResponse.body?.message
        })
    }
}