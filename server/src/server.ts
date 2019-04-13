import express from 'express';
import http from 'http';
import sio from 'socket.io';
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
server.listen(process.env.PORT || 1337, () => console.log(`Server running on port: ${process.env.PORT || 1337}`));

io.on(IdSocketVerb.connect, (socket: ISocket) => {
    console.log('One connection');
    // Registration
    socket.on(IdSocketVerb.register, (id: number, callback: any) => {
        if(id in users) {
            callback({
                error: true,
                errorType: IdErrorTypes.USER_EXISTS,
                msg: 'User already exists! Please Login',
                data: Object.keys(users)
            })
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

});
