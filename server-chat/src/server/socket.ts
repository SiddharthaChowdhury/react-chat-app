import socket, {Socket} from 'socket.io';
import {server} from "./index";
import {ISocketMap} from "./ISocketMap";
import {IdSocketKey, IMessageInfo, ISocketResponse} from "./IdSocketVerb";
import {IdSocketVerb} from "../../../server/src/types/Types";

const io = socket(server, {});

const userMap: ISocketMap = {};

io.on('connect', (socket: Socket) => {
    console.log('One conn');


    socket.on(IdSocketKey.registerUser, ({companyId, userId}, callback: any) => {
        if(!userMap[companyId]) {
            userMap[companyId] = {};
        }

        if(!userMap[companyId][userId]) {
            userMap[companyId][userId] = socket;
        }

        callback({msg: "Socket up!"});
        return;

    });

    socket.on(IdSocketKey.messageOut, (payload: IMessageInfo, callback: (resp: ISocketResponse) => any) => {
        const {companyId, fromId, toId} = payload;

        if (!companyId || !fromId || !toId || !userMap[companyId]) {
            callback({error: true, msg: "Invalid messageOut data", data: payload});
            return;
        }

        if(!userMap[companyId][toId]) {
            // TODO: Save messageOut to database as user is offline
            callback({msg: "User is offline at the moment, messageOut is sent", data: payload});
            return;
        }

        userMap[companyId][toId].emit(IdSocketKey.messageIn, {
            error: false,
            data: payload,
            msg: "New"
        });

        callback({
            error: false,
            msg: 'Message is sent',
        });

    });

    // // Disconnect
    // socket.on('disconnect', (reason: any) => {
    //     delete users[socket.me];
    //
    //     const onlineUsers = getOnlineUsers();
    //     onlineUsers.then((users: any) => {
    //         socket.broadcast.emit(IdSocketVerb.online_users, users.data);
    //     }).catch(err => {
    //         throw err;
    //     })
    // })
});

