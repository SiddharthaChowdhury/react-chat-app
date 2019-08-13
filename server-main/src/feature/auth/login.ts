import {Request, Response} from 'express';
import { conn } from '../../server/connection';
import bcrypt from 'bcrypt';
import { IJwtPayload } from '../jwt/IJwt';
import { jwt } from '../jwt/jwt';
import { loca } from '../loca/loca';

export const login = (req: Request, res:Response) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({error: loca.error_authentication_failed})
    }
    // conn.query('SELECT password FROM user WHERE email = ?', [email], (error: any, results: any, fields: any) => {
    //     if (error) throw error
    //     if (results.length !== 1) {
    //       return res.status(400).json({ error: loca.error_authentication_failed })
    //     }
        
    //     const userInfo = results[0];
    //     bcrypt.compare(password, userInfo.password).then(function(isValid: boolean) {
    //         if(isValid) {
                const tokenPayload: IJwtPayload = {
                    userId: '123',
                    email,
                }
            
                const token: string = jwt.sign(tokenPayload);
                res.status(200).json({msg: loca.msg_authentication_success, token})
    //         }

    //         return res.status(400).json({ error: loca.error_authentication_failed })
    //     })
    // })
}

