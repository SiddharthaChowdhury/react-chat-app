import socket, {Socket} from 'socket.io';
import {server} from "./index";

const io = socket(server, {});

io.on('connect', (socket: Socket) => {
    console.log('One conn');

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

