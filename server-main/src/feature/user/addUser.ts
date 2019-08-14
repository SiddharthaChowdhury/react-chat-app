import {Request, Response} from 'express';
import { loca } from '../../loca/loca';
import { conn } from '../../server/connection';
import bcrypt from 'bcrypt';

export const addUser = (req: Request, res: Response) => {
    const {firstName, lastName, email, password, clientInfo:{companyId, companyName}} = req.body;

    if (!firstName || !lastName || !password || !email) {
        return res.status(400).json({ error: loca.error_required_fields_missing })
    }

    if(!companyId) {
        res.status(400);
        return res.json({ error: loca.error_authentication_failed })
    }

    if (password.length < 8) {
        res.status(400);
        return res.json({ error: loca.error_password_minimum_length })
    }

    conn.query('SELECT id FROM user WHERE email = ? AND companyId = ?', [email, companyId], (error: any, data: any) => {
        if (error) throw error;
        
        if (data.length === 0) {
            conn.query('INSERT INTO user SET ?', { 
                firstName,
                lastName,
                companyName,
                companyId,
                email,
                password: bcrypt.hashSync(password, 6)
            },
            (error: any, data: any) => {
                if (error) throw error;
    
                res.status(201);
                return res.json({ msg: loca.msg_new_user_created_success });
            })
        }
    
        res.status(409);
        return res.json({msg: loca.error_user_already_exists})
    })
};