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
import {login} from "./controller/login";
import {registration} from "./controller/registration";
import {
    acceptFriendRequest,
    getExistingFriends,
    getPendingFriendship,
    searchFriend,
    sendFriendship
} from "./controller/friendship";
import {auth} from "./apiMiddlewares/auth";

const app       = express();
const server    = http.createServer(app);
const io = sio(server, {});
const users: ISocketUsers = {};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.get('/ping', (req, res) => res.send('hello'));
app.post('/authorize', login, registration);
app.post('/send-friend-request', auth, sendFriendship);
app.put('/accept-friend-request', auth, acceptFriendRequest);
app.get('/pending-friend-requests', auth, getPendingFriendship);
app.post('/search-friend', auth, searchFriend);
app.get('/already-friends', auth, getExistingFriends);

export const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'dockety'
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

        const onlineUsers = getOnlineUsers();
        onlineUsers.then((users: any) => {
            // Broadcast fresh list of Online_Users
            socket.broadcast.emit(IdSocketVerb.online_users, users.data);

            callback(users);

            return
        }).catch(err => {
            throw err
        });
    });

    // Send private conversation
    socket.on(IdSocketVerb.private_msg_trigger, (payload: IPrivateMessageTrigger, callback: (resp: ISocketResponse<any>) => any) => {

        console.log('payload.recipient.id', payload.recipient.id!);
        if (payload.recipient && payload.recipient.id! in users) {
            const timestamp = + new Date();
            const {msg, type, sender, id} = payload
            const forwardMessage: IPrivateMessageForward = {
                id,
                msg,
                sender: socket.me,
                timestamp: timestamp.toString(),
                type
            };

            users[payload.recipient.id!].emit(IdSocketVerb.private_msg_forward, forwardMessage);

            callback({
                error: false,
                msg: 'Message is sent',
            });

            return;
        }

        callback({
            error: true,
            errorType: IdErrorTypes.USER_OFFLINE,
            msg: 'User offline'
        })
    });

    // Disconnect
    socket.on(IdSocketVerb.disconnect, (reason: any) => {
        delete users[socket.me];

        const onlineUsers = getOnlineUsers();
        onlineUsers.then((users: any) => {
            socket.broadcast.emit(IdSocketVerb.online_users, users.data);
        }).catch(err => {
            throw err;
        })
    })
});

const getOnlineUsers = () => {
    return new Promise((resolve, reject) => {
        const onlineUsers = Object.keys(users).reduce((accu: string, userId: any): string => {
            return accu + `'${userId}', `
        }, '');
        const sql = `SELECT id, name, email FROM user WHERE id IN (${onlineUsers.slice(0, -2)})`;
        conn.query(sql, (err, result) => {
            if (err) reject(err);

            resolve({
                msg: 'Online users',
                data: result
            })
        })
    })
};