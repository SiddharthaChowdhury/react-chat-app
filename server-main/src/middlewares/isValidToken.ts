import {NextFunction, Request, Response} from "express";
import {loca} from "../loca/loca";
import {jwt} from "../feature/jwt/jwt";

export const isValidToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('token');

    if(!token) {
        res.status(403).json({error: loca.error_authentication_failed});
    }

    const decoded = jwt.verify(token!);
    if(decoded){
        req.body.clientInfo = decoded;
        next();
    } else {
        res.status(403);
        return res.json({error: loca.error_authentication_failed});
    }
};