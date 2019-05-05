import express from 'express';
import http from 'http';
import sio from 'socket.io';
import cors from 'cors';
import mysql from 'mysql';
import {
    IdErrorTypes,
    IdSocketVerb, IPrivateMessageForward,
    IPrivateMessageTrigger, ISocket,
    ISocketResponse, ISocketUsers
} from "./types/Types";
import * as bodyParser from "body-parser";
import * as bcrypt from 'bcrypt'

const app       = express();
const server    = http.createServer(app);
const io = sio(server, {});
const users: ISocketUsers = {};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by')

app.get('/ping', (req, res) => res.send('hello'));

app.post('/authorize', (req: any, res: any, next: any) => {
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
},(req: any, res: any) => {
    const {email, password} = req.body;
    const hash = bcrypt.hashSync(password, 7);
    const sql = `INSERT INTO user (email, password) VALUES ('${email}', '${hash}')`;

    conn.query(sql, (err, user) => {
        if (err) throw err;

        res.status(201);
        return res.json({msg: "User is created", sql})
    })
});

export const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'chat'
});

conn.connect((err: any) => {
    if(err) throw err;

    console.log('Database connected');
    server.listen(process.env.PORT || 1337, () => console.log(`Server running on port: ${process.env.PORT || 1337}`));
});

io.on(IdSocketVerb.connect, (socket: ISocket) => {
    console.log('One conn');
    // Registration
    socket.on(IdSocketVerb.register, (id: number, callback: any) => {

        if(id in users) {
            callback({
                error: true,
                errorType: IdErrorTypes.USER_EXISTS,
                msg: 'User already exists! Please Login',
                data: Object.keys(users)
            });

            return;
        }

        socket.me = id;
        users[socket.me] = socket;

        // Broadcast fresh list of Online_Users
        socket.broadcast.emit(IdSocketVerb.online_users, Object.keys(users));

        callback({
            msg: 'Registration successful',
            data: Object.keys(users)
        });
    });

    // Send private message
    socket.on(IdSocketVerb.private_msg_trigger, (payload: IPrivateMessageTrigger, callback: (resp: ISocketResponse<any>) => any) => {
        if (payload.recipient in users) {
            const forwardMessage: IPrivateMessageForward = {
                msg: payload.msg,
                sender: socket.me
            };
            users[payload.recipient].emit(IdSocketVerb.private_msg_forward, forwardMessage )
        }

        callback({
            error: true,
            errorType: IdErrorTypes.USER_OFFLINE,
            msg: 'User offline'
        })
    });

    socket.on(IdSocketVerb.disconnect, (reason: any) => {
        delete users[socket.me];
        socket.broadcast.emit(IdSocketVerb.online_users, Object.keys(users));
    })
});
