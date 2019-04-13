import express from 'express';
import http from 'http';
import sio, {Socket} from 'socket.io';
import cors from 'cors';
import {
    IdErrorTypes,
    IdSocketVerb, IPrivateMessageForward,
    IPrivateMessageTrigger, ISocket,
    ISocketResponse, ISocketUsers
} from "./types/Types";

const app       = express();
const server    = http.createServer(app);
const io = sio(server, {});
const users: ISocketUsers = {};

app.use(cors());
server.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));

io.on(IdSocketVerb.CONNECTION, (socket: ISocket) => {
    // Registration
    socket.on(IdSocketVerb.REGISTER, (id: number, callback: (resp: ISocketResponse<any>) => any) => {
        if(id in users) {
            callback({
                error: true,
                errorType: IdErrorTypes.USER_EXISTS,
                msg: 'User already exists! Please Login'
            })
        }

        socket.me = id;
        users[socket.me] = socket;

        // Broadcast fresh list of Online_Users
        socket.broadcast.emit(IdSocketVerb.ONLINE_USERS, users);

        callback({
            msg: 'Registration successful',
            data: socket.me
        });
    });

    // Send private message
    socket.on(IdSocketVerb.PRIVATE_MSG_TRIGGER, (payload: IPrivateMessageTrigger, callback: (resp: ISocketResponse<any>) => any) => {
        if (payload.recipient in users) {
            const forwardMessage: IPrivateMessageForward = {
                msg: payload.msg,
                sender: socket.me
            };
            users[payload.recipient].emit(IdSocketVerb.PRIVATE_MSG_FORWARD, forwardMessage )
        }

        callback({
            error: true,
            errorType: IdErrorTypes.USER_OFFLINE,
            msg: 'User offline'
        })
    })
});
