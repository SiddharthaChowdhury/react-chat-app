import * as bcrypt from "bcrypt";
import {conn} from "../server";

export const registration = (req: any, res: any, next: any) => {
    const {email, password} = req.body;
    const hash = bcrypt.hashSync(password, 7);
    const sql = `INSERT INTO user (email, password) VALUES ('${email}', '${hash}')`;

    conn.query(sql, (err, user) => {
        if (err) throw err;

        res.status(201);
        return res.json({msg: "User is created", sql})
    })
};
