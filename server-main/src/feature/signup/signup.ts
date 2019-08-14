import {Request, Response} from 'express';
import { conn } from '../../server/connection';
import bcrypt from 'bcrypt';
import { loca } from '../../loca/loca';

export const signup = (req: Request, res:Response) => {

    const { firstName, lastName, company, email, password } = req.body
    if (!firstName || !lastName || !company || !password || !email) {
        return res.status(400).json({ error: loca.error_required_fields_missing })
    }

    if (password.length < 8) {
        res.status(400);
        return res.json({ error: loca.error_password_minimum_length })
    }

    conn.query('SELECT id FROM user WHERE email = ?', [email], (error: any, results: any, fields: any) => {
        if (error) throw error;
        if (results.length > 0) {
        return res.status(409).json({ error: loca.error_user_already_exists })
        }

        conn.query('INSERT INTO company SET ?', { name: company }, (error: any, companyResults: any) => {
        if (error) throw error;

            conn.query('INSERT INTO user SET ?', {
                firstName,
                lastName,
                companyName: company,
                companyId: companyResults.insertId,
                email,
                password: bcrypt.hashSync(password, 6)
                }, (error: any, results: any) => {
                    if (error) throw error;

                    res.status(201);
                    return res.json({ msg: loca.msg_registration_success });
            })
        })
    })
};