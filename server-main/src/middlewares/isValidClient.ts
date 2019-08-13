import {Request, Response, NextFunction} from 'express'
import {conn} from "../server/connection";
import {loca} from "../loca/loca";

export const isValidClient = (req: Request, res: Response, next: NextFunction) => {
    const {clientInfo: {userId, email}} = req.body;

    conn.query('SELECT companyId FROM user WHERE id = ? AND email = ?', [userId, email], (err: any, userInfo: any) => {
        if(err) throw err;

        if(userInfo.length != 1) {
            res.status(400);
            return res.json({error: loca.error_authentication_failed})
        }

        const {companyId} = userInfo[0];
        req.body.clientInfo.companyId = companyId;
        next();
    })
}