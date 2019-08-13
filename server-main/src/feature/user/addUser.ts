import {Request, Response} from 'express';

export const addUser = (req: Request, res: Response) => {
    const {firstName, lastName, email, password, clientInfo} = req.body;
    return res.json(req.body);


};