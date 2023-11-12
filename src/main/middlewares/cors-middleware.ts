import { Request, Response, NextFunction } from "express"

export const cors = (options: {
    origin: string,
    credentials: boolean
}) => (req: Request, res: Response, next: NextFunction) => {
    res.set('Acess-Control-Allow-Headers', 'Authorization, Content-Type');
    res.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATH, OPTIONS');
    res.set("Access-Control-Allow-Origin", options.origin);
    res.set("Access-Control-Allow-Credentials", options.credentials.toString());
    next();
}