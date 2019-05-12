import * as bcrypt from "bcrypt";
import {conn} from "../server";
import {utilToken} from "../util/utilToken";

export const login = (req: any, res: any, next: any) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400);
        return res.json({err: 'Email and Password is required'})
    }

    const sql = `SELECT password, id, name, email FROM user WHERE email = '${email}'`;
    conn.query(sql, (err, result) => {
        if (err) throw err;

        const userInfo = result[0];

        if (!userInfo) {
            next()
        } else {
            if (bcrypt.compareSync(password, result[0].password)){
                userInfo.password = undefined;
                res.status(200);
                return res.json({msg: 'Login Successful', data: {token: utilToken.generateToken(userInfo)}});
            } else {
                res.status(400);
                return res.json({msg: 'Incorrect login information'});
            }
        }
    })
}