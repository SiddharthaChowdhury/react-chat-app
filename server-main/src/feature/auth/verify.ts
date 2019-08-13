import {Request, Response, NextFunction} from 'express';
import { loca } from '../loca/loca';
import { jwt } from '../jwt/jwt';

export const verifyToken = (req: Request, res: Response) => {
    const token = req.get('token');

    if(!token) {
        return res.status(403).json({error: loca.error_authentication_failed})
    }

    const tResp = jwt.verify(token!)
    if(tResp){
        return res.status(200).json({msg: loca.msg_authentication_success, data: tResp})
    }

    return res.status(403).json({error: loca.error_authentication_failed})

}

export const verifyTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('token');

    if(!token) {
        res.status(403).json({error: loca.error_authentication_failed})
        res.end();
    }

    const decoded = jwt.verify(token!)

    if(decoded){
        req.body.tokenInfo = decoded;
        next();
    }
    
    res.status(403).end();
}