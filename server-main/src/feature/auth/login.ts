import {Request, Response} from 'express';
import { conn } from '../../server/connection';
import bcrypt from 'bcrypt';
import { IJwtPayload } from '../jwt/IJwt';
import { jwt } from '../jwt/jwt';
import { loca } from '../../loca/loca';

export const login = (req: Request, res:Response) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({error: loca.error_authentication_failed})
    }
    conn.query('SELECT id, password FROM user WHERE email = ?', [email], (error: any, results: any, fields: any) => {
        if (error) throw error;
        if (results.length !== 1) {
            res.status(400);
            return res.json({ error: loca.error_authentication_failed });
        }

        const userInfo = results[0];
        bcrypt.compare(password, userInfo.password).then(function(isValid: boolean) {
            if(isValid) {
                const tokenPayload: IJwtPayload = {
                    userId:userInfo.id,
                    email,
                };
            
                const token: string = jwt.sign(tokenPayload);
                res.status(200);
                return res.json({msg: loca.msg_authentication_success, token});
            }

            res.status(400);
            return res.json({ error: loca.error_authentication_failed });
        })
    })
};

