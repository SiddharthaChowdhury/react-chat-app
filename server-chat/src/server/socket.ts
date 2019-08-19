import socket, {Socket} from 'socket.io';
import {server} from "./index";
import {ISocketMap} from "./ISocketMap";
import {IdSocketKey} from "./IdSocketVerb";

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

    })

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

