import socket, {Socket} from 'socket.io';
import {server} from "./index";

export const io = socket.listen(server, {});

export default {
    io,
    connect: () => {
        io.sockets.on('connection', (socket: Socket) => {
            console.log('client connected');

            socket.on('echo', (...args: any) => {
                io.sockets.emit('message', args);
            });
        });
    }
}