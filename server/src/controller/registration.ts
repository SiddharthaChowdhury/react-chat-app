import * as bcrypt from "bcrypt";
import {conn} from "../server";
import {utilToken} from "../util/utilToken";

export const registration = (req: any, res: any, next: any) => {
    const {email, password} = req.body;
    const hash = bcrypt.hashSync(password, 7);
    const sql = `INSERT INTO user (email, password) VALUES ('${email}', '${hash}')`;
    const sqlUserInfo = `SELECT id, name, email FROM user WHERE email ='${email}'`;

    conn.query(sql, (err, create) => {
        if (err) throw err;

        conn.query(sqlUserInfo, (err, user) => {
            if (err) throw err;

            res.status(201);
            return res.json({msg: "User is created", data: {token: utilToken.generateToken(user[0])}})
        });
    })
};
