import * as bcrypt from "bcrypt";
import {conn} from "../server";

export const login = (req: any, res: any, next: any) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400);
        return res.json({err: 'Email and Password is required'})
    }

    const sql = `SELECT password FROM user WHERE email = '${email}'`;
    conn.query(sql, (err, result) => {
        if (err) throw err;

        const userInfo = result[0];

        if (!userInfo) {
            next()
        } else {
            if (bcrypt.compareSync(password, result[0].password)){
                res.status(200);
                return res.json({msg: 'Login Successful'});
            } else {
                res.status(400);
                return res.json({msg: 'Incorrect login information'});
            }
        }
    })
}