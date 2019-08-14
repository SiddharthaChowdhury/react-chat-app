import {Request, Response} from 'express';
import { conn } from '../../server/connection';

export const getCompanyUsers = (req: Request, res: Response) => {
    const {clientInfo:{companyId}} = req.body;

    conn.query('SELECT firstName, lastName, id, email, avatar FROM user WHERE companyId = ?', [companyId], (error: any, data: any) => {
        if (error) throw error;
    
        res.status(200);
        return res.json({data})
    })
};