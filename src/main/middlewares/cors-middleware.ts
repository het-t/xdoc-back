import env from "@config/env";
import { Request, Response, NextFunction } from "express"

export const cors = (options: {
    origins: string[],
    credentials: boolean
}) => (req: Request, res: Response, next: NextFunction) => {
    res.set('Acess-Control-Allow-Headers', 'Authorization, Content-Type');
    res.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATH, OPTIONS');
    if(env.nodeEnv === 'production') {
        res.set("Access-Control-Allow-Origin", options.origins[1]);
    }
    else {
        res.set("Access-Control-Allow-Origin", options.origins[0]);
    }
    res.set("Access-Control-Allow-Credentials", options.credentials.toString());
    next();
}